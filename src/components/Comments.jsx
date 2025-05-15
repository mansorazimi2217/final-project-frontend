import React from "react";
import img from "../assets/regsiter.jpg";
import "./Comments.css";
const Comments = () => {
  return (
    <div className="bg-gray-100 w-full flex flex-col items-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 gap-10 text-center">
      <div className="mb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          What people are saying about us
        </h1>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-stretch flex-wrap">
        <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-[30%] lg:w-[25%] min-w-[280px] mt-16">
          <div className="absolute -top-17 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white">
            <img
              src={img}
              alt="Ahmad R."
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-8 mb-6 text-gray-700 italic">
            "This system has completely transformed the way I manage my store. I
            can now track inventory, view sales, and process orders all from one
            place. It's fast, simple, and saves me hours every week."
          </p>
          <h3 className="font-bold text-lg mb-1">Ahmad R.</h3>
          <p className="text-gray-600 mb-1">Small Business Owner</p>
          <p className="text-sm text-gray-500">Kabul, Afghanistan</p>
        </div>

        <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-[30%] lg:w-[25%] min-w-[280px] mt-16">
          <div className="absolute -top-17 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white">
            <img
              src={img}
              alt="Zahra M."
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-8 mb-6 text-gray-700 italic">
            "What I love the most is the real-time inventory alerts. I never run
            out of stock unexpectedly anymore. It's like having a smart
            assistant for my store!"
          </p>
          <h3 className="font-bold text-lg mb-1">Zahra M.</h3>
          <p className="text-gray-600 mb-1">Retail Manager</p>
          <p className="text-sm text-gray-500">Delhi, India</p>
        </div>

        <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-[30%] lg:w-[25%] min-w-[280px] mt-16">
          <div className="absolute -top-17 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white">
            <img
              src={img}
              alt="Faisal H."
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-8 mb-4 text-gray-700 italic">
            "I was new to inventory systems, but this platform made everything
            easy to understand and use. From day one, I felt in control of my
            products and sales."
          </p>
          <h3 className="font-bold text-lg mb-1">Faisal H.</h3>
          <p className="text-gray-600 mb-1">Online Seller</p>
          <p className="text-sm text-gray-500">Herat, Afghanistan</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;

// <div className="bg-gray-100 w-full  flex flex-col pt-10 pb-20 gap-10 text-center">
//   <div className="title mb-10">
//     <h1>What are people saying about us</h1>
//   </div>
//   <div className="poepleCards flex gap-10 justify-center">
//     <div className="peopleCard basis-1/4 relative bg-white p-5 rounded-lg shadow-lg">
//       <div
//         className="imgContainer w-30 absolute top-m-10 left-25 shadow-lg"
//         style={{
//           borderRadius: "50%",
//           width: "100px",
//           height: "100px",
//         }}
//       >
//         <img
//           src={img}
//           className="w-full h-full"
//           style={{ borderRadius: "50%" }}
//         />
//       </div>
//       <p className="mb-4">
//         This system has completely transformed the way I manage my store. I
//         can now track inventory, view sales, and process orders all from one
//         place. It's fast, simple, and saves me hours every week
//       </p>
//       <h3 className="mb-4">
//         Ahmad R., Small <br /> Business Owner
//       </h3>
//       <span>Afghanistan,Kabul</span>
//     </div>
//     <div className="peopleCard  relative basis-1/4 bg-white p-5 rounded-lg shadow-lg">
//       <div
//         className="imgContainer w-30 absolute top-m-10 left-25 shadow-lg"
//         style={{
//           borderRadius: "50%",
//           width: "100px",
//           height: "100px",
//         }}
//       >
//         <img
//           src={img}
//           className="w-full h-full"
//           style={{ borderRadius: "50%" }}
//         />
//       </div>
//       <p className="mb-4">
//         What I love the most is the real-time inventory alerts. I never run
//         out of stock unexpectedly anymore. It's like having a smart
//         assistant for my store!
//       </p>
//       <h3 className="mb-4">
//         Zahra M., Retail <br /> Manager
//       </h3>
//       <span>India, Delhi</span>
//     </div>
//     <div className="peopleCard  basis-1/4 bg-white p-5 rounded-lg relative shadow-lg">
//       <div
//         className="imgContainer  absolute top-m-10 left-25 shadow-lg"
//         style={{
//           borderRadius: "50%",
//           width: "100px",
//           height: "100px",
//         }}
//       >
//         <img
//           src={img}
//           className="w-full h-full"
//           style={{ borderRadius: "50%" }}
//         />
//       </div>
//       <p className="mb-4">
//         I was new to inventory systems, but this platform made everything
//         easy to understand and use. From day one, I felt in control of my
//         products and sales.
//       </p>
//       <h3 className="mb-4">
//         Faisal H., Online <br /> Seller
//       </h3>
//       <span>Afghanistan,Herat</span>
//     </div>
//   </div>
// </div>
