import React, { useState, useEffect } from "react";
import AddLabAdminForm from "./AddUserForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserShield, FaFlask, FaUserCircle, FaEdit, FaTrash, FaCheckCircle, FaSearch, FaHistory, FaFingerprint } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(decodedToken.id);
      } catch (e) {
        console.error("Token decode fault");
      }
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
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
        let ownedLab = "External Patient";
        if (user.role === "labadmin") {
          ownedLab = labsFetched.find((lab) => lab.labAdmin?._id === user._id)?.name || "Facility Pending";
        } else if (user.role === "superadmin") {
          ownedLab = "Global Root";
        }

        return {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          ownedLab,
          createdAt: user.createdAt?.split("T")[0] || "-",
          image: user.image
        };
      });

      setUsers(transformed);
    } catch (error) {
      console.error("Error fetching labs or users:", error);
      toast.error("Telemetry sync failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async (formData) => {
    try {
      const res = await fetch("/api/superadmin/create-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        toast.success("Identity integrated successfully!");
        fetchData();
        setShowForm(false);
      } else {
        toast.error(data.message || "Identity integration fault.");
      }
    } catch (error) {
      toast.error("Handshake failure");
    }
  };
  
  const handleUpdateUser = async (formData) => {
    try {
      const userId = formData.get("_id");  
  
      const res = await fetch(`/api/superadmin/update-user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData, 
      });
  
      const data = await res.json();
      if (res.ok) {
        toast.success("Identity records synchronized!");
        fetchData();
        setShowForm(false);
        setCurrentUser(null);
        navigate("/admin/super/users");
      } else {
        toast.error(data.message || "Record synchronisation fault.");
      }
    } catch (error) {
      toast.error("Telemetry update error");
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("CRITICAL: Purge this identity from global records?")) return;
    try {
      const res = await fetch(`/api/superadmin/delete-user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
  
      if (res.ok) {
        toast.success("Identity purged from network");
        fetchData();
      } else {
        const data = await res.json();
        toast.error(data.message || "Purge protocol failure");
      }
    } catch (error) {
      toast.error("Security handshake error");
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[500px]">
      <ImSpinner2 className="text-primary text-4xl animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synchronizing Global Population Data</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Global Population</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Identity <span className="italic text-primary">Registry.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Manage Global User Accounts and Access Hierarchies</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-2xl shadow-slate-200 active:scale-95"
          >
            <FaUserPlus /> Integrate New Identity
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10 sm:p-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                 <FaFingerprint />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-slate-800 tracking-tight">{currentUser ? "Modify Identity" : "New Integration"}</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Access Protocol</p>
              </div>
           </div>
           <AddLabAdminForm
             onSubmit={currentUser ? handleUpdateUser : handleAddUser}
             onCancel={() => { setShowForm(false); setCurrentUser(null); }}
             user={currentUser}
             labs={labs}
           />
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Identity Hub</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Registry Level</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Facility Link</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Sync Date</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em]">Action Intel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200 group-hover:border-primary transition-colors">
                             {user.image ? (
                                <img src={user.image} className="w-full h-full object-cover" alt="" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                   <FaUserCircle className="text-xl" />
                                </div>
                             )}
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-800 tracking-tight leading-none group-hover:text-primary transition-colors">{user.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{user.email}</p>
                          </div>
                       </div>
                    </td>

                    <td className="px-8 py-6 capitalize">
                       <div className="flex">
                         {user.role === "superadmin" ? (
                           <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 text-primary rounded-lg border border-primary/20">
                             <FaUserShield className="text-[10px]" />
                             <span className="text-[9px] font-black uppercase tracking-widest">Root</span>
                           </div>
                         ) : user.role === "labadmin" ? (
                            <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-600 rounded-lg border border-sky-100">
                              <FaFlask className="text-[10px]" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Admin</span>
                            </div>
                         ) : (
                            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                              <FaUserCircle className="text-[10px]" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Patient</span>
                            </div>
                         )}
                       </div>
                    </td>

                    <td className="px-8 py-6">
                       <p className={`text-[11px] font-black uppercase tracking-widest ${user.role === 'superadmin' ? 'text-primary' : 'text-slate-400'}`}>
                          {user.ownedLab}
                       </p>
                    </td>

                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2 text-slate-400">
                          <FaHistory className="text-[10px]" />
                          <span className="text-[10px] font-black tracking-widest">{user.createdAt}</span>
                       </div>
                    </td>

                    <td className="px-8 py-6">
                       <div className="flex justify-end gap-2">
                          {(user.role === "superadmin" || user.id === currentUserId) ? (
                            <div className="px-4 py-2 bg-slate-50 text-[9px] font-black text-slate-300 uppercase tracking-widest rounded-lg border border-slate-100">
                               System Protected
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(user)}
                                className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-xl rounded-xl transition-all"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100 hover:shadow-xl rounded-xl transition-all"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
               <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                     <FaUsers className="text-2xl" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Population Registry Blank</p>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
