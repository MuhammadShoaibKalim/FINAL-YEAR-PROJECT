import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
       const res = await fetch("/api/orders/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const data = await res.json();

        if (data?.orders) {
          setOrders(data.orders);
        } else {
          console.warn("No orders received.");
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-4 border rounded shadow">
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Type:</strong> {order.type}</p>
              <p><strong>Item:</strong> {order.testOrPackageId}</p>
              <p><strong>Collection Method:</strong> {order.collectionMethod}</p>
              <p><strong>Subtotal:</strong> PKR {order.subtotal}</p>
              <p><strong>Delivery:</strong> PKR {order.deliveryCharge}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
