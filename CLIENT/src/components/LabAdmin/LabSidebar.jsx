import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaFlask, FaClipboardList, FaCog, FaEnvelope, FaHospitalUser, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/AuthSlice"; // Adjust path if needed

const Sidebar = ({ links, title, unreadCount = 0 }) => {
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
    <div className={`flex flex-col min-h-screen ${isOpen ? "w-[240px]" : "w-16"} transition-all duration-300 bg-primary text-white shadow-lg`}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-white">
        {isOpen && <h1 className="text-xl font-bold">{title}</h1>}
      </div>

      <ul className="space-y-2 py-4 font-medium">
        {links.map(({ to, Icon, label, onClick }) => (
          <li key={label}>
            {onClick ? (
              <button
                onClick={onClick}
                className="flex items-center space-x-3 px-4 py-2 hover:bg-white hover:text-black w-full text-left"
              >
                <Icon className="text-xl" />
                {isOpen && (
                  <span className="flex items-center gap-2">
                    {label}
                    {(label.includes('Message') || label.includes('Inbox')) && unreadCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                )}
              </button>
            ) : (
              <Link
                to={to}
                className="flex items-center space-x-3 px-4 py-2 hover:bg-white hover:text-black"
              >
                <Icon className="text-xl" />
                {isOpen && (
                  <span className="flex items-center gap-2">
                    {label}
                    {(label.includes('Message') || label.includes('Inbox')) && unreadCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-white">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-start w-full py-4 hover:bg-primary/90"
        >
          <GoSidebarExpand className="text-2xl ml-4" />
        </button>
      </div>
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
    { to: "/admin/super/overview", Icon: MdOutlineDashboard, label: "Overview" },
    { to: "/admin/super/users", Icon: FaUsers, label: "Users" },
    { to: "/admin/super/labs", Icon: FaFlask, label: "Labs" },
    { to: "/admin/super/inbox", Icon: MdOutlineMarkUnreadChatAlt, label: "Inbox" },
    { to: "/admin/super/settings", Icon: FaCog, label: "Settings" },
    { to: "#", Icon: FaSignOutAlt, label: "Logout", onClick: handleLogout }
  ];

  return <Sidebar links={links} title="Super Admin" unreadCount={unreadCount} />;
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
    { to: "/labadmin/lab/profile", Icon: FaHospitalUser, label: "Profile" },
    { to: "/labadmin/lab", Icon: MdOutlineDashboard, label: "Dashboard" },
    { to: "/labadmin/lab/tests", Icon: FaFlask, label: "Offered Tests" },
    { to: "/labadmin/lab/orders", Icon: FaClipboardList, label: "Orders" },
    { to: "/labadmin/lab/messages", Icon: FaEnvelope, label: "Messages" },
    { to: "#", Icon: FaSignOutAlt, label: "Logout", onClick: handleLogout }
  ];

  return <Sidebar links={links} title="Lab Admin" unreadCount={unreadCount} />;
};

export default LabSidebar;
