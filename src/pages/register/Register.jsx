// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import lottieLogin from "../../assets/register.json";
// import { useSignup } from "../../hooks/useSignup";
// import afghanistanProvinces from "./AfghanistanProvinces";

// const Register2 = () => {
//   const [fname, setfName] = useState("");
//   const [lname, setlName] = useState("");
//   const [bname, setbName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [province, setProvince] = useState("");
//   const [district, setDistrict] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");

//   const { signup, isLoading, error } = useSignup();
//   const navigate = useNavigate();
//   const [districts, setDistricts] = useState([]);
//   const [showDistrictSelect, setShowDistrictSelect] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const handleProvinceChange = (e) => {
//     const selectedProvince = e.target.value;
//     setProvince(selectedProvince);
//     if (selectedProvince) {
//       setDistricts(afghanistanProvinces[selectedProvince] || []);
//       setShowDistrictSelect(true);
//       setDistrict(""); // Reset district when province changes
//     } else {
//       setShowDistrictSelect(false);
//     }
//   };

//   const hundleSubmit = async (e) => {
//     e.preventDefault();

//     const user = await signup(
//       fname,
//       lname,
//       bname,
//       phone,
//       email,
//       district,
//       province,
//       password,
//       confirm
//     );

//     if (user) {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div
//       className="h-screen w-screen flex items-center justify-center"
//       style={{
//         backgroundImage: "linear-gradient(115deg, #006EBD , #F9F9F9)",
//       }}
//     >
//       <div className="flex flex-col lg:flex-row w-11/12 max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden h-[90vh]">
//         {/* Left: Lottie */}
//         <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-cover p-8">
//           <Lottie animationData={lottieLogin} />
//         </div>

//         {/* Right: Form */}
//         <div className="w-full lg:w-1/2 overflow-y-auto p-6 md:p-10">
//           <h2 className="text-3xl mb-4">Register</h2>
//           <p className="mb-3">Register now and use from 100% free!</p>

//           <form onSubmit={hundleSubmit}>
//             {error && (
//               <div className="bg-red-300 text-white p-4 rounded mb-3">
//                 {error}
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <input
//                 type="text"
//                 placeholder="Owner Name"
//                 className="border border-gray-400 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 onChange={(e) => setfName(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Owner Last Name"
//                 className="border border-gray-400 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 onChange={(e) => setlName(e.target.value)}
//               />
//             </div>

//             <div className="mt-3">
//               <input
//                 type="text"
//                 placeholder="Business Name"
//                 className="border border-gray-400 py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 onChange={(e) => setbName(e.target.value)}
//               />
//             </div>

//             <div className="mt-3">
//               <input
//                 type="number"
//                 placeholder="Contact Number"
//                 className="border border-gray-400 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>

//             <div className="mt-3">
//               <input
//                 type="text"
//                 placeholder="Email"
//                 className="border border-gray-400 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <h6 className="mt-3 text-gray-600">Address</h6>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
//               <select
//                 className="border border-gray-400 py-1 px-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 defaultValue=""
//                 onChange={handleProvinceChange}
//               >
//                 <option value="" disabled>
//                   Select a province
//                 </option>
//                 {Object.keys(afghanistanProvinces).map((province) => (
//                   <option key={province} value={province}>
//                     {province}
//                   </option>
//                 ))}
//               </select>

//               {showDistrictSelect ? (
//                 <select
//                   className="border border-gray-400 py-1 px-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
//                   value={district}
//                   onChange={(e) => setDistrict(e.target.value)}
//                   required
//                 >
//                   <option value="" disabled>
//                     Select a district
//                   </option>
//                   {districts.map((district) => (
//                     <option key={district} value={district}>
//                       {district}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   placeholder="Select province first"
//                   className="border border-gray-400 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                   disabled
//                 />
//               )}
//             </div>

//             <div className="mt-3">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="border border-gray-400 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="mt-3">
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="border border-gray-400 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 onChange={(e) => setConfirm(e.target.value)}
//               />
//             </div>

//             <div className="mt-4">
//               <button
//                 disabled={isLoading}
//                 className="w-full bg-[#006EBD] py-2 text-white rounded hover:bg-blue-700 transition-all"
//               >
//                 Submit
//               </button>

//               <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
//                 <div className="flex-1 h-px bg-gray-300"></div>
//                 <span>or</span>
//                 <div className="flex-1 h-px bg-gray-300"></div>
//               </div>

//               <div className="mt-3 text-center">
//                 <p>
//                   Already have an account?{" "}
//                   <Link to="/login" className="text-blue-600 underline">
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register2;
