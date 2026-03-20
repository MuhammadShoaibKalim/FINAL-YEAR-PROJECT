import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiMail, FiSearch, FiMessageSquare, FiClock, FiCheckCircle, FiMoreVertical, FiArrowRight, FiShield } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserInbox = () => {
    const user = useSelector((state) => state.auth.user);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const res = await axios.get('/api/query/user-queries', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setQueries(res.data.queries);
            } catch (err) {
                console.error("Fetch queries failed:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchQueries();
    }, [user]);

    const filteredQueries = queries.filter(q => 
        q.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.message?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Message <span className="text-primary NOT-italic">Inbox.</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Communication with Support Team</p>
                </div>

                <div className="relative w-full md:w-80 group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        <FiSearch />
                    </div>
                    <input 
                        type="text" 
                        placeholder="SEARCH MESSAGES..." 
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
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Status</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject & Content</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [1,2,3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="3" className="p-10"><div className="h-20 bg-slate-50 rounded-3xl w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredQueries.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-20 text-center">
                                        <div className="space-y-4">
                                            <FiMail className="mx-auto text-4xl text-slate-200" />
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Inbox Clear. No Messages Found.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredQueries.map((query) => (
                                <tr key={query._id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                    <td className="p-8">
                                        {query.response ? (
                                            <div className="flex items-center gap-3 text-emerald-500 font-bold uppercase text-[9px] tracking-widest bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                                <FiCheckCircle className="text-sm" /> Admin Response Received
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3 text-amber-500 font-bold uppercase text-[9px] tracking-widest bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
                                                <FiClock className="text-sm animate-pulse" /> Awaiting Response
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-8 max-w-md">
                                        <div className="space-y-2">
                                            <h3 className="text-[14px] font-black text-slate-800 tracking-tight leading-none group-hover:text-primary transition-colors">{query.subject}</h3>
                                            <p className="text-[11px] font-bold text-slate-500 italic line-clamp-1 opacity-70 group-hover:opacity-100 transition-opacity">{query.message}</p>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="flex items-center justify-end gap-3 text-slate-300">
                                            <button className="p-3 hover:bg-white hover:text-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-100 shadow-none hover:shadow-lg">
                                                <FiMessageSquare />
                                            </button>
                                            <button className="p-3 hover:bg-white hover:text-rose-500 rounded-xl transition-all border border-transparent hover:border-slate-100 shadow-none hover:shadow-lg">
                                                <FiMoreVertical />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Support / Support Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
                <div className="lg:col-span-2 bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-slate-300 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-2">
                            <h3 className="text-xl font-black italic tracking-tighter">Need Help? <span className="text-primary NOT-italic tracking-normal">Message Support.</span></h3>
                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em]">Our team is available 24/7 for assistance.</p>
                        </div>
                        <button className="flex items-center gap-4 bg-primary hover:bg-white hover:text-slate-900 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all group active:scale-95 shadow-xl shadow-primary/20">
                            Create Message <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-6 group hover:border-primary/20 transition-all">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary text-2xl border border-slate-100 shadow-inner group-hover:scale-110 transition-transform">
                        <FiShield />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Security Level</p>
                        <p className="text-[13px] font-black text-slate-800 tracking-tight mt-1 italic">AES-256 Encrypted</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInbox;