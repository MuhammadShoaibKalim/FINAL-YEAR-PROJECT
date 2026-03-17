import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSpinner,
  FaFlask,
  FaChartLine,
  FaWallet,
  FaHistory,
  FaFileMedical,
  FaDatabase
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
  CartesianGrid
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
    totalEarnings: 0,
    pendingReports: 0,
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
          toast.error(json.message || "Credential authentication failure");
        }
      } catch (err) {
        toast.error("Telemetry data streaming interrupted.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[500px]">
      <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Facility Command Center</p>
    </div>
  );

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
    totalEarnings,
    pendingReports,
  } = data;

  const pieData = [
    { name: "Clinical Tests", value: totalTests },
    { name: "Diagnostic Packages", value: totalPackages },
  ];

  const pieColors = ["#09acb4", "#05a1a8"];

  const statCards = [
    { title: "Total Pipeline", value: totalOrders, icon: <FaClipboardList />, color: "bg-slate-900", accent: "text-primary" },
    { title: "Awaiting Action", value: pendingOrders, icon: <FaClock />, color: "bg-white", accent: "text-amber-500", border: true },
    { title: "Verified Reports", value: completedOrders, icon: <FaCheckCircle />, color: "bg-white", accent: "text-emerald-500", border: true },
    { title: "Pending Uploads", value: pendingReports, icon: <FaFileMedical />, color: "bg-slate-50", accent: "text-primary" },
    { title: "Total Capital", value: `PKR ${totalEarnings.toLocaleString()}`, icon: <FaWallet />, color: "bg-slate-900", accent: "text-secondary" },
    { title: "Operational Tests", value: totalTests + totalPackages, icon: <FaFlask />, color: "bg-white", accent: "text-primary", border: true },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Live Telemetry</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Command <span className="italic text-primary">Center.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Facility Operational Metrics & Synchronization</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200">Generate Report</button>
           <button className="px-6 py-3 bg-white border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-all">Refresh Logs</button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className={`${card.color} ${card.border ? "border border-slate-100 shadow-xl shadow-slate-100/50" : "text-white shadow-2xl shadow-slate-200"} p-6 rounded-[2rem] transition-all hover:scale-[1.03] group relative overflow-hidden`}>
            {card.color === 'bg-slate-900' && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-full blur-2xl -mr-8 -mt-8" />
            )}
            <div className="flex justify-between items-start mb-4">
               <div className={`${card.accent} p-3 rounded-xl bg-slate-50 group-hover:bg-primary group-hover:text-white transition-all`}>
                  {card.icon}
               </div>
            </div>
            <div className="space-y-1 relative z-10">
              <p className={`text-[9px] font-black uppercase tracking-widest ${card.color === 'bg-white' ? "text-slate-400" : "text-white/40"}`}>{card.title}</p>
              <p className={`text-2xl font-black tracking-tighter ${card.color === 'bg-white' ? "text-slate-800" : "text-white"}`}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-3">
                <FaChartLine className="text-primary" />
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Timeline Analytics</h3>
             </div>
             <div className="flex gap-2">
                <div className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Ops</div>
             </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ordersOverTime}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ border: 'none', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }}
                itemStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '30px', fontSize: '9px', fontWeight: 'bold' }} />
              <Bar dataKey="Pending" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="InProgress" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Completed" stackId="a" fill="#09acb4" radius={[10, 10, 0, 0]} />
              <Bar dataKey="Cancelled" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-1 bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-40 transition-opacity"></div>
           <div className="flex items-center gap-3 mb-10 relative z-10">
              <FaDatabase className="text-primary" />
              <h3 className="text-xl font-black tracking-tight leading-tight italic">Operational <br /> Distribution</h3>
           </div>
           <div className="h-[250px] relative z-10">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '15px' }} 
                    itemStyle={{ color: '#fff', fontSize: '10px' }}
                  />
                </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="space-y-4 pt-10 relative z-10">
              {pieData.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[i] }}></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{item.name}</span>
                   </div>
                   <span className="text-sm font-black italic">{item.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Test Packages Grid */}
      <div className="bg-white p-10 sm:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-12">
           <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Facility Catalog</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Active Protocols</p>
           </div>
           <button className="text-primary text-[11px] font-black uppercase tracking-widest hover:underline">Manage All</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testPackages.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Active Catalog Entries</p>
            </div>
          ) : (
            testPackages.slice(0, 8).map((item) => (
              <div key={item._id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group relative">
                <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest bg-white text-primary px-3 py-1 rounded-full shadow-sm border border-slate-50 group-hover:bg-primary group-hover:text-white transition-all">
                  {item.type}
                </div>
                <div className="space-y-4 pt-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <FaFlask className="text-sm" />
                  </div>
                  <h4 className="text-sm font-black text-slate-800 tracking-tight leading-snug h-10 overflow-hidden">{item.name}</h4>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">VALUATION</span>
                    <span className="text-base font-black text-primary">PKR {item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;
