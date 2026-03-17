import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaUsers, FaFlask, FaSignOutAlt, FaUserCircle, 
  FaShieldAlt, FaChartLine, FaEnvelopeOpenText, 
  FaCog, FaChevronLeft, FaChevronRight, FaDatabase, FaGlobe
} from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/AuthSlice";
import toast from "react-hot-toast";

const SidebarItem = ({ to, Icon, label, isOpen, unreadCount = 0 }) => {
  const baseClasses = "flex items-center gap-4 px-6 py-4 transition-all duration-300 group relative";
  const activeClasses = "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02] z-10 rounded-2xl mx-2";
  const inactiveClasses = "text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl mx-2";

  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <div className={`shrink-0 transition-transform duration-300 ${isOpen ? "group-hover:scale-110" : "mx-auto"}`}>
        <Icon className={isOpen ? "text-lg" : "text-xl"} />
      </div>
      {isOpen && (
        <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap opacity-100 transition-opacity duration-300">
          {label}
        </span>
      )}
      {unreadCount > 0 && (
        <span className={`absolute ${isOpen ? "right-6" : "right-2 top-2"} flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-lg border-2 border-slate-900 group-hover:animate-bounce`}>
          {unreadCount}
        </span>
      )}
    </NavLink>
  );
};

const SuperAdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 1024);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken");
    toast.success("Security Session Terminated");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch("/api/query/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          const unread = data.queries.filter((msg) => msg.status === "unviewed").length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error("Unread fetch fault:", error);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed lg:sticky top-0 left-0 h-screen bg-slate-900 text-white flex flex-col transition-all duration-500 ease-in-out z-50 border-r border-white/5 shadow-2xl ${isOpen ? "w-80" : "w-24"}`}>
      {/* Sidebar Header */}
      <div className="h-24 flex items-center px-8 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl -mr-12 -mt-12"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
            <FaShieldAlt className="text-white text-lg" />
          </div>
          {isOpen && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h1 className="text-base font-black tracking-tight leading-none italic">SuperAdmin</h1>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-primary mt-1">Global Intelligence</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-10 overflow-y-auto scrollbar-hide space-y-2">
        {isOpen && (
           <p className="px-8 pb-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Administrative Layers</p>
        )}
        <SidebarItem to="/admin/super/overview" icon={MdOutlineDashboard} label="System Analytics" isOpen={isOpen} />
        <SidebarItem to="/admin/super/profile" icon={FaUserCircle} label="Admin Identity" isOpen={isOpen} />
        <SidebarItem to="/admin/super/labs" icon={FaFlask} label="Facility Network" isOpen={isOpen} />
        <SidebarItem to="/admin/super/users" icon={FaUsers} label="Patient Population" isOpen={isOpen} />
        <SidebarItem to="/admin/super/inbox" icon={MdOutlineMarkUnreadChatAlt} label="Global Inbox" isOpen={isOpen} unreadCount={unreadCount} />
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pt-6 pb-8 space-y-4">
        <button 
          onClick={handleLogout}
          className={`mx-2 flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all group ${!isOpen && "justify-center"}`}
        >
          <FaSignOutAlt className="shrink-0 transition-transform group-hover:-translate-x-1" />
          {isOpen && <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Logout</span>}
        </button>

        <div className="px-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white/5 hover:bg-white/10 text-white/30 hover:text-white py-3 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/5"
          >
            {isOpen ? <FaChevronLeft className="text-xs" /> : <FaChevronRight className="text-xs" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
