import React, { useState, useEffect } from "react";
import AddLabAdminForm from "./AddUserForm";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setCurrentUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const labRes = await fetch("/api/labs/all", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        const labData = await labRes.json();
        const labsFetched = labData.labs || [];
        setLabs(labsFetched);

        const userRes = await fetch("/api/superadmin/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        const userData = await userRes.json();
        const allUsers = userData.users || [];

        const transformed = allUsers.map((user) => {
          let ownedLab = "Only User";
          if (user.role === "labadmin") {
            ownedLab = labsFetched.find((lab) => lab._id === user.labId)?.name || "Unassigned";
          } else if (user.role === "superadmin") {
            ownedLab = "Platform Owner";
          }

          return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            ownedLab,
            createdAt: user.createdAt?.split("T")[0] || "-",
          };
        });

        setUsers(transformed);
      } catch (error) {
        console.error("Error fetching labs or users:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async (newUserData) => {
    try {
      const res = await fetch("/api/superadmin/create-user", {
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
          role: newUserData.role,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const addedUser = data.createdUser;

        const ownedLab = addedUser.role === "labadmin"
          ? labs.find((lab) => lab._id === addedUser.labId)?.name || "Unassigned"
          : addedUser.role === "superadmin" ? "Platform Owner" : "Only User";

        setUsers((prev) => [
          ...prev,
          {
            id: addedUser._id,
            name: `${addedUser.firstName} ${addedUser.lastName}`,
            email: addedUser.email,
            role: addedUser.role,
            ownedLab,
            createdAt: new Date().toISOString().split("T")[0],
          },
        ]);
        setShowForm(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error creating user");
      console.error(error);
    }
  };

  const handleUpdateUser = async (updatedUserData) => {
    try {
      const res = await fetch(`/api/superadmin/update-user/${updatedUserData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          firstName: updatedUserData.firstName,
          lastName: updatedUserData.lastName,
          email: updatedUserData.email,
          password: updatedUserData.password || "", // important!
          role: updatedUserData.role,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        const updated = {
          ...updatedUserData,
          ownedLab:
            updatedUserData.role === "labadmin"
              ? labs.find((lab) => lab._id === updatedUserData.labId)?.name || "Unassigned"
              : updatedUserData.role === "superadmin"
              ? "Platform Owner"
              : "Only User",
        };
  
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === updatedUserData.id ? updated : user))
        );
  
        setShowForm(false);
        setCurrentUser(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed");
    }
  };
  
  

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/superadmin/delete-user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
  
      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Failed to delete user");
    }
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
              <h2 className="text-2xl font-semibold">Users</h2>
              <p className="text-gray-500">Manage all platform users</p>
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
                    {user.id === currentUserId ? (
  <span className="text-xs text-gray-400 italic">Protected</span>
) : (
  <td className="px-4 py-2 flex gap-2">
  {user.id === currentUserId ? (
    <span className="text-xs text-gray-400 italic">Protected</span>
  ) : (
    <>
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
    </>
  )}
</td>

)}

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