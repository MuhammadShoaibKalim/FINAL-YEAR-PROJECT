import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { post } from '../../Services/ApiEndpoints';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    const { password, confirmPassword } = formData;

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])/.test(password)) {
      newErrors.password = "Requires uppercase, lowercase, number & symbol.";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await post(`/api/auth/reset-password/${token}`, formData);

      if (res.status === 200) {
        toast.success(res.data.message || "Password updated successfully!");
        navigate('/login');
      }
    } catch (error) {
      console.error('Reset error:', error);
      toast.error(error?.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6 font-sans relative overflow-hidden">
        {/* Glow Decor */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -ml-80 -mt-80 opacity-50"></div>
        <div className="absolute bottom-1/2 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -mr-48 opacity-30"></div>

        <div className="w-full max-w-md relative z-10 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-12 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Login
            </Link>

            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-2xl relative group overflow-hidden text-left">
                <div className="space-y-10">
                    <div className="space-y-4 text-center">
                        <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-[2rem] flex items-center justify-center text-primary text-3xl mx-auto shadow-inner group-hover:scale-105 transition-transform duration-500">
                             <FaLock />
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tighter leading-none mt-6">Reset <span className="italic text-primary">Password.</span></h2>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest text-center">Create a new secure password</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* New Password Overlay */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">New Password</label>
                                {formData.password.length >= 6 && !errors.password && <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1"><FaCheckCircle /> Secure</span>}
                            </div>
                            <div className="relative group/input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                    placeholder="Enter new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-secondary text-[9px] font-bold uppercase tracking-tight pl-2">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Overlay */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest pl-1">Confirm Password</label>
                            <div className="relative group/input">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                    placeholder="Confirm new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-secondary text-[9px] font-bold uppercase tracking-tight pl-2">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-white hover:text-slate-900 transition-all active:scale-[0.98] disabled:opacity-50 group"
                        >
                            {loading ? "SAVING..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ResetPassword;
