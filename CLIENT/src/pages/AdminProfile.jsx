import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const AdminProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user/profile");
      const data = await response.json();
      setUserData({
        name: data.name || "John Doe",
        email: data.email || "john.doe@example.com",
        phone: data.phone || "+123 456 7890",
        role: data.role || "User",
      });
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex items-center justify-center mt-12 mb-12 bg-white">
      <div className="bg-white shadow-lg rounded-lg p-4 w-96 mt-12 text-center">
        {/* Profile Image */}
          <div className="flex flex-col justify-center items-center ">
         <FaUserCircle className="text-gray w-24 h-24" />
         <p className="text-gray-600 text-lg ">Admin</p>
       </div>

        {/* User Information */}
        <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
        <p className="text-gray-500 text-sm mb-6">{userData.role}</p>

        {/* Contact Information */}
        <div className="text-left mb-4">
          <h3 className="text-black text-xl font-medium flex items-center">
            Contact Information
          </h3>
          <p className="text-black text-sm flex items-center">
            email
            <span>{userData.email}</span>
          </p>
          <p className="text-black text-sm flex items-center mt-2">
            Contact Number
            <span>{userData.phone}</span>
          </p>
        </div>

       {/* Buttons */}
       <div className="flex justify-between space-x-4 mt-6">
          <button className="bg-primary text-white px-2 py-2 rounded w-1/3">
            Lab Admin
          </button>
          <button className="bg-primary text-white  rounded w-1/3">
            Orders
          </button>
          <button className="bg-primary text-white px-2 py-2 rounded w-1/3">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;
