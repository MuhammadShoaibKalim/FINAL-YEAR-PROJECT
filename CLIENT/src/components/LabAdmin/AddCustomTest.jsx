import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-hot-toast";

export default function AddCustomTest({ onClose }) {
  const navigate = useNavigate();
  const [type, setType] = useState("Test");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    tests: [],
  });

  const [availableTests, setAvailableTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await axios.get("/api/tests/get-all-tests");
        setAvailableTests(data.tests || []);
      } catch (error) {
        console.error("Error fetching available tests", error);
      }
    };
    fetchTests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        discount: formData.discount,
      };

      const endpoint =
        type === "Test" ? "/api/tests/add-test" : "/api/tests/add-package";

      if (type === "Package") {
        payload.tests = formData.tests;
      }

      await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      toast.success(`${type} added successfully!`);
      onClose();
    } catch (err) {
      console.error("Error adding test/package", err);
      toast.error("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl mt-16">
      <h2 className="text-3xl font-bold mb-8">Add {type}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Select Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option value="Test">Test</option>
            <option value="Package">Package</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Price (PKR)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            placeholder="Optional"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        {type === "Package" && (
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Select Lab Tests to Include in the Package
            </label>
            <Select
              isMulti
              options={availableTests.map((test) => ({
                value: test._id,
                label: `${test.name} - PKR ${test.price}`,
              }))}
              value={availableTests
                .filter((t) => formData.tests.includes(t._id))
                .map((t) => ({
                  value: t._id,
                  label: `${t.name} - PKR ${t.price}`,
                }))}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  tests: selected.map((opt) => opt.value),
                }))
              }
              placeholder="Choose lab tests to include..."
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <p className="text-sm text-gray-500 mt-1">
              Select multiple tests by typing or clicking
            </p>
          </div>
        )}

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-md w-full"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-md w-full"
          >
            Add {type}
          </button>
        </div>
      </form>
    </div>
  );
}
