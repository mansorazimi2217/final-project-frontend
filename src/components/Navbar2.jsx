import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex justify-between items-center text-black py-2 px-6 md:px-32 bg-white drop-shadow-md">
      <Link to="#" style={{ textDecoration: "none" }} className="text-blue-600">
        <h3>OIMS</h3>
      </Link>

      <ul className="hidden xl:flex items-center gap-6 font-semibold text-base mt-2">
        <li className="p-2 hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
          Home
        </li>
        <li className="p-2 hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
          Products
        </li>
        <li className="p-2 hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
          Explore
        </li>
        <li className="p-2 hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
          Contact
        </li>
      </ul>

      <div className="relative hidden md:flex items-center justify-center gap-3">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>

      <i
        onClick={() => setIsOpen(!isOpen)}
        className="bx bx-menu block xl:hidden bx bx-menu d-block d-xl-none text-5xl cursor-pointer"
      ></i>

      <div
        className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <li className="list-none w-full text-center p-4 hover:bg-blue-600 hover:text-white transition-all cursor-pointer ">
          Home
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-blue-600 hover:text-white transition-all cursor-pointer ">
          Products
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-blue-600 hover:text-white transition-all cursor-pointer ">
          Features
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-blue-600 hover:text-white transition-all cursor-pointer ">
          About us
        </li>
      </div>
    </header>
  );
}

export default Navbar2;
