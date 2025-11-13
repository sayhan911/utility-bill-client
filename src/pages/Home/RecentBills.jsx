import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { LuNewspaper } from "react-icons/lu";
import AuthContext from "../../provider/AuthContext";

export default function RecentBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("https://utility-bill-server-eight.vercel.app/recent-bills")
      .then((res) => res.json())
      .then((data) => alive && setBills(Array.isArray(data) ? data : []))
      .catch((e) => console.error("Recent bills error:", e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  //   Loading Skeleton
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-extrabold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
          Recent Bills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg animate-pulse"
            >
              <div className="h-6 w-4/5 bg-linear-to-r from-gray-200 to-gray-100 rounded-lg mb-4" />
              <div className="h-4 w-3/5 bg-linear-to-r from-gray-200 to-gray-100 rounded mb-3" />
              <div className="h-3 w-1/2 bg-linear-to-r from-gray-200 to-gray-100 rounded mb-2" />
              <div className="h-3 w-2/5 bg-linear-to-r from-gray-200 to-gray-100 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex justify-between items-center">
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
            Recent Bills
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-5 font-semibold text-[#1E2631] mt-2">
            Pay Your <span className="text-green-700">Bills</span> Now!
          </h2>
        </div>
        <Link to={"/bills"}>
          <button className="btn-secondary">Explore All Bills</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bills.map((bill, idx) => (
          <BillCard key={bill._id || bill.id || idx} bill={bill} index={idx} />
        ))}
      </div>
    </section>
  );
}

// Card Design
function BillCard({ bill, index }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setShow(true), index * 100);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  const handleSeeDetails = () => {
    if (user) {
      navigate(`/bills/${bill._id}`);
    } else {
      navigate("/auth", {
        state: { from: `/bills/${bill._id}` },
      });
    }
  };

  return (
    <article
      ref={ref}
      className={`
        group p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/30 shadow-xl
        transition-all duration-700 will-change-transform hover:shadow-2xl hover:shadow-emerald-500/20
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        hover:-translate-y-2 hover:scale-[1.02] cursor-pointer
      `}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Top Gradient Bar  */}
      <div className="h-1 w-full bg-linear-to-r from-green-500 to-emerald-500 rounded-t-xl mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-green-700 transition-colors">
        {bill?.title}
      </h3>

      <div className="mt-4 space-y-2 text-sm">
        <p className="flex items-center gap-2 text-gray-600">
          <Tag className="w-4 h-4 text-green-600" />
          <span className="font-medium">
            {bill?.category || "Uncategorized"}
          </span>
        </p>
        <p className="flex items-center gap-2 text-gray-500">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>{bill?.location || "Location not specified"}</span>
        </p>
        <p className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4 text-lime-600" />
          <span>{bill?.date || "No date"}</span>
        </p>
      </div>

      <button
        onClick={handleSeeDetails}
        className={`
          mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30
          transform transition-all duration-300 active:scale-95`}
      >
        See Details
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </article>
  );
}
