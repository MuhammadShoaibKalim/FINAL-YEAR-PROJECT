import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaSignInAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { post } from '../../Services/ApiEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../../redux/AuthSlice';
import bgImage from "../../assets/HeroLab1.png";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
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
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    const pathname = window.location.pathname;
    if (user && (pathname === "/login" || pathname === "/")) {
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
        toast.error("You must change your password before continuing.");
        navigate(`/reset-password-force/${userData._id}`);
        return;
      }
  
      // Store token
      if (rememberMe) {
        localStorage.setItem('authToken', res.data.token);
      } else {
        sessionStorage.setItem('authToken', res.data.token);
      }
  
      localStorage.setItem("userId", userData._id);
      dispatch(SetUser(userData));
      toast.success(res.data.message || "Login successful!");
  
      const role = userData.role?.toLowerCase()?.replace(/\s+/g, '');
      if (role === "superadmin") navigate("/admin/super/overview");
      else if (role === "labadmin") navigate("/labadmin/lab/labdashboard");
      else navigate("/user");
  
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";
      toast.error(message);
  
      if (message.toLowerCase().includes("invalid")) {
        setError("email", { message: "Invalid email or password" });
        setError("password", { message: "Invalid email or password" });
      }
  
      if (err?.response?.data?.errors) {
        const serverErrors = err.response.data.errors;
        for (const field in serverErrors) {
          setError(field, { message: serverErrors[field] });
        }
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6">
      <div className="w-full max-w-6xl bg-bg-primary rounded-lg shadow-primary flex overflow-hidden">
        {/* Left image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
          <h2 className="text-4xl font-bold text-center text-text-primary">Welcome to TestSahulat</h2>
          <p className="text-center text-text-secondary text-sm mt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">Sign up</Link>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Email</label>
              <div className={`flex items-center border rounded-md px-3 py-2 bg-bg-secondary ${errors.email ? "border-error" : "border-border"}`}>
                <FaEnvelope className="text-text-secondary" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full bg-transparent ml-2 focus:outline-none text-text-primary placeholder-text-secondary"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Password</label>
              <div className={`flex items-center border rounded-md px-3 py-2 bg-bg-secondary ${errors.password ? "border-error" : "border-border"}`}>
                <FaLock className="text-text-secondary" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full bg-transparent ml-2 focus:outline-none text-text-primary placeholder-text-secondary"
                  {...register("password")}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-text-secondary ml-2">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember me + forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-text-secondary">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-primary"
                /> Remember me
              </label>
              <Link to="/user/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
              }`}
            >
              {loading ? <ImSpinner2 className="animate-spin" /> : <FaSignInAlt />} Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
