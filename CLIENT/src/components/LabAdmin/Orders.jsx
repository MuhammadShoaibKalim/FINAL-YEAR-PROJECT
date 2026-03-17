import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaClipboardList, FaFilter, FaEdit, FaTrash, FaCheckCircle, FaClock, FaTimesCircle, FaFlask, FaEye, FaSearch } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const Orders = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/lab", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await res.json();
      if (data.orders) {
        const labSpecificOrders = data.orders.map(order => {
          const labItems = order.items.filter(item => 
            item.labId && (item.labId._id || item.labId).toString() === user.labId
          );
          
          if (labItems.length > 0) {
            return {
              ...order,
              items: labItems,
              labStatus: labItems[0].status || "Pending",
              patientName: order.userId ? 
                `${order.userId.firstName} ${order.userId.lastName}` : 
                order.name || "Unknown"
            };
          }
          return null;
        }).filter(Boolean); 

        setOrderList(labSpecificOrders);
      } else {
        setOrderList([]);
      }
    } catch (error) {
      console.error("Failed to fetch lab orders:", error);
      toast.error("Telemetry failed: Order sync error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("CRITICAL ACTION: Confirm sample record deletion? This cannot be reversed.")) {
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (res.ok) {
        toast.success("Operational record purged successfully");
        fetchOrders();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to purge operational record");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Archive deletion fault");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [location.search, user.labId]);

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[400px]">
      <ImSpinner2 className="text-primary text-4xl animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Sample Pipeline</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Global Operations</p>
           </div>
           <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Sample <span className="italic text-primary">Pipeline.</span></h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Managing Real-time Clinical Orders & Diagnostics</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center bg-white border border-slate-100 px-6 py-3 rounded-2xl group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <FaSearch className="text-slate-300 group-focus-within:text-primary transition-colors text-xs mr-3" />
              <input type="text" placeholder="Trace ID / Patient..." className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-slate-700 placeholder:text-slate-200" />
           </div>
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3">
              <FaFilter /> Optimized Routing
           </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Patient & Trace ID</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Diagnostic Protocol</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Pipeline Intel</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Operational Status</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Capital Hub</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Documentation</th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orderList.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-800 tracking-tight">{order.patientName}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ID: {order._id.slice(-8).toUpperCase()}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-2">
                       {order.items.map((item, idx) => (
                         <div key={idx} className="px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2 group/tag hover:border-primary/20 transition-all">
                            <FaFlask className="text-[10px] text-primary" />
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter italic">{item.name}</span>
                         </div>
                       ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <div className="space-y-1">
                       <div className="flex items-center gap-2">
                          <FaClock className="text-[10px] text-slate-300" />
                          <span className="text-[10px] font-bold text-slate-600">{new Date(order.bookingDetails?.date).toLocaleDateString()}</span>
                       </div>
                       <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{order.collectionMethod}</p>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex">
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2
                        ${order.labStatus === "Completed" ? "bg-emerald-50 text-emerald-600" : 
                          order.labStatus === "Cancelled" ? "bg-rose-50 text-rose-600" : 
                          order.labStatus === "In Progress" ? "bg-sky-50 text-sky-600" : 
                          "bg-amber-50 text-amber-600"}
                      `}>
                         {order.labStatus === "Completed" ? <FaCheckCircle /> : 
                          order.labStatus === "Cancelled" ? <FaTimesCircle /> : 
                          order.labStatus === "In Progress" ? <ImSpinner2 className="animate-spin" /> : 
                          <FaClock />}
                         {order.labStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest
                      ${order.paymentStatus === "paid" ? "bg-primary/5 text-primary border border-primary/10" : "bg-rose-50 text-rose-600 border border-rose-100"}
                    `}>
                      {order.paymentStatus || "pending"}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {order.items.some(item => item.reportFile) ? (
                      <a
                        href={order.items.find(item => item.reportFile)?.reportFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-xl text-white hover:bg-primary transition-all shadow-lg shadow-slate-200"
                        title="View Archival Report"
                      >
                        <FaEye />
                      </a>
                    ) : (
                      <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-200 rounded-xl border border-slate-100">
                         <FaClock />
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col xl:flex-row gap-2 justify-end">
                      <button
                        onClick={() => navigate(`/labadmin/lab/orders/edit/${order._id}`)}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-xl rounded-xl transition-all"
                        title="Configure Protocol"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100 hover:shadow-xl rounded-xl transition-all"
                        title="Purge Operational Record"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orderList.length === 0 && (
          <div className="p-20 text-center space-y-4">
             <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                <FaClipboardList className="text-2xl" />
             </div>
             <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Global Pipeline Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
