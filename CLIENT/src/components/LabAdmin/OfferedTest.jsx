import React, { useState } from "react";
import AddTest from "./AddTest";
import AddCustomTest from "./AddCustomTest";

const initialTests = [
  {
    id: "TEST-001",
    name: "Serum Phosphorus (Ph)",
    type: "Test",
    price: "PKR 2,500.00",
  },
  {
    id: "PROFILE-002",
    name: "Complete Blood Count / Hemogram (CBC)",
    type: "Profile",
    price: "PKR 2,999.00",
  },
  {
    id: "PACKAGE-003",
    name: "Advanced Renal Package",
    type: "Package",
    price: "PKR 5,600.00",
  },
  {
    id: "PACKAGE-004",
    name: "Healthy 2023 Full Body Checkup",
    type: "Package",
    price: "PKR 15,000.00",
  },
];

const OfferedTests = () => {
  const [showAddTest, setShowAddTest] = useState(false);
  const [showAddCustomTest, setShowAddCustomTest] = useState(false);
  const [tests, setTests] = useState(initialTests);
  const [editingTest, setEditingTest] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", type: "", price: "" });

  // Generate a new unique ID based on type
  const generateId = (type) => {
    const prefix = type === "Test" ? "TEST" : "PACKAGE";
    const existingCount = tests.filter((test) => test.type === type).length + 1;
    return `${prefix}-${existingCount.toString().padStart(3, "0")}`;
  };

  // Delete a test
  const handleDelete = (id) => {
    setTests((prevTests) => prevTests.filter((test) => test.id !== id));
  };

  // Open edit modal and populate form
  const handleEdit = (test) => {
    setEditingTest(test.id);
    setEditForm({ name: test.name, type: test.type, price: test.price });
  };

  // Handle form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => {
      let updatedForm = { ...prev, [name]: value };

      if (name === "type") {
        updatedForm.id = generateId(value);
        updatedForm.name = value === "Test" ? "New Test Name" : "New Package Name";
        updatedForm.price = value === "Test" ? "PKR 1,500.00" : "PKR 5,000.00";
      }

      return updatedForm;
    });
  };

  // Save edited test
  const handleSaveEdit = () => {
    setTests((prevTests) =>
      prevTests.map((test) =>
        test.id === editingTest ? { ...test, ...editForm } : test
      )
    );
    setEditingTest(null);
  };

  return (
    <>
      {/* Add Test Modal */}
      {showAddTest && <AddTest onClose={() => setShowAddTest(false)} />}
      
      {/* Add Custom Test Form */}
      {showAddCustomTest ? (
        <AddCustomTest onClose={() => setShowAddCustomTest(false)} />
      ) : (
        <>
          {/* Container */}
          <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 mt-12 w-full max-w-8xl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
              <div>
                <h2 className="text-2xl font-semibold">Offered Tests</h2>
                <p className="text-black">Manage all your existing offered tests or add a new one</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddTest(true)}
                  className="bg-primary text-white md:px-6 px-6 py-2 rounded transition"
                >
                  Add Test
                </button>
                <button
                  onClick={() => setShowAddCustomTest(true)}
                  className="bg-primary text-white px-4 py-2 rounded transition"
                >
                  Add Custom Test
                </button>
              </div>
            </div>
          </div>

          {/* Tests Grid */}
          <div className="bg-white p-2 shadow-lg rounded-lg mt-2 md:mb-36">
            {/* Grid Header */}
            <div className="hidden md:grid grid-cols-5 py-3 px-6 text-white font-semibold text-lg border-b-2 bg-primary">
              <span>ID</span>
              <span>Name</span>
              <span>Type</span>
              <span>Price</span>
              <span>Actions</span>
            </div>

            {/* Test List */}
            {tests.map((test) => (
              <div
                key={test.id}
                className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-0 py-3 px-4 text-sm items-center border-b transition-colors duration-200"
              >
                {/* ID */}
                <span className="truncate">{test.id}</span>

                {/* Name */}
                {editingTest === test.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-32"
                  />
                ) : (
                  <span className="truncate">{test.name}</span>
                )}

                {/* Type (Dropdown) */}
                {editingTest === test.id ? (
                  <select
                    name="type"
                    value={editForm.type}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-24"
                  >
                    <option value="Test">Test</option>
                    <option value="Package">Package</option>
                  </select>
                ) : (
                  <span>{test.type}</span>
                )}

                {/* Price */}
                {editingTest === test.id ? (
                  <input
                    type="text"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-24"
                  />
                ) : (
                  <span>{test.price}</span>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-2 md:mt-0">
                  {editingTest === test.id ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded transition"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-primary text-white px-3 py-1 rounded transition"
                      onClick={() => handleEdit(test)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded transition"
                    onClick={() => handleDelete(test.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default OfferedTests;
