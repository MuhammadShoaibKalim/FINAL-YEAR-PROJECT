import React from 'react';
import { Link } from 'react-router-dom';
import { FiXCircle, FiRefreshCcw, FiArrowLeft, FiAlertTriangle, FiPhone } from "react-icons/fi";

const Failure = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center font-sans animate-in fade-in duration-700">
            <div className="w-full max-w-2xl text-center space-y-12 px-6">
                {/* Visual Alert Signal */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-[100px] scale-150"></div>
                    <div className="w-32 h-32 bg-rose-500 border-[8px] border-rose-500/20 text-white rounded-full flex items-center justify-center text-5xl mx-auto shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700">
                         <FiXCircle className="animate-in slide-in-from-top-4 duration-500" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-tight">Payment <span className="text-rose-500 NOT-italic">Failed.</span></h1>
                    <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] max-w-sm mx-auto">
                        Transaction aborted. Your order could not be processed at this time.
                    </p>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rose-500/10 transition-colors"></div>
                     
                     <div className="flex items-center justify-center gap-4 text-rose-500 font-bold uppercase text-[10px] tracking-widest bg-rose-50 py-3 rounded-2xl border border-rose-100 italic">
                         <FiAlertTriangle /> Transaction Declined by Gateway
                     </div>

                     <div className="space-y-4 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                         <p>Common Failure Reasons:</p>
                         <ul className="space-y-2 list-none text-slate-600 italic">
                             <li>Insufficient Account Funds</li>
                             <li>Gateway Connection Timeout</li>
                             <li>Verification Protocol Rejected</li>
                         </ul>
                     </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-10">
                    <Link to="/payment" className="w-full md:w-auto bg-primary text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:bg-slate-900 transition-all flex items-center justify-center gap-4 group active:scale-95">
                        Try Again <FiRefreshCcw className="group-hover:rotate-180 transition-transform duration-700" />
                    </Link>
                    <Link to="/cart" className="text-slate-500 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                        <FiArrowLeft /> Back to Cart
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-3 text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">
                    <FiPhone className="text-primary" /> Support Team: Contact for Assistance
                </div>
            </div>
        </div>
    );
};

export default Failure;