import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Orders = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // 👈 Get query params here


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

  useEffect(() => {
    fetchOrders();
  }, [location.search]); // 👈 re-trigger fetch when query param changes
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
              <th className="p-3">Patient</th>
              <th className="p-3">Tests/Package</th>
              <th className="p-3">Booking Date</th>
              <th className="p-3">Collection</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Report</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{order.name || "Unknown"}</td>
                <td className="p-3">{order.items?.length || 0}</td>
                <td className="p-3">
                  {new Date(order.bookingDetails?.date).toLocaleDateString()}{" "}
                  {order.bookingDetails?.time}
                </td>
                <td className="p-3">{order.collectionMethod}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
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
                  {order.reportFile ? (
                    <a
                      href={order.reportFile}
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
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/labadmin/lab/orders/edit/${order._id}`)}
                    className="bg-primary text-white px-3 py-1 rounded"
                  >
                    View / Edit
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
