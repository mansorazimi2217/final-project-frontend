import { motion } from "framer-motion";

export default function SalesError({ error }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 text-red-500 text-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
        <p className="text-xl font-medium mb-4">{error}</p>
        <p className="text-gray-600 mb-6">Please try again later</p>
        <button
          className="px-6 py-2 bg-[#006EBD] text-white rounded-lg hover:bg-[#005ba4] transition-colors"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    </motion.div>
  );
}
