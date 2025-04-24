import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeSection, setActiveSection] = useState("profile"); // "profile" or "password"

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/superadmin/get-settings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          profileImage: data.profileImage || "",
        });
      } catch (err) {
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

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
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleChangePassword = async () => {
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
        toast.success("Password updated");
        setPasswords({ currentPassword: "", newPassword: "" });
      } else {
        toast.error(data.message || "Password change failed");
      }
    } catch (err) {
      toast.error("Error changing password");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profileImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-16">
      {/* Toggle Header */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveSection("profile")}
          className={`px-4 py-2 rounded-md text-white font-semibold transition-all ${
            activeSection === "profile" ? "bg-primary" : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveSection("password")}
          className={`px-4 py-2 rounded-md text-white font-semibold transition-all ${
            activeSection === "password" ? "bg-secondary" : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          Change Password
        </button>
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <>
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Profile Settings</h2>
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  src={imagePreview || profile.profileImage || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full shadow-md object-cover"
                />
              </div>

              <div className="flex justify-center flex-col items-center text-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-gray-500">{profile.email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-all"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center flex-col items-center gap-2">
                <img
                  src={imagePreview || profile.profileImage || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full shadow-md object-cover"
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
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="border p-2 w-full rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="border p-2 w-full rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="border p-2 w-full rounded-md"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleProfileUpdate}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Password Section */}
      {activeSection === "password" && (
        <div className="border-t pt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h3>
          <div className="space-y-6">
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="border p-2 w-full rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
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
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="border p-2 w-full rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              onClick={handleChangePassword}
              className="bg-secondary text-white w-full py-2 rounded-md hover:bg-secondary-dark transition-all"
            >
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
