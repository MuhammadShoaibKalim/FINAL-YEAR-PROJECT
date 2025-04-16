import React from "react";
import { Link } from "react-router-dom"; // To navigate between routes

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg p-4 w-64 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-xl text-gray-700"
      >
        &#10005;
      </button>

      <ul className="space-y-4 mt-12">
        <li>
          <Link to="/profile" className="text-lg text-gray-700 hover:text-primary">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/orders" className="text-lg text-gray-700 hover:text-primary">
            Orders
          </Link>
        </li>
        <li>
          <Link to="/messages" className="text-lg text-gray-700 hover:text-primary">
            Messages
          </Link>
        </li>
        <li>
          <Link to="/queries" className="text-lg text-gray-700 hover:text-primary">
            My Queries
          </Link>
        </li>
        <li>
          <Link to="/cart" className="text-lg text-gray-700 hover:text-primary">
            Cart
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-lg text-gray-700 hover:text-primary">
            Settings
          </Link>
        </li>
        <li>
          <button
            onClick={() => alert("Logging out...")}
            className="text-lg text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
