import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Super Admin",
    email: "admin@example.com",
    profileImage: "https://images.unsplash.com/photo-1608391957733-08caeb461b57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWRtaW4lMjBwcm9maWxlfGVufDB8fDB8fHww",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false); 
  const [updatedProfile, setUpdatedProfile] = useState({ ...profile }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleEdit = () => {
    if (isEditing) {
      setProfile({ ...updatedProfile }); 
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Profile Settings</h2>

      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <img
            src={updatedProfile.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md"
          />
          {isEditing && (
            <input
              type="text"
              name="profileImage"
              value={updatedProfile.profileImage}
              onChange={handleChange}
              className="mt-2 border p-2 w-full rounded-md text-gray-700"
              placeholder="Profile Image URL"
            />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={updatedProfile.name}
            onChange={handleChange}
            className="border p-2 w-full rounded-md text-gray-700"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={updatedProfile.email}
            onChange={handleChange}
            className="border p-2 w-full rounded-md text-gray-700"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={updatedProfile.password}
            onChange={handleChange}
            className="border p-2 w-full rounded-md text-gray-700"
            disabled={!isEditing}
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleEdit}
            className="w-full bg-primary text-white py-2 rounded-md"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
