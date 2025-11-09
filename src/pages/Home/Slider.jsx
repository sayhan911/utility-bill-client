import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const slides = [
  {
    img: "https://i.postimg.cc/3NSDrnq7/pexels-photo-6328856.jpg",
    kicker: "SMART BILL MANAGEMENT",
    title: "Simplify Your Monthly",
    outline: "Utility Payments",
    desc: "Pay your electricity, gas, water, and internet bills—all from one secure dashboard. No queues. No missed deadlines.",
    cta: "Pay Now",
    href: "/bills",
  },
  {
    img: "https://images.pexels.com/photos/7657728/pexels-photo-7657728.jpeg",
    kicker: "STAY ORGANISED & IN CONTROL",
    title: "Track, View & Manage",
    outline: "All Your Bills",
    desc: "BillEase gives you complete control with reminders, transaction history, and categorized summaries—so you never miss a payment.",
    cta: "View Bills",
    href: "/bills",
  },
  {
    img: "https://i.postimg.cc/WzHhctDR/pexels-photo-920382.jpg",
    kicker: "SECURE & RELIABLE PLATFORM",
    title: "Experience the Future of",
    outline: "Online Billing",
    desc: "Enjoy safe payments and real-time updates. BillEase ensures your data stays encrypted and your payments are always protected.",
    cta: "Get Started",
    href: "/bills",
  },
];

export default function Slider() {
  return (
    <section className="py-6 mx-10">
      <div className="relative">
        {/* Prev button */}
        <div className="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
          <div className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] bg-white rounded-full -left-2 sm:-left-3 md:-left-4 top-1/2 -translate-y-1/2 -z-10" />
          <button className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-green-600 text-white grid place-items-center shadow-md sm:shadow-lg hover:bg-violet-600 active:scale-95 transition-all duration-200">
            <FaArrowLeft className="text-sm sm:text-base md:text-lg" />
          </button>
        </div>

        {/* Next button */}
        <div className="swiper-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
          <div className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] bg-white rounded-full -right-2 sm:-right-3 md:-right-4 top-1/2 -translate-y-1/2 -z-10" />
          <button className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-green-600 text-white grid place-items-center shadow-md sm:shadow-lg hover:bg-violet-600 active:scale-95 transition-all duration-200">
            <FaArrowRight className="text-sm sm:text-base md:text-lg" />
          </button>
        </div>

        <div className="rounded-[28px] md:rounded-4xl lg:rounded-[36px] overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{ prevEl: ".swiper-prev", nextEl: ".swiper-next" }}
            pagination={{ clickable: true }}
            className="pb-9! h-[420px] md:h-[520px] lg:h-[620px]"
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i} className="h-full relative overflow-hidden">
                <div className="relative h-full">
                  {/* Add smooth zoom effect */}
                  <img
                    src={s.img}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover animate-zoom"
                  />
                  <div className="absolute inset-0 bg-[#0b1020]/60" />

                  <div className="relative z-10 max-w-7xl mx-auto px-10 lg:px-16 py-16 h-full flex items-center text-white">
                    <div className="max-w-3xl">
                      <p className="uppercase tracking-wide text-xs md:text-sm text-white/80 mb-3">
                        {s.kicker}
                      </p>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                        {s.title}{" "}
                        <span className="[color:transparent] [-webkit-text-stroke:1.5px_rgba(255,255,255,0.6)] block">
                          {s.outline}
                        </span>
                      </h2>
                      <p className="mt-5 mb-8 text-white/85 max-w-2xl">
                        {s.desc}
                      </p>
                      <a href={s.href} className="btn-primary">
                        {s.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Smooth zoom keyframes */}
      <style>
        {`
          @keyframes zoomIn {
            0%   { transform: scale(1); }
            100% { transform: scale(1.12); }
          }
          .animate-zoom {
            animation: zoomIn 6s ease-in-out infinite alternate;
            transform-origin: center;
          }
        `}
      </style>
    </section>
  );
}
