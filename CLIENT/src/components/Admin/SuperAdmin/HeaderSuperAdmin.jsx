import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../../redux/AuthSlice";
import toast from "react-hot-toast";

const HeaderSuperAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(Logout());
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">Super Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSuperAdmin; 