import React from "react";
import { FunnelIcon } from "lucide-react";
function SearchAndFilter({
  setShowMobileFilters,
  showMobileFilters,
  searchTerm,
  handleSearch,
}) {
  return (
    <div>
      <div className="bg-gray-100 w-full h-[1px] my-4"></div>
      <div className="flex flex-col md:flex-row items-center gap-2 mb-4 pt-2">
        <button
          className="flex items-center gap-1 border px-3 py-2 rounded-md  bg-gray-100 text-sm w-full md:w-auto justify-center"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <FunnelIcon size={16} /> Filter
        </button>
        <input
          type="text"
          placeholder="Search Customer..."
          value={searchTerm}
          onChange={handleSearch}
          className="border px-3 py-2 rounded-md w-full text-sm bg-gray-100"
        />
      </div>
    </div>
  );
}

export default SearchAndFilter;
