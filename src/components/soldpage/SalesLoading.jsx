import { motion } from "framer-motion";

export default function SalesLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
        }}
        className="rounded-full h-16 w-16 border-t-4 border-b-4 border-[#006EBD]"
      ></motion.div>
    </motion.div>
  );
}
