import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { FaClipboardList, FaClock, FaCheckCircle, FaVials } from "react-icons/fa"; 

const LabOverview = () => {
  const [overview, setOverview] = useState({
    totalOrders: " ",
    pendingOrders: " ",
    completedOrders: " ",
    totalTests: " ",
    totalPackages: " ",
    completionRate: " ",
    ordersOverTime: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const res = await fetch("/api/labadmin/overview", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setOverview(data.data || {});
      } else {
        toast.error(data.message || "Failed to fetch overview");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching overview");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) return <div className="text-center py-10">Loading Dashboard...</div>;

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-12">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <p className="text-gray-600 mb-6">
        Welcome! Here, you can view important stats about your lab's operations.
      </p>

      {/* Statistics Section */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={overview.totalOrders || 0} icon={<FaClipboardList size={28} />} />
        <StatCard title="Pending Orders" value={overview.pendingOrders || 0} icon={<FaClock size={28} />} />
        <StatCard title="Completed Orders" value={overview.completedOrders || 0} icon={<FaCheckCircle size={28} />} />
        <StatCard title="Tests Offered" value={(overview.totalTests || 0) + (overview.totalPackages || 0)} icon={<FaVials size={28} />} />
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
  <StatCard title="Total Orders" value={overview.totalOrders || 0} icon={<FaClipboardList size={28} />} />
  <StatCard title="Pending Orders" value={overview.pendingOrders || 0} icon={<FaClock size={28} />} />
  <StatCard title="Completed Orders" value={overview.completedOrders || 0} icon={<FaCheckCircle size={28} />} />
  <StatCard title="Total Lab Tests" value={overview.totalTests || 0} icon={<FaVials size={28} />} />
  <StatCard title="Total Packages" value={overview.totalPackages || 0} icon={<FaClipboardList size={28} />} />
</div>


      {/* Completion Rate */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Completion Rate</h3>
        <div className="relative w-full h-5 bg-gray-300 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-primary" style={{ width: `${overview.completionRate || 0}%` }}></div>
        </div>
        <p className="text-gray-700 mt-2">{overview.completionRate || 0}% of orders completed</p>
      </div>

      {/* Graph Section */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Orders Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={overview.ordersOverTime || []} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip />
            <Bar dataKey="orders" fill="#2563eb" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const StatCard = ({ title, value, icon }) => (
  <div className="bg-primary text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col justify-between">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-md font-medium">{title}</h3>
      <div className="text-2xl">{icon}</div>
    </div>

    <p className="text-3xl font-bold text-center">{value}</p>
  </div>
);
;

export default LabOverview;
