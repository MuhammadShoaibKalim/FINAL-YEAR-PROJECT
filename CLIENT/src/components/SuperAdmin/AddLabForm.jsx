import React, { useState, useEffect } from 'react';
import { FaHospital, FaMapMarkedAlt, FaInfoCircle, FaUserShield, FaFlask, FaCheckCircle, FaTimesCircle, FaCloudUploadAlt, FaShieldAlt } from 'react-icons/fa';
import { ImSpinner2 } from "react-icons/im";

const AddLabForm = ({ toggleAddLab, addLab, editLab, editLabDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    location: '',
    description: '',
    isActive: true,
    assignedAdmin: '',
    image: null,
    type: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [labAdmins, setLabAdmins] = useState([]);
  const [error, setError] = useState('');
  const [loadingAdmins, setLoadingAdmins] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/superadmin/labadmins", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        setLabAdmins(data.labAdmins || []);
      } catch (err) {
        console.error("Failed to fetch lab admins", err);
        setError("Network sync error: Unable to retrieve administrative personnel registry.");
      } finally {
        setLoadingAdmins(false);
      }
    };
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (editLab) {
      setFormData({
        name: editLab.name || '',
        address: editLab.address || '',
        location: editLab.location || '',
        description: editLab.description || '',
        isActive: editLab.isActive ?? true,
        assignedAdmin: editLab.labAdmin?._id || editLab.labAdmin || '',
        type: editLab.type || '',
        image: null, 
      });
      setImagePreview(editLab.image || null); 
    }
  }, [editLab]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file && !file.type.startsWith('image/')) {
        setError("Invalid payload: File must be of cryptographic image format.");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setError('');  
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.location || !formData.description || !formData.type || !formData.assignedAdmin) {
      setError("Protocol violation: All required data-fields must be populated.");
      return;
    }

    const formToSend = new FormData();
    formToSend.append("name", formData.name);
    formToSend.append("address", formData.address);
    formToSend.append("location", formData.location);
    formToSend.append("description", formData.description);
    formToSend.append("isActive", formData.isActive ? "true" : "false");
    formToSend.append("assignedAdmin", formData.assignedAdmin);
    formToSend.append("type", formData.type);
    formToSend.append("uploadFolder", "labs");

    if (formData.image) {
      formToSend.append("image", formData.image);
    }

    if (editLab) {
      editLabDetails({ ...editLab, ...formData });
    } else {
      addLab(formToSend);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 animate-in fade-in duration-700">
      {error && (
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex items-center gap-4 text-rose-500 text-[10px] font-black uppercase tracking-widest animate-shake">
           <FaShieldAlt className="shrink-0 text-lg" />
           {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {/* Basic Intelligence */}
        <div className="space-y-8">
           <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <FaHospital className="text-primary" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Node Identification</h4>
           </div>
           
           <FormInputField 
              label="Facility Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. Global Diagnostic Hub Alpha"
              icon={<FaHospital />}
           />

           <div className="grid grid-cols-2 gap-6">
              <FormSelectField 
                label="Node Classification" 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                options={[
                   { value: "Lab", label: "Laboratory Node" },
                   { value: "Hospital", label: "Medical Center" }
                ]}
              />
              <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Status</label>
                 <button 
                   type="button"
                   onClick={() => setFormData(p => ({...p, isActive: !p.isActive}))}
                   className={`w-full py-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest ${formData.isActive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-500'}`}
                 >
                    {formData.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                    {formData.isActive ? 'Active' : 'Halted'}
                 </button>
              </div>
           </div>

           <FormInputField 
              label="Geographical Signature (Location)" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="City, Region"
              icon={<FaMapMarkedAlt />}
           />
        </div>

        {/* Global Mapping & Admin */}
        <div className="space-y-8">
           <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <FaFingerprint />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Personnel & Logistics</h4>
           </div>

           <FormInputField 
              label="Full Physical Multi-Vector Address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              placeholder="Complete facility street address"
              icon={<FaMapMarkedAlt />}
           />

           <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Administrative Authority</label>
              <div className="relative">
                <select 
                  name="assignedAdmin" 
                  value={formData.assignedAdmin} 
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-4 rounded-2xl outline-none text-[11px] font-black uppercase tracking-wider text-slate-700 transition-all appearance-none"
                  disabled={loadingAdmins}
                >
                  <option value="">Authorize Administrator...</option>
                  {labAdmins.map((admin) => (
                    <option key={admin._id} value={admin._id} disabled={admin.isAssigned && admin._id !== editLab?.labAdmin?._id}>
                      {admin.firstName} {admin.lastName} {admin.isAssigned && admin._id !== editLab?.labAdmin?._id ? "(AUTHORIZED ELSEWHERE)" : ""}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                   {loadingAdmins ? <ImSpinner2 className="animate-spin" /> : <FaUserShield />}
                </div>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Facility Intelligence Summary</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-6 rounded-[1.5rem] outline-none text-sm font-bold text-slate-700 transition-all resize-none"
                rows="4"
                placeholder="Synchronize facility capabilities and mission parameters..."
              />
           </div>
        </div>
      </div>

      {/* Visual Identity Upload */}
      <div className="pt-10 border-t border-slate-50">
         <div className="flex items-center gap-8">
            <div className="shrink-0">
               <div className="w-32 h-32 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden group relative flex items-center justify-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FaCloudUploadAlt className="text-3xl text-slate-200" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    name="image" 
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
               </div>
            </div>
            <div className="space-y-2">
               <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Visual Identification</h5>
               <p className="text-[10px] font-bold text-slate-400 leading-relaxed max-w-sm uppercase tracking-tighter">Upload high-resolution facility iconography. Cryptographic imaging (PNG, JPG) enforced.</p>
               <label className="inline-block px-4 py-2 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-[0.2em] cursor-pointer hover:bg-primary transition-colors">
                  Select Visual Payload
                  <input type="file" accept="image/*" name="image" onChange={handleChange} className="hidden" />
               </label>
            </div>
         </div>
      </div>

      <div className="flex gap-4 pt-10 border-t border-slate-50">
        <button 
          type="submit" 
          className="flex-1 bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4"
        >
          {editLab ? <FaCheckCircle /> : <FaCloudUploadAlt />}
          {editLab ? 'Synchronize Record Changes' : 'Initialize Global Integration'}
        </button>
        <button 
          type="button" 
          onClick={toggleAddLab}
          className="px-12 py-6 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Abort Protocol
        </button>
      </div>
    </form>
  );
};

const FormInputField = ({ label, name, value, onChange, placeholder, icon }) => (
  <div className="space-y-2">
     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
     <div className="relative flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-[1.2rem] px-6 py-4">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-[11px] font-black uppercase tracking-wider text-slate-700"
          placeholder={placeholder}
          required
        />
        <div className="text-slate-300">
           {icon}
        </div>
     </div>
  </div>
);

const FormSelectField = ({ label, name, value, onChange, options }) => (
  <div className="space-y-2">
     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
     <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white p-4 rounded-2xl outline-none text-[11px] font-black uppercase tracking-wider text-slate-700 transition-all appearance-none"
          required
        >
          <option value="">Classification...</option>
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
           <FaInfoCircle />
        </div>
     </div>
  </div>
);

export default AddLabForm;
