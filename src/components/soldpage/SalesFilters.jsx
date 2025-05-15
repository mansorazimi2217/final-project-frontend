import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiCalendar, FiUser } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function SalesFilters({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  dateFilter,
  setDateFilter,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm p-6 mb-8 backdrop-blur-sm bg-opacity-80"
    >
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <motion.input
            whileFocus={{ borderColor: "#006EBD" }}
            type="text"
            placeholder="Search by customer or product..."
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006EBD] focus:border-[#006EBD] transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <FiFilter />
          Filters
          {showFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Filter by customer..."
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006EBD] focus:border-[#006EBD] transition-all"
                    value={filters.customerName}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        customerName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Filter by product..."
                  className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006EBD] focus:border-[#006EBD] transition-all"
                  value={filters.productName}
                  onChange={(e) =>
                    setFilters({ ...filters, productName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006EBD] focus:border-[#006EBD] transition-all"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
