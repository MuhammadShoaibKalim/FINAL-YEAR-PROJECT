import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Orders for Lab Admin
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/lab", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const data = await res.json();
        if (data.orders) setOrderList(data.orders);
        else setOrderList([]);
      } catch (error) {
        console.error("Failed to fetch lab orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Delete Order
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await fetch(`/api/orders/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        setOrderList((prev) => prev.filter((order) => order._id !== id));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div className="p-4 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4 w-full">
        <h2 className="text-2xl font-semibold mb-2">Orders</h2>
        <p className="text-gray-700">Manage all your existing orders</p>
      </div>

      <div className="bg-white p-2 shadow-lg rounded-lg mt-4 overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Booking</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Order Date</th>
              <th className="p-3">Collection</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 truncate max-w-[100px]">{order._id}</td>

                {/* ✅ Booking: First item title */}
                <td className="p-3 truncate max-w-[200px]">
                  {order.items && order.items.length > 0 ? order.items[0].name : "N/A"}
                </td>

                {/* ✅ Type: First item type */}
                <td className="p-3">
                  {order.items && order.items.length > 0 ? order.items[0].type : "N/A"}
                </td>

                {/* ✅ Status from schema */}
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${order.status === "completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                    {order.status}
                  </span>
                </td>

                {/* ✅ Payment (pending / paid / unpaid) */}
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${order.paymentStatus === "paid" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {order.paymentStatus || "pending"}
                  </span>
                </td>

                {/* ✅ Patient: name from form */}
                <td className="p-3">{order.name}</td>

                {/* ✅ Order Date: from bookingDetails */}
                <td className="p-3">
                  {order.bookingDetails?.date} {order.bookingDetails?.time}
                </td>

                {/* ✅ Collection type: Home / Lab */}
                <td className="p-3">{order.collectionMethod}</td>

                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => navigate(`edit/${order._id}`)}
                    className="bg-primary text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
