import React, { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaReply, FaEnvelopeOpenText, FaPaperPlane, FaClock, FaCheckCircle, FaExclamationCircle, FaUserShield, FaInbox, FaArrowRight, FaFilter } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-hot-toast";

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [editMessage, setEditMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/query/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.queries);
        const unread = data.queries.filter((msg) => msg.status === "unviewed").length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Global transmission sync failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("CRITICAL: Purge this inquiry from global records?")) return;
    try {
      const res = await fetch(`/api/query/delete/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (res.ok) {
        toast.success("Transmission purged successfully");
        setMessages(messages.filter((msg) => msg._id !== messageId));
      } else {
        toast.error("Purge protocol failure");
      }
    } catch (error) {
      toast.error("Security handshake error");
    }
  };

  const handleReplyMessage = async (messageId, response) => {
    if (!response.trim()) return toast.error("Response payload is empty");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/query/respond/${messageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ response }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Clinical response deployed");
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId
              ? { ...msg, response: data.query.response, status: "responded" }
              : msg
          )
        );
        setEditMessage(null);
        setReplyText("");
      } else {
        toast.error(data.message || "Transmission fault");
      }
    } catch (error) {
      toast.error("Network synchronization error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewMessage = async (messageId) => {
    try {
      const res = await fetch(`/api/query/view/${messageId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (res.ok) {
        setMessages(
          messages.map((msg) =>
            msg._id === messageId ? { ...msg, status: "viewed" } : msg
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error marking as viewed:", error);
    }
  };

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[500px]">
      <ImSpinner2 className="text-primary text-4xl animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Decrypting Global Transmissions</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Global Communications</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Command <span className="italic text-primary">Inbox.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Integrated Secure Inquiry and Response Deployment Center</p>
        </div>
        <div className="flex items-center gap-4">
           {unreadCount > 0 && (
              <div className="px-4 py-2 bg-rose-50 text-rose-500 border border-rose-100 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                 <FaExclamationCircle /> {unreadCount} Active Pending
              </div>
           )}
           <button className="p-4 bg-white border border-slate-100 text-slate-400 hover:text-slate-900 rounded-2xl transition-all shadow-sm">
              <FaFilter />
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        {editMessage ? (
           <div className="p-10 sm:p-20 max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
             <div className="space-y-2">
                <button onClick={() => setEditMessage(null)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all flex items-center gap-2 mb-8">
                   <FaArrowRight className="rotate-180" /> Back to Global Records
                </button>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                      <FaReply />
                   </div>
                   <div>
                      <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">Clinical <span className="italic text-primary">Response.</span></h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Identity: {editMessage.name}</p>
                   </div>
                </div>
             </div>

             <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-200/50 pb-4">
                   <span>Originating Payload</span>
                   <span>Subject: {editMessage.subject}</span>
                </div>
                <p className="text-sm font-bold text-slate-600 leading-relaxed italic">"{editMessage.message}"</p>
             </div>

             <div className="space-y-4 pt-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Response Configuration</label>
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-8 rounded-[2rem] outline-none text-sm font-bold text-slate-700 transition-all resize-none shadow-sm"
                  rows="8"
                  placeholder="Type your global response deployment payload..."
                  value={editMessage.response || ""}
                  onChange={(e) => setEditMessage({ ...editMessage, response: e.target.value })}
                />
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => handleReplyMessage(editMessage._id, editMessage.response)}
                    disabled={submitting}
                    className="flex-1 bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {submitting ? <ImSpinner2 className="animate-spin text-lg" /> : <FaPaperPlane className="text-xs" />} Deploy Response Payload
                  </button>
                  <button
                    onClick={() => setEditMessage(null)}
                    className="px-10 py-6 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Abort Protocol
                  </button>
                </div>
             </div>
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Identity Origin</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Subject Analysis</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Inquiry Data</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Protocol Status</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em]">Action Intel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center space-y-4">
                       <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                          <FaEnvelopeOpenText className="text-2xl" />
                       </div>
                       <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Global Transmission Records Blank</p>
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr
                      key={msg._id}
                      className={`hover:bg-slate-50 transition-colors group ${msg.status === "unviewed" ? "font-black bg-primary/[0.02]" : ""}`}
                    >
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                           <p className={`text-sm tracking-tight ${msg.status === "unviewed" ? "text-slate-900" : "text-slate-600 font-bold"}`}>{msg.name}</p>
                           <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">{msg._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className={`text-[10px] uppercase font-black tracking-widest ${msg.status === 'unviewed' ? 'text-primary' : 'text-slate-400'}`}>
                            {msg.subject || "No Subject"}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-sm line-clamp-2">{msg.message}</p>
                      </td>
                      <td className="px-8 py-6 capitalize">
                        <div className="flex">
                           {msg.status === "unviewed" && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
                                 <FaExclamationCircle className="text-[10px]" />
                                 <span className="text-[9px] font-black uppercase tracking-widest">Pending</span>
                              </div>
                           )}
                           {msg.status === "viewed" && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-600 rounded-lg border border-sky-100">
                                 <FaEnvelopeOpenText className="text-[10px]" />
                                 <span className="text-[9px] font-black uppercase tracking-widest">Archived</span>
                              </div>
                           )}
                           {msg.status === "responded" && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                                 <FaCheckCircle className="text-[10px]" />
                                 <span className="text-[9px] font-black uppercase tracking-widest">Responded</span>
                              </div>
                           )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          <button
                            title="Analyze Inquiry"
                            onClick={() => handleViewMessage(msg._id)}
                            disabled={msg.status !== "unviewed"}
                            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-xl rounded-xl transition-all disabled:opacity-20"
                          >
                            <FaEye />
                          </button>
                          <button
                            title="Initialize Response"
                            onClick={() => setEditMessage(msg)}
                            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-secondary hover:border-secondary/20 hover:shadow-xl rounded-xl transition-all"
                          >
                            <FaReply />
                          </button>
                          <button
                            title="Purge transmission"
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="p-3 bg-white border border-slate-100 text-slate-200 hover:text-rose-500 hover:border-rose-100 hover:shadow-xl rounded-xl transition-all"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInbox;
