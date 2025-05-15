import React from "react";
import "./Features.css";
import { Link } from "react-router-dom";
import Aurora from "./Aurora";
import { FaTruck, FaBell, FaBookOpen } from "react-icons/fa";
const Features = () => {
  return (
    <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Features
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
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full z-20 bg-blue-500 w-20 h-20 flex items-center justify-center mx-auto p-3">
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
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full z-20 bg-blue-500 w-20 h-20 flex items-center justify-center mx-auto p-3">
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
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full z-20 bg-blue-500 w-20 h-20 flex items-center justify-center mx-auto p-3">
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
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Features;

// <div className="w-full vh-100 bg-gray-100 top-container">
//   <div className="title">
//     <h1>Features</h1>
//   </div>

//   <div className="cards">
//     <div className="card">
//       <div className="circle bg-red-500"></div>
//       <h3 className="cardTitle">
//         Real-Time <br /> <span>Inventory Tracking</span>
//       </h3>
//       <p>
//         Keep track of stock levels instantly as items are added, sold, or
//         updated.
//       </p>
//     </div>
//     <div className="card">
//       <div className="circle bg-blue-600"></div>
//       <h3 className="cardTitle">
//         Stock Alerts & <br /> <span>Notifications</span>
//       </h3>
//       <p>
//         Get automatic alerts when items are low or out of stock to avoid
//         disruptions.
//       </p>
//     </div>
//     <div className="card">
//       <div className="circle bg-green-500"></div>
//       <h3 className="cardTitle">
//         Sales & Order <br /> <span>Management</span>
//       </h3>
//       <p>
//         Easily manage customer orders and view detailed sales history in one
//         place.
//       </p>
//     </div>
//   </div>
//   <Link className="btn btn-primary btn-lg">get Started</Link>
// </div>

// <div className="w-full min-h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
//   <div className="text-center mb-12">
//     <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
//       Features
//     </h1>
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
//     {/* Card 1 */}
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-16">
//       <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full">
//         <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto"></div>
//       </div>
//       <h3 className="text-xl md:text-2xl font-semibold text-center mb-4 mt-4">
//         Real-Time <br />{" "}
//         <span className="text-gray-600">Inventory Tracking</span>
//       </h3>
//       <p className="text-gray-700 text-center">
//         Keep track of stock levels instantly as items are added, sold, or
//         updated.
//       </p>
//     </div>

//     {/* Card 2 */}
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-16">
//       <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full">
//         <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto"></div>
//       </div>
//       <h3 className="text-xl md:text-2xl font-semibold text-center mb-4 mt-4">
//         Stock Alerts & <br />{" "}
//         <span className="text-gray-600">Notifications</span>
//       </h3>
//       <p className="text-gray-700 text-center">
//         Get automatic alerts when items are low or out of stock to avoid
//         disruptions.
//       </p>
//     </div>

//     {/* Card 3 */}
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-16">
//       <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full">
//         <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto"></div>
//       </div>
//       <h3 className="text-xl md:text-2xl font-semibold text-center mb-4 mt-4">
//         Sales & Order <br />{" "}
//         <span className="text-gray-600">Management</span>
//       </h3>
//       <p className="text-gray-700 text-center">
//         Easily manage customer orders and view detailed sales history in one
//         place.
//       </p>
//     </div>
//   </div>

//   <div className="text-center ">
//     <Link
//       to="/register"
//       className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
//     >
//       Get Started
//     </Link>
//   </div>
// </div>
