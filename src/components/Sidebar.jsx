import {
  FaUserGroup,
  FaBoxOpen,
  FaClockRotateLeft,
  FaSackDollar,
  FaReceipt,
  FaCartShopping,
  FaHouse,
  FaRightFromBracket,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion, AnimatePresence } from "framer-motion";
const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const logout = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  console.log(user);

  const handleLogout = () => {
    navigate("/login");
    logout();
  };

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-30 transform transition-all duration-0 ease-in-out flex flex-col justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* --- Top Navigation --- */}
      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul>
          <SidebarLink
            to="/dashboard"
            icon={<FaHouse />}
            text="Home"
            active={currentPath === "/dashboard"}
          />
          <SidebarLink
            to="/dashboard/customers"
            icon={<FaUserGroup />}
            text="Customers"
            active={currentPath === "/dashboard/customers"}
          />
          <SidebarLink
            to="/dashboard/products"
            icon={<FaBoxOpen />}
            text="Products"
            active={currentPath === "/dashboard/products"}
          />
          <SidebarLink
            to="/dashboard/duecustomers"
            icon={<FaClockRotateLeft />}
            text="Due Customers"
            active={currentPath === "/dashboard/duecustomers"}
          />
          <SidebarLink
            to="/dashboard/soldproducts"
            icon={<FaSackDollar />}
            text="Sold Reports"
            active={currentPath === "/dashboard/soldproducts"}
          />
          <SidebarLink
            to="/dashboard/earningreport"
            icon={<FaCartShopping />}
            text="Earning Report"
            active={currentPath === "/dashboard/earningreport"}
          />
          <SidebarLink
            to="/dashboard/expenses"
            icon={<FaReceipt />}
            text="Expenses"
            active={currentPath === "/dashboard/expenses"}
          />
          <SidebarLink
            to="/dashboard/sellingpage"
            icon={<FaCartShopping />}
            text="Sell Products"
            active={currentPath === "/dashboard/sellingpage"}
          />
        </ul>
      </nav>

      {/* --- Bottom Profile + Logout --- */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0 4px 12px rgba(0, 110, 189, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 flex items-center justify-center bg-[#006EBD] text-white font-bold rounded-full cursor-pointer hover:bg-[#0059a1] transition-all"
          >
            {user && (
              <span className="text-lg font-medium">
                {user?.email[0].toUpperCase()}
              </span>
            )}
          </motion.div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {user?.businessName}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full mt-4 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 active:scale-95"
        >
          <FaRightFromBracket />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, text, active }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <SidebarItem icon={icon} text={text} active={active} />
    </Link>
  );
};

const SidebarItem = ({ icon, text, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 mr-3 rounded-lg cursor-pointer transition-colors duration-200
        ${
          active
            ? "bg-[#e6f3ff] text-[#006EBD]"
            : "text-gray-600 hover:text-[#006EBD] hover:bg-[#f0f8ff]"
        }
        active:scale-95`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default Sidebar;

// import {
//   FaUserGroup,
//   FaBoxOpen,
//   FaClockRotateLeft,
//   FaSackDollar,
//   FaReceipt,
//   FaArrowTrendUp,
//   FaCartShopping,
//   FaHouse,
// } from "react-icons/fa6";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = ({ isOpen }) => {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   return (
//     <div
//       className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-30 transform transition-all duration-0 ease-in-out ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0`}
//     >
//       <nav className="mt-4">
//         <ul>
//           <SidebarLink
//             to="/dashboard"
//             icon={<FaHouse />}
//             text="Home"
//             active={currentPath === "/dashboard"}
//           />
//           <SidebarLink
//             to="/dashboard/customers"
//             icon={<FaUserGroup />}
//             text="Customers"
//             active={currentPath === "/dashboard/customers"}
//           />
//           <SidebarLink
//             to="/dashboard/products"
//             icon={<FaBoxOpen />}
//             text="Products"
//             active={currentPath === "/dashboard/products"}
//           />
//           <SidebarLink
//             to="/dashboard/duecustomers"
//             icon={<FaClockRotateLeft />}
//             text="Due Customers"
//             active={currentPath === "/dashboard/duecustomers"}
//           />
//           <SidebarLink
//             to="/dashboard/soldproducts"
//             icon={<FaSackDollar />}
//             text="Sold reports"
//             active={currentPath === "/dashboard/soldproducts"}
//           />
//           <SidebarLink
//             to="/dashboard/earningreport"
//             icon={<FaCartShopping />}
//             text="Earning Report"
//             active={currentPath === "/dashboard/earningreport"}
//           />
//           <SidebarLink
//             to="/dashboard/expenses"
//             icon={<FaReceipt />}
//             text="Expensis"
//             active={currentPath === "/dashboard/expenses"}
//           />
//           <SidebarLink
//             to="/dashboard/sellingpage"
//             icon={<FaCartShopping />}
//             text="Sell Products"
//             active={currentPath === "/dashboard/sellingpage"}
//           />
//         </ul>
//       </nav>
//     </div>
//   );
// };

// const SidebarLink = ({ to, icon, text, active }) => {
//   return (
//     <Link to={to} style={{ textDecoration: "none" }}>
//       <SidebarItem icon={icon} text={text} active={active} />
//     </Link>
//   );
// };

// const SidebarItem = ({ icon, text, active }) => {
//   return (
//     <div
//       className={`flex items-center gap-3 px-4 py-2 mr-3 rounded-lg cursor-pointer transition-colors duration-200
//         ${
//           active
//             ? "bg-[#e6f3ff] text-[#006EBD]"
//             : "text-gray-600 hover:text-[#006EBD] hover:bg-[#f0f8ff]"
//         }
//         active:scale-95`}
//     >
//       {icon}
//       <span className="font-medium">{text}</span>
//     </div>
//   );
// };

// export default Sidebar;
