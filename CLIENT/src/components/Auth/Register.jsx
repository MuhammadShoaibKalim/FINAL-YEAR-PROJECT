import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUserPlus, FaEnvelope, FaLock, FaUser, FaPhone, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { post } from '../../Services/ApiEndpoints';
import { useSelector } from 'react-redux';
import bgImage from "../../assets/HeroLab2.png";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid format").required("Email is required"),
  phoneNo: yup.string().matches(/^\d{10,11}$/, "Invalid phone number").required("Phone number is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/user", { replace: true });
  }, [user, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit'
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await post('/api/auth/register', formData);
      toast.success("Verification email sent! Check your inbox.");
      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white font-sans overflow-hidden">
      {/* Right Column: Visual & Branding (Flipped from Login for variety) */}
      <div className="hidden lg:flex relative bg-slate-900 p-20 flex-col justify-between overflow-hidden order-2">
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="Laboratory" className="w-full h-full object-cover opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-right">
          <Link to="/" className="inline-flex items-center gap-4 group flex-row-reverse">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl border-4 border-slate-800 group-hover:scale-105 transition-transform">
               <span className="text-2xl font-black text-primary italic">S</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white tracking-tighter">Test<span className="text-primary italic">Sahulat</span></span>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 -mt-1">Future of Diagnostics</p>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-md ml-auto text-right">
           <h1 className="text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
             Begin Your <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Health Journey.</span>
           </h1>
           <p className="text-slate-400 text-lg font-medium leading-relaxed">
             Join thousands of users who trust TestSahulat for accurate diagnostic recommendations and secure medical report management.
           </p>
        </div>

        <div className="relative z-10 flex flex-row-reverse gap-10">
           <div className="flex items-center gap-3 flex-row-reverse">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-primary">
                 <FaShieldAlt className="text-xl" />
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-white uppercase tracking-widest">End-to-End</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest lowercase italic">Encrypted Data</p>
              </div>
           </div>
        </div>
      </div>

      {/* Left Column: Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative h-screen overflow-y-auto order-1 scrollbar-hide">
        <div className="w-full max-w-xl space-y-10 py-10">
          <div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Create Profile</h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Join the network of health-conscious individuals</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-5 py-3 ${errors.firstName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                  <FaUser className="text-slate-400 text-xs" />
                  <input type="text" placeholder="John" className="w-full bg-transparent ml-3 outline-none text-sm font-bold text-slate-700" {...register("firstName")} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-5 py-3 ${errors.lastName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                  <input type="text" placeholder="Doe" className="w-full bg-transparent outline-none text-sm font-bold text-slate-700" {...register("lastName")} />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
              <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-5 py-4 ${errors.email ? 'border-rose-500 shadow-sm' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                <FaEnvelope className="text-slate-400" />
                <input type="email" placeholder="john.doe@hmail.com" className="w-full bg-transparent ml-4 outline-none text-sm font-bold text-slate-700" {...register("email")} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Contact</label>
              <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-5 py-4 ${errors.phoneNo ? 'border-rose-500' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                <FaPhone className="text-slate-400" />
                <input type="tel" placeholder="03XXXXXXXXX" className="w-full bg-transparent ml-4 outline-none text-sm font-bold text-slate-700" {...register("phoneNo")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-5 py-3 ${errors.password ? 'border-rose-500' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                  <FaLock className="text-slate-400 text-xs" />
                  <input type="password" placeholder="••••••••" className="w-full bg-transparent ml-3 outline-none text-sm font-bold text-slate-700 font-mono" {...register("password")} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verify</label>
                <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-5 py-3 ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-50 focus-within:border-primary focus-within:bg-white'}`}>
                  <input type="password" placeholder="••••••••" className="w-full bg-transparent outline-none text-sm font-bold text-slate-700 font-mono" {...register("confirmPassword")} />
                </div>
              </div>
            </div>

            <p className="text-[9px] text-slate-400 leading-relaxed px-2 font-bold uppercase tracking-widest">
               By registering, you agree to our <Link className="text-primary italic">Clinical Protocol</Link> & <Link className="text-primary italic">Patient Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-primary text-white py-6 rounded-3xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {loading ? <ImSpinner2 className="animate-spin" /> : <FaUserPlus />} Finalize Enrollment <FaArrowRight className="text-[10px]" />
            </button>
          </form>

          <div className="text-center">
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
               Already have a health profile? 
               <Link to="/login" className="ml-2 text-primary hover:underline decoration-2 underline-offset-4 font-black">Secure Login</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
