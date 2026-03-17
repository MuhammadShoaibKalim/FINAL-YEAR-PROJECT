import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";
import { FaBell, FaSearch, FaUserShield, FaGlobe, FaDatabase } from "react-icons/fa";
import { useSelector } from "react-redux";

const SuperAdminLayout = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <SuperAdminSidebar />
      
      <div className="flex-grow flex flex-col min-w-0">
        {/* Global Admin Header */}
        <header className="h-24 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-8 flex-1">
              <div className="hidden md:flex items-center gap-4 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-2xl w-full max-w-lg group focus-within:border-primary focus-within:bg-white transition-all shadow-sm">
                 <FaSearch className="text-slate-300 group-focus-within:text-primary transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search Facility, Patient, or Trace Logs..." 
                   className="bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-widest text-slate-700 placeholder:text-slate-200 w-full"
                 />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-4 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Global Nodes Active</p>
              </div>

              <button className="relative p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-colors border border-slate-100 group">
                 <FaBell className="text-lg" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white group-hover:animate-ping" />
              </button>

              <div className="h-10 w-px bg-slate-100 mx-2" />

              <div className="flex items-center gap-4 group cursor-pointer">
                 <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-black text-slate-800 tracking-tight leading-none uppercase">Root Admin</p>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1 italic">Level 1 Access</p>
                 </div>
                 <div className="w-12 h-12 bg-slate-900 rounded-2xl p-1 shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform flex items-center justify-center">
                    {user?.image ? (
                       <img src={user.image} className="w-full h-full object-cover rounded-[14px]" alt="SuperAdmin" />
                    ) : (
                       <FaUserShield className="text-white/20 text-2xl" />
                    )}
                 </div>
              </div>
           </div>
        </header>

        <main className="flex-grow p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
