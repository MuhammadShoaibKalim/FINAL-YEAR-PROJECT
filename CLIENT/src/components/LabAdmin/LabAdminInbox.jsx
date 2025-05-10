import React, { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaReply, FaBell, FaComments, FaInbox } from "react-icons/fa";

const LabAdminInbox = () => {
  // State management
  const [activeTab, setActiveTab] = useState('userQueries');
  const [userQueries, setUserQueries] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({ userQueries: 0, superAdmin: 0 });
  const [loading, setLoading] = useState({ userQueries: false, superAdmin: false });
  const [replyingTo, setReplyingTo] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, [activeTab]: true }));
        
        const res = await fetch(
          activeTab === 'userQueries' 
            ? "/api/query/user-queries" 
            : "/api/query/superadmin-chat",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
          }
        );
        
        const data = await res.json();
        
        if (data.success) {
          if (activeTab === 'userQueries') {
            setUserQueries(data.queries);
            setUnreadCounts(prev => ({
              ...prev,
              userQueries: data.queries.filter(q => q.status === 'unviewed').length
            }));
          } else {
            setChatMessages(data.messages);
            setUnreadCounts(prev => ({
              ...prev,
              superAdmin: data.messages.filter(m => !m.viewedByLabAdmin).length
            }));
          }
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
      } finally {
        setLoading(prev => ({ ...prev, [activeTab]: false }));
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, [activeTab]);

  // Message handlers
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const res = await fetch("/api/query/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({
          message: newMessage,
          labId: currentLabId,
          isReplyTo: replyingTo?._id
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setChatMessages(prev => [...prev, data.message]);
        setNewMessage("");
        setReplyingTo(null);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleReplyToQuery = async (queryId, response) => {
    try {
      const res = await fetch(`/api/query/respond/${queryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({ response })
      });
      
      const data = await res.json();
      if (data.success) {
        setUserQueries(prev => 
          prev.map(q => 
            q._id === queryId 
              ? { ...q, response: data.response, status: 'responded' } 
              : q
          )
        );
        setReplyingTo(null);
      }
    } catch (error) {
      console.error("Error replying to query:", error);
    }
  };

  // UI Components
  const UserQueriesTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Query</th>
            <th className="p-3 text-left">Response</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userQueries.map(query => (
            <tr 
              key={query._id} 
              className={`border-b ${query.status === 'unviewed' ? 'bg-blue-50' : ''}`}
            >
              <td className="p-3">{query.user?.name || 'Unknown'}</td>
              <td className="p-3">{query.subject}</td>
              <td className="p-3 max-w-xs truncate">{query.message}</td>
              <td className="p-3 max-w-xs truncate">
                {query.response || (
                  <span className="text-gray-400">No response yet</span>
                )}
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  query.status === 'responded' ? 'bg-green-100 text-green-800' :
                  query.status === 'viewed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {query.status}
                </span>
              </td>
              <td className="p-3 flex space-x-2">
                <button 
                  onClick={() => setReplyingTo(query)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Reply"
                >
                  <FaReply />
                </button>
                <button 
                  onClick={() => handleViewQuery(query._id)}
                  className="text-green-500 hover:text-green-700"
                  title="Mark as viewed"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const SuperAdminChat = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg h-96 overflow-y-auto">
        {chatMessages.map(msg => (
          <div 
            key={msg._id} 
            className={`p-3 mb-3 rounded-lg max-w-xs ${msg.sender === 'labadmin' 
              ? 'bg-blue-100 ml-auto' 
              : 'bg-gray-200 mr-auto'}`}
            onClick={() => markChatAsRead(msg._id)}
          >
            <div className="font-medium">{msg.sender === 'labadmin' ? 'You' : 'Super Admin'}</div>
            <div className="whitespace-pre-wrap">{msg.message}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          onClick={handleSendMessage}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Send
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`flex items-center px-4 py-2 ${activeTab === 'userQueries' 
            ? 'border-b-2 border-primary text-primary' 
            : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('userQueries')}
        >
          <FaInbox className="mr-2" />
          User Queries
          {unreadCounts.userQueries > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCounts.userQueries}
            </span>
          )}
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === 'superAdmin' 
            ? 'border-b-2 border-primary text-primary' 
            : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('superAdmin')}
        >
          <FaComments className="mr-2" />
          Super Admin Chat
          {unreadCounts.superAdmin > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCounts.superAdmin}
            </span>
          )}
        </button>
      </div>

      {/* Content Area */}
      {loading[activeTab] ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {activeTab === 'userQueries' ? <UserQueriesTable /> : <SuperAdminChat />}
          
          {/* Reply Modal */}
          {replyingTo && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">
                  {activeTab === 'userQueries' 
                    ? `Reply to ${replyingTo.user?.name || 'User'}`
                    : "Message Super Admin"}
                </h3>
                <textarea
                  className="w-full p-3 border rounded mb-4"
                  rows={4}
                  placeholder="Type your response..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => {
                      setReplyingTo(null);
                      setNewMessage("");
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => activeTab === 'userQueries' 
                      ? handleReplyToQuery(replyingTo._id, newMessage)
                      : handleSendMessage()}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LabAdminInbox;