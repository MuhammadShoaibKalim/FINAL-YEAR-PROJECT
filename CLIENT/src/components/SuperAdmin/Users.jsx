import React, { useState, useEffect } from "react";
import AddLabAdminForm from "./AddUserForm";
import toast from "react-hot-toast";


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
          ownedLab = labsFetched.find((lab) => lab.labAdmin?._id === user._id)?.name || "Unassigned";
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

  useEffect(() => {
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
        body: JSON.stringify(newUserData),
      });

      if (res.ok) {
        fetchData();
        setShowForm(false);
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating user");
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
        body: JSON.stringify(updatedUserData),
      });

      if (res.ok) {
        fetchData();
        setShowForm(false);
        setCurrentUser(null);
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/superadmin/delete-user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
  
      if (res.ok) {
        toast.success("User deleted successfully");
        fetchData(); // refresh users + labs correctly
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };
  

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  const trimText = (text, maxLength = 18) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-7xl mx-auto">
      {showForm ? (
        <AddLabAdminForm
          onSubmit={currentUser ? handleUpdateUser : handleAddUser}
          onCancel={handleCancelForm}
          user={currentUser}
          labs={labs}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Users</h2>
              <p className="text-sm text-gray-500">Manage all platform users</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg"
            >
              Add New User
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Owned Lab</th>
                  <th className="px-6 py-3 text-left">Created At</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{trimText(user.id)}</td>
                    <td className="px-6 py-4">{trimText(user.name)}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">{trimText(user.email)}</td>
                    <td className="px-6 py-4">{trimText(user.ownedLab)}</td>
                    <td className="px-6 py-4">{user.createdAt}</td>
                    <td className="px-6 py-4 flex gap-2">
  {user.role === "superadmin" ? (
    <span className="text-xs italic text-gray-400">Platform Owner</span>
  ) : user.id === currentUserId ? (
    <span className="text-xs italic text-gray-400">Protected</span>
  ) : (
    <>
      <button
        onClick={() => handleEdit(user)}
        className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(user.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </>
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
