// export default CustomerDetailsModal;
import React, { useEffect } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleOutsideClick}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden"
        >
          {/* Header with gradient - made more compact */}
          <div className="bg-gradient-to-r from-[#006EBD] to-[#006EBD] p-4 relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {customer.name}
                </h2>
                <span
                  className={`inline-block mt-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                    customer.isActive
                      ? "bg-white/20 text-white"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {customer.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Content - made scrollable */}
          <div className="p-4 space-y-4 overflow-y-auto">
            {/* Contact Info - more compact */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Contact
              </h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="text-gray-400" size={16} />
                  <p className="text-gray-700 text-sm">
                    {customer.email || "Not provided"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-gray-400" size={16} />
                  <p className="text-gray-700 text-sm">
                    {customer.phone || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Address - more compact */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Address
              </h3>
              <div className="flex items-start gap-2">
                <MapPin className="text-gray-400" size={16} />
                <p className="text-gray-700 text-sm">
                  {customer.address || "No address provided"}
                </p>
              </div>
            </div>

            {/* Purchase Stats - more compact */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Purchase History
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <div className="flex items-center gap-1 text-blue-600">
                    <ShoppingBag size={14} />
                    <span className="text-xs font-medium">Orders</span>
                  </div>
                  <p className="text-base font-bold mt-0.5 text-gray-800">
                    {customer.totalOrders || 0}
                  </p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg">
                  <div className="flex items-center gap-1 text-blue-600">
                    <DollarSign size={14} />
                    <span className="text-xs font-medium">Spent</span>
                  </div>
                  <p className="text-base font-bold mt-0.5 text-gray-800">
                    ${customer.totalSpent?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes - more compact */}
            {customer.notes && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Notes
                </h3>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-gray-700 text-sm">{customer.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer - more compact */}
          <div className="px-4 py-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomerDetailsModal;
