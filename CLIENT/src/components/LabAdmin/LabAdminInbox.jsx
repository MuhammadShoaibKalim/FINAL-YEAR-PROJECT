import React, { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaReply, FaEnvelopeOpenText, FaPaperPlane, FaClock, FaCheckCircle, FaExclamationCircle, FaUserShield, FaInbox, FaArrowRight } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-hot-toast";

const LabAdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [superAdminMessages, setSuperAdminMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editMessage, setEditMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };

  const fetchData = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        headers: { ...authHeader, ...(options.headers || {}) },
        ...options,
      });
      return await res.json();
    } catch (err) {
      console.error(`Error fetching ${url}:`, err);
      return null;
    }
  };

  const fetchInbox = async () => {
    setLoading(true);
    const data = await fetchData("/api/query/inbox");
    if (data?.success && Array.isArray(data.inboxMessages)) {
      setMessages(data.inboxMessages);
      setUnreadCount(data.inboxMessages.filter((m) => m.status === "unviewed").length);
    } else {
      setMessages([]);
      setUnreadCount(0);
    }
    setLoading(false);
  };

  const fetchSuperAdminResponses = async () => {
    const data = await fetchData("/api/query/superadmin-responses");
    if (data?.success && Array.isArray(data.messages)) {
      setSuperAdminMessages(data.messages);
    }
  };

  useEffect(() => {
    fetchInbox();
    fetchSuperAdminResponses();
    const interval = setInterval(() => {
      fetchInbox();
      fetchSuperAdminResponses();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleViewMessage = async (id) => {
    const res = await fetchData(`/api/inbox/view/${id}`, { method: "PATCH" });
    if (res?.success) {
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: "viewed" } : m))
      );
      setUnreadCount((c) => Math.max(c - 1, 0));
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("CRITICAL: Purge this transmission from archives?")) return;
    const res = await fetchData(`/api/inbox/delete/${id}`, { method: "DELETE" });
    if (res) {
      toast.success("Transmission purged successfully");
      setMessages((prev) => prev.filter((m) => m._id !== id));
    }
  };

  const handleReplyMessage = async (id, response) => {
    if (!response.trim()) return toast.error("Response message body is required");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/inbox/reply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({ response }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m._id === id ? { ...m, response, status: "responded" } : m
          )
        );
        toast.success("Clinical response transmitted");
        setEditMessage(null);
        setReplyText("");
      } else {
        const data = await res.json();
        toast.error(data.message || "Transmission failure");
      }
    } catch (err) {
      toast.error("Network protocol fault");
    } finally {
      setSubmitting(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/query/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({
          ...contactFormData,
          message: contactFormData.description,
          receiverType: "support",
          labId: "",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Secure inquiry sent to Super Admin");
        setContactFormData({ name: "", email: "", subject: "", description: "" });
        setShowContactForm(false);
      } else {
        toast.error(data.message || "Inquiry transmission failure");
      }
    } catch (err) {
      toast.error("Security handshake failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Dynamic Header Overlay */}
      <div className="bg-slate-900 rounded-[3rem] p-10 sm:p-16 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/5 backdrop-blur-md">
               <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Security Environment</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none italic">Medical <span className="text-white/40 not-italic">Inbox.</span></h2>
            <p className="text-white/60 font-bold uppercase text-[10px] tracking-[0.4em] max-w-xl leading-loose">Managed secure communication channel for clinical inquiries and administrative synchronization.</p>
          </div>
          <button
            onClick={() => { setShowContactForm(!showContactForm); setEditMessage(null); }}
            className={`px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 active:scale-95 shadow-2xl ${showContactForm ? 'bg-white text-slate-900' : 'bg-primary text-white shadow-primary/20'}`}
          >
            {showContactForm ? <FaInbox /> : <FaUserShield />} {showContactForm ? "View Active Inbox" : "Contact Super Admin"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[500px]">
        {showContactForm ? (
          <div className="p-10 sm:p-20 max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-2 text-center">
               <h3 className="text-3xl font-black text-slate-800 tracking-tight">System Inquiry <span className="italic text-primary">Protocol.</span></h3>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Escalate operational issues directly to global administration.</p>
            </div>
            <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Name</label>
                 <input
                   type="text"
                   placeholder="John Doe"
                   value={contactFormData.name}
                   onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                   required
                   className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-5 rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                 <input
                   type="email"
                   placeholder="admin@lab.com"
                   value={contactFormData.email}
                   onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                   required
                   className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-5 rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all"
                 />
              </div>
              <div className="md:col-span-2 space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Matter</label>
                 <input
                   type="text"
                   placeholder="Security/Operational/Billing..."
                   value={contactFormData.subject}
                   onChange={(e) => setContactFormData(prev => ({ ...prev, subject: e.target.value }))}
                   required
                   className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-5 rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all"
                 />
              </div>
              <div className="md:col-span-2 space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Description</label>
                 <textarea
                   placeholder="Describe your inquiry protocol requirements..."
                   value={contactFormData.description}
                   onChange={(e) => setContactFormData(prev => ({ ...prev, description: e.target.value }))}
                   required
                   rows="6"
                   className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-6 rounded-[2rem] outline-none text-sm font-bold text-slate-700 transition-all resize-none"
                 />
              </div>
              <div className="md:col-span-2 pt-6">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {submitting ? <ImSpinner2 className="animate-spin text-lg" /> : <FaPaperPlane className="text-xs" />} Initialize Inquiry Transmission
                </button>
              </div>
            </form>
          </div>
        ) : editMessage ? (
          <div className="p-10 sm:p-20 max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
             <div className="space-y-2">
                <button onClick={() => setEditMessage(null)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all flex items-center gap-2 mb-8">
                   <FaArrowRight className="rotate-180" /> Back to Archives
                </button>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                      <FaReply />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">Response <span className="italic text-primary">Deployment.</span></h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Responding to: {editMessage.subject}</p>
                   </div>
                </div>
             </div>

             <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-200/50 pb-4">
                   <span>Originating Transmission</span>
                   <span>From: {editMessage.name}</span>
                </div>
                <p className="text-sm font-bold text-slate-600 leading-relaxed italic">"{editMessage.message}"</p>
             </div>

             <div className="space-y-4 pt-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Response Payload</label>
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-8 rounded-[2rem] outline-none text-sm font-bold text-slate-700 transition-all resize-none"
                  rows="8"
                  placeholder="Type your clinical response deployment here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => handleReplyMessage(editMessage._id, replyText)}
                    disabled={submitting}
                    className="flex-1 bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {submitting ? <ImSpinner2 className="animate-spin text-lg" /> : <FaPaperPlane className="text-xs" />} Confirm & Deploy Response
                  </button>
                  <button
                    onClick={() => setEditMessage(null)}
                    className="px-10 py-6 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="p-0 border-none">
            {loading ? (
              <div className="flex flex-col gap-6 justify-center items-center min-h-[400px]">
                <ImSpinner2 className="text-primary text-4xl animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Decrypting Transmissions</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Origin Source</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Subject Matter</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Transmission Payload</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Protocol Status</th>
                      <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em]">Action Hub</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-8 py-20 text-center space-y-4">
                           <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                              <FaEnvelopeOpenText className="text-2xl" />
                           </div>
                           <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Global Inbox Synchronized (0 Active)</p>
                        </td>
                      </tr>
                    ) : (
                      messages.map((msg) => (
                        <tr
                          key={msg._id}
                          className={`hover:bg-slate-50 transition-colors group ${msg.status === "unviewed" ? "bg-primary/[0.02]" : ""}`}
                        >
                          <td className="px-8 py-6">
                            <div className="space-y-1">
                               <p className={`text-sm tracking-tight ${msg.status === "unviewed" ? "font-black text-slate-900" : "font-bold text-slate-600"}`}>{msg.name}</p>
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{msg.email}</p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                             <p className={`text-xs uppercase tracking-widest ${msg.status === "unviewed" ? "font-black text-primary" : "font-bold text-slate-400"}`}>{msg.subject}</p>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-xs">{msg.message}</p>
                          </td>
                          <td className="px-8 py-6 capitalize">
                            <div className="flex">
                              {msg.status === "unviewed" && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg">
                                  <FaExclamationCircle className="text-[10px]" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Pending</span>
                                </div>
                              )}
                              {msg.status === "viewed" && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-600 rounded-lg">
                                  <FaEnvelopeOpenText className="text-[10px]" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Archived</span>
                                </div>
                              )}
                              {msg.status === "responded" && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                                  <FaCheckCircle className="text-[10px]" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Responded</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-end gap-2">
                              <button
                                title="Sync View Protocol"
                                onClick={() => handleViewMessage(msg._id)}
                                disabled={msg.status !== "unviewed"}
                                className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-xl rounded-xl transition-all disabled:opacity-20 disabled:grayscale"
                              >
                                <FaEye />
                              </button>
                              <button
                                title="Initialize Response"
                                onClick={() => {
                                  setEditMessage(msg);
                                  setReplyText(msg.response || "");
                                  setShowContactForm(false);
                                }}
                                className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-secondary hover:border-secondary/20 hover:shadow-xl rounded-xl transition-all"
                              >
                                <FaReply />
                              </button>
                              <button
                                title="Purge Transmission"
                                onClick={() => handleDeleteMessage(msg._id)}
                                className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100 hover:shadow-xl rounded-xl transition-all"
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
        )}
      </div>

      {/* SuperAdmin Responses Section - Visual Tweak */}
      {!showContactForm && !editMessage && superAdminMessages.length > 0 && (
        <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10 sm:p-16 space-y-10 animate-in fade-in duration-1000">
           <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Support <span className="italic text-primary">Intelligence.</span></h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Archived responses from Super Administrative Hub.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {superAdminMessages.map((m) => (
               <div key={m._id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group">
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs group-hover:bg-primary transition-colors">
                        <FaUserShield />
                     </div>
                     <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg">Status: Deployed</span>
                  </div>
                  <div className="space-y-3">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Subject: {m.subject}</p>
                     <p className="text-sm font-bold text-slate-700 leading-relaxed italic">"{m.response || 'Deployment Pending'}"</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default LabAdminInbox;
