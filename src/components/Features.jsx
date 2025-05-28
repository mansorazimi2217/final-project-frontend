import React from "react";
import "./Features.css";
import { Link } from "react-router-dom";
import Aurora from "./Aurora";
import { FaTruck, FaBell, FaBookOpen } from "react-icons/fa";
const Features = () => {
  return (
    <div
      className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8"
      id="features"
    >
      <div className="container mx-auto px-6 text-center flex justify-center items-center mb-8">
        <h1
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#006EBD] leading-tight flex items-center gap-3 cursor-default select-none"
        >
          <svg
            className="w-7 h-7 text-[#006EBD] animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 2C8 7 3 9 3 13a5 5 0 0010 0c0-4-1-7-1-11zM12 22c4-5 9-7 9-11a5 5 0 00-10 0c0 4 1 7 1 11z" />
          </svg>
          Features
          <svg
            className="w-7 h-7 text-[#006EBD] animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 2C8 7 3 9 3 13a5 5 0 0010 0c0-4-1-7-1-11zM12 22c4-5 9-7 9-11a5 5 0 00-10 0c0 4 1 7 1 11z" />
          </svg>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 max-w-6xl mx-auto mb-20">
        <div className="bg-white/50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-20 min-h-[350px] flex flex-col overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
            <Aurora
              colorStops={["#ff2a6d", "#ff7b00", "#ffd300"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full z-20 bg-[#006EBD] w-20 h-20 flex items-center justify-center mx-auto p-3">
            <FaTruck className="text-[#fff] text-3xl" />
          </div>
          <div className="relative z-10 mt-20">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6 mt-4">
              Real-Time <br />{" "}
              <span className="text-gray-600">Inventory Tracking</span>
            </h3>
            <p className="text-gray-700 text-center text-lg flex-grow">
              Keep track of stock levels instantly as items are added, sold, or
              updated.
            </p>
          </div>
        </div>
        <div className="bg-white/50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-20 min-h-[350px] flex flex-col overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
            <Aurora
              colorStops={["#00f0ff", "#ff00e6", "#ffcc00"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full z-20 bg-[#006EBD] w-20 h-20 flex items-center justify-center mx-auto p-3">
            <FaBell className="text-[#fff] text-3xl" />
          </div>

          <div className="relative z-10 mt-20">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6 mt-4">
              Stock Alerts & <br />{" "}
              <span className="text-gray-600">Notifications</span>
            </h3>
            <p className="text-gray-700 text-center text-lg flex-grow">
              Get automatic alerts when items are low or out of stock to avoid
              disruptions.
            </p>
          </div>
        </div>
        <div className="bg-white/50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-20 min-h-[350px] flex flex-col overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
            <Aurora
              colorStops={["#3b82f6", "#8b5cf6", "#ec4899"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full z-20 bg-[#006EBD] w-20 h-20 flex items-center justify-center mx-auto p-3">
            <FaBookOpen className="text-[#fff] text-3xl" />
          </div>

          <div className="relative z-10 mt-20">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6 mt-4">
              Sales & Order <br />{" "}
              <span className="text-gray-600">Management</span>
            </h3>
            <p className="text-gray-700 text-center text-lg flex-grow">
              Easily manage customer orders and view detailed sales history in
              one place.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/register"
          className="inline-block bg-[#006EBD] hover:bg-[#006EBD] text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Features;
