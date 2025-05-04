import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderEdit = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch order details
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

  // ✅ Submit form data using FormData
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
        body: formData, // ✅ don't set Content-Type manually
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order updated successfully");
        navigate("/labadmin/lab/orders");
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
    <div className="p-6 bg-white shadow-md rounded max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Edit Order</h2>

      <div className="mb-3 text-sm text-gray-700 space-y-1">
        <p><strong>Booking:</strong> {order.items?.map(i => i.name).join(", ")}</p>
        <p><strong>Patient:</strong> {order.name}</p>
        <p><strong>Collection:</strong> {order.collectionMethod}</p>
        <p><strong>Total:</strong> PKR {order.totalPrice}</p>
        <p><strong>Date:</strong> {new Date(order.bookingDetails?.date).toLocaleDateString()} at {order.bookingDetails?.time}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Order Status <span className="text-red-500">*</span></label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Status --</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Payment Status <span className="text-red-500">*</span></label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Payment --</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* <div className="mb-4">
        <label className="block mb-1 font-semibold">Upload Report (optional)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
      </div> */}
      <div className="mb-4">
  <label className="block mb-1 font-semibold">Upload Report (optional)</label>
  
  {/* ✅ Show existing report link if uploaded */}
  {order.reportFile && (
    <div className="mt-2 text-sm text-green-600">
      Report already uploaded:{" "}
      <a
        href={order.reportFile}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600"
      >
        View Report
      </a>
    </div>
  )}

  <input
    type="file"
    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
    onChange={(e) => setFile(e.target.files[0])}
    className="w-full border p-2 rounded"
  />
</div>


      <button
        onClick={handleUpdateOrder}
        disabled={loading}
        className={`w-full text-white py-2 rounded ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`}
      >
        {loading ? "Updating..." : "Update Order"}
      </button>
    </div>
  );
};

export default OrderEdit;
