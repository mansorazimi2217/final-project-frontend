import React, { useState } from "react";
import Input from "./Input";
import { ChevronDown, ChevronUp } from "lucide-react";

function SideBarSellPage({
  mobileSidebarOpen,
  isMobile,
  setSearchTerm,
  searchTerm,
  filteredProducts,
  handleProductClick,
  filters,
  handleFilterChange,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const uniqueCompanies = [
    "All",
    ...new Set(filteredProducts.map((p) => p.company)),
  ];

  return (
    <div>
      <div
        className={`${
          mobileSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-[350px] bg-white border-r border-gray-200 p-4 overflow-y-auto space-y-4 shadow-md fixed md:relative h-full z-10 md:z-0`}
        style={{ top: isMobile ? "56px" : "0" }}
      >
        <Input
          label="Search Product"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Collapsible Filters */}
        <div className="border rounded-md shadow-sm">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-t-md transition-colors"
          >
            <span className="font-semibold text-gray-700 text-sm">Filters</span>
            {filtersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {filtersOpen && (
            <div className="p-3 space-y-4 text-xs bg-white">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Company
                </label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={filters.company}
                  onChange={(e) =>
                    handleFilterChange({ company: e.target.value })
                  }
                >
                  {uniqueCompanies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Stock
                </label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={filters.stock}
                  onChange={(e) =>
                    handleFilterChange({ stock: e.target.value })
                  }
                >
                  <option value="All">All</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Max Price: {filters.price} AFN
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={filters.price}
                  onChange={(e) =>
                    handleFilterChange({ price: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Sort By
                </label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value })}
                >
                  <option value="none">None</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A-Z</option>
                  <option value="name-z-a">Name: Z-A</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Product List */}
        <div className="space-y-3 pt-2">
          {filteredProducts.map((item) => {
            const isLowStock = item.stock < 10;
            return (
              <div
                key={item.id}
                className="group relative flex items-center p-3 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md hover:ring-2 hover:ring-blue-100 transition-all duration-200 cursor-pointer"
                onClick={() => handleProductClick(item)}
              >
                <img
                  src={
                    item.image === "https://via.placeholder.com/50"
                      ? "/pp.png"
                      : item.image
                  }
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-300 shadow-sm"
                />
                <div className="ml-3 flex-1">
                  <div className="text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center justify-between mt-0.5">
                    <span className="text-blue-600 font-semibold">
                      {item.price} AFN
                    </span>
                    <span
                      className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-150 ${
                        isLowStock
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      {item.stock} left
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBarSellPage;
