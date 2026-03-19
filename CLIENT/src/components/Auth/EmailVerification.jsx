import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";
import { FaCheckCircle, FaExclamationTriangle, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const calledRef = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("invalid");
        return;
      }

      if (calledRef.current) return;
      calledRef.current = true;

      try {
        const response = await axios.get(`/api/users/verify-email?token=${token}`);
        const message = response.data?.message || "Email verified successfully!";

        if (response.data?.alreadyVerified) {
          toast.success("Account already verified.");
          setStatus("already-verified");
          return;
        }

        toast.success(message);
        setStatus("success");

        // Optional auto-redirect after 3s
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(error?.response?.data?.message || "Verification failed.");
        setStatus("failed");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center space-y-6 pt-8">
            <div className="relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse absolute inset-0"></div>
                <ImSpinner8 className="animate-spin text-5xl text-primary relative z-10" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Verifying your account...</p>
          </div>
        );
      case "success":
        return (
          <div className="space-y-8 pt-8">
             <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center justify-center text-emerald-500 text-4xl mx-auto shadow-2xl">
                 <FaCheckCircle className="animate-in zoom-in duration-500" />
             </div>
             <div className="space-y-2">
                <p className="text-emerald-500 text-xl font-bold uppercase tracking-tighter italic">Verified Successfully!</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Redirecting to login in 3s...</p>
             </div>
             <Link to="/login" className="inline-flex items-center gap-3 text-primary hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] group">
                Login Now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        );
      case "already-verified":
        return (
          <div className="space-y-8 pt-8">
             <div className="w-24 h-24 bg-primary/10 border border-primary/20 rounded-[2.5rem] flex items-center justify-center text-primary text-4xl mx-auto shadow-2xl">
                 <FaShieldAlt />
             </div>
             <p className="text-white text-xl font-bold uppercase tracking-tighter italic">Already Verified.</p>
             <Link to="/login" className="inline-block bg-primary text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:bg-white hover:text-slate-900 transition-all">
                Proceed to Login
             </Link>
          </div>
        );
      case "failed":
      case "invalid":
        return (
          <div className="space-y-8 pt-8 text-center">
             <div className="w-24 h-24 bg-secondary/10 border border-secondary/20 rounded-[2.5rem] flex items-center justify-center text-secondary text-4xl mx-auto shadow-2xl">
                 <FaExclamationTriangle className="animate-bounce" />
             </div>
             <div className="space-y-2">
                <p className="text-secondary text-xl font-bold uppercase tracking-tighter italic">Verification Failed.</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">The link may have expired or is invalid.</p>
             </div>
             <div className="flex flex-col gap-4">
                <Link to="/resend-verification" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/[0.08] transition-all">
                   Resend Verification Link
                </Link>
                <Link to="/login" className="text-slate-600 hover:text-slate-400 transition-colors text-[9px] font-black uppercase tracking-[0.4em]">Back to Login</Link>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-6 font-sans relative overflow-hidden">
        {/* Glow Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mb-64"></div>

        <div className="w-full max-w-md relative z-10 text-center">
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mt-16"></div>
                
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 mb-2">Account Security</h2>
                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">Account <span className="italic text-primary">Verify.</span></h1>
                
                <div className="min-h-[250px] flex items-center justify-center">
                    {renderContent()}
                </div>
            </div>

            <p className="mt-12 text-slate-700 text-[8px] font-black uppercase tracking-[0.5em] italic">
                Secure Identity Verification
            </p>
        </div>
    </div>
  );
};

export default EmailVerification;
