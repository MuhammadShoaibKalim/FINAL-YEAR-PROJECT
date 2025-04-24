import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigate after submitting

const AddCustomTest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "Test", 
    name: "",
    description: "",
    price: "",
    image: null,
    slug: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Custom Test Added:", formData);


    navigate("/LabDashboard/offered-tests");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md mt-16">
      <h2 className="text-2xl font-semibold mb-6">Add Custom Test</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Test Type</span>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="Test">Test</option>
            <option value="Package">Package</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Test Name</span>
          <input
            type="text"
            name="name"
            placeholder="Enter test name"
            className="w-full p-2 border rounded mt-1"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        {formData.type === "Package" && (
          <label className="block">
            <span className="text-gray-700">Tests Included (Slug)</span>
            <input
              type="text"
              name="slug"
              placeholder="Enter test names, separated by commas"
              className="w-full p-2 border rounded mt-1"
              value={formData.slug}
              onChange={handleChange}
              required={formData.type === "Package"}
            />
            <small className="text-gray-500">
              Example: Blood Test, Urine Test, Diabetes Test
            </small>
          </label>
        )}

        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            placeholder="Enter test description"
            className="w-full p-2 border rounded mt-1"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label className="block">
          <span className="text-gray-700">Price ($)</span>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            className="w-full p-2 border rounded mt-1"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Upload Image</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full p-2 border rounded mt-1"
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
          Add Custom Test
        </button>
      </form>
    </div>
  );
};

export default AddCustomTest;
