import React, { useEffect, useState } from "react";
import { FaClipboardList, FaCheckCircle, FaClock, FaVials, FaFlask } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const LabDashboard = () => {
  const [data, setData] = useState({
    totalTests: 0,
    totalPackages: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    completionRate: 0,
    ordersOverTime: [],
    testPackages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/labadmin/labdashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },

        });

        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          toast.error(json.message || "Failed to load dashboard");
        }
      } catch (err) {
        toast.error("Something went wrong while fetching data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center py-10">Loading Dashboard...</div>;

  const {
    totalTests,
    totalPackages,
    totalOrders,
    pendingOrders,
    completedOrders,
    completionRate,
    ordersOverTime,
    testPackages,
    
  } = data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-2">Lab Dashboard</h2>
        <p className="text-gray-600 mb-6">A snapshot of your lab’s current performance</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Orders" value={totalOrders} icon={<FaClipboardList size={24} />} />
          <StatCard title="Pending Orders" value={pendingOrders} icon={<FaClock size={24} />} />
          <StatCard title="Completed Orders" value={completedOrders} icon={<FaCheckCircle size={24} />} />
          <StatCard title="Tests/Packages Offered" value={totalTests + totalPackages} icon={<FaFlask size={24} />} />
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Order Completion Rate</h3>
        <div className="relative w-full h-5 bg-gray-300 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="mt-2 text-gray-700">{completionRate}% completed</p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Orders Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ordersOverTime}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="orders" fill="#2563eb" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Offered Tests & Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testPackages.length === 0 ? (
            <p className="text-gray-600">No test or package added yet.</p>
          ) : (
            testPackages.map((item) => (
              <div key={item._id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-bold">{item.name}</h4>
                  <span className="text-xs text-white bg-primary px-2 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">PKR {item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-primary text-white p-4 rounded-lg shadow-md flex flex-col justify-between">
    <div className="flex justify-between items-center mb-2">
      <span className="text-md font-medium">{title}</span>
      <div>{icon}</div>
    </div>
    <p className="text-3xl font-bold text-center">{value}</p>
  </div>
);

export default LabDashboard;
