import { useState, useEffect } from "react";
import AddCustomTest from "./AddCustomTest";
import axios from "axios";

export default function OfferedTests() {
  const [showAddCustomTest, setShowAddCustomTest] = useState(false);
  const [tests, setTests] = useState([]);
  const [editingTestId, setEditingTestId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "" });

  const fetchTestsAndPackages = async () => {
    try {
      const { data: testData } = await axios.get("/api/tests/get-all-tests");
      const { data: packageData } = await axios.get("/api/tests/get-all-packages");

      const combined = [
        ...testData.tests.map((t) => ({ ...t, type: "Test" })),
        ...packageData.packages.map((p) => ({ ...p, type: "Package" })),
      ];

      setTests(combined);
    } catch (error) {
      console.error("Error fetching tests/packages", error);
    }
  };

  useEffect(() => {
    fetchTestsAndPackages();
  }, []);

  const handleEdit = (test) => {
    setEditingTestId(test._id);
    setEditForm({ name: test.name, price: test.price });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (test) => {
    try {
      if (test.type === "Test") {
        await axios.put(`/api/tests/update-test/${test._id}`, {
          name: editForm.name,
          price: editForm.price,
        });
      } else {
        await axios.put(`/api/tests/update-package/${test._id}`, {
          name: editForm.name,
          price: editForm.price,
        });
      }
      fetchTestsAndPackages();
      setEditingTestId(null);
    } catch (error) {
      console.error("Error updating", error);
      alert("Update failed");
    }
  };

  const handleDelete = async (test) => {
    try {
      if (test.type === "Test") {
        await axios.delete(`/api/tests/delete-test/${test._id}`);
      } else {
        await axios.delete(`/api/tests/delete-package/${test._id}`);
      }
      fetchTestsAndPackages();
    } catch (error) {
      console.error("Error deleting", error);
      alert("Delete failed");
    }
  };

  return (
    <>
      {showAddCustomTest ? (
        <AddCustomTest onClose={() => setShowAddCustomTest(false)} />
      ) : (
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 mt-12 w-full max-w-8xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-dark">Offered Tests & Packages</h2>
              <p className="text-text-secondary">Manage your lab's tests and packages</p>
            </div>
            <button
              onClick={() => setShowAddCustomTest(true)}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md"
            >
              Add New Test/Package
            </button>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <div className="hidden md:grid grid-cols-6 bg-primary text-white font-semibold text-lg rounded-t-md py-3 px-6">
              <span>Name</span>
              <span>Type</span>
              <span>Price</span>
              <span>Rating</span>
              <span>Booked</span>
              <span>Actions</span>
            </div>

            {tests.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-0 py-4 px-6 border-b items-center text-sm"
              >
                {editingTestId === item._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="border p-2 rounded"
                  />
                ) : (
                  <span>{item.name}</span>
                )}

                <span>{item.type}</span>

                {editingTestId === item._id ? (
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="border p-2 rounded"
                  />
                ) : (
                  <span>PKR {item.price}</span>
                )}

                <span>{item.rating || "0.0"} ⭐</span>

                <span>{item.bookedCount || "0"}</span>

                <div className="flex space-x-2">
                  {editingTestId === item._id ? (
                    <button
                      onClick={() => handleSaveEdit(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-primary text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
