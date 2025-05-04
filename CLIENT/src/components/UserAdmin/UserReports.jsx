import React, { useEffect, useState } from "react";
import { FaDownload, FaFileAlt } from "react-icons/fa";

// Utility function to get the file name from Cloudinary URL
function getCloudinaryFileName(url) {
  try {
    const parts = url.split("/");
    const fileWithExt = parts[parts.length - 1];
    const name = fileWithExt.split(".")[0]; 
    return name;
  } catch {
    return "report";
  }
}

const UserReports = () => {
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
        if (res.ok && data.orders) {
          setOrders(data.orders);
        } else {
          console.error("No orders found or invalid response");
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const ordersWithReports = orders.filter((order) => order.reportFile);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2">
        <FaFileAlt className="text-primary" /> My Reports
      </h2>

      {ordersWithReports.length === 0 ? (
        <p className="text-gray-500 text-center">No reports available yet.</p>
      ) : (
        <div className="space-y-4">
          {ordersWithReports.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow-sm"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Report for Order #{order._id.slice(-6)}
                </h4>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  Status: <span className="font-medium">{order.status}</span>
                </p>
              </div>
              <a
  href={order.reportFile}
  download
  className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition"
>
  <FaDownload /> Download Report
</a>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReports;
