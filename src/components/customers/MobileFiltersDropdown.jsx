import React from "react";

function MobileFiltersDropdown({ showMobileFilters, filter, handleFilter }) {
  return (
    <div>
      {showMobileFilters && (
        <div className="md:hidden bg-gray-100 p-3 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              "All Customers",
              "New Customers",
              "Much Spent",
              "Others",
              "Kabul",
            ].map((btn) => (
              <button
                key={btn}
                className={`px-3 py-1 rounded-full text-xs ${
                  filter === btn ? "bg-white shadow" : "bg-gray-100"
                }`}
                onClick={() => handleFilter(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileFiltersDropdown;
