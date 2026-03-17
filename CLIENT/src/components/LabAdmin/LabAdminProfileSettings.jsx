import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaPhoneAlt, FaFlask, FaRegAddressCard, FaCamera, FaShieldAlt, FaMapMarkerAlt, FaGlobe, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const LabAdminProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingLab, setEditingLab] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [labForm, setLabForm] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [labImagePreview, setLabImagePreview] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resProfile = await fetch("/api/labadmin/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      const dataProfile = await resProfile.json();
      if (dataProfile.success) {
        setProfile(dataProfile.labAdmin);
        setProfileForm({
          firstName: dataProfile.labAdmin.firstName || "",
          lastName: dataProfile.labAdmin.lastName || "",
          phoneNo: dataProfile.labAdmin.phoneNo || "",
          email: dataProfile.labAdmin.email || "",
        });
        setProfileImagePreview(dataProfile.labAdmin.image || "");
      }

      const resLab = await fetch("/api/labadmin/lab", {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      const dataLab = await resLab.json();
      if (dataLab.success) {
        setLab(dataLab.lab);
        setLabForm({
          name: dataLab.lab.name || "",
          location: dataLab.lab.location || "",
          address: dataLab.lab.address || "",
          isActive: dataLab.lab.isActive ?? true,
        });
        setLabImagePreview(dataLab.lab.image || "");
      }
    } catch (error) {
      toast.error("Telemetry sync error: Data unreachable");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[500px]">
      <ImSpinner2 className="text-primary text-4xl animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synchronizing Identity Records</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Security Environment</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Facility <span className="italic text-primary">Settings.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Manage Credentials and Diagnostic Center Profiles</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
           <button 
             onClick={() => {setActiveTab("profile"); setEditingProfile(false)}} 
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "profile" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
           >
             Personal Identity
           </button>
           <button 
             onClick={() => {setActiveTab("lab"); setEditingLab(false)}} 
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "lab" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
           >
             Facility Profile
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        {activeTab === "profile" ? (
          <ProfileSection
            profile={profile}
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            profileImagePreview={profileImagePreview}
            setProfileImagePreview={setProfileImagePreview}
            editing={editingProfile}
            setEditing={setEditingProfile}
            fetchData={fetchData}
          />
        ) : (
          <LabSection
            lab={lab}
            labForm={labForm}
            setLabForm={setLabForm}
            labImagePreview={labImagePreview}
            setLabImagePreview={setLabImagePreview}
            editing={editingLab}
            setEditing={setEditingLab}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

const ProfileSection = ({ profile, profileForm, setProfileForm, profileImagePreview, setProfileImagePreview, editing, setEditing, fetchData }) => {
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setProfileImagePreview(URL.createObjectURL(files[0]));
      setProfileForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProfileForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateProfile = async () => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('firstName', profileForm.firstName);
    formData.append('lastName', profileForm.lastName);
    formData.append('email', profileForm.email);
    formData.append('phoneNo', profileForm.phoneNo);
    if (profileForm.profileImage instanceof File) {
      formData.append('profileImage', profileForm.profileImage);
    }

    try {
      const res = await fetch("/api/labadmin/profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Clinical credentials updated successfully.");
        fetchData();
        setEditing(false);
      } else {
        toast.error(data.message || "Credential update fault");
      }
    } catch (error) {
      console.error(error);
      toast.error("Communication error during transmission");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10 sm:p-16 space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
           <div className="w-32 h-32 rounded-[2.5rem] border-4 border-slate-50 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
             <img src={profileImagePreview || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover rounded-[2rem]" />
           </div>
           {editing && (
             <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer hover:bg-slate-900 transition-all">
                <FaCamera className="text-sm" />
                <input type="file" name="profileImage" accept="image/*" className="hidden" onChange={handleChange} />
             </label>
           )}
        </div>
        <div className="text-center md:text-left space-y-1">
           <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none uppercase">{profile?.firstName} <span className="text-primary italic not-uppercase">{profile?.lastName}</span></h3>
           <p className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">System Rank: {profile?.role || 'Admin'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {editing ? (
          <>
            <InputField label="First Name" name="firstName" value={profileForm.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={profileForm.lastName} onChange={handleChange} />
            <InputField label="Email Address" name="email" value={profileForm.email} onChange={handleChange} disabled />
            <InputField label="Phone Contact" name="phoneNo" value={profileForm.phoneNo} onChange={handleChange} />
          </>
        ) : (
          <>
            <ViewField icon={<FaUser />} title="Legal First Name" value={profile?.firstName} />
            <ViewField icon={<FaUser />} title="Legal Last Name" value={profile?.lastName} />
            <ViewField icon={<FaEnvelope />} title="Official Email" value={profile?.email} />
            <ViewField icon={<FaPhoneAlt />} title="Contact Channel" value={profile?.phoneNo} />
          </>
        )}
      </div>

      <div className="pt-6 border-t border-slate-50">
        <ActionButtons 
          editing={editing} 
          onEdit={() => setEditing(true)} 
          onSave={updateProfile} 
          onCancel={() => setEditing(false)} 
          loading={submitting}
        />
      </div>
    </div>
  );
};

const LabSection = ({ lab, labForm, setLabForm, labImagePreview, setLabImagePreview, editing, setEditing, fetchData }) => {
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setLabImagePreview(URL.createObjectURL(files[0]));
      setLabForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setLabForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateLab = async () => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('name', labForm.name);
    formData.append('location', labForm.location);
    formData.append('address', labForm.address);
    formData.append('isActive', labForm.isActive);
    if (labForm.profileImage instanceof File) {
      formData.append('profileImage', labForm.profileImage);
    }

    try {
      const res = await fetch("/api/labadmin/lab", {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Facility records synchronized successfully.");
        fetchData();
        setEditing(false);
      } else {
        toast.error(data.message || "Facility record update fault");
      }
    } catch (error) {
      console.error(error);
      toast.error("Telemetry failure during update");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10 sm:p-16 space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
           <div className="w-56 h-40 rounded-[2.5rem] border-4 border-slate-50 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
             <img src={labImagePreview || "https://via.placeholder.com/300x200"} alt="Lab" className="w-full h-full object-cover" />
           </div>
           {editing && (
             <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary text-white rounded-2xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer hover:bg-slate-900 transition-all">
                <FaCamera className="text-sm" />
                <input type="file" name="profileImage" accept="image/*" className="hidden" onChange={handleChange} />
             </label>
           )}
        </div>
        <div className="text-center md:text-left space-y-3">
           <div className="flex items-center justify-center md:justify-start gap-4">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none uppercase">{lab?.name}</h3>
              {lab?.isActive ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                   <FaCheckCircle className="text-[10px]" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Active Ops</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg">
                   <FaTimesCircle className="text-[10px]" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Halted</span>
                </div>
              )}
           </div>
           <p className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase italic">Facility ID: {lab?._id?.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {editing ? (
          <>
            <InputField label="Facility Name" name="name" value={labForm.name} onChange={handleChange} />
            <InputField label="Major Location" name="location" value={labForm.location} onChange={handleChange} />
            <div className="md:col-span-2">
              <InputField label="Clinical Address" name="address" value={labForm.address} onChange={handleChange} />
            </div>
          </>
        ) : (
          <>
            <ViewField icon={<FaFlask />} title="Facility Designation" value={lab?.name} />
            <ViewField icon={<FaGlobe />} title="Primary Region" value={lab?.location} />
            <div className="md:col-span-2">
              <ViewField icon={<FaMapMarkerAlt />} title="Clinical Baseline Address" value={lab?.address} />
            </div>
          </>
        )}
      </div>

      <div className="pt-6 border-t border-slate-50">
        <ActionButtons 
          editing={editing} 
          onEdit={() => setEditing(true)} 
          onSave={updateLab} 
          onCancel={() => setEditing(false)} 
          loading={submitting}
        />
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

const InputField = ({ label, name, value, onChange, disabled }) => (
  <div className="space-y-2">
     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
     <div className={`flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-2xl px-6 py-4 ${disabled && 'opacity-50 grayscale cursor-not-allowed'}`}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-transparent outline-none text-sm font-bold text-slate-700"
          placeholder={label}
        />
     </div>
  </div>
);

const ActionButtons = ({ editing, onEdit, onSave, onCancel, loading }) => (
  <div className="flex gap-4">
    {!editing ? (
      <button 
        onClick={onEdit} 
        className="px-10 py-5 bg-slate-900 hover:bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200 active:scale-95"
      >
        Initiate Protocol Modification
      </button>
    ) : (
      <>
        <button 
          onClick={onSave} 
          disabled={loading}
          className="px-10 py-5 bg-primary hover:bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? <ImSpinner2 className="animate-spin" /> : <FaShieldAlt className="text-xs" />} Confirm & Synchronize
        </button>
        <button 
          onClick={onCancel} 
          disabled={loading}
          className="px-10 py-5 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
        >
          Abort Changes
        </button>
      </>
    )}
  </div>
);

export default LabAdminProfileSettings;