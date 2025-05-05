import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSpinner,
  FaFlask,
  FaChartPie,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

const LabDashboard = () => {
  const [data, setData] = useState({
    totalTests: 0,
    totalPackages: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    inProgressOrders: 0,
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
    cancelledOrders,
    inProgressOrders,
    completionRate,
    ordersOverTime,
    testPackages,
  } = data;

  const pieData = [
    { name: "Tests", value: totalTests },
    { name: "Packages", value: totalPackages },
  ];

  const pieColors = ["#09acb4", "#05a1a8"];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-text-dark mb-2">Lab Dashboard</h2>
        <p className="text-text-tertiary mb-6">Snapshot of lab’s performance</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <StatCard title="Total Orders" value={totalOrders} icon={<FaClipboardList size={24} />} />
          <StatCard title="Pending Orders" value={pendingOrders} icon={<FaClock size={24} />} />
          <StatCard title="Completed Orders" value={completedOrders} icon={<FaCheckCircle size={24} />} />
          <StatCard title="Cancelled Orders" value={cancelledOrders} icon={<FaTimesCircle size={24} />} />
          <StatCard title="In Progress" value={inProgressOrders} icon={<FaSpinner size={24} />} />
          <StatCard title="Tests & Packages" value={totalTests + totalPackages} icon={<FaFlask size={24} />} />
        </div>
      </div>

      <div className="bg-bg-secondary p-6 rounded-lg shadow-primary">
        <h3 className="text-lg font-semibold text-text-dark">Order Completion Rate</h3>
        <div className="relative w-full h-5 bg-border-light rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="mt-2 text-text-secondary">{completionRate}% completed</p>
      </div>

      <div className="bg-bg-primary p-6 rounded-lg shadow-primary">
        <h3 className="text-xl font-semibold text-text-dark mb-4">Orders Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={ordersOverTime}>
            <XAxis dataKey="date" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Pending" stackId="a" fill="#f59e0b" />
            <Bar dataKey="InProgress" stackId="a" fill="#3b82f6" />
            <Bar dataKey="Completed" stackId="a" fill="#10b981" />
            <Bar dataKey="Cancelled" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-bg-secondary p-6 rounded-lg shadow-primary">
        <h3 className="text-xl font-semibold text-text-dark mb-4">Test vs Package Ratio</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-bg-primary p-6 rounded-lg shadow-primary">
        <h3 className="text-xl font-semibold text-text-dark mb-4">Offered Tests & Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testPackages.length === 0 ? (
            <p className="text-text-secondary">No test or package added yet.</p>
          ) : (
            testPackages.map((item) => (
              <div key={item._id} className="bg-white border border-border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-bold text-text-primary">{item.name}</h4>
                  <span className="text-xs text-white bg-primary px-2 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-text-tertiary mt-2">PKR {item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-primary text-white p-4 rounded-2xl shadow-md flex flex-col justify-between">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium">{title}</span>
      <div>{icon}</div>
    </div>
    <p className="text-3xl font-bold text-center">{value}</p>
  </div>
);

export default LabDashboard;
