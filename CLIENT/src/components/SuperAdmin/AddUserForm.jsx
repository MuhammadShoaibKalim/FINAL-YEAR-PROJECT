import React, { useState, useEffect } from "react";

const AddLabAdminForm = ({ onSubmit, onCancel, user }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "labadmin",
  });

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""];
      setNewUser({
        firstName: nameParts[0],
        lastName: nameParts[1] || "",
        email: user.email,
        password: "",
        role: user.role || "labadmin",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...newUser,
      id: user ? user.id : Date.now().toString(),
      name: `${newUser.firstName} ${newUser.lastName}`.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    onSubmit(userData);
  };

  return (
    <div className="relative bg-white p-6 shadow-md rounded-md mt-6 w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {user ? "Edit User" : "Add User"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required={!user}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="labadmin">Lab Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80"
          >
            {user ? "Save Changes" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLabAdminForm;