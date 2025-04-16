import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import AddUserForm from "./AddUserForm";

const Users = () => {
  const initialUsers = [
    {
      id: "6509db920db2700b405d5099",
      name: "Muneeb",
      role: "Admin",
      email: "realmuneeburrehman@gmail.com",
      ownedLab: "654a06c7b6bb8409513aaa",
      createdAt: "2024-01-15",
    },
    {
      id: "654fa6500b505f50aba1fb",
      name: "Test",
      role: "Lab Admin",
      email: "muneebbug@gmail.com",
      ownedLab: "-",
      createdAt: "2024-01-10",
    },
    {
      id: "6557de4e6c6d436f450bde",
      name: "Muneeb",
      role: "User",
      email: "muneebkimbob@gmail.com",
      ownedLab: "-",
      createdAt: "2024-01-05",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAddUser = (newUserData) => {
    setUsers((prevUsers) => [...prevUsers, newUserData]);
    setShowForm(false);
  };

  const handleUpdateUser = (updatedUserData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUserData.id ? updatedUserData : user))
    );
    setShowForm(false);
    setCurrentUser(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-8xl">
      {showForm ? (
        <div className="relative">
          <button
            type="button"
            onClick={handleCancelForm}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <FaTimes size={20} />
          </button>
          <AddUserForm
            onSubmit={currentUser ? handleUpdateUser : handleAddUser}
            onCancel={handleCancelForm}
            user={currentUser}
          />
        </div>
      ) : (
        <>
          <div className="bg-white p-4 shadow-md rounded-md flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Users</h2>
              <p className="text-gray-500">Manage all your existing users or add a new one</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Add New User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Owned Lab</th>
                  <th className="px-4 py-2">Created At</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 truncate">{user.id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2 truncate">{user.email}</td>
                    <td className="px-4 py-2 truncate">{user.ownedLab}</td>
                    <td className="px-4 py-2">{user.createdAt}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-primary text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;