import React from "react";
import { LuNewspaper } from "react-icons/lu";

const NewsSection = () => {
  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* -----Left Side----- */}
          <div className="lg:col-span-5">
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
                Latest News
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1E2631] mt-2">
                News & Update
              </h2>
            </div>

            <div className="mt-8 space-y-8">
              {/* item 1 */}
              <article className="border-b pb-8">
                <p className="text-sm text-gray-500 mb-2">23 Nov, 2024</p>
                <h3 className="text-xl font-semibold text-[#1E2631] leading-snug flex">
                  <span className="w-1 bg-orange-500 rounded mr-3" />
                  Outdoor Meter Reading Goes Smart
                </h3>
                <p className="text-gray-600 mt-3">
                  We’re rolling out smart meter sync for electricity & gas, so
                  your bills auto-update without manual input…
                </p>
              </article>

              {/* item 2 */}
              <article>
                <p className="text-sm text-gray-500 mb-2">14 Nov, 2024</p>
                <h3 className="text-xl font-semibold text-[#1E2631] leading-snug flex">
                  <span className="w-1 bg-orange-500 rounded mr-3" />
                  New Due-Date Alerts & Grace Period Window
                </h3>
                <p className="text-gray-600 mt-3">
                  Enable reminders and set a grace period to avoid late fees.
                  Configure it in Settings → Notifications…
                </p>
              </article>
            </div>
          </div>

          {/* -----Right Side----- */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* card 1 */}
            <article className="group">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg"
                  alt="Kitchen electricity safety"
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">14 Nov, 2024</p>
                <h3 className="text-2xl font-semibold text-[#1E2631] leading-tight mt-1">
                  How to Get Electricity to a Kitchen Island
                </h3>
                <p className="text-gray-600 mt-2">
                  Electricity is arguably the most valuable resource we have in
                  our modern society. Without proper routing and safety…
                </p>
                <a
                  href="#"
                  className="inline-block mt-3 text-green-700 font-medium transition hover:translate-x-1"
                >
                  Read More
                </a>
              </div>
            </article>

            {/* card 2 */}
            <article className="group">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg"
                  alt="Landscape lighting tips"
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">09 Nov, 2024</p>
                <h3 className="text-2xl font-semibold text-[#1E2631] leading-tight mt-1">
                  Landscape Lighting that Boosts Home Value
                </h3>
                <p className="text-gray-600 mt-2">
                  Plan circuits, pick energy-efficient fixtures, and use timers
                  to keep utility costs low while improving curb appeal…
                </p>
                <a
                  href="#"
                  className="inline-block mt-3 text-green-700 font-medium transition hover:translate-x-1"
                >
                  Read More
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsSection;
