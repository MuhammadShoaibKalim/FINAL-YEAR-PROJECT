import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [activeTab, setActiveTab] = useState("profile");

  const location = useLocation();

  useEffect(() => {
    fetchProfile();
  }, [location.pathname]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/superadmin/get-settings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          profileImage: data.profileImage || "",
        });
        setImagePreview(data.profileImage || "");
      } else {
        toast.error(data.message || "Failed to fetch profile");
      }
    } catch (err) {
      toast.error("Something went wrong fetching profile");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", profile.firstName);
      formData.append("lastName", profile.lastName);
      formData.append("email", profile.email);
      if (profile.profileImage instanceof File) {
        formData.append("profileImage", profile.profileImage);
      }

      const res = await fetch("/api/superadmin/update-settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        fetchProfile();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Something went wrong updating profile");
    }
  };

  const handlePasswordChange = async () => {
    try {
      const res = await fetch("/api/superadmin/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(passwords),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed successfully");
        setPasswords({ currentPassword: "", newPassword: "" });
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (err) {
      toast.error("Something went wrong changing password");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-16">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "profile" ? "bg-primary text-white" : "bg-gray-400 text-white"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "password" ? "bg-secondary text-white" : "bg-gray-400 text-white"
          }`}
        >
          Change Password
        </button>
      </div>

      {/* Profile Section */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {!isEditing ? (
            <>
              <div className="flex justify-center">
                <img
                  src={imagePreview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-md"
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-500">{profile.email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-all"
                >
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={imagePreview || "https://via.placeholder.com/150"}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover shadow-md"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border p-2 rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleProfileUpdate}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile();
                  }}
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-all"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Password Section */}
      {activeTab === "password" && (
        <div className="space-y-6">
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords((prev) => ({ ...prev, currentPassword: e.target.value }))}
              className="border p-2 w-full rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))}
              className="border p-2 w-full rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            onClick={handlePasswordChange}
            className="w-full bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-dark transition-all"
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
