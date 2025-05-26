import React from "react";
import {
  FaUserGroup,
  FaBoxOpen,
  FaClockRotateLeft,
  FaSackDollar,
  FaReceipt,
  FaArrowTrendUp,
  FaCartShopping,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-30 transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <nav className="mt-4">
        <ul>
          <Link style={{ textDecoration: "none" }} to={"/dashboard/customers"}>
            {" "}
            <SidebarItem icon={<FaUserGroup />} text="Customers" />{" "}
          </Link>

          <Link style={{ textDecoration: "none" }} to={"/dashboard/products"}>
            {" "}
            <SidebarItem icon={<FaBoxOpen />} text="Products" />
          </Link>
          <Link
            to={"/dashboard/duecustomers"}
            style={{ textDecoration: "none" }}
          >
            <SidebarItem icon={<FaClockRotateLeft />} text="Due Customers" />
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={"/dashboard/soldproducts"}
          >
            <SidebarItem icon={<FaSackDollar />} text="Sold reports" />
          </Link>

          <SidebarItem icon={<FaArrowTrendUp />} text="Earning Reports" />
          <SidebarItem icon={<FaReceipt />} text="Expensis" />
          <Link
            style={{ textDecoration: "none" }}
            to={"/dashboard/sellingpage"}
          >
            <SidebarItem icon={<FaCartShopping />} text="Sell Products" />
          </Link>
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-3 text-gray-600 hover:text-[#006EBD] transition-colors duration-200 cursor-pointer px-4 py-2 rounded-lg hover:bg-[#f0f8ff] active:scale-95 mr-3">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default Sidebar;
