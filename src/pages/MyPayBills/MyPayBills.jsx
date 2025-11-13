import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  FiUser,
  FiCalendar,
  FiFileText,
  FiEdit,
  FiTrash2,
  FiPhone,
} from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import {
  FaTimes,
  FaLock,
  FaUser,
  FaHome,
  FaPhone,
  FaRegFileAlt,
  FaSpinner,
  FaCreditCard,
} from "react-icons/fa";
import DownloadReport from "./DownloadReport";

export default function MyPayBills() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update modal + form state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [form, setForm] = useState({
    username: "",
    amount: "",
    address: "",
    phone: "",
    date: "",
    info: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(
      `https://utility-bill-server-eight.vercel.app/payments?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load payments");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const totalPaid = payments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0
  );
  const totalBills = payments.length;

  const sorted = [...payments].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const periodStart = first ? formatDate(first.date) : "N/A";
  const periodEnd = last ? formatDate(last.date) : "N/A";

  const months =
    first && last
      ? Math.max(
          1,
          Math.round(
            (new Date(last.date) - new Date(first.date)) /
              (1000 * 60 * 60 * 24 * 30)
          )
        )
      : 1;

  const avgPerBill = totalBills ? (totalPaid / totalBills).toFixed(2) : "0.00";
  const avgMonthly = totalBills ? (totalPaid / months).toFixed(2) : "0.00";

  const now = new Date();
  const fileTime = now.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // For updating payments
  const openUpdateModal = (bill) => {
    const isoDate = bill?.date
      ? new Date(bill.date).toISOString().slice(0, 10)
      : "";
    setSelectedBill(bill);
    setForm({
      username: bill?.username || user?.displayName || "",
      amount: bill?.amount ? String(bill.amount) : "",
      address: bill?.Address || bill?.address || "",
      phone: bill?.Phone || bill?.phone || "",
      date: isoDate,
      info: bill?.info || "",
    });
    setUpdateOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBill) return toast.error("No bill selected");

    if (!form.amount || isNaN(Number(form.amount))) {
      return toast.error("Please enter a valid amount");
    }
    if (!form.phone || form.phone.length < 6) {
      return toast.error("Please enter a valid phone");
    }

    setSubmitting(true);
    const updates = {
      amount: form.amount,
      Address: form.address,
      Phone: form.phone,
      date: form.date ? new Date(form.date).toISOString() : undefined,
    };

    Object.keys(updates).forEach(
      (k) => updates[k] === undefined && delete updates[k]
    );

    try {
      const res = await fetch(
        `https://utility-bill-server-eight.vercel.app/payments/${
          selectedBill._id || selectedBill.id
        }`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        }
      );

      if (!res.ok) {
        const txt = await res.text().catch(() => "Update failed");
        throw new Error(txt || "Update failed");
      }

      const updated = await res.json();

      setPayments((prev) =>
        prev.map((p) => {
          const idP = p._id || p.id;
          const idSel = selectedBill._id || selectedBill.id;
          if (String(idP) === String(idSel)) {
            return { ...p, ...updated };
          }
          return p;
        })
      );

      toast.success("Payment updated");
      setUpdateOpen(false);
      setSelectedBill(null);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete modal state + functions
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openDeleteModal = (id) => {
    setDeleteTargetId(id);
    setDeleteOpen(true);
  };

  const cancelDelete = () => {
    if (deleting) return;
    setDeleteOpen(false);
    setDeleteTargetId(null);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return toast.error("No bill selected");
    setDeleting(true);
    try {
      const res = await fetch(
        `https://utility-bill-server-eight.vercel.app/payments/${deleteTargetId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const txt = await res.text().catch(() => "Delete failed");
        throw new Error(txt || "Delete failed");
      }
      setPayments((p) =>
        p.filter((x) => String(x._id || x.id) !== String(deleteTargetId))
      );
      toast.success("Deleted");
      setDeleteOpen(false);
      setDeleteTargetId(null);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // Loading UI
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50 p-4">
        <Loader2 className="w-14 h-14 animate-spin text-green-600 mb-4" />
        <p className="text-lg font-medium text-green-700 animate-pulse text-center">
          Loading your bills...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6 pt-10 md:pt-16">
      <div className="max-w-5xl mx-auto">
        {/* ----- Header ----- */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Bill Statement
          </h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <DownloadReport
              user={user}
              payments={payments}
              totalPaid={totalPaid}
              totalBills={totalBills}
              periodStart={periodStart}
              periodEnd={periodEnd}
              avgPerBill={avgPerBill}
              avgMonthly={avgMonthly}
              months={months}
              fileTime={fileTime}
            />
            <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                  {user?.displayName?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 truncate">
                {user?.displayName || "User"}
              </span>
            </div>
          </div>
        </motion.header>

        {/* ----- Top card ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-white/50"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <FiFileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {user?.displayName || "User"} Bill Statement
                </h3>
                <p className="text-xs text-gray-500">
                  {fileTime.split(",")[0]}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Processed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm">
            <div className="flex items-center gap-3">
              <FiUser className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-500">Customer Name</p>
                <p className="font-medium text-gray-800">
                  {user?.displayName || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiCalendar className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-500">Statement Period</p>
                <p className="font-medium text-gray-800">
                  {periodStart} – {periodEnd}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiFileText className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-500">File Created</p>
                <p className="font-medium text-gray-800">{fileTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-500">Phone No</p>
                <p className="font-medium text-gray-800">
                  {payments.length > 0 ? payments[0].Phone : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiCalendar className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-500">Duration</p>
                <p className="font-medium text-gray-800">
                  {months} Month{months > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiFileText className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <p className="text-gray-500">Total Bills</p>
                <p className="font-medium text-gray-800">{totalBills}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Paid Card*/}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6 border border-white/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <FaBangladeshiTakaSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Amount
                </h3>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-green-700">
              ৳ {totalPaid.toLocaleString()}
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Avg per bill</span>
                <span className="font-medium">৳ {avgPerBill}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg monthly</span>
                <span className="font-medium">৳ {avgMonthly}</span>
              </div>
            </div>
          </motion.div>

          {/* Bill Count Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6 border border-white/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FiFileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Bills Paid
                </h3>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-blue-600">
              {totalBills}
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Paid on time</span>
                <span className="font-medium">{totalBills}</span>
              </div>
              <div className="flex justify-between">
                <span>Overdue</span>
                <span className="font-medium text-red-600">0</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* All Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 md:mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6 border border-white/50"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Payments</h2>

          {payments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No payments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-medium text-gray-700 whitespace-nowrap">
                      Username
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 whitespace-nowrap">
                      Email
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 whitespace-nowrap">
                      Amount
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 whitespace-nowrap">
                      Address
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 whitespace-nowrap">
                      Phone
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 whitespace-nowrap">
                      Date
                    </th>
                    <th className="text-center py-3 px-2 font-medium text-gray-700 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr
                      key={p._id || p.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2 whitespace-nowrap">
                        {p.username || "-"}
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">{p.email}</td>
                      <td className="py-3 px-2 font-medium whitespace-nowrap">
                        ৳ {p.amount}
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        {p.Address || "-"}
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        {p.Phone || "-"}
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        {p.date ? formatDate(p.date) : "-"}
                      </td>
                      <td className="py-3 px-2 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openUpdateModal(p)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Update"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(p._id || p.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* ----- Update Modal ----- */}
      <AnimatePresence>
        {updateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => !submitting && setUpdateOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">
                  Update Bill
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => !submitting && setUpdateOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Modal Form */}
              <form
                onSubmit={handleUpdateSubmit}
                className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ReadOnlyField
                    label="Email"
                    value={user?.email || ""}
                    icon={FaLock}
                  />
                  <ReadOnlyField
                    label="Bill ID"
                    value={selectedBill?._id || selectedBill?.id || ""}
                    icon={FaLock}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Amount"
                    name="amount"
                    icon={FaBangladeshiTakaSign}
                    value={form.amount}
                    onChange={handleFormChange}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <InputField
                  label="Full Name"
                  name="username"
                  icon={FaUser}
                  value={form.username}
                  onChange={handleFormChange}
                  placeholder="Your full name"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Address"
                    name="address"
                    icon={FaHome}
                    value={form.address}
                    onChange={handleFormChange}
                    placeholder="Your address"
                    required
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    icon={FaPhone}
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="01xxxxxxxxx"
                    required
                  />
                </div>

                <TextAreaField
                  label="Additional Info (Optional)"
                  name="info"
                  icon={FaRegFileAlt}
                  value={form.info}
                  onChange={handleFormChange}
                  rows="3"
                />

                <div className="flex items-center justify-end gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => !submitting && setUpdateOpen(false)}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    style={{ minWidth: "180px" }}
                  >
                    {submitting ? (
                      <FaSpinner className="w-5 h-5 animate-spin" />
                    ) : (
                      <FaCreditCard className="w-5 h-5" />
                    )}
                    {submitting ? "Updating..." : "Save Changes"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ----- Delete Confirmation Modal ----- */}
      <AnimatePresence>
        {deleteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => !deleting && cancelDelete()}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-5 border-b border-gray-200 flex flex-col items-start gap-4">
                <div className="flex gap-2 items-center justify-center">
                  <ImCross className="text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete bill
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    This action will permanently remove the selected bill. This
                    cannot be undone.
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={cancelDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-60"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold disabled:opacity-60 flex items-center gap-2"
                  >
                    {deleting ? (
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Reusable components  */
const InputField = ({ label, icon: Icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type="text"
        {...props}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      )}
    </div>
  </div>
);

const TextAreaField = ({ label, icon: Icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <textarea
        {...props}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      ></textarea>
      {Icon && (
        <div className="absolute top-3.5 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      )}
    </div>
  </div>
);

const ReadOnlyField = ({ label, value, icon: Icon, isAmount = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type="text"
        value={value}
        readOnly
        className={`w-full pr-4 py-2.5 border border-gray-200 bg-gray-100 text-gray-600 rounded-lg truncate 
          ${isAmount ? "font-bold text-green-700" : ""} ${Icon ? "pl-10" : ""}`}
      />
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-500" />
        </div>
      )}
    </div>
  </div>
);
