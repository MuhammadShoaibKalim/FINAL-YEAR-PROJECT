import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiPhone, FiHome, FiArrowRight, FiArrowLeft, FiInfo, FiCheckCircle } from "react-icons/fi";
import { FaUserPlus, FaClinicMedical } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const [isLoading, setIsLoading] = useState(false);

    const [patientDetails, setPatientDetails] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        address: '',
        collectionMethod: 'Home' // Simplified: Home/Lab
    });

    const handleInput = (e) => {
        setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate
            if (!patientDetails.name || !patientDetails.age || !patientDetails.phone) {
                toast.error("Please fill in all mandatory fields.");
                setIsLoading(false);
                return;
            }

            // Persist to session/state (Simplified for this flow)
            sessionStorage.setItem('booking_patient', JSON.stringify(patientDetails));
            
            toast.success("Details saved. Moving to confirmation.");
            navigate('/confirm-booking');
        } catch (err) {
            toast.error("Process failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
                <div className="space-y-1">
                    <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors group mb-2">
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
                    </Link>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Patient <span className="text-primary NOT-italic">Details.</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 2 of 4: Information Input</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-4 pr-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl">
                        <FaUserPlus />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                        <p className="text-[13px] font-black text-slate-800 tracking-tight">Entering Information</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Information Parameters */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                                <FiInfo />
                            </div>
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">Patient Profile</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name Input */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                        <FiUser />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Enter full name"
                                        value={patientDetails.name}
                                        onChange={handleInput}
                                        className="w-full bg-slate-50 border border-slate-100 p-5 pl-14 rounded-2xl text-[12px] font-black text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            {/* Age/Gender Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        required
                                        placeholder="00"
                                        value={patientDetails.age}
                                        onChange={handleInput}
                                        className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-[12px] font-black text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Gender</label>
                                    <select
                                        name="gender"
                                        required
                                        value={patientDetails.gender}
                                        onChange={handleInput}
                                        className="w-full bg-slate-50 border border-slate-100 p-5 px-6 rounded-2xl text-[12px] font-black text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white transition-all shadow-inner appearance-none cursor-pointer"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Contact Input */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                        <FiPhone />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="+92 000 0000000"
                                        value={patientDetails.phone}
                                        onChange={handleInput}
                                        className="w-full bg-slate-50 border border-slate-100 p-5 pl-14 rounded-2xl text-[12px] font-black text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            {/* Collection Method Selection */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Collection Method</label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPatientDetails({ ...patientDetails, collectionMethod: 'Home' })}
                                        className={`flex-1 p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${patientDetails.collectionMethod === 'Home' ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                                    >
                                        <FiHome /> Home
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPatientDetails({ ...patientDetails, collectionMethod: 'Lab' })}
                                        className={`flex-1 p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${patientDetails.collectionMethod === 'Lab' ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                                    >
                                        <FaClinicMedical /> At Lab
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Address Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Detailed Address (Only for Home Collection)</label>
                            <textarea
                                name="address"
                                required={patientDetails.collectionMethod === 'Home'}
                                placeholder="Enter full collection address"
                                value={patientDetails.address}
                                onChange={handleInput}
                                rows="3"
                                className="w-full bg-slate-50 border border-slate-100 p-6 rounded-2xl text-[12px] font-black text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white transition-all shadow-inner resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Summary Overlay */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-300 text-white space-y-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                        
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 relative z-10">Verification Summary</h3>
                        
                        <div className="space-y-6 relative z-10">
                            {[
                                { label: 'Tests Selected', value: cartItems.length },
                                { label: 'Collection Type', value: patientDetails.collectionMethod },
                                { label: 'Identity Status', value: 'Draft' }
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between items-center text-slate-400 font-bold uppercase text-[9px] tracking-widest border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <span>{row.label}</span>
                                    <span className="text-white italic">{row.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-10 relative z-10">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-white hover:text-slate-900 text-white py-6 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50"
                            >
                                {isLoading ? "SAVING..." : "Continue"}
                                <FiArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
                            </button>
                            <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest pt-2 italic">
                                <FiCheckCircle className="text-emerald-500" /> Secure Data Encryption Active
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;
