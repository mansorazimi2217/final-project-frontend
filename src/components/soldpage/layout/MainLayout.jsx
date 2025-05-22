import { motion } from "framer-motion";
import Navbar from "../../Navbar";
import Sidebar from "../../Sidebar";
import { useState } from "react";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6"
    >
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className="max-w-7xl mx-auto md:pt-20 md:pl-60 lg:pl-60 xl:pl-50">
        {children}
      </div>
    </motion.div>
  );
}
