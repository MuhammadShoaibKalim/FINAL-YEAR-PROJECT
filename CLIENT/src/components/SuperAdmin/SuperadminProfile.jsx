import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaCamera, FaUser, FaShieldAlt, FaEnvelope, FaFingerprint, FaKey, FaHistory, FaGlobe, FaUserShield } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const SuperadminProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/superadmin/get-settings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          image: data.image || "",
        });
        setImagePreview(data.image || "");
      } else {
        toast.error(data.message || "Credential fetch fault");
      }
    } catch (err) {
      toast.error("Telemetry error during synchronization");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Resource limit exceeded (Max 5MB)");
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("firstName", profile.firstName);
      formData.append("lastName", profile.lastName);
      formData.append("email", profile.email);
      if (selectedFile) formData.append("image", selectedFile);

      const res = await fetch("/api/superadmin/update-settings", {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Identity records synchronized");
        setIsEditing(false);
        setSelectedFile(null);
        fetchProfile();
      } else {
        toast.error(data.message || "Record update fault");
      }
    } catch (err) {
      toast.error("Handshake security fault");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setPasswordError("Primary and confirmation payloads do not match");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(passwords.newPassword)) {
      return setPasswordError("Payload must be 8+ chars and include complex bitmasks (A, a, 1, @)");
    }

    setSubmitting(true);
    setPasswordError("");
    try {
      const res = await fetch("/api/superadmin/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Security keys updated successfully");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(data.message || "Security protocol failure");
      }
    } catch (err) {
      toast.error("Transmission error during key rotation");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[500px]">
      <ImSpinner2 className="text-primary text-4xl animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synchronizing Identity Credentials</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Root Identity</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic">Settings <span className="text-primary not-italic">& Profile.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Manage Global Administrator Credentials & Security Protocols</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
           <button 
             onClick={() => {setActiveTab("profile"); setIsEditing(false)}} 
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "profile" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
           >
             Personal Bio
           </button>
           <button 
             onClick={() => {setActiveTab("password"); setIsEditing(false)}} 
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "password" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
           >
             Security Keys
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        {activeTab === "profile" ? (
          <div className="p-10 sm:p-20 space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
             <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                   <div className="w-40 h-40 rounded-[2.5rem] border-4 border-slate-50 shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-500">
                     <img src={imagePreview || "https://via.placeholder.com/150"} alt="Admin" className="w-full h-full object-cover" />
                   </div>
                   {isEditing && (
                     <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary text-white rounded-2xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer hover:bg-slate-900 transition-all">
                        <FaCamera className="text-sm" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                     </label>
                   )}
                </div>
                <div className="text-center md:text-left space-y-3">
                   <div className="flex items-center justify-center md:justify-start gap-4">
                      <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{profile.firstName} <span className="text-primary italic not-uppercase">{profile.lastName}</span></h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 text-primary rounded-lg">
                        <FaUserShield className="text-[10px]" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Global Root</span>
                      </div>
                   </div>
                   <p className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase italic">Encryption Grade: AES-256 Verified</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                {isEditing ? (
                  <>
                     <InputField label="First Name" value={profile.firstName} onChange={(v) => setProfile(p => ({...p, firstName: v}))} />
                     <InputField label="Last Name" value={profile.lastName} onChange={(v) => setProfile(p => ({...p, lastName: v}))} />
                     <div className="md:col-span-2">
                        <InputField label="Contact Email" value={profile.email} onChange={(v) => setProfile(p => ({...p, email: v}))} />
                     </div>
                  </>
                ) : (
                  <>
                     <ViewField icon={<FaFingerprint />} title="Identity Signature" value={`${profile.firstName} ${profile.lastName}`} />
                     <ViewField icon={<FaEnvelope />} title="Official Terminal Email" value={profile.email} />
                     <ViewField icon={<FaShieldAlt />} title="Access Privilege" value="Root Administrator" />
                     <ViewField icon={<FaGlobe />} title="Deployment Region" value="Global Network" />
                  </>
                )}
             </div>

             <div className="pt-10 border-t border-slate-50 flex gap-4">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="px-10 py-5 bg-slate-900 hover:bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200 active:scale-95"
                  >
                    Initiate Record Modification
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleProfileUpdate} 
                      disabled={submitting}
                      className="px-10 py-5 bg-primary hover:bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center gap-3 disabled:opacity-50"
                    >
                      {submitting ? <ImSpinner2 className="animate-spin" /> : <FaCheckCircle className="text-xs" />} Commit Changes
                    </button>
                    <button 
                      onClick={() => { setIsEditing(false); fetchProfile(); }} 
                      disabled={submitting}
                      className="px-10 py-5 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      Abort Protocol
                    </button>
                  </>
                )}
             </div>
          </div>
        ) : (
          <div className="p-10 sm:p-20 max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
             <div className="space-y-2 text-center">
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Security <span className="italic text-primary">Key Rotation.</span></h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">High-Entropy Passphrase Deployment</p>
             </div>

             <div className="space-y-6">
                <PasswordField 
                  label="Current Access Key" 
                  value={passwords.currentPassword} 
                  onChange={(v) => setPasswords(p => ({...p, currentPassword: v}))}
                  show={showPasswords.current}
                  toggle={() => setShowPasswords(p => ({...p, current: !p.current}))}
                />
                <PasswordField 
                  label="New Synthetic Payload" 
                  value={passwords.newPassword} 
                  onChange={(v) => setPasswords(p => ({...p, newPassword: v}))}
                  show={showPasswords.new}
                  toggle={() => setShowPasswords(p => ({...p, new: !p.new}))}
                />
                <PasswordField 
                  label="Re-Verify Synthetic Payload" 
                  value={passwords.confirmPassword} 
                  onChange={(v) => setPasswords(p => ({...p, confirmPassword: v}))}
                  show={showPasswords.confirm}
                  toggle={() => setShowPasswords(p => ({...p, confirm: !p.confirm}))}
                />
                
                {passwordError && (
                  <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3 text-rose-500 text-[10px] font-black uppercase tracking-widest animate-shake">
                     <FaShieldAlt className="shrink-0" />
                     {passwordError}
                  </div>
                )}

                <button 
                  onClick={handlePasswordChange}
                  disabled={submitting}
                  className="w-full bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50 mt-10"
                >
                  {submitting ? <ImSpinner2 className="animate-spin text-lg" /> : <FaKey className="text-xs" />} Rotate Security Keys
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ViewField = ({ icon, title, value }) => (
  <div className="flex items-start gap-6 bg-slate-50 border border-slate-100 rounded-[2rem] p-8 group hover:bg-white hover:shadow-2xl transition-all duration-500">
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
       {icon}
    </div>
    <div className="space-y-1">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{title}</p>
      <p className="text-base font-black text-slate-800 tracking-tight">{value || "N/A"}</p>
    </div>
  </div>
);

const InputField = ({ label, value, onChange, disabled }) => (
  <div className="space-y-2">
     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
     <div className="flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-2xl px-6 py-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none text-sm font-bold text-slate-700"
          placeholder={label}
        />
     </div>
  </div>
);

const PasswordField = ({ label, value, onChange, show, toggle }) => (
  <div className="space-y-2">
     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
     <div className="relative flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-[2rem] px-8 py-5">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none text-sm font-black tracking-[0.3em] text-slate-700"
          placeholder="••••••••••••"
        />
        <button onClick={toggle} className="p-2 text-slate-300 hover:text-primary transition-colors">
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
     </div>
  </div>
);

export default SuperadminProfile;