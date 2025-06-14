import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DueMainContent from "../../components/due/DueMainContent";
import React, { useState, useEffect } from "react";
function DueCustomersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      {/* <Navbar /> */}
      <Navbar toggleSidebar={toggleSidebar} />
      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 p-4  bg-gray-100 md:ml-64 mt-15">
          <DueMainContent />
        </div>
      </div>
    </div>
  );
}

export default DueCustomersPage;
