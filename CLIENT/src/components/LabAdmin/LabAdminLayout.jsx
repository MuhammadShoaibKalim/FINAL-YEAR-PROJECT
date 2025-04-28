import { Outlet } from "react-router-dom";
import LabSidebar from "./LabSidebar"; 
import { useEffect, useState } from "react";

const LabAdminLayout = () => {
  const [unreadCount, setUnreadCount] = useState(0);


  const fetchUnread = async () => {
    try {
      const res = await fetch("/api/labadmin/inbox", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch inbox messages");
      }
  
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
    <div className="flex">
      <LabSidebar unreadCount={unreadCount} />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default LabAdminLayout;
