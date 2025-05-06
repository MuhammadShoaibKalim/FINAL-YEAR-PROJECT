import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { User, FlaskConical, ShoppingCart, DollarSign } from "lucide-react";

const COLORS = ["#09acb4", "#05a1a8", "#f59e0b", "#10b981", "#ef4444"];

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

        if (res.status === 403) throw new Error("Access denied");

        const data = await res.json();
        console.log("📊 Overview Data:", data);
        setOverviewData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching overview:", err.message);
        setLoading(false);
        setOverviewData(null);
      }
    };

    fetchOverview();
  }, []);

  if (loading || !overviewData) {
    return <p className="text-center text-text-light text-lg">Loading overview...</p>;
  }

  const {
    totalUsers,
    totalLabs,
    totalOrders,
    totalRevenue,
    monthlyOrders,
    labsWithMostOrders = [],
    mostUsedTests = [],
    orderStatus = [],
    topLabAdmins = []
  } = overviewData;

  return (
    <div className="flex flex-col bg-bg-primary p-6 rounded-2xl shadow-lg mt-4 w-full max-w-8xl">
      <h2 className="text-4xl font-bold mb-6 text-text-dark">Super Admin Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <OverviewCard title="Total Labs" value={totalLabs} icon={<FlaskConical className="w-6 h-6 text-white" />} />
        <OverviewCard title="Total Users" value={totalUsers} icon={<User className="w-6 h-6 text-white" />} />
        <OverviewCard title="Total Orders" value={totalOrders} icon={<ShoppingCart className="w-6 h-6 text-white" />} />
        <OverviewCard title="Total Revenue" value={`Rs. ${totalRevenue.toLocaleString()}`} icon={<DollarSign className="w-6 h-6 text-white" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Order Status Breakdown">
          {orderStatus.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No order status data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {orderStatus.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Most Booked Tests">
          {mostUsedTests.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No test data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mostUsedTests}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {mostUsedTests.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      <ChartCard title="Labs with the Most Orders">
        {labsWithMostOrders.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No lab order data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={labsWithMostOrders}>
              <XAxis dataKey="name" stroke="#4a4a4a" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#09acb4" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Orders Over Last 6 Months">
        {monthlyOrders.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No monthly data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyOrders}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#05a1a8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>


      <ChartCard title="Lab Performance Overview">
        {labsWithMostOrders.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No performance data available.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm text-left bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Lab Name</th>
                  <th className="px-4 py-3 font-semibold">Total Orders</th>
                  <th className="px-4 py-3 font-semibold">Revenue</th>
                  <th className="px-4 py-3 font-semibold">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {labsWithMostOrders.map((lab, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 transition duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{lab.name}</td>
                    <td className="px-4 py-3 text-gray-700">{lab.orders}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">Rs. {lab.revenue?.toLocaleString() || 0}</td>
                    <td className="px-4 py-3 text-blue-600 font-medium">
                      {index === 0
                        ? "🏆 Top Performer"
                        : index <= 2
                          ? "🔥 Excellent"
                          : index <= 5
                            ? "✅ Good"
                            : "Average"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ChartCard>

    </div>
  );
};

const OverviewCard = ({ title, value, icon }) => (
  <div className="p-6 bg-primary text-white rounded-2xl shadow-primary flex justify-between items-center">
    <div>
      <h3 className="text-lg font-medium text-gray-light">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="ml-4">{icon}</div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-bg-secondary p-6 rounded-2xl shadow-md mt-6">
    <h3 className="text-2xl font-semibold mb-4 text-text-primary">{title}</h3>
    {children}
  </div>
);

export default Overview;
