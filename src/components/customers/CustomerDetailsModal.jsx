import React, { useEffect } from "react";

const CustomerDetailsModal = ({ customer, onClose, isOpen }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen || !customer) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{customer.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700">Contact Information</h4>
            <p className="mt-1 text-gray-600">{customer.email}</p>
            <p className="text-gray-600">{customer.phone}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Address</h4>
            <p className="mt-1 text-gray-600">{customer.address}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Purchase History</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="font-medium">{customer.totalOrders}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="font-medium">${customer.totalSpent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Order</p>
                <p className="font-medium">{customer.lastOrderDate || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-[#006EBD] text-white rounded-md hover:bg-[#006ECE]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
