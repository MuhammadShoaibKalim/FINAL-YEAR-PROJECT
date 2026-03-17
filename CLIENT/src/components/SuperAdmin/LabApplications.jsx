import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner, FaCheck, FaTimes, FaEye, FaFileContract, FaBuilding, FaUserTie, FaMapMarkerAlt, FaGlobe, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaIdCard, FaClipboardCheck, FaExternalLinkAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { get, put } from "../../Services/ApiEndpoints";

const LabApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await get("/api/labs/applications");
      if (response.success) {
        setApplications(response.data);
      }
    } catch (error) {
      toast.error("Telemetry sync error: Application records unreachable");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await put(`/api/labs/applications/${id}/status`, { status });
      if (response.success) {
        toast.success(`Protocol ${status} deployed successfully`);
        fetchApplications();
        if (showModal) setShowModal(false);
      }
    } catch (error) {
      toast.error("Status update protocol conflict");
    }
  };

  const viewApplicationDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const ApplicationModal = ({ application, onClose }) => {
    if (!application) return null;

    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
        <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                  <FaFileContract />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Application <span className="italic text-primary">Intelligence.</span></h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unique ID: {application._id.slice(-12).toUpperCase()}</p>
               </div>
            </div>
            <button onClick={onClose} className="p-4 bg-white border border-slate-100 text-slate-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm">
              <FaTimes />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-10 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Section 1: Facility Identity */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                     <FaBuilding className="text-primary text-xs" />
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Facility Diagnostics</h3>
                  </div>
                  <div className="space-y-4">
                     <DataRow label="Operational Name" value={application.labName} />
                     <DataRow label="Node Location" value={application.cityProvince} />
                     <DataRow label="Registry ID" value={application.labRegistrationNumber || "UNREGISTERED"} />
                     <DataRow label="Direct Vector" value={application.labPhone} />
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Specialization Matrix</label>
                        <div className="flex flex-wrap gap-2">
                           {application.labSpecialties.map((s, i) => (
                              <span key={i} className="px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-lg text-[9px] font-black uppercase tracking-widest">{s}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Section 2: Administrative Control */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                     <FaUserTie className="text-primary text-xs" />
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Personnel Matrix</h3>
                  </div>
                  <div className="space-y-4">
                     <DataRow label="Primary Authority" value={application.ownerName} />
                     <DataRow label="Auth Email" value={application.ownerEmail} />
                     <DataRow label="Auth Vector" value={application.ownerPhone} />
                     <DataRow label="Identity Key (CNIC)" value={application.ownerCNIC} />
                     <DataRow label="Hub Address" value={application.labAddress} isFull />
                  </div>
               </div>
            </div>

            {/* Section 3: Tech & Operations */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                  <FaGlobe className="text-primary text-xs" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Logistical Handshake</h3>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <MetricCard label="Web Access" value={application.hasInternet ? "Enabled" : "Offline"} status={application.hasInternet} />
                  <MetricCard label="Internal SaaS" value={application.hasBookingSoftware ? "Active" : "None"} status={application.hasBookingSoftware} />
                  <MetricCard label="Specimen Logic" value={application.offersHomeCollection ? "Home Hub" : "On-Site"} status={application.offersHomeCollection} />
                  <MetricCard label="Force Scale" value={`${application.staffCount} Units`} status={true} />
               </div>
            </div>

            {/* Section 4: Validation Licenses */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                  <FaClipboardCheck className="text-primary text-xs" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Verification Payloads</h3>
               </div>
               <a 
                 href={application.labLicense} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-[2rem] group hover:bg-primary transition-all shadow-xl shadow-slate-200"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <FaIdCard />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Facility Accreditation Token</p>
                        <p className="text-[9px] font-bold text-white/50 uppercase">Cryptographically Secure Link</p>
                     </div>
                  </div>
                  <FaExternalLinkAlt className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </a>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
            {application.status === "pending" ? (
               <>
                  <button
                    onClick={() => handleStatusUpdate(application._id, "approved")}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    <FaCheckCircle /> Authorize Node
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(application._id, "rejected")}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-rose-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    <FaTimesCircle /> Deny Protocol
                  </button>
               </>
            ) : (
               <div className={`flex-1 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 border-2 ${application.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                  {application.status === 'approved' ? <FaCheckCircle /> : <FaTimesCircle />}
                  Deployment Result: {application.status}
               </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DataRow = ({ label, value, isFull }) => (
    <div className={`space-y-1 ${isFull ? 'col-span-full' : ''}`}>
       <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">{label}</p>
       <p className="text-[12px] font-black text-slate-700 tracking-tight leading-tight">{value || "N/A"}</p>
    </div>
  );

  const MetricCard = ({ label, value, status }) => (
     <div className={`p-4 rounded-2xl border ${status ? 'bg-emerald-50/30 border-emerald-100/50' : 'bg-slate-50 border-slate-100'} transition-all`}>
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-[10px] font-black uppercase tracking-wider ${status ? 'text-emerald-600' : 'text-slate-600'}`}>{value}</p>
     </div>
  );

  if (loading) return (
     <div className="flex flex-col gap-6 justify-center items-center min-h-[500px]">
        <ImSpinner2 className="text-primary text-4xl animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Analyzing Application Queue</p>
     </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Expansion Protocol</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic">Lab <span className="not-italic text-primary">Applications.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Validate and Authorize Global Facility Integration Requests</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-20 text-center space-y-4">
             <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                <FaFileContract className="text-2xl" />
             </div>
             <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">No Active Integration Requests Found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Facility Origin</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Authority Hub</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Vector Access</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Protocol Phase</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em]">Action Intel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                         <p className="text-sm font-black text-slate-800 tracking-tight leading-none group-hover:text-primary transition-colors uppercase">{app.labName}</p>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                            <FaMapMarkerAlt className="text-[8px]" />
                            <span className="uppercase tracking-widest">{app.cityProvince}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="space-y-1">
                          <p className="text-[11px] font-black text-slate-600 uppercase tracking-tight">{app.ownerName}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{app.ownerEmail}</p>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black text-slate-500 tracking-widest">{app.ownerPhone}</span>
                          <span className="text-[9px] font-bold text-slate-300 italic">SECURE LINE active</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex">
                          {app.status === "pending" ? (
                             <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
                                <FaSpinner className="text-[10px] animate-spin" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Awaiting Intel</span>
                             </div>
                          ) : app.status === "approved" ? (
                             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                                <FaCheckCircle className="text-[10px]" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Authorized</span>
                             </div>
                          ) : (
                             <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg border border-rose-100">
                                <FaTimesCircle className="text-[10px]" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Denied</span>
                             </div>
                          )}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex justify-end gap-2">
                          <button
                            onClick={() => viewApplicationDetails(app)}
                            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-xl rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                          >
                            <FaEye /> Analysis
                          </button>
                          {app.status === "pending" && (
                            <div className="flex gap-2">
                               <button
                                 onClick={() => handleStatusUpdate(app._id, "approved")}
                                 className="p-3 bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl shadow-lg shadow-emerald-100 transition-all"
                               >
                                 <FaCheck />
                               </button>
                               <button
                                 onClick={() => handleStatusUpdate(app._id, "rejected")}
                                 className="p-3 bg-rose-500 text-white hover:bg-rose-600 rounded-xl shadow-lg shadow-rose-100 transition-all"
                               >
                                 <FaTimes />
                               </button>
                            </div>
                          )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default LabApplications;