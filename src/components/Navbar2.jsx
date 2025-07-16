import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProfessionalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && window.innerWidth >= 1024) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "#home" },
    { name: "Features", path: "#features" },
    { name: "Solutions", path: "#about" },
    { name: "comments", path: "#comments" },
    { name: "Contact", path: "#footer" },
  ];

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled && window.innerWidth >= 1024
            ? "bg-white shadow-md py-2"
            : "bg-white/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              className="flex items-center space-x-2 no-underline"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-[#006EBD] to-[#0091EA] bg-clip-text text-transparent">
                OIMS
              </span>
              <span className="text-xs font-medium bg-[#E6F2FA] text-[#006EBD] px-2 py-1 rounded-full">
                PRO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  style={{ textDecoration: "none" }}
                  key={item.name}
                  href={item.path}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#006EBD] hover:bg-[#E6F2FA] rounded-lg transition"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                style={{ textDecoration: "none" }}
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#006EBD] transition"
              >
                Sign In
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#006EBD] to-[#0091EA] rounded-lg shadow hover:shadow-md hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button (now visible on md and below) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#006EBD] focus:outline-none focus:ring-2 focus:ring-[#006EBD]"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[80vw] z-[100] bg-white shadow-xl transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="pt-6 px-6 flex flex-col justify-between h-full overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-6">
              <Link
                style={{ textDecoration: "none" }}
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-[#006EBD] to-[#0091EA] bg-clip-text text-transparent">
                  OIMS
                </span>
                <span className="text-xs font-medium bg-[#E6F2FA] text-[#006EBD] px-2 py-1 rounded-full">
                  PRO
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-[#006EBD]"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  style={{ textDecoration: "none" }}
                  className="block text-base font-medium text-gray-700 hover:text-[#006EBD] hover:bg-[#E6F2FA] px-4 py-2 rounded-lg transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 mt-6 mb-3">
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              className="block w-full text-center text-[#006EBD] font-medium px-4 py-3 rounded-lg hover:bg-[#E6F2FA] transition"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="/register"
              className="block w-full mt-2 text-center text-white font-medium bg-gradient-to-r from-[#006EBD] to-[#0091EA] px-4 py-3 rounded-lg shadow hover:opacity-90 transition"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default ProfessionalNavbar;
