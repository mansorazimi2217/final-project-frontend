import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ toggleSidebar, isSellPage }) => {
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsMenuOpen(false);
    navigate("/login");
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-4 md:px-8 border-b border-gray-100">
      <div className="flex items-center gap-4">
        {/* Hamburger Button with Animation */}
        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-600 hover:text-[#006EBD] focus:outline-none transition-all md:hidden"
          aria-label="Toggle menu"
        >
          {!isSellPage && <FaBars size={20} />}
        </motion.button>

        {/* Logo with Interactive Effects */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          // className={`hidden md:block ${isSellPage && "block"} `}
          className={`${isSellPage ? "block" : "hidden md:block"}`}
        >
          <Link
            style={{ textDecoration: "none" }}
            to="/dashboard"
            className="relative group"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-[#006EBD] tracking-tight flex items-center"
            >
              <motion.span
                className="inline-block bg-[#006EBD] text-white px-2 py-1 rounded mr-2"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                O
              </motion.span>
              <span className="relative">
                IMS
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-[#006EBD] w-0 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </span>
            </motion.span>

            {/* Subtle glow effect on hover */}
            <motion.span
              className="absolute inset-0 rounded-lg bg-[#006EBD]/10 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </Link>
        </motion.div>
      </div>
      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="hidden sm:block"
        >
          <motion.div
            whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.98 }}
            className="text-[#000] font-medium text-sm bg-gray-50 px-4 py-1.5 rounded-full
                border border-gray-200 shadow-xs cursor-default transition-all
                flex items-center gap-2 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600 group-hover:text-gray-500 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="truncate max-w-[160px]">{user.businessName}</span>

            {/* Optional tooltip for long business names */}
            {user.businessName.length > 20 && (
              <div className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs bg-gray-800 text-white rounded whitespace-nowrap">
                {user.businessName}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      <div ref={menuRef} className="relative flex items-center gap-4">
        {user && (
          <motion.span
            className="hidden sm:block text-sm text-[#000]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {user.email}
          </motion.span>
        )}

        <motion.div
          whileHover={{
            scale: 1.1,
            boxShadow: "0 4px 12px rgba(0, 110, 189, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          className="relative w-10 h-10 flex items-center justify-center bg-[#006EBD] text-white font-bold rounded-full cursor-pointer hover:bg-[#0059a1] transition-all"
        >
          {user && (
            <span className="text-lg font-medium">
              {user.email[0].toUpperCase()}
            </span>
          )}

          {isMenuOpen && (
            <motion.span
              className="absolute inset-0 border-2 border-[#006EBD] rounded-full animate-ping opacity-75"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute right-0 top-12 mt-1 w-56 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
            >
              {/* User info card */}
              <motion.div
                className="px-4 py-3 bg-gradient-to-r from-[#006EBD]/5 to-[#006EBD]/10 border-b border-gray-100"
                whileHover={{ x: 2 }}
              >
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-gray-600 mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 20 20"
                    fill="#006EBD"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {user.businessName}
                </p>
              </motion.div>

              <div className="py-1">
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(0, 110, 189, 0.08)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 flex items-center gap-3 transition-all"
                >
                  <div className="p-1.5 bg-[#006EBD]/10 rounded-lg">
                    <FaUserCog className="text-[#006EBD] text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <span>Profile Settings</span>
                    <span className="text-xs text-gray-400">
                      Update your account
                    </span>
                  </div>
                </motion.button>

                <motion.button
                  onClick={handleLogout}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(239, 68, 68, 0.08)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 text-left text-sm text-red-600 flex items-center gap-3 transition-all border-t border-gray-100"
                >
                  <div className="p-1.5 bg-red-100 rounded-lg">
                    <FaSignOutAlt className="text-red-600 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <span>Logout</span>
                    <span className="text-xs text-gray-400">
                      Sign out of your account
                    </span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
