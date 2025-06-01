import {
  FaUserGroup,
  FaBoxOpen,
  FaClockRotateLeft,
  FaSackDollar,
  FaReceipt,
  FaArrowTrendUp,
  FaCartShopping,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-30 transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <nav className="mt-4">
        <ul>
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
            text="Sold reports"
            active={currentPath === "/dashboard/soldproducts"}
          />
          <SidebarLink
            to="/dashboard/earningreport"
            icon={<FaCartShopping />}
            text="Earning Report"
            active={currentPath === "/dashboard/earningreport"}
          />
          <SidebarItem icon={<FaReceipt />} text="Expensis" />
          <SidebarLink
            to="/dashboard/sellingpage"
            icon={<FaCartShopping />}
            text="Sell Products"
            active={currentPath === "/dashboard/sellingpage"}
          />
        </ul>
      </nav>
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
