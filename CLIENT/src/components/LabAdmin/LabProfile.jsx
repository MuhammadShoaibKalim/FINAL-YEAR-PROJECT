import React, { useState } from "react";
import { FaUser, FaFlask } from "react-icons/fa";
import { MdLocationOn, MdOutlineCheckCircle, MdCancel } from "react-icons/md";

const LabProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 bg-white shadow-lg rounded-md">
      {/* ✅ Header Section */}
      <div className="bg-primary text-white p-4 rounded-t-md flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lab Management</h2>
        <div className="flex gap-4">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === "profile"
                ? "bg-white text-primary shadow-md"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser /> Profile
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === "lab"
                ? "bg-white text-primary shadow-md"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("lab")}
          >
            <FaFlask /> Lab
          </button>
        </div>
      </div>

      {/* ✅ Layout Section */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* 👉 Left Sidebar (Profile) */}
        {activeTab === "profile" && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?w=500&auto=format&fit=crop&q=60"
              alt="Admin"
              className="w-32 h-32 rounded-full shadow-md border-4 border-primary object-cover"
            />
            <div className="text-center mt-4">
              <h3 className="text-2xl font-semibold">John Doe</h3>
              <p className="text-gray-500">Lab Administrator</p>
              <p className="text-gray-700 mt-2">
                <strong>Email:</strong> admin@lab.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +123 456 7890
              </p>
            </div>
          </div>
        )}

        {/* 👉 Right Section (Lab Details) */}
        {activeTab === "lab" && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Prime Diagnostics</h3>
              <p className="text-lg font-medium flex items-center gap-1 text-green-600">
                <MdOutlineCheckCircle className="text-green-600" /> Active
              </p>
            </div>

            <div className="w-full h-48 md:h-56 lg:h-64">
              <img
                src="https://plus.unsplash.com/premium_photo-1661308307351-46de448bd3bf?w=500&auto=format&fit=crop&q=60"
                alt="Lab"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-gray-600 flex items-center gap-1">
                <MdLocationOn className="text-primary" /> Lahore, Pakistan
              </p>
              <p className="text-gray-700">123 Main Street, DHA, Lahore</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabProfile;
