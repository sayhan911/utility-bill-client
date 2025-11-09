import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FiArrowRight, FiDroplet, FiPlus, FiWifi, FiZap } from "react-icons/fi";
import { IoBulbOutline } from "react-icons/io5";

const Category = () => {
  return (
    <div className="bg-linear-to-br from-purple-100/70 via-yellow-50 to-red-50">
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* -----Left Side----- */}
          <div className="lg:col-span-5">
            <div className="rounded-[28px] p-8 md:p-10 bg-linear-to-br from-green-100/70 via-green-50 to-transparent shadow-lg">
              <p className="section-title">
                <IoBulbOutline />
                <span className="pt-0.5">Our features</span>
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight text-[#111827]">
                Harness Your Utility Bills With
                <br /> Clear, Simple Management!
              </h2>

              <p className="mt-5 text-base text-gray-600 leading-relaxed">
                Keep all your monthly utilities organized — Electricity, Gas,
                Water, and Internet — with fast filtering and current-month
                payment.
              </p>

              <button type="button" className="btn-secondary">
                Read More <FiPlus />
              </button>
            </div>
          </div>

          {/* -----Right Side----- */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="category-card">
              <div className="flex items-center gap-4">
                <span className="h-14 w-14 rounded-full bg-green-600 grid place-items-center">
                  <FiZap className="text-white text-2xl" />
                </span>
                <h3 className="text-xl font-semibold text-[#111827]">
                  Electricity
                </h3>
              </div>
              <p className="mt-4 text-sm text-gray-600 h-1/3">
                Track usage and pay your electricity bills on time.
              </p>
              <button
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium
                           hover:text-green-700 hover:translate-x-1 transition-all duration-300"
              >
                Read More <FaArrowRight />
              </button>
            </div>

            {/* Card 2 */}
            <div className="category-card">
              <div className="flex items-center gap-4">
                <span className="h-14 w-14 rounded-full bg-green-600 grid place-items-center">
                  <FaFireFlameCurved className="text-white text-2xl" />
                </span>
                <h3 className="text-xl font-semibold text-[#111827]">Gas</h3>
              </div>
              <p className="mt-4 text-sm text-gray-600 h-1/3">
                Keep up with gas charges and payment history.
              </p>
              <button
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium
                           hover:text-green-700 hover:translate-x-1 transition-all duration-300"
              >
                Read More <FaArrowRight />
              </button>
            </div>

            {/* Card 3 */}
            <div className="category-card">
              <div className="flex items-center gap-4">
                <span className="h-14 w-14 rounded-full bg-green-600 grid place-items-center">
                  <FiDroplet className="text-white text-2xl" />
                </span>
                <h3 className="text-xl font-semibold text-[#111827]">Water</h3>
              </div>
              <p className="mt-4 text-sm text-gray-600 h-1/3">
                Manage monthly water bills without the hassle.
              </p>
              <button
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium
                           hover:text-green-700 hover:translate-x-1 transition-all duration-300"
              >
                Read More <FaArrowRight />
              </button>
            </div>

            {/* Card 4 */}
            <div className="category-card">
              <div className="flex items-center gap-4">
                <span className="h-14 w-14 rounded-full bg-green-600 grid place-items-center">
                  <FiWifi className="text-white text-2xl" />
                </span>
                <h3 className="text-xl font-semibold text-[#111827]">
                  Internet
                </h3>
              </div>
              <p className="mt-4 text-sm text-gray-600 h-1/3">
                Organize ISP invoices and stay connected.
              </p>
              <button
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium
                           hover:text-green-700 hover:translate-x-1 transition-all duration-300"
              >
                Read More <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
