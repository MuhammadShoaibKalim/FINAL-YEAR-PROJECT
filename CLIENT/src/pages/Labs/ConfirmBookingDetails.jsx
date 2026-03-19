import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiArrowLeft, FiClock, FiShield, FiMapPin, FiUser, FiPhone } from "react-icons/fi";
import { FaVial, FaMicroscope } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ConfirmBookingDetails = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.totalAmount);
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const savedPatient = sessionStorage.getItem('booking_patient');
        if (savedPatient) {
            setPatient(JSON.parse(savedPatient));
        } else {
            toast.error("Patient information missing. Redirecting...");
            navigate('/place-order');
        }
    }, [navigate]);

    const handleConfirm = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/payment');
        }, 800);
    };

    if (!patient) return null;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
                <div className="space-y-1">
                    <Link to="/place-order" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors group mb-2">
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Patient Info
                    </Link>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Review <span className="text-primary NOT-italic">Order.</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 3 of 4: Final Verification</p>
                </div>

                <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl animate-pulse">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Ready for Payment</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Detailed Parameters */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Patient Information Box */}
                    <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                        
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10 flex items-center gap-3">
                            <FiUser className="text-primary" /> Patient Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                                    <p className="text-lg font-black text-slate-800 tracking-tight leading-none italic">{patient.name}</p>
                                </div>
                                <div className="flex gap-12">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Age</p>
                                        <p className="text-base font-black text-slate-800 tracking-tighter">{patient.age} Years</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Gender</p>
                                        <p className="text-base font-black text-slate-800 tracking-tighter">{patient.gender}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 border-l border-slate-50 pl-0 md:pl-12">
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact Number</p>
                                    <p className="text-base font-black text-slate-800 tracking-tighter flex items-center gap-2">
                                        <FiPhone className="text-primary" /> {patient.phone}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Collection Mode</p>
                                    <p className="text-base font-black text-slate-800 tracking-tighter flex items-center gap-2">
                                        <FiMapPin className="text-primary" /> {patient.collectionMethod} Collection
                                    </p>
                                </div>
                            </div>
                        </div>

                        {patient.address && (
                            <div className="mt-10 pt-10 border-t border-slate-50">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Address</p>
                                <p className="text-sm font-black text-slate-600 leading-relaxed italic uppercase tracking-tighter">{patient.address}</p>
                            </div>
                        )}
                    </div>

                    {/* Test Inventory Selection */}
                    <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-3">
                            <FaVial className="text-primary" /> Tests Selected
                        </h3>

                        <div className="space-y-4">
                            {cartItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-primary/20 transition-all group/item">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary border border-slate-100 shadow-inner group-hover/item:scale-110 transition-transform">
                                            {item.type === 'Package' ? <FaMicroscope /> : <FaVial />}
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{item.labName || 'Diagnostic Lab'}</p>
                                            <p className="text-[14px] font-black text-slate-800 tracking-tight">{item.name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{item.quantity} Unit</p>
                                        <p className="text-[16px] font-black text-slate-800 tracking-tighter italic">PKR {item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Confirmation / Action */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-300 text-white space-y-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                        
                        <div className="space-y-1">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Order Summary</h3>
                            <p className="text-4xl font-black tracking-tighter italic pt-2">PKR {total.toFixed(0)}</p>
                            <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Final Payable Amount</p>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all cursor-help">
                                    <FiClock />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Turnaround Time</p>
                                    <p className="text-[11px] font-black text-white uppercase tracking-widest mt-1">24 - 48 Hours</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all cursor-help">
                                    <FiShield />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Security Status</p>
                                    <p className="text-[11px] font-black text-white uppercase tracking-widest mt-1">Order Encrypted</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10 pt-4">
                            <button
                                onClick={handleConfirm}
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-white hover:text-slate-900 text-white py-6 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50"
                            >
                                {isLoading ? "CONFIRMING..." : "Confirm & Pay"}
                                <FiArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
                            </button>
                            <div className="flex items-center justify-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] pt-2 italic">
                                <FiCheckCircle className="text-emerald-500" /> Validation Sync Complete
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white/50 border border-slate-100 rounded-[2.5rem] backdrop-blur-xl">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed italic text-center">
                            By confirming, you agree to our terms of service and laboratory privacy protocols.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBookingDetails;
