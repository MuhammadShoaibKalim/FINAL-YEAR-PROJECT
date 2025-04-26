import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaFlask, FaClipboardList, FaCog, FaEnvelope, FaHospitalUser, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";

const Sidebar = ({ links, title, onLogout }) => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`flex flex-col min-h-screen ${isOpen ? 'w-[240px]' : 'w-16'} transition-all duration-300 bg-primary text-white shadow-lg`}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-white">
        {isOpen && <h1 className="text-xl font-bold">{title}</h1>}
      </div>

      <ul className="space-y-2 py-4 font-medium">
        {links.map(({ to, Icon, label, onClick }) => (
          <li key={label}>
            {onClick ? (
              <button
                onClick={onClick}
                className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-200 w-full text-left"
              >
                <Icon className="text-xl" />
                {isOpen && <span>{label}</span>}
              </button>
            ) : (
              <Link
                to={to}
                className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-200"
              >
                <Icon className="text-xl" />
                {isOpen && <span>{label}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-gray">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-start w-full py-4 hover:bg-primary/90 hover:text-white transition-all duration-200"
        >
          <GoSidebarExpand className="text-2xl ml-4" />
        </button>
      </div>
    </div>
  );
};

export const SuperAdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; 
  };

  const links = [
    { to: "/admin/super/overview", Icon: MdOutlineDashboard, label: "Overview" },
    { to: "/admin/super/users", Icon: FaUsers, label: "Users" },
    { to: "/admin/super/labs", Icon: FaFlask, label: "Labs" },
    { to: "/admin/super/inbox", Icon: MdOutlineMarkUnreadChatAlt, label: "Inbox" },
    { to: "/admin/super/settings", Icon: FaCog, label: "Settings" },
    { to: "#", Icon: FaSignOutAlt, label: "Logout", onClick: handleLogout }, 
  ];

  return <Sidebar links={links} title="Super Admin" />;
};

const LabSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const links = [
    { to: "/labadmin/lab/profile", Icon: FaHospitalUser, label: "Profile" },
  { to: "/labadmin/lab", Icon: MdOutlineDashboard, label: "Dashboard" },
  { to: "/labadmin/lab/tests", Icon: FaFlask, label: "Offered Tests" },
  { to: "/labadmin/lab/orders", Icon: FaClipboardList, label: "Orders" },
  { to: "/labadmin/lab/messages", Icon: FaEnvelope, label: "Messages" },
  // { to: "/labadmin/lab/settings", Icon: FaCog, label: "Settings" },
  { to: "#", Icon: FaSignOutAlt, label: "Logout", onClick: handleLogout }
  ];

  return <Sidebar links={links} title="Lab Admin" />;
};

export default LabSidebar;
