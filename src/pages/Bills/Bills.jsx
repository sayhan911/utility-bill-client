import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, SearchX } from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";

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

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    fetch("http://localhost:3000/bills")
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

    const url = "http://localhost:3000/bills";
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="relative">
          {/* dots */}
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
            All Bills
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1E2631] mt-2">
            Browse All <span className="text-green-700">Bills</span> Easily.
          </h2>
        </div>

        {/* -----Category Dropdown----- */}
        <div className="mt-4 sm:mt-0">
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
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-md animate-pulse"
            >
              <div className="h-48 w-full bg-gray-200 rounded-lg mb-4" />
              <div className="h-5 w-1/3 bg-gray-200 rounded-full mb-3" />
              <div className="h-6 w-3-4 bg-gray-200 rounded-lg mb-4" />
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                      src={bill.image || "https://via.placeholder.com/400x250"}
                      alt={bill.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col grow">
                    <div className="grow">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-2">
                        {bill.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
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
                      onClick={() => handleNavigate(`/bills/${bill._id}`)}
                      className="mt-4 w-full inline-flex items-center justify-center gap-1 text-sm font-medium text-white bg-green-600 px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      See Details →
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-gray-500 py-20 flex flex-col items-center"
              >
                <SearchX className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold">No Bills Found</h3>
                <p>No bills were found in the "{selectedCategory}" category.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
