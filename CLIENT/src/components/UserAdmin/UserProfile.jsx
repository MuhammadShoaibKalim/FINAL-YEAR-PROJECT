import { useSelector } from "react-redux";
import { FaUserCircle, FaEnvelope, FaPhone, FaShieldAlt, FaCalendarCheck } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Profile...</p>
    </div>
  );

  return (
    <div className="p-10 sm:p-16 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-center gap-12 group">
        {/* Profile Image Column */}
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative w-40 h-40 rounded-[2.5rem] p-1.5 border-4 border-slate-50 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-700">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile Avatar"
                className="w-full h-full object-cover rounded-[2rem]"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-[2rem]">
                <FaUserCircle className="text-6xl text-white/20" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary border border-slate-100">
             <FaShieldAlt className="text-xl" />
          </div>
        </div>

        {/* Basic Header Info */}
        <div className="text-center md:text-left space-y-3">
          <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Identity Verified</p>
          </div>
          <h2 className="text-5xl font-black text-slate-800 tracking-tighter italic">
            {user.firstName} <span className="text-slate-400 font-medium not-italic">{user.lastName}</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Patient ID: #{user._id.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
              <FaEnvelope />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
              <p className="text-base font-black text-slate-700 tracking-tight">{user.email}</p>
           </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm border border-slate-100 group-hover:bg-secondary group-hover:text-white transition-all">
              <FaPhone />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
              <p className="text-base font-black text-slate-700 tracking-tight">{user.phoneNo || "Not Provided"}</p>
           </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
              <FaCalendarCheck />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Account Role</p>
              <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-3 py-1 rounded-lg">
                {user.role}
              </span>
           </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm border border-slate-100 group-hover:bg-secondary group-hover:text-white transition-all">
              <FaShieldAlt />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Security Status</p>
              <p className="text-base font-black text-slate-700 tracking-tight italic">Verified Profile</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
