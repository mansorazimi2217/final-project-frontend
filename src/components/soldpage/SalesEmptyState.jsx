import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

export default function SalesEmptyState({
  searchQuery,
  dateFilter,
  clearFilters,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-12 text-center"
    >
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[#e6f2ff] to-blue-100 rounded-full flex items-center justify-center mb-6">
        <FiSearch className="text-[#006EBD] text-3xl" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">No sales found</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {searchQuery || dateFilter
          ? "Try adjusting your search or filter criteria"
          : "No sales records available yet"}
      </p>
      <button
        className="mt-6 px-6 py-2 bg-[#006EBD] text-white rounded-lg hover:bg-[#005ba4] transition-colors"
        onClick={clearFilters}
      >
        Clear filters
      </button>
    </motion.div>
  );
}
