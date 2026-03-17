import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaSignInAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaRobot } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { post } from '../../Services/ApiEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../../redux/AuthSlice';
import bgImage from "../../assets/HeroLab1.png";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit'
  });

  useEffect(() => {
    if (user) {
      const role = user.role?.toLowerCase()?.replace(/\s+/g, '');
      if (role === "superadmin") navigate("/admin/super/overview", { replace: true });
      else if (role === "labadmin") navigate("/labadmin/lab/overview", { replace: true });
      else navigate("/user", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await post('/api/auth/login', formData);
      const userData = res.data.data;

      if (userData?.forcePasswordChange) {
        toast.error("Security: Password update required.");
        navigate(`/reset-password-force/${userData._id}`);
        return;
      }

      if (rememberMe) localStorage.setItem('authToken', res.data.token);
      else sessionStorage.setItem('authToken', res.data.token);

      localStorage.setItem("userId", userData._id);
      dispatch(SetUser(userData));
      toast.success("Welcome back to TestSahulat!");

      const role = userData.role?.toLowerCase()?.replace(/\s+/g, '');
      if (role === "superadmin") navigate("/admin/super/overview");
      else if (role === "labadmin") navigate("/labadmin/lab/labdashboard");
      else navigate("/user");

    } catch (err) {
      toast.error(err?.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white font-sans overflow-hidden">
      {/* Left Column: Visual & Branding */}
      <div className="hidden lg:flex relative bg-slate-900 p-20 flex-col justify-between overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="Laboratory" className="w-full h-full object-cover opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        {/* Branding */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl border-4 border-slate-800 group-hover:scale-105 transition-transform">
               <span className="text-2xl font-black text-primary">T</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white tracking-tighter">Test<span className="text-primary italic">Sahulat</span></span>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 -mt-1">Verified Care</p>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
           <h1 className="text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
             Your Health <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Our AI Priority.</span>
           </h1>
           <p className="text-slate-400 text-lg font-medium leading-relaxed">
             Access cutting-edge diagnostic reports, AI-driven test recommendations, and trusted laboratory partners all in one secure platform.
           </p>
        </div>

        {/* Features Row */}
        <div className="relative z-10 flex gap-10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 text-primary">
                 <FaShieldAlt />
              </div>
              <p className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none">ISO Certified <br /> Partners</p>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 text-secondary">
                 <FaRobot />
              </div>
              <p className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none">AI Diagnostics <br /> Engine</p>
           </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex items-center justify-center p-8 sm:p-20 relative">
        <div className="absolute top-10 right-10 lg:hidden">
            <Link to="/" className="text-2xl font-black text-slate-800 tracking-tighter">Test<span className="text-primary">Sahulat</span></Link>
        </div>

        <div className="w-full max-w-md space-y-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Patient Gateway</h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Sign in to manage your health records</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
              <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-[1.25rem] px-5 py-4 ${errors.email ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'border-slate-50 focus-within:border-primary focus-within:bg-white focus-within:shadow-xl focus-within:shadow-primary/5'}`}>
                <FaEnvelope className={`${errors.email ? 'text-rose-500' : 'text-slate-400'}`} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-transparent ml-4 outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-1 ml-4">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Password</label>
              <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-[1.25rem] px-5 py-4 ${errors.password ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'border-slate-50 focus-within:border-primary focus-within:bg-white focus-within:shadow-xl focus-within:shadow-primary/5'}`}>
                <FaLock className={`${errors.password ? 'text-rose-500' : 'text-slate-400'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent ml-4 outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium"
                  {...register("password")}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-primary transition-colors">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-1 ml-4">{errors.password.message}</p>}
            </div>

            <div className="flex justify-between items-center px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                 <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-primary border-primary' : 'border-slate-200 group-hover:border-primary'}`}>
                    <input type="checkbox" className="hidden" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    {rememberMe && <div className="w-2 h-2 bg-white rounded-full"></div>}
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Keep me signed in</span>
              </label>
              <Link to="/user/forgot-password" size={10} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Reset Credentials</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-primary text-white py-5 rounded-[1.25rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? <ImSpinner2 className="animate-spin" /> : <FaSignInAlt />} Secure Authentication
            </button>
          </form>

          <div className="text-center">
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
               New to the platform? 
               <Link to="/register" className="ml-2 text-primary hover:underline decoration-2 underline-offset-4 transition-all">Create Profile</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
