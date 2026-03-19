import { Link } from "react-router-dom";
import { FaEnvelopeOpenText, FaPaperPlane, FaArrowRight, FaClock } from 'react-icons/fa';

const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6 font-sans relative overflow-hidden">
        {/* Glow Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] opacity-30"></div>

        <div className="w-full max-w-lg relative z-10 text-center space-y-12">
            <div className="space-y-6">
                <div className="w-24 h-24 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center text-primary text-4xl mx-auto shadow-2xl animate-pulse">
                    <FaEnvelopeOpenText />
                </div>
                <div className="space-y-3">
                    <h1 className="text-5xl font-black text-white tracking-tighter leading-tight">Check <span className="italic text-primary">Inbox.</span></h1>
                    <p className="text-slate-400 text-lg font-bold uppercase tracking-tighter max-w-sm mx-auto">
                        We've sent a verification link to your registered email address.
                    </p>
                </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-12 rounded-[3.5rem] space-y-8 relative group">
                <div className="space-y-2">
                    <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">Verification Status</p>
                    <div className="flex items-center justify-center gap-3 text-emerald-500 font-bold uppercase text-[10px] tracking-widest">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                        Awaiting Verification
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Didn't receive email?</p>
                    <Link to="/resend-verification" className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/[0.08] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group/btn">
                        <FaPaperPlane className="text-primary group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        Resend Email
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                <Link to="/login" className="text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 group">
                    Back to Login <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-3 text-slate-600 text-[9px] font-black uppercase tracking-[0.4em]">
                    <FaClock className="text-primary" /> Link expires in 60 mins
                </div>
            </div>
        </div>
    </div>
  );
};

export default CheckEmail;
