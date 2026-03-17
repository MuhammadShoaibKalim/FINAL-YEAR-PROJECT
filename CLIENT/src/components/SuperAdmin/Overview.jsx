import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, AreaChart, Area
} from "recharts";
import { User, FlaskConical, ShoppingCart, DollarSign, Activity, Globe, ShieldAlert, TrendingUp, Users } from "lucide-react";
import { FaUserShield, FaFlask, FaUsers, FaChartLine, FaCheckCircle, FaDatabase } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const COLORS = ["#09acb4", "#05a1a8", "#334155", "#64748b", "#94a3b8"];

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

        if (res.status === 403) throw new Error("Security clearance failure");

        const data = await res.json();
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

  if (loading || !overviewData) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[500px]">
      <ImSpinner2 className="text-primary text-4xl animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Global System Telemetry</p>
    </div>
  );

  const {
    totalUsers,
    totalLabs,
    totalOrders,
    totalRevenue,
    monthlyOrders,
    labsWithMostOrders = [],
    mostUsedTests = [],
    orderStatus = [],
  } = overviewData;

  const statCards = [
    { title: "Total Network Users", value: totalUsers, icon: <Users className="w-5 h-5" />, color: "bg-slate-900", accent: "text-primary" },
    { title: "Verified Facilities", value: totalLabs, icon: <FlaskConical className="w-5 h-5" />, color: "bg-white", accent: "text-primary", border: true },
    { title: "Network Pipeline", value: totalOrders, icon: <Activity className="w-5 h-5" />, color: "bg-white", accent: "text-secondary", border: true },
    { title: "Global Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5" />, color: "bg-slate-900", accent: "text-emerald-400" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Root Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Root Intelligence</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic">Global <span className="text-primary not-italic">Intelligence.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Integrated Telemetry & Network Infrastructure Management</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200">Global System Audit</button>
           <button className="px-6 py-3 bg-white border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-all">Export Logs</button>
        </div>
      </div>

      {/* Global Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className={`${card.color} ${card.border ? "border border-slate-100 shadow-xl shadow-slate-100/50" : "text-white shadow-2xl shadow-slate-200"} p-8 rounded-[2.5rem] transition-all hover:scale-[1.03] group relative overflow-hidden`}>
            {card.color === 'bg-slate-900' && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl -mr-12 -mt-12" />
            )}
            <div className="flex justify-between items-start mb-6">
               <div className={`${card.accent} p-4 rounded-2xl bg-slate-50 group-hover:bg-primary group-hover:text-white transition-all`}>
                  {card.icon}
               </div>
            </div>
            <div className="space-y-1 relative z-10">
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${card.color === 'bg-white' ? "text-slate-400" : "text-white/40"}`}>{card.title}</p>
              <p className={`text-3xl font-black tracking-tighter ${card.color === 'bg-white' ? "text-slate-800" : "text-white"}`}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Architecture Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Timeline Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
           <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-3">
                <FaChartLine className="text-secondary" />
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Active Pipeline Velocity</h3>
             </div>
             <div className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Ops Last 6M</div>
           </div>
           <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyOrders}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#09acb4" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#09acb4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ border: 'none', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }}
                itemStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Area type="monotone" dataKey="orders" stroke="#09acb4" strokeWidth={4} fillOpacity={1} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Global Distribution */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-40 transition-opacity"></div>
           <div className="flex items-center gap-3 mb-10 relative z-10">
              <FaDatabase className="text-primary" />
              <h3 className="text-xl font-black tracking-tight leading-tight italic">Protocol <br /> Breakdown</h3>
           </div>
           <div className="h-[250px] relative z-10">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie data={orderStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                    {orderStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '15px' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="space-y-3 pt-6 relative z-10 max-h-[150px] overflow-y-auto scrollbar-hide">
              {orderStatus.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.name}</span>
                   </div>
                   <span className="text-xs font-black italic">{item.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         {/* Lab Performance Leaderboard */}
         <div className="bg-white p-10 sm:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-12">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Facility Rankings</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Performance Leaderboard</p>
               </div>
               <FaFlask className="text-slate-100 text-3xl" />
            </div>
            
            <div className="space-y-4">
               {labsWithMostOrders.map((lab, index) => (
                 <div key={index} className="flex items-center justify-between bg-slate-50 p-6 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
                    <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black italic transition-all ${index === 0 ? "bg-slate-900 text-primary shadow-xl" : "bg-white text-slate-400 group-hover:bg-slate-900 group-hover:text-white"}`}>
                          {index + 1}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-800 tracking-tight uppercase group-hover:text-primary transition-colors">{lab.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Orders Processed: {lab.orders}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-base font-black text-slate-900 italic tracking-tighter">Rs. {lab.revenue?.toLocaleString() || 0}</p>
                       <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">{index === 0 ? "Top Performer" : "Excellent"}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Protocol Engagement Chart */}
         <div className="bg-white p-10 sm:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-12">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">System Demand</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">High-Frequency Tests</p>
               </div>
               <Activity className="text-slate-100 text-3xl" />
            </div>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={mostUsedTests} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={120} fontWeight="bold" axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(9, 172, 180, 0.05)' }} contentStyle={{ border: 'none', borderRadius: '15px' }} />
                    <Bar dataKey="value" fill="#09acb4" radius={[0, 10, 10, 0]} barSize={30} />
                 </BarChart>
              </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Overview;
