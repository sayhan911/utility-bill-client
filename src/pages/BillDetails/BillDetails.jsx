import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCreditCard,
  FaTimes,
  FaSpinner,
  FaExclamationTriangle,
  FaLock,
  FaUser,
  FaPhone,
  FaHome,
  FaRegFileAlt,
} from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Lottie from "lottie-react";
import emptyAnimation from "../../assets/lottie/empty-animation.json";

const API_BASE = "https://utility-bill-server-eight.vercel.app";

export default function BillDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payOpen, setPayOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    address: "",
    phone: "",
    info: "",
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE}/bills/${id}`)
      .then((r) => r.json())
      .then((data) => setBill(data))
      .catch((err) => {
        console.error("Failed to load bill:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user?.displayName)
      setForm((f) => ({ ...f, username: user.displayName }));
  }, [user]);

  const isCurrentMonth = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return false;
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    );
  };

  const canPay = isCurrentMonth(bill?.date);

  const openPayModal = () => {
    if (!user?.email) {
      toast.error("You must be logged in to pay.");
      navigate("/login", { state: { from: `/bills/${id}` } });
      return;
    }
    setPayOpen(true);
    setForm((f) => ({ ...f, username: user.displayName || f.username }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Login required");

    if (!form.username || !form.address || !form.phone) {
      return toast.error("Please fill required fields");
    }

    const payment = {
      billId: bill._id || bill.id,
      username: form.username,
      Phone: form.phone,
      Address: form.address,
      email: user.email,
      amount: bill.amount,
      date: new Date().toISOString().slice(0, 10),
      additionalInfo: form.info || "",
    };

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/payments`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(payment),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Payment failed");
      toast.success("Payment recorded successfully");
      setPayOpen(false);
      navigate("/my-bills");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to save payment");
    } finally {
      setSubmitting(false);
    }
  };

  //   Skeleton loading
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 rounded-xl bg-gray-200 h-64 w-full" />
          <div className="md:col-span-2 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-20 bg-gray-200 rounded w-full mt-6" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 bg-gray-200 rounded-lg w-32" />
              <div className="h-12 bg-gray-200 rounded-lg w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if bill is not found
  if (!bill) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-linear-to-br from-indigo-50 to-purple-50">
        {/* lottie animation */}
        <div className="w-64 h-64 md:w-80 md:h-80">
          <Lottie animationData={emptyAnimation} loop autoplay />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-8 text-center">
          Bill Not Found
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-600 text-center max-w-lg">
          The bill you are looking for doesn’t exist or has been removed.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/bills")}
          className="mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
        >
          <FaArrowLeft className="w-5 h-5" />
          Back to Bills
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 py-10"
      >
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Image Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-1 rounded-xl overflow-hidden m-4"
            >
              <img
                src={bill.image}
                alt={bill.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>

            {/* Details Section */}
            <div className="md:col-span-2 p-6 sm:p-8">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                {bill.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {bill.title}
              </h1>

              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                {bill.description}
              </p>

              {/* Info List */}
              <div className="mt-6 space-y-4">
                <InfoItem
                  icon={FaMapMarkerAlt}
                  label="Location"
                  value={bill.location}
                />
                <InfoItem
                  icon={FaCalendarAlt}
                  label="Bill Date"
                  value={bill.date}
                />
                <InfoItem
                  icon={FaBangladeshiTakaSign}
                  label="Amount"
                  value={`${bill.amount} Taka`}
                  valueClass="text-3xl font-bold text-green-600"
                />
              </div>

              {/* Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openPayModal}
                    disabled={!canPay}
                    className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <FaCreditCard className="w-5 h-5" />
                    Pay Bill
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/bills")}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft className="w-5 h-5" />
                    Back to Bills
                  </motion.button>
                </div>

                {!canPay && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-sm text-yellow-800 bg-yellow-100 p-3 rounded-lg"
                  >
                    <FaExclamationTriangle className="w-5 h-5" />
                    This bill is not from the current month. Only current-month
                    bills can be paid.
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pay Modal */}
      <AnimatePresence>
        {payOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setPayOpen(false)}
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
                  Confirm Payment
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPayOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Modal Form */}
              <form
                onSubmit={handlePaySubmit}
                className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
              >
                {/* Read-Only Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ReadOnlyField
                    label="Email"
                    value={user?.email || ""}
                    icon={FaLock}
                  />
                  <ReadOnlyField
                    label="Amount"
                    value={`${bill.amount}.00`}
                    icon={FaBangladeshiTakaSign}
                    isAmount={true}
                  />
                </div>
                <ReadOnlyField
                  label="Bill ID"
                  value={bill._id || bill.id}
                  icon={FaLock}
                />
                <ReadOnlyField
                  label="Payment Date"
                  value={new Date().toISOString().slice(0, 10)}
                  icon={FaCalendarAlt}
                />

                <hr className="my-4" />

                {/* Input Fields */}
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
                    onClick={() => setPayOpen(false)}
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
                    {submitting ? "Processing..." : "Confirm & Pay"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const InfoItem = ({ icon: Icon, label, value, valueClass = "" }) => (
  <div className="flex items-start">
    {Icon && (
      <div>
        <Icon className="w-5 h-5 mt-1 text-green-600 shrink-0" />
      </div>
    )}
    <div className="ml-3">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className={`text-lg font-semibold text-gray-900 ${valueClass}`}>
        {value}
      </p>
    </div>
  </div>
);

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
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  </div>
);
