import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; 
const AddTest = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Test",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Test Added:", formData);
    onClose(); 
  };

  return (
    <div
      className="fixed inset-0 flex items-center md:mb-32 justify-center bg-black bg-opacity-50 "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Test</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Test Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="w-full p-2 border rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
            Add Test
          </button>
          <button type="button" onClick={onClose} className="text-gray-600 mt-2 w-full">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
