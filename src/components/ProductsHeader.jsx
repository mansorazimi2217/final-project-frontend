import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
function ProductsHeader({ setSearch, search, setAddModal }) {
  return (
    <>
      <div className="md:fixed top-0 left-0 w-full bg-white z-10 shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link style={{ textDecoration: "none" }} to={"/dashboard"}>
            <h3 className="text-2xl font-bold text-[#006EBD]">OIMS</h3>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded-xl border border-gray-300 w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="flex items-center gap-2 bg-[#006EBD] hover:bg-[006ECE] text-white px-4 py-2 rounded-xl shadow-md"
            onClick={() => setAddModal(true)}
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductsHeader;
