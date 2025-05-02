import React, { useState } from "react";

const UserProfileEdit = ({ user, onProfileUpdated }) => {
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNo: user?.phoneNo || "",
  });
  const [file, setFile] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
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
        onProfileUpdated();  // You can reload user data or refresh page
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred");
    }
  };

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
};

export default UserProfileEdit;
