// import React from "react";
// import "./About.css";
// import img1 from "../assets/regsiter.jpg";
// import img2 from "../assets/why02.jpg";

// const About = () => {
//   return (
//     <div className="w-full bg-gray-100 py-12 md:py-16">
//       <div className="w-fullcontainer mx-auto px-4 md:px-6 lg:px-8 mb-12 md:mb-16 text-center flex justify-center items-center">
//         <h1
//           style={{ fontFamily: "'Montserrat', sans-serif", color: "#006EBD" }}
//           className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#006EBD] mb-4 leading-tight flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-105 hover:text-blue-600"
//         >
//           <svg
//             className="w-8 h-8 text-[#006EBD] transition-transform duration-500 hover:animate-pulse"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//             aria-hidden="true"
//           >
//             <path d="M12 2C8 7 3 9 3 13a5 5 0 0010 0c0-4-1-7-1-11zM12 22c4-5 9-7 9-11a5 5 0 00-10 0c0 4 1 7 1 11z" />
//           </svg>
//           Why we built this
//           <svg
//             className="w-8 h-8 text-[#006EBD] transition-transform duration-500 hover:animate-pulse"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//             aria-hidden="true"
//           >
//             <path d="M12 2C8 7 3 9 3 13a5 5 0 0010 0c0-4-1-7-1-11zM12 22c4-5 9-7 9-11a5 5 0 00-10 0c0 4 1 7 1 11z" />
//           </svg>
//         </h1>
//       </div>

//       <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
//         <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
//           <div className="lg:w-1/2">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//               Empowering Store Owners
//             </h2>
//             <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//               We aim to simplify daily store operations by giving store owners
//               full control over their inventory, products, and orders—anytime,
//               anywhere. Our system is designed to reduce manual work, minimize
//               errors, and improve decision-making with real-time data.
//             </p>
//           </div>
//           <div className="lg:w-1/2">
//             <img
//               src={img1}
//               alt="Store owner using our system"
//               className="w-full h-auto rounded-xl shadow-lg"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 md:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
//           <div className="lg:w-1/2">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//               Smart Inventory, Smarter Business
//             </h2>
//             <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//               Our mission is to help businesses grow by offering a smart
//               inventory solution that ensures stock availability, reduces waste,
//               and prevents overstocking. With automated alerts and real-time
//               tracking, managing inventory has never been easier.
//             </p>
//           </div>
//           <div className="lg:w-1/2">
//             <img
//               src={img2}
//               alt="Inventory management dashboard"
//               className="w-full h-auto rounded-xl shadow-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
import React from "react";
import img1 from "../assets/regsiter.jpg";
import img2 from "../assets/why02.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div
      id="about"
      className="w-full bg-gray-50"
      style={{
        minHeight: "90vh",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
      }}
    >
      {/* Title Section */}
      <div className="container mx-auto px-6 text-center flex justify-center items-center">
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
          Why we built this
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

      {/* First Section */}
      <div className="container mx-auto px-6 mb-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Empowering Store Owners
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 lg:px-0">
              We aim to simplify daily store operations by giving store owners
              full control over their inventory, products, and orders — anytime,
              anywhere. Our system is designed to reduce manual work, minimize
              errors, and improve decision-making with real-time data.
            </p>
          </div>
          <div className="lg:w-1/2 overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl max-h-56 sm:max-h-64 md:max-h-72 lg:max-h-64 mt-4 lg:mt-0">
            <img
              src={img1}
              alt="Store owner using our system"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-8">
          <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Smart Inventory, Smarter Business
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 lg:px-0">
              Our mission is to help businesses grow by offering a smart
              inventory solution that ensures stock availability, reduces waste,
              and prevents overstocking. With automated alerts and real-time
              tracking, managing inventory has never been easier.
            </p>
          </div>
          <div className="lg:w-1/2 overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl max-h-56 sm:max-h-64 md:max-h-72 lg:max-h-64 mt-4 lg:mt-0">
            <img
              src={img2}
              alt="Inventory management dashboard"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
