import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";


function formatTimeTo12Hour(time24) {
  const [hours, minutes] = time24.split(':');
  const date = new Date();
  date.setHours(+hours);
  date.setMinutes(+minutes);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}


const OrderEdit = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setOrder(data.order);
          setStatus(data.order.status || "Pending");
          setPaymentStatus(data.order.paymentStatus || "pending");
        } else {
          toast.error(data.message || "Failed to load order");
        }
      } catch (err) {
        console.error("Fetch error", err);
        toast.error("Error fetching order");
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleUpdateOrder = async () => {
    if (!status || !paymentStatus) {
      toast.error("Both status and payment status are required.");
      return;
    }

    const formData = new FormData();
    formData.append("status", status);
    formData.append("paymentStatus", paymentStatus);
    if (file) formData.append("report", file);

    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/update-status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Order updated successfully");
        navigate("/labadmin/lab/orders?refresh=true");
        // navigate("/labadmin/lab/orders");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return <p className="p-6">Loading order...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded max-w-4xl mx-auto mt-10 relative">
      {/* 🔙 Back & ❌ Close */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/labadmin/lab/orders")}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
        >
          ← Back to Orders
        </button>
        <button
          onClick={() => navigate("/labadmin/lab/orders")}
          className="text-gray-600 hover:text-red-500 text-xl"
          title="Close"
        >
          <FaTimes />
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6">Order Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
        <div>
          <p><strong>Patient Name:</strong> {order.name}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.phoneNumber}</p>
          <p><strong>Gender:</strong> {order.gender}</p>
          <p><strong>Age:</strong> {order.age}</p>
        </div>
        <div>
          <p><strong>Address:</strong> {order.address}, {order.state}, {order.country}</p>
          <p><strong>Collection Method:</strong> {order.collectionMethod}</p>
          <p><strong>Order Date:</strong> {
  order.bookingDetails?.date && order.bookingDetails?.time
    ? `${new Date(order.bookingDetails.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}, ${formatTimeTo12Hour(order.bookingDetails.time)}`
    : 'N/A'
}</p>

          <p><strong>Total Price:</strong> Rs. {order.totalPrice}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Tests & Packages</h3>
        <ul className="space-y-2">
          {order.items?.map((item, idx) => (
            <li key={idx} className="border p-3 rounded">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Price:</strong> Rs. {item.price}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Order Status *</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded">
            <option value="">-- Select Status --</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Progress">Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Payment Status *</label>
          <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="w-full border p-2 rounded">
            <option value="">-- Select Payment --</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Upload Report (optional)</label>
        {order.reportFile && (
          <div className="mt-2 text-sm text-green-600">
            Existing report: <a href={order.reportFile} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">View Report</a>
          </div>
        )}
        <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files[0])} className="w-full border p-2 rounded mt-2" />
      </div>

      <button
        onClick={handleUpdateOrder}
        disabled={loading}
        className={`mt-6 w-full text-white py-2 rounded ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`}
      >
        {loading ? "Updating..." : "Update Order"}
      </button>
    </div>
  );
};

export default OrderEdit;
