import React, { useEffect, useState } from "react";
import { FaFileInvoice, FaDownload, FaTimes, FaCheckCircle, FaClock, FaExclamationCircle, FaHospital } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [fetchingInvoice, setFetchingInvoice] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      setOrders(data?.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoice = async (orderId) => {
    setFetchingInvoice(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/invoice`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setInvoiceData(data.data);
        setShowInvoice(orderId);
      }
    } catch (err) {
      console.error("Failed to fetch invoice", err);
    } finally {
      setFetchingInvoice(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "bg-primary/10 text-primary border-primary/20";
      case "Cancelled": return "bg-rose-100 text-rose-700 border-rose-200";
      case "In Progress": return "bg-secondary/10 text-secondary border-secondary/20";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const getPaymentBadge = (status) => {
    const base = "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ";
    switch(status?.toLowerCase()) {
      case "paid": return <span className={base + "bg-primary/5 text-primary border-primary/10"}><FaCheckCircle /> Paid</span>;
      case "pending": return <span className={base + "bg-amber-50 text-amber-600 border-amber-100"}><FaClock /> Pending</span>;
      default: return <span className={base + "bg-slate-50 text-slate-600 border-slate-100"}><FaExclamationCircle /> {status || 'Unpaid'}</span>;
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6 shadow-lg shadow-primary/20"></div>
      <p className="font-black text-xs uppercase tracking-[0.2em] animate-pulse">Retrieving Health Records</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-10 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Patient Dashboard</motion.span>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Diagnostic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Orders</span></h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Manage your clinical tests and secure medical reports.</p>
        </div>
        <div className="bg-slate-50 px-8 py-5 rounded-[2rem] shadow-inner border border-slate-100 flex items-center gap-6">
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Active Records</span>
            <span className="text-3xl font-black text-primary">{orders.length}</span>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
            <FaFileInvoice className="text-xl" />
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-50 rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200"
        >
           <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-slate-200">
              <FaHospital className="text-4xl text-slate-200" />
           </div>
           <h3 className="text-2xl font-black text-slate-800 mb-3">No Health Records Found</h3>
           <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">You haven't booked any laboratory tests yet. Start your journey towards better health today.</p>
           <button className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all active:scale-95 shadow-2xl shadow-slate-200 uppercase text-xs tracking-widest">
              Explore Test Packages
           </button>
        </motion.div>
      ) : (
        <div className="grid gap-10">
          {orders.map((order) => {
            const labGroups = order.items.reduce((acc, item) => {
              const labId = item.labId?._id || item.labId;
              const labName = item.labId?.name || "Unknown Lab";
              if (!acc[labId]) {
                acc[labId] = { labName, items: [], subtotal: 0, status: item.status || order.status };
              }
              acc[labId].items.push(item);
              acc[labId].subtotal += item.price;
              return acc;
            }, {});

            return (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={order._id} 
                className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-primary/10 transition-all duration-500 group"
              >
                {/* Order Header */}
                <div className="p-8 sm:p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6 bg-slate-50/30">
                  <div className="flex items-center gap-6">
                    <div className="w-1 w-12 bg-primary/20 rounded-full h-12 flex items-center justify-center font-black text-primary text-xs">#{order._id.slice(-4).toUpperCase()}</div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Order Identification</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getPaymentBadge(order.paymentStatus)}
                    <button 
                      onClick={() => fetchInvoice(order._id)}
                      className="flex items-center gap-3 px-6 py-3 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl text-xs font-black hover:border-primary/30 hover:bg-primary/5 transition-all active:scale-95 shadow-sm uppercase tracking-tighter"
                    >
                      <FaDownload className="text-primary" /> Get Invoice
                    </button>
                  </div>
                </div>

                {/* Lab Sections */}
                <div className="p-8 sm:p-10 space-y-10">
                  {Object.entries(labGroups).map(([labId, group]) => (
                    <div key={labId} className="relative">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-slate-200">
                            {group.labName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-black text-slate-800 text-lg tracking-tight">{group.labName}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Certified Partner Lab</p>
                          </div>
                        </div>
                        <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 ${getStatusColor(group.status)}`}>
                          {group.status}
                        </span>
                      </div>

                      <div className="bg-slate-50/50 rounded-[2rem] border-2 border-slate-50 p-6 space-y-4">
                        {group.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center px-2">
                            <div className="flex flex-col">
                              <span className="text-sm font-black text-slate-700">{item.name}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">Diagnostic Analysis</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-black text-slate-800 underline decoration-primary/20 underline-offset-4">PKR {item.price.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                        <div className="pt-4 mt-4 border-t border-slate-200/50 flex justify-between items-center px-2">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lab Subtotal</span>
                           <span className="text-lg font-black text-primary">PKR {group.subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="bg-slate-900 p-8 sm:p-10 flex flex-wrap justify-between items-center gap-8 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                   <div className="flex gap-12 relative z-10">
                      <div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-2">Base Subtotal</span>
                        <span className="text-xl font-bold text-white">PKR {order.subtotal.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-2">Logistic Fee</span>
                        <span className="text-xl font-bold text-white">PKR {order.deliveryCharge.toLocaleString()}</span>
                      </div>
                   </div>
                   <div className="text-right relative z-10">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mb-2">Grand Total</span>
                      <span className="text-4xl font-black text-white tracking-tighter">PKR {(order.subtotal + order.deliveryCharge).toLocaleString()}</span>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Invoice Modal */}
      <AnimatePresence>
        {showInvoice && invoiceData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-3xl rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden relative border border-slate-100"
            >
              <button 
                onClick={() => setShowInvoice(null)}
                className="absolute top-10 right-10 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all z-10 shadow-sm border border-slate-100"
              >
                <FaTimes />
              </button>

              <div id="invoice-content" className="p-12 sm:p-20">
                <div className="flex justify-between items-start mb-16">
                   <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl shadow-primary/30">T</div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tighter">TestSahulat</h1>
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">Verified Diagnostic Receipt</p>
                      <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">TXN-{invoiceData._id.slice(-12).toUpperCase()}</h2>
                   </div>
                   <div className="text-right">
                      <div className="inline-block px-6 py-2 bg-primary/5 text-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 border-primary/10 mb-6">
                        Official Document
                      </div>
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">{new Date(invoiceData.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Status: {invoiceData.status}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-16 mb-16 py-10 border-y-2 border-slate-100 border-dashed">
                   <div className="space-y-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-2">Recipient Information</span>
                      <p className="text-lg font-black text-slate-800 tracking-tight">{invoiceData.userId.firstName} {invoiceData.userId.lastName}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500">{invoiceData.userId.email}</p>
                        <p className="text-xs font-bold text-slate-500">{invoiceData.userId.phoneNo}</p>
                      </div>
                   </div>
                   <div className="space-y-4 text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-2">Issued By</span>
                      <p className="text-lg font-black text-slate-800 tracking-tight">TestSahulat Labs</p>
                      <p className="text-xs font-bold text-slate-500 italic">Digitally Signed Healthcare Statement</p>
                   </div>
                </div>

                <div className="space-y-8 mb-16 px-4">
                   {invoiceData.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center group/item">
                         <div className="flex items-center gap-6">
                            <span className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-300 border border-slate-100 group-hover/item:bg-primary/5 group-hover/item:text-primary transition-colors underline decoration-slate-100 italic">{i+1}</span>
                            <div>
                               <p className="text-sm font-black text-slate-800">{item.name}</p>
                               <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-0.5">{item.labId?.name}</p>
                            </div>
                         </div>
                         <p className="text-md font-black text-slate-800 tabular-nums">PKR {item.price.toLocaleString()}</p>
                      </div>
                   ))}
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] p-10 space-y-6 shadow-inner border border-slate-100 relative overflow-hidden">
                   <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-30"></div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="font-black text-slate-400 uppercase tracking-[0.2em]">Logistics & Service</span>
                      <span className="font-black text-slate-800 underline decoration-slate-200 decoration-4 underline-offset-4">PKR {invoiceData.deliveryCharge.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-3xl pt-6 border-t-2 border-white">
                      <span className="font-black text-slate-800 tracking-tighter">TOTAL PAID</span>
                      <span className="font-black text-primary tracking-tighter">PKR {(invoiceData.subtotal + invoiceData.deliveryCharge).toLocaleString()}</span>
                   </div>
                </div>

                <div className="mt-16 text-center">
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.5em] max-w-sm mx-auto leading-relaxed">System Generated Receipt • No Signature Required</p>
                </div>
              </div>

              <div className="p-12 sm:p-20 pt-0 flex gap-6">
                 <button className="flex-1 py-5 bg-slate-900 text-white font-black rounded-[1.5rem] hover:bg-primary transition-all active:scale-95 shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 uppercase text-xs tracking-widest">
                    <FaDownload /> Safe PDF Export
                 </button>
                 <button onClick={() => setShowInvoice(null)} className="px-10 py-5 bg-slate-100 text-slate-600 font-black rounded-[1.5rem] hover:bg-slate-200 transition-all active:scale-95 uppercase text-xs tracking-widest">
                    Dismiss
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
