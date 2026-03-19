import { useState } from 'react';
import { post } from '../../Services/ApiEndpoints';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await post('/api/auth/forgot-password', { email });
      if (response.status === 200) {
        toast.success(response.data.message || 'Password reset email sent!');
      }
    } catch (error) {
      console.error('Forgot Password error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6 font-sans relative overflow-hidden">
        {/* Ambient Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-80 -mt-80"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -ml-64 -mb-64"></div>

        <div className="w-full max-w-md relative z-10 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-12 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Login
            </Link>

            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-2xl relative group overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="space-y-10 relative">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-primary/20">
                            <FaLock />
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tighter leading-none pt-2">Forgot <br /><span className="italic text-primary">Password.</span></h2>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
                            Enter your email to receive a password reset link.
                        </p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest pl-1">Email Address</label>
                            <div className="relative group/input">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-primary transition-colors">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="email"
                                    className="w-full bg-white/[0.03] border border-white/10 p-5 pl-14 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-white hover:text-slate-900 transition-all active:scale-[0.98] disabled:opacity-50 group"
                        >
                            {loading ? "SENDING..." : "Send Reset Link"}
                        </button>
                    </form>
                </div>
            </div>

            <p className="mt-12 text-center text-slate-600 text-[9px] font-black uppercase tracking-[0.4em]">
                Secure Password Recovery 
            </p>
        </div>
    </div>
  );
};

export default ForgotPassword;
