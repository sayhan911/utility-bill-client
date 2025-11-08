import { useState } from "react";
import { NavLink } from "react-router";

import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const guestLinks = [
    { to: "/", label: "Home" },
    { to: "/bills", label: "Bills" },
    { to: "/auth/login", label: "Login" },
    { to: "/auth/register", label: "Register" },
  ];

  const authedLinks = [
    { to: "/", label: "Home" },
    { to: "/bills", label: "Bills" },
    { to: "/my-bills", label: "My Pay Bills" },
  ];

  const links = isLoggedIn ? authedLinks : guestLinks;

  const closeMenu = () => setOpen(false);

  const LinkItem = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={closeMenu}
      className={({ isActive }) =>
        `inline-block px-2 py-1 transition-all duration-300 ease-out
         hover:text-green-700 hover:scale-105
         ${isActive ? "text-green-700 font-semibold" : "text-gray-700"}`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="bg-white/90 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="brand-logo">B</span>
          <span className="text-2xl font-semibold text-gray-800">BillEase</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <LinkItem key={l.to} to={l.to}>
              {l.label}
            </LinkItem>
          ))}

          {/* Auth-area (right) */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/40?img=5"
                alt="Profile"
                className="h-9 w-9 rounded-full border"
              />
              <button
                onClick={() => setIsLoggedIn(false)}
                className="btn-primary text-sm px-4 py-2"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-[max-height] duration-300 ease-out overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col gap-3 border-t bg-white">
          {links.map((l) => (
            <LinkItem key={l.to} to={l.to}>
              {l.label}
            </LinkItem>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=5"
                  alt="Profile"
                  className="h-9 w-9 rounded-full border"
                />
                <span className="text-sm text-gray-700">You</span>
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  closeMenu();
                }}
                className="btn-primary text-sm px-4 py-2"
              >
                Logout
              </button>
            </div>
          ) : null}

          {/* demo toggle to preview states – remove later */}
          <button
            onClick={() => setIsLoggedIn((v) => !v)}
            className="text-xs text-gray-500 underline self-start mt-2"
          >
            Toggle login state (demo)
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
