import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">OIMS</h3>
            <p className="text-gray-300">
              Your one-stop solution for comprehensive inventory management and
              business operations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Inventory Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Order Tracking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Analytics Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Supplier Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Reporting Tools
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MdLocationOn className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  123 Business Ave, Suite 500, Kabul , KA 10001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <MdEmail className="text-blue-400" />
                <a
                  href="mailto:info@oims.com"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  info@oims.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MdPhone className="text-blue-400" />
                <a
                  href="tel:0700707077"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  0700 707 077
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-700">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} OIMS by Doogle. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
