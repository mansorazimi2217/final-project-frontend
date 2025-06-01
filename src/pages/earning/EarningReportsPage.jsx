import React, { useState } from "react";
import EarningReportPage from "../../components/earningreport/EarningReportsPage";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Menu } from "lucide-react";

function EarningReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar fixed at the top */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white z-50 flex items-center justify-between px-4">
        <Navbar />
        {/* Mobile menu button */}
        <button
          className="lg:hidden block"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar for large screens */}
        <aside className="hidden lg:block fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-white shadow z-40">
          <Sidebar />
        </aside>

        {/* Sidebar for mobile screens (drawer) */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className="w-60 bg-white h-full shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main content area */}
        <main
          className="flex-1 overflow-auto px-4"
          style={{ marginLeft: "0px", height: "calc(100vh - 4rem)" }}
        >
          {/* Push content right on large screens */}
          <div className="lg:ml-60">
            <EarningReportPage />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EarningReportsPage;
