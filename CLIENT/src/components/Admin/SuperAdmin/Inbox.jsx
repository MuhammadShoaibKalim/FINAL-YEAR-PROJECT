import React, { useState } from "react";
import { FaEye, FaTrashAlt, FaReply } from "react-icons/fa";

const initialMessages = [
  {
    id: '654806c16b6b48095b3aaa',
    subject: 'Issue with test result',
    sender: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    message: 'I’m facing an issue with my test result, can you help?',
    isRead: false,
    response: '',
  },
  {
    id: '554806c16b6b48095b3bbb',
    subject: 'Inquiry about lab availability',
    sender: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    message: 'Is the lab available for booking next week?',
    isRead: true,
    response: 'Yes, the lab is available for booking next week.',
  },
];


const AdminDashboard = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [isAddingMessage, setIsAddingMessage] = useState(false);
  const [editMessage, setEditMessage] = useState(null);

  const addMessage = (newMessage) => {
    setMessages([...messages, { ...newMessage, id: Date.now().toString(), isRead: false }]);
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter((message) => message.id !== messageId));
  };

  const handleReplyMessage = (messageId, response) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, response, isRead: true } : msg
      )
    );
  };

  const handleViewMessage = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-8xl">

   
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Super Admin Query</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-primary text-white text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Response</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className={`border-b hover:bg-gray-100 ${message.isRead ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <td className="px-4 py-2">{message.sender}</td>
                  <td className="px-4 py-2">{message.subject}</td>
                  <td className="px-4 py-2 truncate">{message.message}</td>
                  <td className="px-4 py-2 truncate">{message.response || "No response yet"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => handleViewMessage(message.id)}
                    >
                      <FaEye color={message.isRead ? 'green' : 'gray'} />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => setEditMessage(message)}
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
          <h3 className="text-xl font-semibold mb-4">Reply to {editMessage.sender}</h3>
          <textarea
            defaultValue={editMessage.response}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            placeholder="Type your reply here"
            onChange={(e) => setEditMessage({ ...editMessage, response: e.target.value })}
          />
          <button
            onClick={() => handleReplyMessage(editMessage.id, editMessage.response)}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Send Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
