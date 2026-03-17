import React, { useState } from "react";
import { toast } from "sonner";
import { FaSpinner, FaHospital, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Join = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerCNIC: "",
    ownerAddress: "",
    labName: "",
    labAddress: "",
    labPhone: "",
    cityProvince: "",
    labRegistrationNumber: "",
    labSpecialties: [],
    hasInternet: false,
    hasBookingSoftware: false,
    bookingSoftwareName: "",
    staffCount: "",
    offersHomeCollection: false,
    labLicense: null
  });

  const specialties = [
    "Blood Tests", "Hormones", "Thyroid", "Diabetes", "Cardiac",
    "Liver Function", "Kidney Function", "Urine Analysis", "Microbiology", "Pathology"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      if (name === "labSpecialties") {
        const updatedSpecialties = checked
          ? [...formData.labSpecialties, value]
          : formData.labSpecialties.filter(item => item !== value);
        setFormData(prev => ({ ...prev, labSpecialties: updatedSpecialties }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      const { ownerName, ownerEmail, ownerPhone, ownerCNIC, ownerAddress } = formData;
      if (!ownerName || !ownerEmail || !ownerPhone || !ownerCNIC || !ownerAddress) {
        toast.error("Please fill all owner details");
        return;
      }
    }
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === "labSpecialties") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch("/api/labs/apply", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully!");
        setStep(1);
        setFormData({
          ownerName: "", ownerEmail: "", ownerPhone: "", ownerCNIC: "", ownerAddress: "",
          labName: "", labAddress: "", labPhone: "", cityProvince: "", labRegistrationNumber: "",
          labSpecialties: [], hasInternet: false, hasBookingSoftware: false,
          bookingSoftwareName: "", staffCount: "", offersHomeCollection: false, labLicense: null
        });
      } else {
        toast.error(data.message || "Failed to submit application");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-secondary min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block"
          >
            Laboratory Partnership
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-text-dark mb-6 tracking-tight"
          >
            Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">TestSahulat</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Scale your diagnostic services with Pakistan's most advanced AI-integrated healthcare system.
          </motion.p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center w-full">
            <div className="flex flex-col items-center flex-1 relative">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg transition-all duration-500 ${step >= 1 ? 'bg-primary text-white shadow-primary/30 scale-110' : 'bg-white text-gray border border-border text-gray-400'}`}>
                <FaUserTie />
              </div>
              <span className={`text-[10px] sm:text-xs mt-3 font-bold uppercase tracking-widest transition-colors ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>Owner Info</span>
            </div>
            
            <div className="flex-1 h-1 mx-4 rounded-full bg-border overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: step >= 2 ? "100%" : "0%" }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg transition-all duration-500 ${step >= 2 ? 'bg-primary text-white shadow-primary/30 scale-110' : 'bg-white text-gray border border-border'}`}>
                <FaHospital />
              </div>
              <span className={`text-[10px] sm:text-xs mt-3 font-bold uppercase tracking-widest transition-colors ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Lab Details</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-border-light relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <FaHospital className="text-[12rem] -rotate-12" />
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-16 relative z-10">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="flex items-center gap-6 mb-2">
                  <div className="w-1.5 h-10 bg-primary rounded-full"></div>
                  <div>
                    <h2 className="text-2xl font-black text-text-dark">Owner Information</h2>
                    <p className="text-text-tertiary text-sm">Professional details for identity verification.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Full Name</label>
                    <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required placeholder="e.g. Ahmad Ali" 
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Email Address</label>
                    <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} required placeholder="owner@test.com"
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Phone Number</label>
                    <input type="tel" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} required placeholder="03XXXXXXXXX"
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">CNIC Number</label>
                    <input type="text" name="ownerCNIC" value={formData.ownerCNIC} onChange={handleChange} required placeholder="42XXXXXXXXXXX"
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Residential Address</label>
                    <textarea name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} required rows="3" placeholder="Street address, City, Area"
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark resize-none" />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="button" onClick={nextStep} 
                    className="group px-12 py-5 bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/30 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3">
                    Continue to Lab Details <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="flex items-center gap-6 mb-2">
                  <div className="w-1.5 h-10 bg-secondary rounded-full"></div>
                  <div>
                    <h2 className="text-2xl font-black text-text-dark">Operational Details</h2>
                    <p className="text-text-tertiary text-sm">Configure your laboratory's digital profile.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Lab Name</label>
                    <input type="text" name="labName" value={formData.labName} onChange={handleChange} required 
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Lab Contact</label>
                    <input type="tel" name="labPhone" value={formData.labPhone} onChange={handleChange} required 
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">City & Province</label>
                    <input type="text" name="cityProvince" value={formData.cityProvince} onChange={handleChange} required 
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">License No.</label>
                    <input type="text" name="labRegistrationNumber" value={formData.labRegistrationNumber} onChange={handleChange} 
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Lab Physical Address</label>
                    <textarea name="labAddress" value={formData.labAddress} onChange={handleChange} required rows="2"
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark resize-none" />
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Key Specialties</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {specialties.map((s) => (
                        <label key={s} className={`flex items-center justify-center px-3 py-2.5 rounded-xl border text-center transition-all cursor-pointer ${formData.labSpecialties.includes(s) ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-white border-border-light text-text-tertiary hover:border-primary/50'}`}>
                          <input type="checkbox" name="labSpecialties" value={s} checked={formData.labSpecialties.includes(s)} onChange={handleChange} className="hidden" />
                          <span className="text-[10px] uppercase font-bold tracking-tight">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Staff Count</label>
                    <input type="number" name="staffCount" value={formData.staffCount} onChange={handleChange} required min="1"
                      className="w-full px-6 py-4 bg-bg-secondary border border-border-light rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-text-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Registration Certificate</label>
                    <div className="relative group">
                      <input type="file" name="labLicense" onChange={handleChange} required accept=".pdf,.jpg,.jpeg,.png"
                        className="w-full text-xs text-text-tertiary file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-primary/5 file:text-primary hover:file:bg-primary/10 transition-all" />
                    </div>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 italic">
                    <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer border-2 transition-all ${formData.hasInternet ? 'bg-primary/5 border-primary shadow-sm' : 'bg-bg-secondary border-transparent'}`}>
                      <input type="checkbox" name="hasInternet" checked={formData.hasInternet} onChange={handleChange} className="w-5 h-5 accent-primary cursor-pointer" />
                      <div>
                        <span className="text-xs font-black text-text-dark uppercase block">Internet</span>
                        <span className="text-[10px] text-text-tertiary">Broadband Available</span>
                      </div>
                    </label>
                    <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer border-2 transition-all ${formData.offersHomeCollection ? 'bg-secondary/5 border-secondary shadow-sm' : 'bg-bg-secondary border-transparent'}`}>
                      <input type="checkbox" name="offersHomeCollection" checked={formData.offersHomeCollection} onChange={handleChange} className="w-5 h-5 accent-secondary cursor-pointer" />
                      <div>
                        <span className="text-xs font-black text-text-dark uppercase block">Home Sampling</span>
                        <span className="text-[10px] text-text-tertiary">Fleet Operations</span>
                      </div>
                    </label>
                    <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer border-2 transition-all ${formData.hasBookingSoftware ? 'bg-primary/5 border-primary shadow-sm' : 'bg-bg-secondary border-transparent'}`}>
                      <input type="checkbox" name="hasBookingSoftware" checked={formData.hasBookingSoftware} onChange={handleChange} className="w-5 h-5 accent-primary cursor-pointer" />
                      <div>
                        <span className="text-xs font-black text-text-dark uppercase block">Digitalized</span>
                        <span className="text-[10px] text-text-tertiary">Uses Lab Software</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-8 border-t border-border-light">
                  <button type="button" onClick={prevStep} className="px-10 py-5 text-text-secondary font-black rounded-2xl hover:bg-bg-tertiary transition-all uppercase text-xs">Back</button>
                  <button type="submit" disabled={loading}
                    className="flex-1 px-12 py-5 bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/30 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    {loading ? <FaSpinner className="animate-spin text-xl" /> : <><FaCheckCircle /> Complete Application</>}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;
