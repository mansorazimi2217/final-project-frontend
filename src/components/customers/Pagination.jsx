import React from "react";

function Pagination({ page, filteredCustomers, handlePageChange }) {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-500">
          Showing {Math.min((page - 1) * 5 + 1, filteredCustomers.length)} to{" "}
          {Math.min(page * 5, filteredCustomers.length)} of{" "}
          {filteredCustomers.length} customers
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 md:px-4 md:py-2 rounded-md bg-gray-200 text-sm disabled:opacity-50"
            disabled={page === 1}
            onClick={() => handlePageChange("prev")}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 md:px-4 md:py-2 rounded-md bg-gray-200 text-sm disabled:opacity-50"
            disabled={page * 5 >= filteredCustomers.length}
            onClick={() => handlePageChange("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
