import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ShowReturnDues from "../../components/due/ShowReturnDues";

function ShowReturnDuesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col mt-15">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`bg-gray-100 border-r border-gray-200 transition-all duration-300 
          ${isSidebarOpen ? "w-64" : "w-0"} 
          hidden sm:block`}
        >
          <Sidebar />
        </div>
        <div className="flex-1 p-4 bg-white overflow-auto">
          <ShowReturnDues />
        </div>
      </div>
    </div>
  );
}

export default ShowReturnDuesPage;
