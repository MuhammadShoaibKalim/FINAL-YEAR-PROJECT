import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash, FaFingerprint, FaUserCircle, FaEnvelope, FaKey, FaShieldAlt, FaIdBadge, FaCheckCircle, FaTimesCircle, FaCamera } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const schema = yup.object().shape({
  firstName: yup.string().required("Identity signature required: First Name"),
  lastName: yup.string().required("Identity signature required: Last Name"),
  email: yup.string().email("Payload Error: Invalid email sequence").required("Transmission vector required: Email"),
  password: yup
    .string()
    .min(8, "Entropy low: 8+ characters required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Complexity fail: Mix A, a, 1, @ required"
    )
    .when("isEdit", {
      is: false,
      then: (schema) => schema.required("Security key required for new integration"),
      otherwise: (schema) => schema.notRequired(),
    }),
  role: yup.string().required("Access hierarchy level required"),
});

const AddLabAdminForm = ({ onSubmit, onCancel, user }) => {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      isEdit: !!user,
    },
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || user.name?.split(' ')[0] || "");
      setValue("lastName", user.lastName || user.name?.split(' ')[1] || "");
      setValue("email", user.email || "");
      setValue("password", "");
      setValue("role", user.role || "");
      setProfileImagePreview(user.image || "");
    }
  }, [user, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return alert("Resource limit: 5MB Max");
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (formData) => {
    setSubmitting(true);
    const finalFormData = new FormData();
    for (const key in formData) {
      if (key !== "isEdit") finalFormData.append(key, formData[key]);
    }
    if (profileImageFile) {
      finalFormData.append("profileImage", profileImageFile);
    }
    if (user) {
      finalFormData.append("_id", user.id || user._id);
    }
    try {
      await onSubmit(finalFormData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-12">
        <div className="flex flex-col md:flex-row gap-12">
           {/* Visual Identification Sidebar */}
           <div className="md:w-1/3 space-y-8">
              <div className="space-y-2 text-center md:text-left">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50 pb-4 flex items-center gap-3 md:justify-start justify-center">
                    <FaCamera className="text-primary" /> Visual Identity
                 </h4>
              </div>
              <div className="relative group mx-auto md:mx-0 w-48 h-48">
                 <div className="w-full h-full rounded-[3rem] border-4 border-slate-50 shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-500 bg-slate-100 flex items-center justify-center">
                    {profileImagePreview ? (
                       <img src={profileImagePreview} className="w-full h-full object-cover" />
                    ) : (
                       <FaUserCircle className="text-6xl text-slate-200" />
                    )}
                 </div>
                 <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary text-white rounded-2xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer hover:bg-slate-900 transition-all">
                    <FaCamera className="text-sm" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                 </label>
              </div>
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-3">
                 <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <FaShieldAlt /> Security Clearance
                 </div>
                 <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter italic">Identity verification enforced. Visual biometric signature recommended for high-tier integration.</p>
              </div>
           </div>

           {/* Identity Matrix */}
           <div className="flex-1 space-y-10">
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50 pb-4 flex items-center gap-3">
                    <FaFingerprint className="text-primary" /> Credential Matrix
                 </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <div className={`relative flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-6 py-4 ${errors.firstName ? 'border-rose-100 bg-rose-50/20' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                       <input {...register("firstName")} className="w-full bg-transparent outline-none text-[11px] font-black uppercase tracking-wider text-slate-700" placeholder="e.g. JOHN" />
                       <FaIdBadge className="text-slate-300" />
                    </div>
                    {errors.firstName && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.firstName.message}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                    <div className={`relative flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-6 py-4 ${errors.lastName ? 'border-rose-100 bg-rose-50/20' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                       <input {...register("lastName")} className="w-full bg-transparent outline-none text-[11px] font-black uppercase tracking-wider text-slate-700" placeholder="e.g. DOE" />
                       <FaIdBadge className="text-slate-300" />
                    </div>
                    {errors.lastName && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.lastName.message}</p>}
                 </div>

                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Encryption Vector (Email)</label>
                    <div className={`relative flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-6 py-4 ${errors.email ? 'border-rose-100 bg-rose-50/20' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                       <input {...register("email")} className="w-full bg-transparent outline-none text-[11px] font-black uppercase tracking-wider text-slate-700 font-sans" placeholder="ADMIN@NETWORK.GLOBAL" />
                       <FaEnvelope className="text-slate-300" />
                    </div>
                    {errors.email && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.email.message}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Hierarchy (Role)</label>
                    <div className="relative">
                       <select {...register("role")} className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-4 rounded-2xl outline-none text-[11px] font-black uppercase tracking-wider text-slate-700 transition-all appearance-none">
                          <option value="">Select Level...</option>
                          <option value="labadmin">Laboratory Administrator</option>
                          <option value="user">External Population (Patient)</option>
                       </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                          <FaShieldAlt />
                       </div>
                    </div>
                    {errors.role && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.role.message}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{user ? "Override Passkey (Optional)" : "Security Passkey"}</label>
                    <div className={`relative flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-6 py-4 ${errors.password ? 'border-rose-100 bg-rose-50/20' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                       <input 
                         type={showPassword ? "text" : "password"} 
                         {...register("password")} 
                         className="w-full bg-transparent outline-none text-[11px] font-black uppercase tracking-[0.3em] text-slate-700" 
                         placeholder="••••••••" 
                       />
                       <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-300 hover:text-primary transition-colors">
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                       </button>
                    </div>
                    {errors.password && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.password.message}</p>}
                 </div>
              </div>
           </div>
        </div>

        <div className="flex gap-4 pt-10 border-t border-slate-50">
           <button 
             type="submit" 
             disabled={submitting}
             className="flex-1 bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
           >
             {submitting ? <ImSpinner2 className="animate-spin text-lg" /> : <FaCheckCircle className="text-xs" />}
             {user ? 'Synchronize Identity Records' : 'Execute Population Integration'}
           </button>
           <button 
             type="button" 
             onClick={onCancel}
             className="px-12 py-6 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all"
           >
             Abort Protocol
           </button>
        </div>
      </form>
    </div>
  );
};

export default AddLabAdminForm;
