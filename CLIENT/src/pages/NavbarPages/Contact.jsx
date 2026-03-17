import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaPaperPlane, FaSpinner, FaMapMarkerAlt, FaEnvelope, FaWhatsapp, FaShieldAlt, FaHistory, FaChevronDown } from "react-icons/fa";
import { get, post } from "../../Services/ApiEndpoints";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    receiverType: "support",
    labId: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      const { data } = await get("/api/query/labs/all");
      if (data) {
        setLabs(data.labs);
      }
    } catch (error) {
      console.error("Error fetching labs", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await post("/api/query/submit", formData);

      if (data) {
        toast.success("Inquiry transmitted successfully!");
        setFormData({
          name: "",
          email: "",
          receiverType: "support",
          labId: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Communication failure. Please retry.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* Header Section */}
      <div className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px] -mr-48 -mt-48"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[100px] -ml-48 -mb-48"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 leading-none">Global Support Hub</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Connect with <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Clinical Experts.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Our technical and medical support teams are available 24/7 to assist with your diagnostic requirements and platform navigation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="grid grid-cols-1 gap-6 h-full">
              {[
                { icon: <FaMapMarkerAlt />, title: "Clinical Headquarters", detail: "U.O.E Multan Campus, Bosan Road, Multan, Pakistan", sub: "Operational 09:00 - 18:00 PKT" },
                { icon: <FaEnvelope />, title: "Electronic Correspondence", detail: "support@testsahulat.com", sub: "Priority Response: < 2 Hours" },
                { icon: <FaWhatsapp />, title: "Instant Access", detail: "+92 344 7977457", sub: "Verified WhatsApp Business" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary text-xl border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.title}</p>
                      <p className="text-base font-black text-slate-800 tracking-tight leading-snug">{item.detail}</p>
                      <p className="text-[9px] font-bold text-primary uppercase tracking-tighter">{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 <h3 className="text-2xl font-black tracking-tight leading-tight relative z-10">Patient <br /> Safety Protocol</h3>
                 <div className="space-y-6 relative z-10">
                    <div className="flex gap-4">
                       <FaShieldAlt className="text-primary text-2xl shrink-0" />
                       <p className="text-sm font-medium text-slate-400">All communications are encrypted using enterprise-grade SSL protocols for patient data sovereignty.</p>
                    </div>
                    <div className="flex gap-4">
                       <FaHistory className="text-secondary text-2xl shrink-0" />
                       <p className="text-sm font-medium text-slate-400">Response audit logs are maintained for quality assurance and clinical compliance tracking.</p>
                    </div>
                 </div>
                 <div className="pt-4">
                    <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Review Privacy Policy</button>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 sm:p-16 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 h-full">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Transmission Portal</h2>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Fill the clinical inquiry form below for priority routing</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-2xl px-6 py-4">
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-transparent outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verified Email</label>
                    <div className="flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-2xl px-6 py-4">
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="patient@verify.com"
                        className="w-full bg-transparent outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Routing Department</label>
                      <div className="relative group">
                          <select
                            name="receiverType"
                            value={formData.receiverType}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white transition-all duration-300 rounded-2xl px-6 py-4 outline-none text-sm font-bold text-slate-700 appearance-none cursor-pointer"
                          >
                            <option value="support">Central Support Team</option>
                            <option value="labadmin">Laboratory Administrator</option>
                          </select>
                          <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
                      </div>
                   </div>

                   {formData.receiverType === "labadmin" && (
                    <div className="space-y-1 animate-in slide-in-from-left duration-300">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Facility</label>
                      <div className="relative group">
                          <select
                            name="labId"
                            value={formData.labId}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white transition-all duration-300 rounded-2xl px-6 py-4 outline-none text-sm font-bold text-slate-700 appearance-none cursor-pointer"
                          >
                            <option value="">-- Choose Laboratory --</option>
                            {labs.map((lab) => (
                              <option key={lab._id} value={lab._id}>{lab.name}</option>
                            ))}
                          </select>
                          <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {formData.receiverType !== "labadmin" && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Matter</label>
                      <div className="flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-2xl px-6 py-4">
                        <input
                          name="subject"
                          type="text"
                          required={formData.receiverType !== "labadmin"}
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Technical Support / Billing"
                          className="w-full bg-transparent outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Content</label>
                  <div className="bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-[2rem] px-6 py-6 font-mono">
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Detail your clinical or technical inquiry here..."
                      className="w-full bg-transparent outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 min-h-[200px] resize-none scrollbar-hide"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Encrypting & Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" />
                      Transmit Clinical Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
