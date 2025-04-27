import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaFlask, FaSignOutAlt } from "react-icons/fa";
import { GoSidebarExpand } from "react-icons/go";
import { MdOutlineDashboard, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/AuthSlice";
import toast from "react-hot-toast";

const SuperAdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("superSidebarState") === "open";
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    localStorage.setItem("superSidebarState", isOpen ? "open" : "closed");
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(Logout());
    toast.success("Logged out successfully");
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
        console.error("Error fetching unread messages:", error);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 20000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${isOpen ? "w-[240px]" : "w-16"} transition-all duration-300 bg-primary text-white shadow-lg`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white">
        {isOpen && <h1 className="text-xl font-bold text-white">Super Admin</h1>}
      </div>

      {/* Sidebar Menu */}
      <ul className="space-y-2 py-4 font-medium">
        <SidebarItem to="/admin/super/overview" icon={MdOutlineDashboard} label="Overview" isOpen={isOpen} />
        <SidebarItem to="/admin/super/labs" icon={FaFlask} label="Labs" isOpen={isOpen} />
        <SidebarItem to="/admin/super/users" icon={FaUsers} label="Users" isOpen={isOpen} />
        <SidebarItem to="/admin/super/inbox" icon={MdOutlineMarkUnreadChatAlt} label="Inbox" isOpen={isOpen} unreadCount={unreadCount} />
        <SidebarItem to="/admin/super/settings" icon={FiSettings} label="Settings" isOpen={isOpen} />

        {/* Logout Button */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-200 w-full text-left"
          >
            <FaSignOutAlt className="text-xl" />
            {isOpen && <span>Logout</span>}
          </button>
        </li>
      </ul>

      {/* Sidebar Toggle Button */}
      <div className="mt-auto border-t border-white">
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

// Sidebar item with unread count on Inbox
const SidebarItem = ({ to, icon: Icon, label, isOpen, unreadCount = 0 }) => (
  <li>
    <Link to={to} className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-200">
      <Icon className="text-xl" />
      {isOpen && (
        <span className="flex items-center gap-2">
          {label}
          {label === "Inbox" && unreadCount > 0 && (
            <span className="ml-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </span>
      )}
    </Link>
  </li>
);

export default SuperAdminSidebar;
