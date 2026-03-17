import React, { useEffect, useState } from "react";
import { FaDownload, FaFileMedical, FaCalendarAlt, FaHashtag, FaInfoCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const UserReports = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.orders) {
          setOrders(data.orders);
        } else {
          console.error("No orders found or invalid response");
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const ordersWithReports = orders.filter((order) => order.reportFile);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center min-h-[400px]">
        <ImSpinner2 className="text-primary text-4xl animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Medical Archives</p>
      </div>
    );
  }

  return (
    <div className="p-10 sm:p-16 space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
           <FaFileMedical className="text-primary text-2xl" />
           <h2 className="text-3xl font-black text-slate-800 tracking-tight">Medical <span className="italic text-primary">Archives.</span></h2>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Access and download your verified clinical diagnostic reports.</p>
      </div>

      {ordersWithReports.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center space-y-4">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-200 shadow-sm mx-auto">
              <FaFileMedical className="text-2xl" />
           </div>
           <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">No archival records detected</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {ordersWithReports.map((order) => (
            <div
              key={order._id}
              className="group bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-50 group-hover:bg-primary transition-colors"></div>
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-slate-100 rounded-lg">
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                         <FaHashtag className="text-[8px] text-primary" /> {order._id.slice(-8).toUpperCase()}
                       </p>
                    </div>
                    <div className={`px-3 py-1 rounded-lg ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                       <p className="text-[9px] font-black uppercase tracking-widest">{order.status}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
                    Diagnostic Report <br />
                    <span className="text-slate-400 font-medium text-sm">Clinical findings and laboratory analysis</span>
                  </h4>

                  <div className="flex flex-wrap gap-4 pt-2">
                     <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-slate-300 text-xs" />
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">Issue Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <FaInfoCircle className="text-slate-300 text-xs" />
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter italic">Verified by Clinical Admin</span>
                     </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href={order.reportFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex lg:flex-col items-center justify-center gap-3 bg-slate-900 group-hover:bg-primary text-white p-6 lg:p-10 rounded-[2rem] transition-all duration-500 active:scale-95 shadow-xl shadow-slate-200 group-hover:shadow-primary/20"
                  >
                    <FaDownload className="text-xl group-hover:animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Download</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReports;
