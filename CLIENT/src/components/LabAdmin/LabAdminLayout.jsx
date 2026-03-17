import { Outlet } from "react-router-dom";
import LabSidebar from "./LabSidebar"; 
import { useEffect, useState } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const LabAdminLayout = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useSelector(state => state.auth.user);

  const fetchUnread = async () => {
    try {
      const res = await fetch("/api/labadmin/inbox", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch inbox messages");
  
      const data = await res.json();
      if (data.success) {
        const unread = data.inboxMessages.filter(msg => msg.status === "unviewed").length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching labadmin unread:", error.message);
    }
  };
  
  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <LabSidebar unreadCount={unreadCount} />
      
      <div className="flex-grow flex flex-col min-w-0">
        {/* Elite Top Header */}
        <header className="h-24 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-8 flex-1">
              <div className="hidden md:flex items-center gap-4 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-2xl w-full max-w-md group focus-within:border-primary focus-within:bg-white transition-all">
                 <FaSearch className="text-slate-300 group-focus-within:text-primary" />
                 <input 
                   type="text" 
                   placeholder="Search samples, reports, or patients..." 
                   className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-700 placeholder:text-slate-300 w-full"
                 />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <button className="relative p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-colors border border-slate-100 group">
                 <FaBell className="text-lg" />
                 {unreadCount > 0 && (
                   <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white group-hover:animate-ping" />
                 )}
              </button>

              <div className="h-10 w-px bg-slate-100 mx-2" />

              <div className="flex items-center gap-4 group cursor-pointer">
                 <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-black text-slate-800 tracking-tight leading-none uppercase">{user?.firstName || 'Clinical'} Admin</p>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1 italic">Verified Faculty</p>
                 </div>
                 <div className="w-12 h-12 bg-slate-900 rounded-2xl p-1 shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
                    {user?.image ? (
                       <img src={user.image} className="w-full h-full object-cover rounded-[14px]" alt="Admin" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-white/20">
                          <FaUserCircle className="text-2xl" />
                       </div>
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

export default LabAdminLayout;
