import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiFileText, FiLayout, FiShield } from "react-icons/fi";
import { clearCart } from '../../redux/CartSlice';
import { toast } from 'react-hot-toast';

const Success = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const finalizeOrder = async () => {
            try {
                // Clear state & persist order success
                dispatch(clearCart());
                sessionStorage.removeItem('booking_patient');
                
                // Optional: Backend ping or analytical sync
                toast.success("Order confirmed successfully.");
            } catch (err) {
                console.error("Success finalization error:", err);
            }
        };

        finalizeOrder();
    }, [dispatch]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center font-sans animate-in fade-in duration-1000">
            <div className="w-full max-w-2xl text-center space-y-12 px-6">
                {/* Visual Confirmation Signal */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[100px] scale-150 animate-pulse"></div>
                    <div className="w-32 h-32 bg-emerald-500 border-[8px] border-emerald-500/20 text-white rounded-full flex items-center justify-center text-5xl mx-auto shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700">
                         <FiCheckCircle />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-tight">Order <span className="text-emerald-500 NOT-italic">Confirmed.</span></h1>
                    <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] max-w-sm mx-auto">
                        Transaction complete. Your diagnostic booking has been successfully registered.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4 hover:border-emerald-500/30 transition-all group">
                         <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 text-xl mx-auto border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                             <FiFileText />
                         </div>
                         <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none">Order Status</h3>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic pt-1">Booking in sync with Lab</p>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4 hover:border-emerald-500/30 transition-all group">
                         <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 text-xl mx-auto border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                             <FiShield />
                         </div>
                         <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none">Secure Receipt</h3>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic pt-1">Digital invoice archived</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-10">
                    <Link to="/user-dashboard/orders" className="w-full md:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-slate-300 hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 group active:scale-95">
                        Track Order <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <Link to="/" className="text-slate-400 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                        <FiLayout /> Home Dashboard
                    </Link>
                </div>

                <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.8em] italic">
                    Authentication Infrastructure Validated
                </p>
            </div>
        </div>
    );
};

export default Success;
