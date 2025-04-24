import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LabOverview = () => {
  // Mock Data for the Chart
  const data = [
    { name: "Jan", orders: 10 },
    { name: "Feb", orders: 15 },
    { name: "Mar", orders: 8 },
    { name: "Apr", orders: 20 },
    { name: "May", orders: 18 },
    { name: "Jun", orders: 25 },
  ];

  const totalOrders = 120;
  const pendingOrders = 15;
  const completedOrders = 105;
  const offeredTests = 40;
  const completionRate = ((completedOrders / totalOrders) * 100).toFixed(1);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-12">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <p className="text-gray-600 mb-6">
        Welcome! Here, you can view important stats about your lab's operations.
      </p>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Pending Orders" value={pendingOrders} />
        <StatCard title="Completed Orders" value={completedOrders} />
        <StatCard title="Tests Offered" value={offeredTests} />
      </div>

      {/* Completion Rate */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Completion Rate</h3>
        <div className="relative w-full h-5 bg-gray-300 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-primary" style={{ width: `${completionRate}%` }}></div>
        </div>
        <p className="text-gray-700 mt-2">{completionRate}% of orders completed</p>
      </div>

      {/* Graph Section */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Orders Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
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

// Reusable Card Component for Stats
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-primary text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default LabOverview;
