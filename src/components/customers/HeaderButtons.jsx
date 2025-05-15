import React from "react";

function HeaderButtons({ showMobileMenu, handleFilter, setShowModal, filter }) {
  return (
    <div>
      <div className={`${showMobileMenu ? "block" : "hidden"} md:block`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 p-2 gap-2">
          <div className="flex flex-wrap gap-2">
            {[
              "All Customers",
              "New Customers",
              "Much Spent",
              "Others",
              "Kabul",
            ].map((btn) => (
              <button
                key={btn}
                className={`px-3 py-1 rounded-full text-xs md:text-sm ${
                  filter === btn ? "bg-gray-200" : "bg-gray-100"
                }`}
                onClick={() => handleFilter(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
          <button
            className="hidden md:block bg-[#006EBD] text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={() => setShowModal(true)}
          >
            + Add Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderButtons;
