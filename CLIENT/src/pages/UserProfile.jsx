import React, { useEffect, useState } from "react";
import { FaUserCircle, FaShoppingCart, FaBox, FaCog, FaEnvelope } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";
import Cart from "./Cart"; // ✅ Import Cart component

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [selectedSection, setSelectedSection] = useState("profile");

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

  const sections = [
    { id: "profile", label: "Profile", icon: <FaUserCircle /> },
    { id: "cart", label: "Cart", icon: <FaShoppingCart /> },
    { id: "orders", label: "Orders", icon: <FaBox /> },
    { id: "messages", label: "Messages", icon: <BsChatRightDotsFill /> },
    { id: "queries", label: "My Queries", icon: <FaEnvelope /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case "profile":
        return (
          <div>
            <h2 className="text-lg font-semibold">User Information</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </div>
        );
      case "cart":
        return <Cart />; // ✅ Reusing the Cart component
      case "orders":
        return (
          <div>
            <h2 className="text-lg font-semibold">Order Details</h2>
            <p>Latest Order: #12345 - Delivered</p>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2 className="text-lg font-semibold">Profile Settings</h2>
            <p>Change password, update profile details, and more.</p>
          </div>
        );
      case "messages":
        return (
          <div>
            <h2 className="text-lg font-semibold">Chat with Lab owner</h2>
            <p>You can direct chat with the lab admin or owner if you have any queries or issues.</p>
          </div>
        );
      case "queries":
        return (
          <div>
            <h2 className="text-lg font-semibold">My Queries</h2>
            <p>Contact our support team for assistance.</p>
          </div>
        );
      default:
        return <h2>Profile Section</h2>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center mt-32 mb-4">
      <div className="w-1/4"></div>

      <div className="w-full md:w-1/5 bg-white p-4 shadow-md mb-4 md:mb-0">
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`w-full flex items-center space-x-2 p-2 border-b border-black transition-all duration-200 ${
                selectedSection === section.id ? "text-black" : "text-black hover:bg-primary hover:text-white"
              }`}
              onClick={() => setSelectedSection(section.id)}
            >
              {section.icon} <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full md:w-3/5 bg-white p-4 shadow-md">
        <div className="flex items-center justify-center space-x-4">
          <h1 className="text-xl font-bold">{selectedSection.toUpperCase()}</h1>
        </div>
        <div className="mt-4">{renderSection()}</div>
      </div>

      <div className="w-1/4"></div>
    </div>
  );
};

export default UserProfile;
