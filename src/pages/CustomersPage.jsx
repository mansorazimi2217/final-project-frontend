import React, { useState } from "react";
import CustomerTable from "../components/customers/CustomerPage";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function CustomersPage() {
  const [activeTab, setActiveTab] = useState("All Customers");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden md:pl-65">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 mt-15">
          <CustomerTable activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}

export default CustomersPage;
