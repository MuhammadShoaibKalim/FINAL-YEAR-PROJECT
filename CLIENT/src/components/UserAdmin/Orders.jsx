import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiPackage, FiSearch, FiFileText, FiDownload, FiCheckCircle, FiClock, FiAlertCircle, FiX, FiInfo } from 'react-icons/fi';
import { FaLaptopMedical, FaMicroscope } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Orders = () => {
    const user = useSelector((state) => state.auth.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/api/orders/user-orders', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setOrders(res.data.orders);
            } catch (err) {
                console.error("Fetch orders failed:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchOrders();
    }, [user]);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'cancelled': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const filteredOrders = orders.filter(order => 
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.patientDetails?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openInvoice = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Order <span className="text-primary NOT-italic">History.</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Track & Manage Your Diagnostic Bookings</p>
                </div>

                <div className="relative w-full md:w-80 group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        <FiSearch />
                    </div>
                    <input 
                        type="text" 
                        placeholder="SEARCH ORDERS..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-100 p-5 pl-14 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-slate-800 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all shadow-xl shadow-slate-200/40"
                    />
                </div>
            </div>

            {/* Orders Matrix / Table */}
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden relative">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [1,2,3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="p-8"><div className="h-12 bg-slate-50 rounded-2xl w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-primary border border-slate-200 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                                <FiPackage />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-800 tracking-tighter uppercase">#{order._id.slice(-8)}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="space-y-1">
                                            <p className="text-[13px] font-black text-slate-800 tracking-tight leading-none italic">{order.patientDetails?.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{order.patientDetails?.gender} • {order.patientDetails?.age} yrs</p>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                                            <FiClock className="text-primary" /> {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button 
                                            onClick={() => openInvoice(order)}
                                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-slate-200 active:scale-95 group/btn"
                                        >
                                            <FiFileText className="group-hover/btn:translate-y-[-1px]" /> View Invoice
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Invoice View */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="w-full max-w-4xl bg-white rounded-[4rem] shadow-3xl overflow-hidden relative animate-in zoom-in-95 duration-500">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 w-12 h-12 bg-slate-50 hover:bg-rose-500 hover:text-white rounded-2xl flex items-center justify-center text-slate-400 transition-all z-10"
                        >
                            <FiX />
                        </button>

                        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                            {/* Left: Metadata */}
                            <div className="lg:w-1/3 bg-slate-900 p-12 text-white space-y-12 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
                                
                                <div className="relative z-10 space-y-8">
                                    <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center text-2xl shadow-2xl shadow-primary/20">
                                        <FaLaptopMedical />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black italic tracking-tighter">Order <br/> Details.</h2>
                                        <div className="h-1.5 w-12 bg-primary rounded-full"></div>
                                    </div>
                                    
                                    <div className="space-y-6 pt-10">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Order Identification</p>
                                            <p className="text-[12px] font-black text-white uppercase tracking-widest">{selectedOrder._id}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Patient Profile</p>
                                            <p className="text-lg font-black italic text-primary">{selectedOrder.patientDetails?.name}</p>
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">{selectedOrder.patientDetails?.age} yrs • {selectedOrder.patientDetails?.gender}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Items and Summation */}
                            <div className="lg:w-2/3 p-12 overflow-y-auto space-y-12">
                                <div className="space-y-6">
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                        <FaMicroscope className="text-primary" /> Tests Included
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedOrder.cartItems?.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 italic transition-all">
                                                <div className="space-y-1">
                                                    <p className="text-[13px] font-black text-slate-800 tracking-tight">{item.name}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-[14px] font-black text-slate-800 tracking-tighter">PKR {item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-100 flex justify-between items-end">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                                            <FiCheckCircle /> Payment Success
                                        </div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] pl-1">Total Verified Amount</p>
                                    </div>
                                    <p className="text-5xl font-black text-slate-900 tracking-tighter italic">PKR {selectedOrder.totalAmount?.toFixed(0)}</p>
                                </div>

                                <button 
                                    className="w-full bg-slate-100 border border-slate-200 text-slate-600 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-slate-900 hover:text-white transition-all group"
                                    onClick={() => toast.success("Invoice download initiated.")}
                                >
                                    <FiDownload className="text-lg group-hover:translate-y-1 transition-transform" /> Download PDF Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
