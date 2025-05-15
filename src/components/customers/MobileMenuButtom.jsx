import React from "react";
import { Menu, X } from "lucide-react";
function MobileMenuButtom({ setShowMobileMenu, showMobileMenu, setShowModal }) {
  return (
    <div>
      <div className="md:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-md bg-gray-100"
        >
          {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
        <button
          className="bg-[#006EBD] text-white px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => setShowModal(true)}
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default MobileMenuButtom;
