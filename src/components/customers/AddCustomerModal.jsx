import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import SuccessMessage from "./SuccessMessage";

function AddCustomerModal({ showModal, setShowModal, dispatch }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    notes: "",
    isActive: true,
    lastPurchaseAt: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

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
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/customers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCustomer = await response.json();
      dispatch({ type: "CREATE_CUSTOMER", payload: newCustomer });

      setShowSuccess(true);

      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        notes: "",
        isActive: true,
        lastPurchaseAt: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-4xl md:px-10 px-5 py-8 rounded-xl shadow-lg space-y-6 overflow-y-auto max-h-[90vh] relative">
            <SuccessMessage progress={progress} showSuccess={showSuccess} />

            <div className="flex items-center justify-between">
              <button
                className="bg-[#006EBD] text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1 transition-colors duration-200"
                onClick={() => setShowModal(false)}
              >
                <ArrowLeft size={18} /> Back
              </button>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Add New Customer
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone Number"
                    required
                  />
                </div>

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
                  className="px-5 py-2 rounded-lg bg-[#006EBD] hover:bg-blue-700 text-white font-semibold"
                >
                  Save Customer
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
