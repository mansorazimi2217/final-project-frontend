import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

function MobileHeader({ setMobileSidebarOpen, mobileSidebarOpen }) {
  return (
    <div>
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">Sell Product</h1>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-gray-600 hover:text-gray-800"
        >
          {mobileSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </div>
  );
}

export default MobileHeader;
