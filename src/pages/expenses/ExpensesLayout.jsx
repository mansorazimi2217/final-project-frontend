// import React, { useState } from "react";
// import ExpensesPage from "./ExpensesPage";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";

// function ExpensesLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="h-screen">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <Navbar toggleSidebar={toggleSidebar} />
//       </div>

//       <div className="flex pt-[45px] h-full">
//         <aside className="hidden md:block w-64 bg-gray-100 h-full overflow-y-auto">
//           <Sidebar />
//         </aside>
//         {isSidebarOpen && (
//           <>
//             <Sidebar isOpen={isSidebarOpen} />
//           </>
//         )}

//         <main className="flex-1 p-4 overflow-y-auto h-full">
//           <ExpensesPage />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default ExpensesLayout;
import React, { useState } from "react";
import ExpensesPage from "./ExpensesPage";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function ExpensesLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex pt-[45px] h-full">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-gray-100 h-full overflow-y-auto">
          <Sidebar isOpen={isSidebarOpen} />
        </aside>

        {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} />}

        <main className="flex-1 p-4 overflow-y-auto h-full">
          <ExpensesPage />
        </main>
      </div>
    </div>
  );
}

export default ExpensesLayout;
