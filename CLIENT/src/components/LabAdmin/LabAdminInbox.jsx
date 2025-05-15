import React, { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaReply } from "react-icons/fa";

const LabAdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [superAdminMessages, setSuperAdminMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editMessage, setEditMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };

  const fetchData = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        headers: { ...authHeader, ...(options.headers || {}) },
        ...options,
      });
      return await res.json();
    } catch (err) {
      console.error(`Error fetching ${url}:`, err);
      return null;
    }
  };

  const fetchInbox = async () => {
    setLoading(true);
    const data = await fetchData("/api/query/inbox");
    if (data?.success && Array.isArray(data.inboxMessages)) {
      setMessages(data.inboxMessages);
      setUnreadCount(data.inboxMessages.filter((m) => m.status === "unviewed").length);
    } else {
      setMessages([]);
      setUnreadCount(0);
      console.warn("Invalid inbox messages");
    }
    setLoading(false);
  };

  const fetchSuperAdminResponses = async () => {
    const data = await fetchData("/api/query/superadmin-responses");
    if (data?.success && Array.isArray(data.messages)) {
      setSuperAdminMessages(data.messages);
    } else {
      setSuperAdminMessages([]);
      console.warn("Invalid superadmin messages");
    }
  };

  useEffect(() => {
    fetchInbox();
    fetchSuperAdminResponses();
    const interval = setInterval(() => {
      fetchInbox();
      fetchSuperAdminResponses();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleViewMessage = async (id) => {
    await fetchData(`/api/inbox/view/${id}`, { method: "PATCH" });
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, status: "viewed" } : m))
    );
    setUnreadCount((c) => Math.max(c - 1, 0));
  };

  const handleDeleteMessage = async (id) => {
    await fetchData(`/api/inbox/delete/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  const handleReplyMessage = async (id, response) => {
    const res = await fetch(`/api/inbox/reply/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify({ response }),
    });

    if (res.ok) {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, response, status: "responded" } : m
        )
      );
      setEditMessage(null);
      setReplyText("");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to send reply.");
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/query/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify({
        ...contactFormData,
        message: contactFormData.description,
        receiverType: "support",
        labId: "",
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Message sent to Super Admin!");
      setContactFormData({ name: "", email: "", subject: "", description: "" });
      setShowContactForm(false);
    } else {
      alert(data.message || "Failed to send message.");
    }
  };

  const ContactForm = (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
      <h3 className="text-xl font-semibold mb-4">Contact Super Admin</h3>
      <form onSubmit={handleContactSubmit} className="space-y-4">
        {["name", "email", "subject"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={contactFormData[field]}
            onChange={(e) =>
              setContactFormData((prev) => ({ ...prev, [field]: e.target.value }))
            }
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        ))}
        <textarea
          name="description"
          placeholder="Message"
          value={contactFormData.description}
          onChange={(e) =>
            setContactFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          required
          rows="5"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg w-full">
          Send Message
        </button>
      </form>
    </div>
  );

  const ReplyForm = (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
      <h3 className="text-xl font-semibold mb-4">
        Reply to: {editMessage?.subject || "No Subject"}
      </h3>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg"
        rows="5"
        placeholder="Type your reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleReplyMessage(editMessage._id, replyText)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send Reply
        </button>
        <button
          onClick={() => setEditMessage(null)}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-8xl">
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg">
        <div>
          <h2 className="text-xl font-semibold">Need Assistance?</h2>
          <p className="text-gray-600">
            Contact the Super Admin for any queries or issues you face.
          </p>
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

      {showContactForm ? (
        ContactForm
      ) : editMessage ? (
        ReplyForm
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
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
            {loading ? (
              <div className="flex justify-center items-center p-10">
                <svg
                  className="animate-spin h-10 w-10 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="min-w-[800px]">
                <table className="w-full text-left border border-gray-300 rounded-md overflow-hidden">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Subject</th>
                      <th className="px-3 py-2">Message</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center p-6 text-gray-500">
                          No Messages Found
                        </td>
                      </tr>
                    ) : (
                      messages.map((msg) => (
                        <tr
                          key={msg._id}
                          className={`border-b ${
                            msg.status === "unviewed" ? "font-semibold" : ""
                          }`}
                        >
                          <td className="px-3 py-2">{msg.name}</td>
                          <td className="px-3 py-2">{msg.email}</td>
                          <td className="px-3 py-2">{msg.subject}</td>
                          <td className="px-3 py-2">{msg.message}</td>
                          <td className="px-3 py-2 capitalize">{msg.status}</td>
                          <td className="px-3 py-2 flex gap-2">
                            <button
                              title="Mark as Viewed"
                              onClick={() => handleViewMessage(msg._id)}
                              disabled={msg.status !== "unviewed"}
                              className="text-primary hover:text-primary-dark disabled:opacity-50"
                            >
                              <FaEye />
                            </button>
                            <button
                              title="Reply"
                              onClick={() => {
                                setEditMessage(msg);
                                setReplyText(msg.response || "");
                                setShowContactForm(false);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaReply />
                            </button>
                            <button
                              title="Delete Message"
                              onClick={() => {
                                if (
                                  window.confirm("Are you sure you want to delete this message?")
                                ) {
                                  handleDeleteMessage(msg._id);
                                }
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LabAdminInbox;
