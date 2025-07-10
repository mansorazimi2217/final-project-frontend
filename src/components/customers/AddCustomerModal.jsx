import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import SuccessMessage from "./SuccessMessage";
import { useAuthContext } from "../../hooks/useAuthContext";

// Afghanistan provinces with their districts
import { AFGHANISTAN_PROVINCES } from "./data";
function AddCustomerModal({ showModal, setShowModal, dispatch }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    province: "",
    district: "",
    phone: "",
    notes: "",
    isActive: true,
    lastPurchaseAt: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    province: "",
    district: "",
    phone: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState([]);

  // Update available districts when province changes
  useEffect(() => {
    if (formData.province) {
      setAvailableDistricts(AFGHANISTAN_PROVINCES[formData.province] || []);
      // Reset district when province changes
      setFormData((prev) => ({ ...prev, district: "" }));
    } else {
      setAvailableDistricts([]);
    }
  }, [formData.province]);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 3) return "Name must be at least 3 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      case "province":
        if (!value) return "Province is required";
        return "";
      case "district":
        if (!value) return "District is required";
        return "";
      case "phone":
        if (!value) return "Phone is required";
        // Afghan phone number validation (starts with 07 or +937 followed by 8 digits)
        if (!/^(?:\+93|0)7[0-9]{8}$/.test(value))
          return "Invalid Afghan phone number (e.g., 0701234567 or +93701234567)";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Validate on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== "notes" && key !== "isActive" && key !== "lastPurchaseAt") {
        const error = validateField(key, formData[key]);
        newErrors[key] = error;
        if (error) isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Combine province and district into address
      const customerData = {
        ...formData,
        address: `${formData.district}, ${formData.province}`,
      };
      // Remove separate province and district fields before sending
      const { province, district, ...dataToSend } = customerData;

      const response = await fetch("http://localhost:3000/api/customers/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCustomer = await response.json();
      dispatch({ type: "CREATE_CUSTOMER", payload: newCustomer });

      setShowSuccess(true);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      // Handle API errors (e.g., duplicate email)
      if (error.message.includes("email")) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      province: "",
      district: "",
      phone: "",
      notes: "",
      isActive: true,
      lastPurchaseAt: "",
    });
    setErrors({
      name: "",
      email: "",
      province: "",
      district: "",
      phone: "",
    });
    setAvailableDistricts([]);
  };

  // Animation effect (same as before)
  useEffect(() => {
    let animationFrame;
    let startTime;
    let timeout;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      setProgress(Math.min((elapsed / 3000) * 100, 100));

      if (elapsed < 3000) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (showSuccess) {
      setProgress(0);
      startTime = null;
      animationFrame = requestAnimationFrame(animate);
      timeout = setTimeout(() => setShowSuccess(false), 3000);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [showSuccess]);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-4xl md:px-10 px-5 py-8 rounded-xl shadow-lg space-y-6 overflow-y-auto max-h-[90vh] relative">
            <SuccessMessage progress={progress} showSuccess={showSuccess} />

            <div className="flex items-center justify-between">
              <button
                className="bg-[#006EBD] text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1 transition-colors duration-200"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <ArrowLeft size={18} /> Back
              </button>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Add New Customer
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={(e) => {
                      setErrors((prev) => ({
                        ...prev,
                        name: validateField("name", e.target.value),
                      }));
                    }}
                    className={`w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Full Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={(e) => {
                      setErrors((prev) => ({
                        ...prev,
                        email: validateField("email", e.target.value),
                      }));
                    }}
                    className={`w-full border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Province Field (Dropdown) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province *
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    onBlur={(e) => {
                      setErrors((prev) => ({
                        ...prev,
                        province: validateField("province", e.target.value),
                      }));
                    }}
                    className={`w-full border ${
                      errors.province ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select a province</option>
                    {Object.keys(AFGHANISTAN_PROVINCES).map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                  {errors.province && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.province}
                    </p>
                  )}
                </div>

                {/* District Field (Dropdown) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    onBlur={(e) => {
                      setErrors((prev) => ({
                        ...prev,
                        district: validateField("district", e.target.value),
                      }));
                    }}
                    disabled={!formData.province}
                    className={`w-full border ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !formData.province ? "bg-gray-100" : ""
                    }`}
                  >
                    <option value="">Select a district</option>
                    {availableDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.district}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={(e) => {
                      setErrors((prev) => ({
                        ...prev,
                        phone: validateField("phone", e.target.value),
                      }));
                    }}
                    className={`w-full border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="e.g., 0701234567 or +93701234567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Active Checkbox */}
                <div className="flex items-center">
                  <input
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Active Customer
                  </label>
                </div>
              </div>

              {/* Notes Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Notes about the customer..."
                />
              </div>

              <div className="flex justify-center pt-5 gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2 rounded-lg ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#006EBD] hover:bg-blue-700"
                  } text-white font-semibold`}
                >
                  {isSubmitting ? "Saving..." : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCustomerModal;

// import React, { useState, useEffect } from "react";
// import { ArrowLeft, CheckCircle } from "lucide-react";
// import SuccessMessage from "./SuccessMessage";
// import { useAuthContext } from "../../hooks/useAuthContext";

// function AddCustomerModal({ showModal, setShowModal, dispatch }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     phone: "",
//     notes: "",
//     isActive: true,
//     lastPurchaseAt: "",
//   });
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let animationFrame;
//     let startTime;
//     let timeout;

//     const animate = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const elapsed = timestamp - startTime;
//       setProgress(Math.min((elapsed / 3000) * 100, 100));

//       if (elapsed < 3000) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     if (showSuccess) {
//       setProgress(0);
//       startTime = null;
//       animationFrame = requestAnimationFrame(animate);
//       timeout = setTimeout(() => setShowSuccess(false), 3000);
//     }

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       clearTimeout(timeout);
//     };
//   }, [showSuccess]);
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const { user } = useAuthContext();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/api/customers/", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const newCustomer = await response.json();
//       dispatch({ type: "CREATE_CUSTOMER", payload: newCustomer });

//       setShowSuccess(true);

//       setFormData({
//         name: "",
//         email: "",
//         address: "",
//         phone: "",
//         notes: "",
//         isActive: true,
//         lastPurchaseAt: "",
//       });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
//           <div className="bg-white w-full max-w-4xl md:px-10 px-5 py-8 rounded-xl shadow-lg space-y-6 overflow-y-auto max-h-[90vh] relative">
//             <SuccessMessage progress={progress} showSuccess={showSuccess} />

//             <div className="flex items-center justify-between">
//               <button
//                 className="bg-[#006EBD] text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1 transition-colors duration-200"
//                 onClick={() => setShowModal(false)}
//               >
//                 <ArrowLeft size={18} /> Back
//               </button>
//               <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
//                 Add New Customer
//               </h2>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Full Name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Email"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Address
//                   </label>
//                   <input
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Address"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone
//                   </label>
//                   <input
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Phone Number"
//                     required
//                   />
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     name="isActive"
//                     type="checkbox"
//                     checked={formData.isActive}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">
//                     Active Customer
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notes
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 px-4 py-3 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Notes about the customer..."
//                 />
//               </div>

//               <div className="flex justify-center pt-5 gap-3">
//                 <button
//                   type="submit"
//                   className="px-5 py-2 rounded-lg bg-[#006EBD] hover:bg-blue-700 text-white font-semibold"
//                 >
//                   Save Customer
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default AddCustomerModal;
