import React, { useEffect, useState } from "react";
import { FaUser, FaEdit, FaShoppingCart, FaBoxOpen, FaInbox, FaFileMedical } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/AuthSlice.js";
import Orders from "./Orders.jsx"
import UserInbox from "./UserInbox.jsx";
import Cart from "./Cart.jsx";
import UserReports from "./UserReports.jsx";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth?.user);
  const currentLabId = useSelector((state) => state.lab?.currentLabId || null);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  });
  const [file, setFile] = useState(null);
  const [selectedSection, setSelectedSection] = useState("profile");

  useEffect(() => {
    dispatch(updateUser());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
      });
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-10 text-gray-600 text-lg">Loading user profile...</div>;
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.error("User not found");
      return alert("User not loaded yet. Please wait...");
    }

    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("phoneNo", userData.phoneNo);
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch(`/api/auth/profile/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken') || sessionStorage.getItem('authToken')}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Profile updated successfully");
        window.location.reload(); 
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred");
    }
  };

  const sections = [
    { id: "profile", label: "My Profile", icon: <FaUser /> },
    { id: "edit", label: "Update Profile", icon: <FaEdit /> },
    { id: "cart", label: "My Cart", icon: <FaShoppingCart /> },
    { id: "orders", label: "My Orders", icon: <FaBoxOpen /> },
    { id: "inbox", label: "Inbox", icon: <FaInbox /> },
    { id: "reports", label: "My Reports", icon: <FaFileMedical /> },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case "profile":
        return (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Personal Details</h2>
            {user?.image && (<img src={user.image} alt="Profile" className="w-24 h-24 rounded-full object-cover"/>) }
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phoneNo || 'N/A'}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
        );
      case "edit":
        return (
          <form onSubmit={handleProfileUpdate} className="space-y-3">
            <input
              className="w-full border p-2"
              value={userData.firstName}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
              placeholder="First Name"
            />
            <input
              className="w-full border p-2"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              placeholder="Last Name"
            />
            <input
              className="w-full border p-2"
              value={userData.phoneNo}
              onChange={(e) => setUserData({ ...userData, phoneNo: e.target.value })}
              placeholder="Phone Number"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && <img src={URL.createObjectURL(file)} alt="Preview" className="w-24 h-24 rounded-full" />}
            <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
              Update Profile
            </button>
          </form>
        );
      case "cart":
        return <Cart />;
      case "orders":
        return <Orders />;
      case "inbox":
        return <UserInbox />;
      case "reports":
        return <UserReports />;
      default:
        return <h2>Welcome</h2>;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 pt-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 px-4">
        <div className="md:max-w-6xl md:w-1/4 w-full max-w-xs">
          <div className="bg-white rounded-xl shadow-md p-4">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`w-full flex items-center gap-3 px-4 py-2 mb-2 rounded-lg transition-all duration-200 ${
                  selectedSection === section.id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedSection(section.id)}
              >
                {section.icon} <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-3/4 w-full bg-white p-6 rounded-xl shadow-md">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {sections.find((s) => s.id === selectedSection)?.label}
            </h1>
          </div>
          <div>{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
