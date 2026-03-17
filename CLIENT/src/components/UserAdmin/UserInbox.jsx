import React, { useEffect, useState } from "react";
import { FaEnvelopeOpenText, FaPaperPlane, FaClock, FaCheckCircle, FaExclamationCircle, FaUserTag } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const UserInbox = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch(`/api/query/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        if (data.success) setQueries(data.queries);
      } catch (error) {
        console.error("Error fetching user queries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center min-h-[400px]">
        <ImSpinner2 className="text-primary text-4xl animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Decrypting Communications</p>
      </div>
    );
  }

  return (
    <div className="p-10 sm:p-16 space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
           <FaEnvelopeOpenText className="text-primary text-2xl" />
           <h2 className="text-3xl font-black text-slate-800 tracking-tight">Clinical <span className="italic text-primary">Inquiries.</span></h2>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Track and manage your secure communications with facilities and support.</p>
      </div>

      {queries.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center space-y-4">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-200 shadow-sm mx-auto">
              <FaPaperPlane className="text-2xl" />
           </div>
           <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">No active transmissions</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Subject Matter</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Transmission</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">System Response</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Protocol Status</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Recipient</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {queries.map((q) => (
                  <tr key={q._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-800 tracking-tight">{q.subject}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-xs">{q.message}</p>
                    </td>
                    <td className="px-8 py-6">
                      {q.response ? (
                        <p className="text-[11px] font-bold text-primary italic leading-relaxed max-w-xs">{q.response}</p>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-300">
                           <FaClock className="text-[10px]" />
                           <span className="text-[9px] font-black uppercase tracking-widest italic">Awaiting Response</span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 capitalize">
                      <div className="flex">
                        {q.status === "unviewed" && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg">
                            <FaExclamationCircle className="text-[10px]" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Pending</span>
                          </div>
                        )}
                        {q.status === "viewed" && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-600 rounded-lg">
                            <FaEnvelopeOpenText className="text-[10px]" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Received</span>
                          </div>
                        )}
                        {q.status === "responded" && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                            <FaCheckCircle className="text-[10px]" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Responded</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center">
                            <FaUserTag className="text-[10px] text-slate-400" />
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{q.responder || "Support"}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInbox;