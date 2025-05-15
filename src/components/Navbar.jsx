import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsMenuOpen(false);
    navigate("/login");
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleUpdateProfileImage = () => {
    console.log("Update Profile Image clicked");
    setIsMenuOpen(false);
    navigate("/dashboard/updateprofile");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center border-b border-gray-200">
      <div className="flex items-center h-full">
        <button
          onClick={toggleSidebar}
          className="ml-6 text-gray-600 focus:outline-none md:hidden"
        >
          <FaBars size={20} />
        </button>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          {" "}
          <div className="ml-6 text-xl font-bold text-gray-800 hidden md:block">
            OIMS
          </div>
        </Link>
      </div>

      <div ref={menuRef} className="relative flex items-center mr-4 ml-auto">
        {user && (
          <span className="mr-3 text-gray-700 hidden sm:inline">
            {user.email}
          </span>
        )}

        {console.log(user)}

        {/* <img
          src={user && `http://localhost:3000/${user.profileImage}`}
          alt="User Profile"
          className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
          onClick={toggleMenu}
        /> */}

        <div
          className="bg-[#006EBD] flex justify-center items-center text-white"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={toggleMenu}
        >
          {user && user.email[0].toUpperCase()}
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 top-10 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
            {/* <button
              onClick={handleUpdateProfileImage}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Update Profile Image
            </button> */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
