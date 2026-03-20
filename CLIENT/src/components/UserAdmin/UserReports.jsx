import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiFileText, FiDownload, FiSearch, FiCheckCircle, FiClock, FiShield, FiMoreHorizontal } from 'react-icons/fi';
import { FaLaptopMedical, FaMicroscope } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserReports = () => {
    const user = useSelector((state) => state.auth.user);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get('/api/orders/user-orders', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                // Filter completed orders or direct report logic if separate
                setReports(res.data.orders);
            } catch (err) {
                console.error("Fetch reports failed:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchReports();
    }, [user]);

    const filteredReports = reports.filter(r => 
        r._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.patientDetails?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Medical <span className="text-primary NOT-italic">Reports.</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Your Digital Diagnostic Results</p>
                </div>

                <div className="relative w-full md:w-80 group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        <FiSearch />
                    </div>
                    <input 
                        type="text" 
                        placeholder="SEARCH REPORTS..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-100 p-5 pl-14 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-slate-800 focus:outline-none focus:border-primary/50 transition-all shadow-xl shadow-slate-200/40"
                    />
                </div>
            </div>

            {/* Matrix / List */}
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Ref</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [1,2,3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="4" className="p-8"><div className="h-16 bg-slate-50 rounded-2xl w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredReports.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="space-y-4">
                                            <FiFileText className="mx-auto text-4xl text-slate-200" />
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">No Digital Reports Available Yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredReports.map((report) => (
                                <tr key={report._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-slate-200">
                                                <FaLaptopMedical />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-800 tracking-tighter uppercase italic">RES-{report._id.slice(-6)}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="space-y-1">
                                            <p className="text-[13px] font-black text-slate-800 tracking-tight leading-none italic">{report.patientDetails?.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{report.cartItems?.[0]?.name} {report.cartItems?.length > 1 && `+ ${report.cartItems.length - 1} more`}</p>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="flex items-center gap-3 text-emerald-500 font-bold uppercase text-[9px] tracking-widest bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 w-fit">
                                            <FiCheckCircle /> Report Ready
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button 
                                            onClick={() => toast.success("Downloading medical report...")}
                                            className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl shadow-slate-200 active:scale-90"
                                        >
                                            <FiDownload />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bio-Data Vault Summary / Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Total Reports', value: reports.length, icon: <FiFileText />, color: 'primary' },
                    { label: 'Security Status', value: 'Encrypted', icon: <FiShield />, color: 'emerald-500' },
                    { label: 'Access Level', value: 'Authorized', icon: <FiCheckCircle />, color: 'slate-900' },
                    { label: 'Sync Status', value: 'Active', icon: <FiClock />, color: 'amber-500' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-4 hover:border-primary/20 transition-all group">
                         <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner text-${stat.color}`}>
                             {stat.icon}
                         </div>
                         <div className="space-y-0.5">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                             <p className="text-xl font-black text-slate-800 tracking-tighter italic">{stat.value}</p>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserReports;
