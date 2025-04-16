import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([
    {
      id: "655781b5aaa6040b5474dc21",
      booking: "Healthy 2023 Full Body Checkup",
      type: "Package",
      status: "completed",
      paymentStatus: "paid",
      patient: "Abdul Rehman",
      orderDate: "11/17/2023, 08:07 PM",
      price: "PKR 15,000.00",
      sampleType: "Home",
    },
    {
      id: "655e0337152db85d74eaa42a",
      booking: "Healthy 2023 Full Body Checkup",
      type: "Package",
      status: "pending",
      paymentStatus: "pending",
      patient: "Abdul Rehman",
      orderDate: "11/22/2023, 06:33 PM",
      price: "PKR 15,000.00",
      sampleType: "Lab",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrderList(orderList.filter((order) => order.id !== id));
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4 w-full max-w-8xl">
        <h2 className="text-2xl font-semibold mb-1">Orders</h2>
        <p className="text-gray-700 mb-2">Manage all your existing orders</p>
      </div>

      <div className="bg-white p-2 shadow-lg rounded-lg mt-4 overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
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
              <tr key={order.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 truncate max-w-[100px]">{order.id}</td>
                <td className="p-3 truncate max-w-[150px]">{order.booking}</td>
                <td className="p-3">{order.type}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${order.status === "completed" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${order.paymentStatus === "paid" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-3">{order.patient}</td>
                <td className="p-3">{order.orderDate}</td>
                <td className="p-3">{order.sampleType}</td>
                <td className="p-3 flex space-x-2">
                  <button onClick={() => navigate(`edit/${order.id}`)} className="bg-primary text-white px-3 py-1 rounded transition">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(order.id)} className="bg-red-500 text-white px-3 py-1 rounded transition hover:bg-red-600">
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
