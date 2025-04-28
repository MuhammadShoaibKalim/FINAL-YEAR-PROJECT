import React, { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaReply } from "react-icons/fa";

const LabAdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [editMessage, setEditMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  useEffect(() => {
    fetchInbox();
  
    const intervalId = setInterval(() => {
      fetchInbox();
    }, 10000); 
  
    return () => clearInterval(intervalId); 
  }, []);
  

  const fetchInbox = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch("/api/labadmin/inbox", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.inboxMessages);
        const unread = data.inboxMessages.filter(msg => msg.status === "unviewed").length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching inbox:", error);
    } finally {
      setLoading(false); // Always stop loading
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

  const handleContactSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch("/api/query/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          name: contactFormData.name,
          email: contactFormData.email,
          subject: contactFormData.subject,
          message: contactFormData.description,
          receiverType: "support", // Always sending to Super Admin (support)
          labId: "", // No labId needed when contacting Super Admin
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Message sent to Super Admin!");
        setContactFormData({
          name: "",
          email: "",
          subject: "",
          description: "",
        });
        setShowContactForm(false);
      } else {
        alert(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error contacting super admin:", error);
    }
  };
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-7xl">

      {/* Contact Super Admin Section */}
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg">
        <div>
          <h2 className="text-xl font-semibold">Need Assistance?</h2>
          <p className="text-gray-600">Contact the Super Admin for any queries or issues you face.</p>
        </div>
        <button
          onClick={() => {
            setShowContactForm(true);
            setEditMessage(null);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Contact Super Admin
        </button>
      </div>

      {/* Contact Form (Updated) */}
{showContactForm ? (
  <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
    <h3 className="text-xl font-semibold mb-4">Contact Super Admin</h3>
    <form onSubmit={handleContactSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={contactFormData.name}
        onChange={(e) =>
          setContactFormData({ ...contactFormData, name: e.target.value })
        }
        required
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={contactFormData.email}
        onChange={(e) =>
          setContactFormData({ ...contactFormData, email: e.target.value })
        }
        required
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={contactFormData.subject}
        onChange={(e) =>
          setContactFormData({ ...contactFormData, subject: e.target.value })
        }
        required
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      <textarea
        name="description"
        placeholder="Message"
        value={contactFormData.description}
        onChange={(e) =>
          setContactFormData({ ...contactFormData, description: e.target.value })
        }
        required
        rows="5"
        className="w-full p-3 border border-gray-300 rounded-lg"
      ></textarea>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-lg w-full"
      >
        Send Message
      </button>
    </form>
  </div>
) : (
        <>
          {/* Inbox Section */}
          <div className="flex justify-between items-center mb-4">
            {/* <h2 className="text-2xl font-semibold">
              Lab Admin Inbox
              {unreadCount > 0 && (
                <span className="ml-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount} Unread
                </span>
              )}
            </h2> */}
            <div>
  Inbox
  {unreadCount > 0 && (
    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      {unreadCount} Unread
    </span>
  )}
</div>
          </div>

          <div className="overflow-auto max-w-full">
            { loading ? (
    <div className="flex justify-center items-center p-10">
      <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
    </div>
   ):(
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
                          onClick={() => {
                            setEditMessage(msg);
                            setShowContactForm(false);
                          }}
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
            )}
          
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
        </>
      )}
    </div>
  );
      }

export default LabAdminInbox;
