import React, { useState, useEffect } from "react";
import AddLabAdminForm from "./AddUserForm";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchLabAdmins = async () => {
      try {
        const res = await fetch("/api/superadmin/labadmins", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        const data = await res.json();

        const transformed = (data.labAdmins || []).map((admin) => ({
          id: admin._id,
          name: `${admin.firstName} ${admin.lastName}`,
          email: admin.email,
          role: admin.role,
         ownedLab: labs.find((lab) => lab._id === data.labAdmin.labId)?.name || "N/A",
          createdAt: admin.createdAt?.split("T")[0] || "-",
        }));

        setUsers(transformed);
      } catch (error) {
        console.error("Failed to fetch lab admins", error);
      }
    };

    const fetchLabs = async () => {
      try {
        const res = await fetch("/api/superadmin/labs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        const data = await res.json();
        setLabs(data.labs || []);
      } catch (error) {
        console.error("Failed to fetch labs", error);
      }
    };

    fetchLabAdmins();
    fetchLabs();
  }, []);

  const handleAddUser = async (newUserData) => {
    try {
      const res = await fetch("/api/superadmin/create-labadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          email: newUserData.email,
          password: newUserData.password,
          labId: newUserData.assignedLab,
          role: newUserData.role,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [
          ...prev,
          {
            id: data.labAdmin._id,
            name: `${data.labAdmin.firstName} ${data.labAdmin.lastName}`,
            email: data.labAdmin.email,
            role: data.labAdmin.role,
            ownedLab: data.labAdmin.labId,
            createdAt: new Date().toISOString().split("T")[0],
          },
        ]);
        setShowForm(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error creating lab admin");
      console.error(error);
    }
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
        <AddLabAdminForm
          onSubmit={currentUser ? handleUpdateUser : handleAddUser}
          onCancel={handleCancelForm}
          user={currentUser}
          labs={labs}
        />
      ) : (
        <>
          <div className="bg-white p-4 shadow-md rounded-md flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Lab Admins</h2>
              <p className="text-gray-500">Manage or create Lab Admin accounts</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Add New Lab Admin
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
