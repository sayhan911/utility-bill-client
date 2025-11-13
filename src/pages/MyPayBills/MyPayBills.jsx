import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  FiUser,
  FiCalendar,
  FiFileText,
  FiDownload,
  FiEdit,
  FiTrash2,
  FiPhone,
} from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function MyPayBills() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/payments?email=${user.email}`)
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

  const handleDownload = () =>
    toast("PDF download coming soon!", { icon: "Warning" });

  // Loading state UI
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="group flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-4 sm:px-6 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <FiDownload className="w-5 h-5" />
              <span className="text-sm sm:text-base">Download Report</span>
            </motion.button>
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
                      key={p.id}
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
                        {formatDate(p.date)}
                      </td>
                      <td className="py-3 px-2 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Update"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
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
    </div>
  );
}
