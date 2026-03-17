import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaUsers, FaFlask, FaClipboardList, FaCog, FaEnvelope, 
  FaHospitalUser, FaSignOutAlt, FaChevronLeft, FaChevronRight,
  FaShieldAlt, FaChartLine, FaBoxOpen, FaBell
} from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/AuthSlice"; 

const SidebarItem = ({ to, Icon, label, isOpen, unreadCount = 0, onClick }) => {
  const baseClasses = "flex items-center gap-4 px-6 py-4 transition-all duration-300 group relative";
  const activeClasses = "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02] z-10 rounded-2xl mx-2";
  const inactiveClasses = "text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl mx-2";

  const content = (
    <>
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
      {isOpen && (
        <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
           <div className={`w-1 h-1 rounded-full bg-white`}></div>
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClasses} ${inactiveClasses} w-[calc(100%-1rem)] text-left`}>
        {content}
      </button>
    );
  }

  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {content}
    </NavLink>
  );
};

const SidebarFooter = ({ isOpen, onToggle, onLogout }) => (
  <div className="mt-auto pt-6 pb-8 space-y-4">
    <button 
      onClick={onLogout}
      className={`mx-2 flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all group ${!isOpen && "justify-center"}`}
    >
      <FaSignOutAlt className="shrink-0 transition-transform group-hover:-translate-x-1" />
      {isOpen && <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Exit</span>}
    </button>

    <div className="px-4">
      <button 
        onClick={onToggle}
        className="w-full bg-white/5 hover:bg-white/10 text-white/30 hover:text-white py-3 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/5"
      >
        {isOpen ? <FaChevronLeft className="text-xs" /> : <FaChevronRight className="text-xs" />}
      </button>
    </div>
  </div>
);

const SidebarContainer = ({ links, title, unreadCount, onLogout }) => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
              <h1 className="text-base font-black tracking-tight leading-none italic">{title}</h1>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-primary mt-1">Operational Hub</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-10 overflow-y-auto scrollbar-hide space-y-2">
        {isOpen && (
          <p className="px-8 pb-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Clinical Navigation</p>
        )}
        {links.map((link) => (
          <SidebarItem 
            key={link.label} 
            {...link} 
            isOpen={isOpen} 
            unreadCount={link.label.includes("Inbox") || link.label.includes("Messages") ? unreadCount : 0} 
          />
        ))}
      </div>

      <SidebarFooter isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} onLogout={onLogout} />
    </div>
  );
};

export const SuperAdminSidebar = ({ unreadCount = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  const links = [
    { to: "/admin/super/overview", Icon: MdOutlineDashboard, label: "Core Overview" },
    { to: "/admin/super/profile", Icon: FaHospitalUser, label: "Admin Identity" },
    { to: "/admin/super/users", Icon: FaUsers, label: "Patient Directory" },
    { to: "/admin/super/labs", Icon: FaFlask, label: "Facility Index" },
    { to: "/admin/super/inbox", Icon: MdOutlineMarkUnreadChatAlt, label: "System Inbox" },
    { to: "/admin/super/settings", Icon: FaCog, label: "Global Config" },
  ];

  return <SidebarContainer links={links} title="SuperAdmin" unreadCount={unreadCount} onLogout={handleLogout} />;
};

const LabSidebar = ({ unreadCount = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  const links = [
    { to: "/labadmin/lab/labdashboard", Icon: MdOutlineDashboard, label: "Command Center" },
    { to: "/labadmin/lab/profile", Icon: FaHospitalUser, label: "Facility Identity" },
    { to: "/labadmin/lab/tests", Icon: FaFlask, label: "Test Catalog" },
    { to: "/labadmin/lab/orders", Icon: FaClipboardList, label: "Sample Pipeline" },
    { to: "/labadmin/lab/messages", Icon: FaEnvelope, label: "Medical Inbox" },
  ];

  return <SidebarContainer links={links} title="LabAdmin" unreadCount={unreadCount} onLogout={handleLogout} />;
};

export default LabSidebar;
