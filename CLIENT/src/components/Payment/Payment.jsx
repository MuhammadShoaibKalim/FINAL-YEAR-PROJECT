import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiShield, FiArrowLeft, FiCreditCard, FiLock, FiCheckCircle } from "react-icons/fi";
import { FaStripe, FaRegCreditCard } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.totalAmount);
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const savedPatient = sessionStorage.getItem('booking_patient');
        if (savedPatient && cartItems.length > 0) {
            setPatient(JSON.parse(savedPatient));
        } else {
            toast.error("Session information missing.");
            navigate('/cart');
        }
    }, [navigate, cartItems]);

    const handlePayment = async () => {
        setIsLoading(true);
        const stripe = await stripePromise;

        try {
            const response = await fetch('/api/payment/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount: total,
                    patientDetails: patient
                })
            });

            const session = await response.json();
            if (session.id) {
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
                if (result.error) {
                    toast.error(result.error.message);
                }
            } else {
                toast.error("Failed to initialize secure checkout.");
            }
        } catch (err) {
            console.error("Payment error:", err);
            toast.error("Process aborted. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!patient) return null;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
                <div className="space-y-1">
                    <Link to="/confirm-booking" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors group mb-2">
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Review
                    </Link>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Secure <span className="text-primary NOT-italic">Payment.</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 4 of 4: Final Transaction</p>
                </div>

                <div className="flex items-center gap-3 px-6 py-3 bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl">
                    <FiShield className="text-primary text-xl" />
                    <p className="text-[10px] font-black text-white uppercase tracking-widest italic">Encrypted Secure Portal</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Visual Representation of Order */}
                <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group flex flex-col justify-between">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary text-2xl">
                                <FiCreditCard />
                            </div>
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">Payment Summary</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[10px] tracking-widest pb-4 border-b border-slate-50">
                                <span>Patient</span>
                                <span className="text-slate-800 italic">{patient.name}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[10px] tracking-widest pb-4 border-b border-slate-50">
                                <span>Tests Quantity</span>
                                <span className="text-slate-800 italic">{cartItems.length} Items</span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Grand Total</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter italic">PKR {total.toFixed(0)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all">
                        <FaStripe size={40} />
                        <FaRegCreditCard size={30} />
                    </div>
                </div>

                {/* Secure Gateway CTA */}
                <div className="bg-slate-900 p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-400 text-white space-y-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    
                    <div className="space-y-6 relative z-10 text-center">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-primary text-3xl mx-auto shadow-inner">
                            <FiLock className="animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tighter italic">Complete <span className="text-primary NOT-italic font-bold tracking-normal uppercase text-lg">Transaction.</span></h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Redirecting to Secure Stripe Gateway</p>
                        </div>
                    </div>

                    <div className="space-y-6 pt-10 relative z-10 border-t border-white/5">
                        <button
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-white hover:text-slate-900 text-white py-6 rounded-[2rem] text-[13px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? "PROCEEDING..." : "Pay Now with Stripe"}
                            <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
                        </button>
                        <div className="text-center space-y-2">
                           <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] italic leading-tight">
                              Powered by Secure Transaction Infrastructure
                           </p>
                           <div className="flex items-center justify-center gap-2 text-emerald-500 text-[8px] font-black uppercase tracking-widest">
                               <FiCheckCircle /> AES-256 Multi-Layer Encryption Active
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
