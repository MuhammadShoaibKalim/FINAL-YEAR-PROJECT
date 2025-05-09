import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Orders = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/lab", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await res.json();
      if (data.orders) {
        const labSpecificOrders = data.orders.map(order => {
          const labItems = order.items.filter(item => 
            item.labId && (item.labId._id || item.labId).toString() === user.labId
          );
          
          if (labItems.length > 0) {
            return {
              ...order,
              items: labItems,
             
              labStatus: labItems[0].status || "Pending",
              patientName: order.userId ? 
                `${order.userId.firstName} ${order.userId.lastName}` : 
                order.name || "Unknown"
            };
          }
          return null;
        }).filter(Boolean); 

        setOrderList(labSpecificOrders);
      } else {
        setOrderList([]);
      }
    } catch (error) {
      console.error("Failed to fetch lab orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (res.ok) {
        toast.success("Order deleted successfully");
        fetchOrders();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete order");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Error deleting order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [location.search]);

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div className="p-4 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4 w-full">
        <h2 className="text-2xl font-semibold mb-2">Orders Overview</h2>
        <p className="text-gray-700">Quick view of bookings received</p>
      </div>

      <div className="bg-white p-2 shadow-lg rounded-lg mt-4 overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="p-3">Patient Name</th>
              <th className="p-3">Tests/Packages</th>
              <th className="p-3">Booking Date</th>
              <th className="p-3">Collection</th>
              <th className="p-3">Lab Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Report</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{order.patientName}</td>
                <td className="p-3">
                  <ul className="list-disc list-inside">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        {item.name} ({item.type})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3">
                  {new Date(order.bookingDetails?.date).toLocaleDateString()}{" "}
                  {order.bookingDetails?.time}
                </td>
                <td className="p-3">{order.collectionMethod}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.labStatus === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.labStatus === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.labStatus === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.labStatus}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.paymentStatus || "pending"}
                  </span>
                </td>
                <td className="p-3">
                  {order.items.some(item => item.reportFile) ? (
                    <a
                      href={order.items.find(item => item.reportFile)?.reportFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View Report
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">Not Uploaded</span>
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/labadmin/lab/orders/edit/${order._id}`)}
                    className="bg-primary text-white px-3 py-1 rounded"
                  >
                    View / Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
