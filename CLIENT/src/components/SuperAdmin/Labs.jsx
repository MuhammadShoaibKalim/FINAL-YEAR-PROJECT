import React, { useEffect, useState } from 'react';
import AddLabForm from './AddLabForm';
import toast from 'react-hot-toast';
import { FaFlask, FaMapMarkerAlt, FaUserShield, FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaRegHospital } from 'react-icons/fa';
import { ImSpinner2 } from "react-icons/im";

const Labs = () => {
  const [labData, setLabData] = useState([]);
  const [isAddingLab, setIsAddingLab] = useState(false);
  const [editLab, setEditLab] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLabs = async () => {
    try {
      const res = await fetch("/api/labs/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.labs)) {
        setLabData(data.labs);
      }
    } catch (error) {
      console.error("Failed to fetch labs", error);
      toast.error("Telemetry sync error: Facility network unreachable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs(); 
  }, []);

  const addLab = async (formData) => {
    try {
      const res = await fetch("/api/labs/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Facility integrated successfully");
        setIsAddingLab(false);
        fetchLabs();            
      } else {
        toast.error(data.message || "Integration protocol failure");
      }
    } catch (err) {
      toast.error("Server handshake error");
    }
  };

  const editLabDetails = async (updatedLab) => {
    try {
      const formToSend = new FormData();
      formToSend.append("name", updatedLab.name);
      formToSend.append("address", updatedLab.address);
      formToSend.append("location", updatedLab.location);
      formToSend.append("description", updatedLab.description);
      formToSend.append("isActive", updatedLab.isActive);
      formToSend.append("assignedAdmin", updatedLab.assignedAdmin);
      formToSend.append("type", updatedLab.type);
      formToSend.append("uploadFolder", "labs");
  
      if (updatedLab.image) {
        formToSend.append("image", updatedLab.image);
      }
  
      const res = await fetch(`/api/labs/${updatedLab._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formToSend,
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Facility records synchronized");
        fetchLabs();
        setIsAddingLab(false);
        setEditLab(null);
      } else {
        toast.error(data.message || "Record sync fault");
      }
    } catch (error) {
      console.error("Update lab error:", error);
      toast.error("Telemetry error");
    }
  };

  const deleteLab = async (labId) => {
    if (!window.confirm("CRITICAL: Decommission this facility from the global network?")) return;
    try {
      const res = await fetch(`/api/labs/${labId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Facility decommissioned");
        fetchLabs(); 
      } else {
        toast.error(data.message || "Decommission fault");
      }
    } catch (error) {
      toast.error("Protocol error during decommission");
    }
  };

  const toggleAddLab = () => {
    setIsAddingLab(!isAddingLab);
    setEditLab(null);
  };

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[500px]">
      <ImSpinner2 className="text-primary text-4xl animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Scanning Global Facility Network</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Diagnostic Infrastructure</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Facility <span className="italic text-primary">Network.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Oversee and Synchronize Global Laboratory Nodes</p>
        </div>
        {!isAddingLab && !editLab && (
          <button
            onClick={toggleAddLab}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-2xl shadow-slate-200 active:scale-95"
          >
            <FaPlus /> Initialize New Facility
          </button>
        )}
      </div>

      {(isAddingLab || editLab) ? (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10 sm:p-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                 <FaRegHospital />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-slate-800 tracking-tight">{editLab ? "Modify Facility" : "Initialize Facility"}</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Integration Protocol</p>
              </div>
           </div>
           <AddLabForm
             toggleAddLab={toggleAddLab}
             addLab={addLab}
             editLab={editLab}
             editLabDetails={editLabDetails}
           />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labData.map((lab) => (
            <div key={lab._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="h-48 relative overflow-hidden">
                <img
                  src={lab.image || "https://via.placeholder.com/400x200"}
                  alt={lab.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                   <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-md border ${lab.isActive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                      {lab.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                      {lab.isActive ? 'Operational' : 'Halted'}
                   </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                 <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase group-hover:text-primary transition-colors">{lab.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-2">
                       <FaMapMarkerAlt className="text-primary/40" />
                       <span className="uppercase tracking-widest">{lab.location}</span>
                    </div>
                 </div>

                 <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                          <FaUserShield className="text-xs" />
                       </div>
                       <div>
                          <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Facility Administrator</p>
                          <p className="text-[11px] font-black text-slate-700 tracking-tight">
                             {lab.labAdmin ? `${lab.labAdmin.firstName} ${lab.labAdmin.lastName}` : "Unassigned"}
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => { setEditLab(lab); setIsAddingLab(true); }}
                      className="flex-1 px-4 py-3 bg-slate-900 hover:bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                    >
                      <FaEdit /> Protocol Opts
                    </button>
                    <button
                      onClick={() => deleteLab(lab._id)}
                      className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-200 hover:shadow-xl rounded-xl transition-all"
                    >
                      <FaTrash />
                    </button>
                 </div>
              </div>
            </div>
          ))}

          {labData.length === 0 && (
             <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                   <FaFlask className="text-2xl" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Facility Network Synchronized (0 Active)</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Labs;
