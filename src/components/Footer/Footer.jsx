import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#F5F7EF] text-[#1E2631]">
      {/* -----Top: Logo Left, Social Right----- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="flex items-center justify-between">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2">
              <span className="brand-logo">B</span>
              <span className="text-2xl font-semibold tracking-tight">
                BillEase
              </span>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <p className="text-sm text-[#1E2631]/70 ml-6">
                BillEase helps you view, track, and pay your monthly utility
                bills securely in one place.
              </p>
            </div>
          </div>

          {/* socials */}
          <div className="hidden sm:flex items-center gap-3 text-[#1E2631]/80">
            <a href="#" className="btn-social group">
              <FaFacebookF className="btn-social-icon" />
            </a>

            <a href="#" className="btn-social group">
              <FaXTwitter className="btn-social-icon" />
            </a>

            <a href="#" className="btn-social group">
              <FaInstagram className="btn-social-icon" />
            </a>

            <a href="#" className="btn-social group">
              <FaPinterestP className="btn-social-icon" />
            </a>
          </div>
        </div>
        <hr className="mt-6 border-[#1E2631]/10" />
      </div>

      {/* -----Middle: Contact, Links, Newsletter----- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact US</h4>
          <div className="space-y-4">
            {/* phone */}
            <div className="group flex items-center gap-3">
              <span className="icon-box">
                <FiPhone className="opacity-80" />
              </span>
              <p className="text-sm opacity-80">+880 123 456 7890</p>
            </div>
            {/* address */}
            <div className="group flex items-center gap-3">
              <span className="icon-box">
                <FiMapPin className="opacity-80" />
              </span>
              <p className="text-sm opacity-80">Mirpur-10, Dhaka, Bangladesh</p>
            </div>
            {/* email */}
            <div className="group flex items-center gap-3">
              <span className="icon-box">
                <FiMail className="opacity-80" />
              </span>
              <p className="text-sm opacity-80">support@billease.app</p>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-3 text-sm text-[#1E2631]/80">
            {[
              { to: "/", label: "Home" },
              { to: "/bills", label: "All Bills" },
              { to: "/my-bills", label: "My Pay Bills" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className="inline-block transition-all duration-300 ease-out hover:text-green-700 hover:translate-x-1 hover:scale-105"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Service */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Service</h4>
          <ul className="space-y-3 text-sm text-[#1E2631]/80">
            {["Electricity", "Gas", "Water", "Internet", "Financial"].map(
              (item) => (
                <li
                  key={item}
                  className="transition-all duration-300 ease-out hover:text-green-700 hover:translate-x-1 hover:scale-105"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-sm opacity-80 mb-4">
            Get monthly updates about bills, payments, and new features.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: wire to backend or email service
            }}
            className="space-y-4"
          >
            <div
              className="rounded-full bg-white shadow-sm flex items-center
                            px-4 py-3 transition focus-within:shadow-md"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 outline-none bg-transparent text-sm"
              />
            </div>

            <button type="submit" className="btn-primary">
              SUBSCRIBE NOW
            </button>
          </form>
        </div>
      </div>

      {/* -----Bottom: Copyright & Other Links----- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <hr className="border-[#1E2631]/10 mb-4" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#1E2631]/60">
          <p>© {new Date().getFullYear()} BillEase — All Rights Reserved</p>
          <div className="hidden md:flex gap-6">
            <NavLink
              to="/terms-conditions"
              className="transition hover:text-green-700"
            >
              Terms & Conditions
            </NavLink>
            <NavLink
              to="/privacy-policy"
              className="transition hover:text-green-700"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/help-center"
              className="transition hover:text-green-700"
            >
              Help Center
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
