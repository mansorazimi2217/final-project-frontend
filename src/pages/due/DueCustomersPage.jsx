import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DueMainContent from "../../components/due/DueMainContent";

function DueCustomersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4  bg-gray-100 md:ml-64 mt-15">
          <DueMainContent />
        </div>
      </div>
    </div>
  );
}

export default DueCustomersPage;
