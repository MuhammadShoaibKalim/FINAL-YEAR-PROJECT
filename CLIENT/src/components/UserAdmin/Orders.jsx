import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        setOrders(data?.orders || []);
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
    // <div className="p-6 max-w-5xl mx-auto">
       <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
    
      <h2 className="text-2xl font-bold text-primary mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const groupedItems = {};

            order.items.forEach((item) => {
              const labId = item.labId?._id || item.labId;
              const labName = item.labId?.name || "Unknown Lab";

              if (!groupedItems[labId]) {
                groupedItems[labId] = {
                  labName,
                  items: [],
                  subtotal: 0,
                };
              }

              groupedItems[labId].items.push(item);
              groupedItems[labId].subtotal += item.price;
            });

            return (
              <div key={order._id} className="border rounded-lg shadow-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : order.status === "Cancelled"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </div>

                {Object.entries(groupedItems).map(([labId, group]) => (
                  <div key={labId} className="border rounded p-3 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{group.labName}</h4>
                      <span className="text-sm text-gray-500">Status: {order.status}</span>
                    </div>

                    <ul className="text-sm divide-y">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex justify-between py-1">
                          <span>{item.name}</span>
                          <span>1x</span>
                          <span>PKR {item.price}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-right mt-2 text-sm font-semibold">
                      Subtotal for this lab: PKR {group.subtotal}
                    </div>
                  </div>
                ))}

                <div className="text-right text-sm font-semibold">
                  Subtotal: PKR {order.subtotal} | Delivery: PKR {order.deliveryCharge} <br />
                  <span className="text-base">Total: PKR {order.subtotal + order.deliveryCharge}</span>
                </div>

                <div className="flex justify-between items-center text-sm mt-2">
                  <span>Payment: {order.paymentStatus}</span>
                  {order.status === "Pending" && (
                    <button
                      className="text-red-600 hover:underline"
                      onClick={async () => {
                        if (window.confirm("Cancel this order?")) {
                          const res = await fetch(`/api/orders/${order._id}/cancel`, {
                            method: "PUT",
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                            },
                          });
                          const data = await res.json();
                          if (res.ok) {
                            setOrders((prev) =>
                              prev.map((o) =>
                                o._id === order._id ? { ...o, status: "Cancelled" } : o
                              )
                            );
                          }
                        }
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
