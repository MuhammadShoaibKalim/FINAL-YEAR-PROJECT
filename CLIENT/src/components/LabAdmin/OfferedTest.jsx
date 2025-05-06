import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddCustomTest from "./AddCustomTest";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function OfferedTests() {
  const [showAddCustomTest, setShowAddCustomTest] = useState(false);
  const [tests, setTests] = useState([]);
  const [editingTestId, setEditingTestId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", discount: "" });

  const user = useSelector((state) => state.auth?.user);

  const fetchTestsAndPackages = async () => {
    try {
      const res = await fetch("/api/labadmin/labdashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const json = await res.json();
      if (json.success) {
        const dashboardTests = json.data.testPackages || [];
        setTests(dashboardTests);
      } else {
        toast.error(json.message || "Failed to load test/packages");
      }
    } catch (error) {
      console.error("Error fetching dashboard tests/packages", error);
      toast.error("Error fetching your lab's test/package data");
    }
  };

  useEffect(() => {
    fetchTestsAndPackages();
  }, [showAddCustomTest]);

  const handleEdit = (test) => {
    setEditingTestId(test._id);
    setEditForm({
      name: test.name,
      price: test.price,
      discount: test.discount || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (test) => {
    try {
      const payload = {
        name: editForm.name,
        price: editForm.price,
        discount: editForm.discount,
      };

      const endpoint =
        test.type === "Test"
          ? `/api/tests/update-test/${test._id}`
          : `/api/tests/update-package/${test._id}`;

      await axios.put(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      fetchTestsAndPackages();
      setEditingTestId(null);
      toast.success("Item updated successfully");
    } catch (error) {
      console.error("Error updating", error);
      toast.error("Update failed");
    }
  };

  const handleDelete = async (test) => {
    try {
      const endpoint =
        test.type === "Test"
          ? `/api/tests/delete-test/${test._id}`
          : `/api/tests/delete-package/${test._id}`;

      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchTestsAndPackages();
      toast.success("Item deleted");
    } catch (error) {
      console.error("Error deleting", error);
      toast.error("Delete failed");
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
              <span>Discount</span>
              <span>Booked</span>
              <span>Actions</span>
            </div>

            {tests.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-0 py-4 px-6 border-b items-center text-sm"
              >
                {/* Name */}
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

                {/* Type */}
                <span>{item.type}</span>

                {/* Price */}
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

                {/* Discount */}
                {editingTestId === item._id ? (
                  <input
                    type="number"
                    name="discount"
                    value={editForm.discount}
                    onChange={handleEditChange}
                    className="border p-2 rounded"
                    min="0"
                    max="100"
                  />
                ) : (
                  <span>{item.discount ? `${item.discount}%` : "-"}</span>
                )}

                {/* Booked Count */}
                <span>{item.bookedCount || "0"}</span>

                {/* Actions */}
                <div className="flex space-x-2">
                  {editingTestId === item._id ? (
                    <button
                      onClick={() => handleSaveEdit(item)}
                      className="bg-primary/90 text-white px-3 py-1 rounded"
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
