import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

function formatTimeTo12Hour(time24) {
  if (!time24) return 'N/A';
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
  const [labItems, setLabItems] = useState([]);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        const currentLabId = user?.labId;

        const res = await fetch(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        if (data.order) {
          const labSpecificItems = data.order.items.filter(item => {
            const itemLabId = item.labId?._id || item.labId;
            return itemLabId && itemLabId.toString() === currentLabId.toString();
          });

          if (labSpecificItems.length === 0) {
            toast.error("No items found for your lab in this order");
            navigate("/labadmin/lab/orders");
            return;
          }

          const patientName = data.order.userId ? 
            `${data.order.userId.firstName || ''} ${data.order.userId.lastName || ''}`.trim() || 'N/A' : 
            data.order.name || 'N/A';

          const labStatus = labSpecificItems[0]?.status || "Pending";
          
          setOrder({
            ...data.order,
            patientName
          });
          setLabItems(labSpecificItems);
          setStatus(labStatus);
          setPaymentStatus(data.order.paymentStatus || "pending");
        } else {
          toast.error(data.message || "Failed to load order");
          navigate("/labadmin/lab/orders");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error(err.message || "Error loading order");
        navigate("/labadmin/lab/orders");
      }
    };

    if (user?.labId) {
      fetchOrder();
    }
  }, [orderId, navigate, user]);

  const handleUpdateOrder = async () => {
    if (!status || !paymentStatus) {
      toast.error("Both status and payment status are required.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      const currentLabId = user?.labId;

      let reportUrl = null;

      if (file) {
        const formData = new FormData();
        formData.append("report", file);
        
        const uploadRes = await fetch(`/api/orders/${orderId}/upload-report`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload report");
        }

        const uploadData = await uploadRes.json();
        reportUrl = uploadData.reportFile;
      }

      const statusRes = await fetch(`/api/orders/${orderId}/lab/${currentLabId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
          paymentStatus,
          reportFile: reportUrl
        }),
      });

      if (!statusRes.ok) {
        throw new Error("Failed to update order status");
      }

      const statusData = await statusRes.json();

      if (statusData.success) {
        toast.success("Order updated successfully");
        setOrder(statusData.order);
        setLabItems(statusData.order.items.filter(item => 
          (item.labId?._id || item.labId).toString() === currentLabId.toString()
        ));
        navigate("/labadmin/lab/orders");
      } else {
        throw new Error(statusData.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Error updating order");
    } finally {
      setLoading(false);
    }
  };

  if (!order || !labItems.length) return <p className="p-6">Loading order...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded max-w-4xl mx-auto mt-10 relative">
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
          <p><strong>Patient Name:</strong> {order.patientName}</p>
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
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Your Lab&apos;s Tests & Packages</h3>
        <ul className="space-y-2">
          {labItems.map((item, idx) => (
            <li key={idx} className="border p-3 rounded">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Price:</strong> Rs. {item.price}</p>
              <p><strong>Current Status:</strong> {item.status || "Pending"}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Update Status *</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className="w-full border p-2 rounded"
            disabled={loading}
          >
            <option value="">-- Select Status --</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Payment Status *</label>
          <select 
            value={paymentStatus} 
            onChange={(e) => setPaymentStatus(e.target.value)} 
            className="w-full border p-2 rounded"
            disabled={loading}
          >
            <option value="">-- Select Payment Status --</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Upload Report (Optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
            accept=".pdf,.doc,.docx"
            disabled={loading}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleUpdateOrder}
          disabled={loading || !status || !paymentStatus}
          className={`px-6 py-2 rounded ${
            loading || !status || !paymentStatus
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          } text-white font-semibold`}
        >
          {loading ? "Updating..." : "Update Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderEdit;
