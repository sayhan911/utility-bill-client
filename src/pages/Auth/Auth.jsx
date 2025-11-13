// src/pages/Auth/Auth.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottie/login.json";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const goToLogin = () => {
    navigate("/login", { state: { from } });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-64 h-64 mx-auto mb-6">
          <Lottie
            animationData={loginAnimation}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Login Required
        </h2>
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          You need to log in to view bill details.
        </p>
        {/* buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToLogin}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold rounded-xl px-6 py-3 shadow-md hover:bg-green-700 transition-all"
          >
            Go to Login
            <FaArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goBack}
            className="w-full inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-green-700 font-semibold rounded-xl px-6 py-3 shadow-md hover:bg-gray-50 transition-all"
          >
            <FaArrowLeft className="w-4 h-4" />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
