import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  SearchX,
  PlusCircle,
  Loader2,
  Send,
  Mail,
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";
import toast from "react-hot-toast";
import AuthContext from "../../provider/AuthContext";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};

// Main component
export default function Bills() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newBillForm, setNewBillForm] = useState({
    title: "",
    category: "gas",
    amount: "",
    location: "",
    description: "",
    image: "",
    date: new Date().toISOString().slice(0, 10),
    email: "",
  });

  useEffect(() => {
    fetch("https://utility-bill-server-eight.vercel.app/bills")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [
          "all",
          ...new Set(data.map((b) => b.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = "https://utility-bill-server-eight.vercel.app/bills";
    const query =
      selectedCategory !== "all" ? `?category=${selectedCategory}` : "";

    fetch(url + query)
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
      })
      .catch((err) => console.error("Bills fetch error:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setNewBillForm((prev) => ({ ...prev, [name]: parseFloat(value) || "" }));
    } else {
      setNewBillForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add a bill.");
      return;
    }
    setIsSubmitting(true);

    const billData = {
      ...newBillForm,
      email: newBillForm.email,
      category:
        newBillForm.category.charAt(0).toUpperCase() +
        newBillForm.category.slice(1),
    };

    fetch("https://utility-bill-server-eight.vercel.app/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billData),
    })
      .then((res) => res.json())
      .then((newlyAddedBill) => {
        if (newlyAddedBill.insertedId) {
          toast.success("Bill added successfully!");

          setLoading(true);
          const url = "https://utility-bill-server-eight.vercel.app/bills";
          const query =
            selectedCategory !== "all" ? `?category=${selectedCategory}` : "";

          fetch(url + query)
            .then((res) => res.json())
            .then((data) => setBills(data))
            .finally(() => setLoading(false));

          setNewBillForm({
            title: "",
            category: "gas",
            amount: "",
            location: "",
            description: "",
            image: "",
            date: new Date().toISOString().slice(0, 10),
            email: "",
          });
        } else {
          toast.error("Failed to add bill.");
        }
      })
      .catch((err) => {
        console.error("Submit error:", err);
        toast.error("An error occurred.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      {/* ----- Page Header ----- */}
      <div className="relative mb-8">
        <div className="absolute -left-6 -top-6 h-24 w-24 opacity-20 hidden sm:block">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <circle
                key={i}
                cx={(i % 10) * 10}
                cy={Math.floor(i / 10) * 10}
                r="1.5"
                fill="#6b7280"
              />
            ))}
          </svg>
        </div>
        <p className="section-title">
          <LuNewspaper />
          Bills Dashboard
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1E2631] mt-2">
          Manage Your <span className="text-green-700">Bills</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* ----- Left column: Cards ----- */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <h3 className="text-2xl font-semibold text-gray-800">All Bills</h3>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full sm:w-48 border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-200 transition pr-10"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-md animate-pulse"
                >
                  <div className="h-48 w-full bg-gray-200 rounded-lg mb-4" />
                  <div className="h-5 w-1/3 bg-gray-200 rounded-full mb-3" />
                  <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded-lg mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-10 w-full bg-gray-200 rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <motion.div
                      key={bill._id}
                      variants={cardVariants}
                      layout
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group flex flex-col"
                    >
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={bill.image}
                          alt={bill.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col grow">
                        <div className="grow">
                          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-2">
                            {bill.category}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mt-1">
                            {bill.title}
                          </h3>
                          <div className="mt-2 space-y-1">
                            <p className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                              {bill.location}
                            </p>
                            <p className="flex items-center text-lg font-semibold text-green-600">
                              <FaBangladeshiTakaSign className="w-4 h-4 mb-0.5 mr-1 text-green-600" />
                              {bill.amount}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (user) {
                              navigate(`/bills/${bill._id}`);
                            } else {
                              navigate("/auth", {
                                state: { from: `/bills/${bill._id}` },
                              });
                            }
                          }}
                          className="mt-4 w-full inline-flex items-center justify-center gap-1 text-sm font-medium text-white bg-green-600 px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          See Details
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="md:col-span-2 lg:col-span-3 text-center text-gray-500 py-20 flex flex-col items-center"
                  >
                    <SearchX className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold">No Bills Found</h3>
                    <p>
                      No bills were found in the "{selectedCategory}" category.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ----- Right column: Add bill form --- */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-1"
        >
          <div className="bg-white p-5 pr-0 rounded-2xl shadow-xl border border-gray-100 sticky top-10">
            <div className="flex items-center gap-3 mb-4 pt-2">
              <div className="p-2 bg-green-100 rounded-full">
                <PlusCircle className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Add New Bill
              </h3>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 lg:max-h-[70vh] lg:overflow-y-auto lg:p-2"
            >
              <InputField
                label="Bill Title"
                name="title"
                value={newBillForm.title}
                onChange={handleFormChange}
                placeholder="e.g., Gas Bill - May 2025"
                required
              />
              <InputField
                label="Billing Email"
                name="email"
                type="email"
                icon={Mail}
                value={newBillForm.email}
                onChange={handleFormChange}
                placeholder="payment@titas.com"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Category"
                  name="category"
                  value={newBillForm.category}
                  onChange={handleFormChange}
                  options={[
                    { value: "gas", label: "Gas" },
                    { value: "electricity", label: "Electricity" },
                    { value: "water", label: "Water" },
                    { value: "internet", label: "Internet" },
                  ]}
                  required
                />
                <InputField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={newBillForm.amount}
                  onChange={handleFormChange}
                  placeholder="e.g., 500"
                  required
                />
              </div>
              <InputField
                label="Location"
                name="location"
                value={newBillForm.location}
                onChange={handleFormChange}
                placeholder="e.g., Mirpur-10, Dhaka"
                required
              />
              <InputField
                label="Image URL"
                name="image"
                value={newBillForm.image}
                onChange={handleFormChange}
                placeholder="https://..."
              />
              <InputField
                label="Bill Date"
                name="date"
                type="date"
                value={newBillForm.date}
                onChange={handleFormChange}
                required
              />
              <TextAreaField
                label="Description"
                name="description"
                value={newBillForm.description}
                onChange={handleFormChange}
                placeholder="A short description of the bill..."
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isSubmitting ? "Adding..." : "Add Bill"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper Form Components

const InputField = ({ label, icon: Icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        {...props}
        className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 ${
          Icon ? "pl-10" : ""
        }`}
      />
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      )}
    </div>
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      {...props}
      rows="3"
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
    ></textarea>
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <select
        {...props}
        className="appearance-none w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 pr-10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  </div>
);
