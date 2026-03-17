import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/AuthSlice";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { FaUser, FaPhone, FaCamera, FaShieldAlt } from "react-icons/fa";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phoneNo: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNo: user.phoneNo || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error("Security Context Missing");
      return;
    }

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phoneNo", formData.phoneNo);
    if (file) data.append("image", file);

    setLoading(true);

    try {
      const res = await fetch(`/api/auth/profile/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Identity Records Updated Successfully");
        dispatch(updateUser());
      } else {
        toast.error(result.message || "Credential Update Failure");
      }
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Communication Protocol Fault");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 sm:p-16 space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
           <FaShieldAlt className="text-primary text-2xl" />
           <h2 className="text-3xl font-black text-slate-800 tracking-tight">Security & <span className="italic text-primary">Identity.</span></h2>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Modify your verified patient credentials below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Profile Image Column */}
        <div className="flex flex-col md:flex-row items-center gap-10 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-slate-200 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-500">
              {file ? (
                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover rounded-[1.6rem]" />
              ) : user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover rounded-[1.6rem]" />
              ) : (
                <FaUser className="text-slate-400 text-4xl" />
              )}
            </div>
            <label className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-slate-900 transition-all active:scale-95 border-2 border-white">
                <FaCamera className="text-sm" />
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} disabled={loading} />
            </label>
          </div>
          <div className="space-y-1 text-center md:text-left">
             <p className="text-sm font-black text-slate-800 tracking-tight">Profile Imagery</p>
             <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase italic">PNG, JPG, or WEBP. Max 2MB.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-1">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal First Name</label>
             <div className="flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-2xl px-6 py-4">
                <input
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  className="w-full bg-transparent outline-none text-sm font-bold text-slate-700"
                  disabled={loading}
                />
             </div>
          </div>
          <div className="space-y-1">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Last Name</label>
             <div className="flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-2xl px-6 py-4">
                <input
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  className="w-full bg-transparent outline-none text-sm font-bold text-slate-700"
                  disabled={loading}
                />
             </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Contact Channel</label>
          <div className="flex items-center bg-slate-50 border-2 border-slate-50 focus-within:border-primary focus-within:bg-white transition-all duration-300 rounded-2xl px-6 py-4">
            <FaPhone className="text-slate-300 mr-4 text-sm" />
            <input
              required
              value={formData.phoneNo}
              onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
              placeholder="03XXXXXXXXX"
              className="w-full bg-transparent outline-none text-sm font-bold text-slate-700"
              disabled={loading}
            />
          </div>
        </div>

        <div className="pt-6">
           <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
           >
             {loading ? <ImSpinner2 className="animate-spin text-lg" /> : <FaShieldAlt className="text-xs" />} Confirm Identity Update
           </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
