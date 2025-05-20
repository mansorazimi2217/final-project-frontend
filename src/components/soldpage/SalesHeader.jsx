import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";

export default function SalesHeader({ totalSales }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          products you have sold to
        </h1>
        <p className="text-gray-600 mt-2">Manage your product sales history</p>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-4 md:mt-0 flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm"
      >
        <div className="p-2 bg-[#e6f2ff] rounded-full">
          <FiDollarSign className="text-[#006EBD] text-xl" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Total Sales</p>
          <p className="text-lg font-semibold text-gray-800">
            {totalSales.toLocaleString()}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
