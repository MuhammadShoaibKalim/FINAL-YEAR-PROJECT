import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { User, FlaskConical, ShoppingCart } from "lucide-react"; 

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const Overview = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch("/api/superadmin/overview", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (res.status === 403) {
          throw new Error("Access denied: not authorized as Super Admin");
        }

        const data = await res.json();
        setOverviewData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching overview data:", err.message);
        setLoading(false);
        setOverviewData(null);
      }
    };

    fetchOverview();
  }, []);

  if (loading || !overviewData) {
    return <p className="text-center text-gray-600">Loading overview...</p>;
  }

  const {
    totalUsers, totalLabs, totalOrders,
    labsWithMostOrders = [], mostUsedTests = [], orderStatus = []
  } = overviewData;

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-8xl">
      <h2 className="text-3xl font-bold mb-6 text-black">Super Admin Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OverviewCard title="Total Labs" value={totalLabs} icon={<FlaskConical className="w-6 h-6 text-white" />} />
        <OverviewCard title="Total Users" value={totalUsers} icon={<User className="w-6 h-6 text-white" />} />
        <OverviewCard title="Total Orders" value={totalOrders} icon={<ShoppingCart className="w-6 h-6 text-white" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Order Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Array.isArray(orderStatus) ? orderStatus : []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label
              >
                {Array.isArray(orderStatus) && orderStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Most Booked Tests">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Array.isArray(mostUsedTests) ? mostUsedTests : []}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {Array.isArray(mostUsedTests) && mostUsedTests.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Labs with the Most Orders">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Array.isArray(labsWithMostOrders) ? labsWithMostOrders : []}>
            <XAxis dataKey="name" stroke="#4A5568" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Orders" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

const OverviewCard = ({ title, value, icon }) => (
  <div className="p-4 bg-primary text-white rounded-lg shadow-lg flex justify-between items-center">
    <div>
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="ml-4">{icon}</div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold mb-4 text-black">{title}</h3>
    {children}
  </div>
);

export default Overview;
