import React, { useState } from "react";
import EarningReportPage from "../../components/earningreport/EarningReportsPage";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function EarningReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar fixed at the top */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white z-50 flex items-center justify-between px-4">
        <Navbar toggleSidebar={toggleSidebar} />
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="hidden lg:block fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-white shadow z-40">
          <Sidebar />
        </aside>

        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>

            <div className="fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-white shadow z-50">
              <Sidebar isOpen={isSidebarOpen} />
            </div>
          </>
        )}

        <main
          className="flex-1 overflow-auto px-4"
          style={{ marginLeft: "0px", height: "calc(100vh - 4rem)" }}
        >
          <div className="lg:ml-60">
            <EarningReportPage />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EarningReportsPage;
