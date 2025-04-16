import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const testData = [
  { name: "Blood Test", value: 400 },
  { name: "X-Ray", value: 300 },
  { name: "MRI Scan", value: 250 },
  { name: "CT Scan", value: 200 },
  { name: "Covid Test", value: 150 },
];

const labOrdersData = [
  { name: "Lab A", Orders: 100 },
  { name: "Lab B", Orders: 80 },
  { name: "Lab C", Orders: 120 },
  { name: "Lab D", Orders: 90 },
  { name: "Lab E", Orders: 110 },
];

const orderStatusData = [
  { name: "Completed", value: 70 },
  { name: "Pending", value: 20 },
  { name: "Canceled", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const Overview = () => {
  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-8xl">
      <h2 className="text-3xl font-bold mb-6 text-black">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OverviewCard title="Total Labs" value="123" />
        <OverviewCard title="Total Users" value="456" />
        <OverviewCard title="Total Orders" value="789" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Order Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Most Used/Booked Tests">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={testData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {testData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <BarChart data={labOrdersData}>
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

const OverviewCard = ({ title, value }) => (
  <div className="p-4 bg-primary text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
    <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold mb-4 text-black">{title}</h3>
    {children}
  </div>
);

export default Overview;
