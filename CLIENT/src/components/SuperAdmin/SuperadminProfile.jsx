import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaEye, FaEyeSlash, FaCamera, FaUser } from "react-icons/fa";

const SuperadminProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
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
          image: data.image || "",
        });
        setImagePreview(data.image || "");
      } else {
        toast.error(data.message || "Failed to fetch profile");
      }
    } catch (err) {
      toast.error("Something went wrong fetching profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("firstName", profile.firstName);
      formData.append("lastName", profile.lastName);
      formData.append("email", profile.email);
      
      if (selectedFile) {
        formData.append("image", selectedFile);
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
        setSelectedFile(null);
        fetchProfile();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Something went wrong updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    // Validate passwords match
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(passwords.newPassword)) {
      setPasswordError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
      return;
    }

    try {
      setLoading(true);
      setPasswordError("");
      const res = await fetch("/api/superadmin/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed successfully");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (err) {
      toast.error("Something went wrong changing password");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Profile Settings</h1>
      
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8 border-b pb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            activeTab === "profile" 
              ? "bg-primary text-white shadow-md" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Profile Information
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            activeTab === "password" 
              ? "bg-primary text-white shadow-md" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Change Password
        </button>
      </div>

      {/* Profile Section */}
      {activeTab === "profile" && (
        <div className="space-y-8">
          {!isEditing ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-primary"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center shadow-lg border-4 border-primary">
                    <FaUser className="w-20 h-20 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-500">{profile.email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-all shadow-md"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-primary"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center shadow-lg border-4 border-primary">
                      <FaUser className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-primary-dark transition-all group-hover:scale-110">
                    <FaCamera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500">Click the camera icon to change profile picture</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile();
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileUpdate}
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-all shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Password Section */}
      {activeTab === "password" && (
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, currentPassword: e.target.value }))
                }
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {passwordError && (
            <div className="text-red-500 text-sm mt-2">{passwordError}</div>
          )}
          <button
            onClick={handlePasswordChange}
            className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all shadow-md mt-8"
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default SuperadminProfile; 