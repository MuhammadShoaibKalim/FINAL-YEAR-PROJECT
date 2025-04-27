import React, { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaReply } from "react-icons/fa";


const LabAdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [editMessage, setEditMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    fetchInbox();
  }, []);

  const fetchInbox = async () => {
    try {
      const res = await fetch("/api/labadmin/inbox", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.inboxMessages);

        // Calculate unread
        const unread = data.inboxMessages.filter(msg => msg.status === "unviewed").length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching inbox:", error);
    }
  };


  const handleReplyMessage = async (messageId, response) => {
    try {
      const res = await fetch(`/api/labadmin/respond/${messageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ response }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(
          messages.map((msg) =>
            msg._id === messageId ? { ...msg, response: data.query.response, status: "responded" } : msg
          )
        );
        setEditMessage(null);
      }
    } catch (error) {
      console.error("Error replying:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const res = await fetch(`/api/query/delete/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (res.ok) {
        setMessages(messages.filter((msg) => msg._id !== messageId));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleViewMessage = async (messageId) => {
    try {
      const res = await fetch(`/api/query/view/${messageId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (res.ok) {
        setMessages(
          messages.map((msg) =>
            msg._id === messageId ? { ...msg, status: "viewed" } : msg
          )
        );

        setUnreadCount(prev => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Error marking as viewed:", error);
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          Lab Admin Inbox
          {unreadCount > 0 && (
            <span className="ml-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount} Unread
            </span>
          )}
        </h2>
      </div>


      <div className="overflow-auto max-w-full">
        <div className="min-w-[800px]">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-primary text-white text-left">
                <th className="px-4 py-2 w-[150px]">Name</th>
                <th className="px-4 py-2 w-[200px]">Subject</th>
                <th className="px-4 py-2 w-[300px]">Message</th>
                <th className="px-4 py-2 w-[300px]">Response</th>
                <th className="px-4 py-2 w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className={`border-b hover:bg-gray-100 ${msg.status === "responded" ? "bg-green-100" : ""
                    }`}
                >
                  <td className="px-4 py-2 break-words">{msg.name}</td>
                  <td className="px-4 py-2 break-words">{msg.subject}</td>
                  <td className="px-4 py-2 break-words">{msg.message}</td>
                  <td className="px-4 py-2 break-words">{msg.response || "No response yet"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-green-500"
                      onClick={() => handleViewMessage(msg._id)}
                      title="Mark as Viewed"
                    >
                      <FaEye />
                    </button>
                    {msg.status === "responded" && (
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteMessage(msg._id)}
                        title="Delete Message"
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                    <button
                      className="text-blue-500"
                      onClick={() => setEditMessage(msg)}
                      title="Reply"
                    >
                      <FaReply />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editMessage && (
        <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
          <h3 className="text-xl font-semibold mb-4">Reply to {editMessage.name}</h3>
          <textarea
            value={editMessage.response || ""}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            placeholder="Type your reply here"
            onChange={(e) =>
              setEditMessage({ ...editMessage, response: e.target.value })
            }
          />
          <button
            onClick={() => handleReplyMessage(editMessage._id, editMessage.response)}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Send Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default LabAdminInbox;
