import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";


const AddLabAdminForm = ({ onSubmit, onCancel, user }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""];
      setNewUser({
        firstName: nameParts[0],
        lastName: nameParts[1] || "",
        email: user.email,
        password: "",
        role: user.role || "",
      });
      setProfileImagePreview(user.image || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append form fields
    Object.keys(newUser).forEach((key) => {
      if (newUser[key]) {
        formData.append(key, newUser[key]);
      }
    });

    // Append file separately
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    if (user) {
      formData.append("_id", user.id); 
    }
    
    

    onSubmit(formData);
  };

  const isFormValid =
    newUser.firstName && newUser.lastName && newUser.email && newUser.password && newUser.role;

  return (
    <div className="relative bg-white p-6 shadow-md rounded-md mt-6 w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {user ? "Edit User" : "Add User"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        
        {/* Profile Image Preview */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={profileImagePreview || "https://via.placeholder.com/150"}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />
        </div>

        {/* Choose File Button */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Password with Eye Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={newUser.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              required={!user}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Role</option>
            <option value="labadmin">Lab Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-4 py-2 rounded-md ${
              isFormValid ? "bg-primary text-white hover:bg-opacity-90" : "bg-gray-400 text-white"
            }`}
          >
            {user ? "Save Changes" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLabAdminForm;
