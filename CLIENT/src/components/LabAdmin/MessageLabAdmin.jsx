import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "User1", text: "Hello, I have an issue with my test report.", status: "Read" },
    { id: 2, sender: "User2", text: "Can you provide details about a specific test?", status: "Read" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "You", 
        text: newMessage,
        status: "Unread", 
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-gray-50 p-6 max-w-7xl mx-auto rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-center">Chat with Users</h2>
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                msg.sender === "You" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-3 rounded-lg border border-gray-300"
        />
        <button
          onClick={handleSendMessage}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Messages;
