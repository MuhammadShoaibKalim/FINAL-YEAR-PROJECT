// import React, { useEffect, useState } from "react";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [rating, setRating] = useState(0); 
//   const [description, setDescription] = useState("")
//   const [reviewSubmitted, setReviewSubmitted] = useState(false); 

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch("/api/orders/user", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         });
//         const data = await res.json();
//         setOrders(data?.orders || []);
//       } catch (err) {
//         console.error("Failed to fetch orders", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleSubmitReview = async (labId) => {
//     const reviewData = {
//       labId,
//       rating,
//       description,
//     };

//     try {
//       const res = await fetch(`/api/reviews`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(reviewData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setReviewSubmitted(true);
//         alert("Review submitted successfully!");
//       } else {
//         alert("Failed to submit review!");
//       }
//     } catch (error) {
//       console.error("Error submitting review", error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case "Completed":
//         return "bg-green-200 text-green-800";
//       case "Cancelled":
//         return "bg-red-200 text-red-800";
//       case "Progress":
//         return "bg-blue-200 text-blue-800";
//       default:
//         return "bg-yellow-100 text-yellow-800";
//     }
//   };

//   if (loading) return <p className="text-gray-500">Loading orders...</p>;

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-primary mb-4">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-600">No orders found.</p>
//       ) : (
//         <div className="space-y-8">
//           {orders.map((order) => {
//             const labGroups = order.items.reduce((acc, item) => {
//               const labId = item.labId?._id || item.labId;
//               const labName = item.labId?.name || "Unknown Lab";
              
//               if (!acc[labId]) {
//                 acc[labId] = {
//                   labName,
//                   items: [],
//                   subtotal: 0,
//                   status: item.status || order.status, 
//                 };
//               }
              
//               acc[labId].items.push(item);
//               acc[labId].subtotal += item.price;
//               return acc;
//             }, {});

//             return (
//               <div key={order._id} className="border rounded-lg shadow-md p-4 space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
//                   <div className="flex gap-2">
//                     <span className="text-sm text-gray-500">
//                       Payment: {order.paymentStatus}
//                     </span>
//                   </div>
//                 </div>

//                 {Object.entries(labGroups).map(([labId, group]) => (
//                   <div key={labId} className="border rounded p-3 bg-gray-50">
//                     <div className="flex justify-between items-center mb-2">
//                       <h4 className="font-semibold">{group.labName}</h4>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(group.status)}`}>
//                         {group.status}
//                       </span>
//                     </div>

//                     <ul className="text-sm divide-y">
//                       {group.items.map((item, i) => (
//                         <li key={i} className="flex justify-between py-1">
//                           <span>{item.name}</span>
//                           <span>1x</span>
//                           <span>PKR {item.price}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     <div className="text-right mt-2 text-sm font-semibold">
//                       Subtotal for this lab: PKR {group.subtotal}
//                     </div>

//                     {group.status === "Pending" && (
//                       <div className="mt-2 text-right">
//                         <button
//                           className="text-red-600 hover:underline text-sm"
//                           onClick={async () => {
//                             if (window.confirm("Cancel this lab's order?")) {
//                               const res = await fetch(`/api/orders/${order._id}/cancel/${labId}`, {
//                                 method: "PUT",
//                                 headers: {
//                                   Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//                                 },
//                               });
//                               if (res.ok) {
//                                 const data = await res.json();
//                                 setOrders(prev => 
//                                   prev.map(o => {
//                                     if (o._id === order._id) {
//                                       return {
//                                         ...o,
//                                         items: o.items.map(item => {
//                                           if (item.labId?._id === labId || item.labId === labId) {
//                                             return { ...item, status: "Cancelled" };
//                                           }
//                                           return item;
//                                         })
//                                       };
//                                     }
//                                     return o;
//                                   })
//                                 );
//                               }
//                             }
//                           }}
//                         >
//                           Cancel Lab Order
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 <div className="text-right text-sm font-semibold">
//                   Total Order: PKR {order.subtotal} | Delivery: PKR {order.deliveryCharge} <br />
//                   <span className="text-base">Final Total: PKR {order.subtotal + order.deliveryCharge}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchOrders();
  }, []);

   const getStatusColor = (status) => {
    switch(status) {
      case "Completed":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      case "Progress":
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const labGroups = order.items.reduce((acc, item) => {
              const labId = item.labId?._id || item.labId;
              const labName = item.labId?.name || "Unknown Lab";

              if (!acc[labId]) {
                acc[labId] = {
                  labName,
                  items: [],
                  subtotal: 0,
                  status: item.status || order.status,
                };
              }

              acc[labId].items.push(item);
              acc[labId].subtotal += item.price;
              return acc;
            }, {});

            return (
              <div key={order._id} className="border rounded-lg shadow-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-500">
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {Object.entries(labGroups).map(([labId, group]) => (
                  <div key={labId} className="border rounded p-3 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{group.labName}</h4>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          group.status
                        )}`}
                      >
                        {group.status}
                      </span>
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

                    {group.status === "Pending" && (
                      <div className="mt-2 text-right">
                        <button
                          className="text-red-600 hover:underline text-sm"
                          onClick={async () => {
                            if (window.confirm("Cancel this lab's order?")) {
                              const res = await fetch(
                                `/api/orders/${order._id}/cancel/${labId}`,
                                {
                                  method: "PUT",
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "authToken"
                                    )}`,
                                  },
                                }
                              );
                              if (res.ok) {
                                // Fetch updated orders from backend to sync UI
                                await fetchOrders();
                              }
                            }
                          }}
                        >
                          Cancel Lab Order
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                <div className="text-right text-sm font-semibold">
                  Total Order: PKR {order.subtotal} | Delivery: PKR {order.deliveryCharge} <br />
                  <span className="text-base">
                    Final Total: PKR {order.subtotal + order.deliveryCharge}
                  </span>
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
