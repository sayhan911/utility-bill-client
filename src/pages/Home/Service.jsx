import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { MdEditNote, MdSupportAgent } from "react-icons/md";
import { TbCertificate2 } from "react-icons/tb";

const Service = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* -----Left Side----- */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <div className="h-56 md:h-[220px] lg:h-60 rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm flex">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl border-2 border-green-700 grid place-items-center shrink-0">
                  <TbCertificate2 className="text-green-700" size={30} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1E2631]">
                    5+ Years of Reliability
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Trusted utility billing platform with secure payments and
                    smooth tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* video/thumb card — same height as left */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative h-56 md:h-[220px] lg:h-60 rounded-3xl overflow-hidden">
              <img
                src="https://i.postimg.cc/L4yr5F3X/pexels-photo-7657475.jpg"
                alt="Managing utilities on the go"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Play overview video"
                className="absolute inset-0 m-auto h-12 w-12 md:h-14 md:w-14 grid place-items-center rounded-full bg-green-700/90 text-white backdrop-blur hover:bg-green-600 transition"
              >
                <FaPlay className="pl-1" size={20} />
              </button>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-yellow-400" />
            </div>
          </div>

          {/* wide image */}
          <div className="col-span-12">
            <figure className="rounded-3xl overflow-hidden h-56 md:h-64 lg:h-72">
              <img
                src="https://i.postimg.cc/tCZmgZgB/pexels-photo-7657354.jpg"
                alt="Team reviewing billing insights"
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
        </div>

        {/* -----Right Side----- */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 ml-2">
            <FaUserPen className="text-green-700" />
            <p className="section-title">About BillEase</p>
          </div>

          {/* headline */}
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight text-[#0f172a]">
            Complete bill management for{" "}
            <span className="text-green-700">every need</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Pay and track your electricity, gas, water, and internet bills in
            one dashboard—securely, quickly, and without missed due dates.
          </p>

          {/* features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-8">
            {/* left feature */}
            <div className="flex items-start gap-4 pr-6">
              <MdEditNote className="text-green-700" size={50} />
              <div>
                <h3 className="text-xl font-semibold text-[#1E2631]">
                  Unified Dashboard
                </h3>
                <p className="text-gray-600 mt-2">
                  All utilities in one place with reminders, history, and
                  filters.
                </p>
              </div>
            </div>

            {/* right feature */}
            <div className="flex items-start gap-4 md:pl-6 md:border-l md:border-gray-200">
              <MdSupportAgent className="text-green-700" size={50} />
              <div>
                <h3 className="text-xl font-semibold text-[#1E2631]">
                  24/7 Support
                </h3>
                <p className="text-gray-600 mt-2">
                  Round-the-clock help for payments, disputes, and account
                  issues.
                </p>
              </div>
            </div>
          </div>
          <div className="h-1/5 flex items-end mt-0 md:mt-5">
            <button className="btn-primary">Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
