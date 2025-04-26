import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import bgImage from "../../assets/HeroLab1.png";
import { post } from '../../Services/ApiEndpoints';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../../redux/AuthSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const pathname = window.location.pathname;

    if (user && (pathname === "/login" || pathname === "/")) {
      const role = user.role?.toLowerCase()?.replace(/\s+/g, '');
      if (role === "superadmin") {
        navigate("/admin/super/overview", { replace: true });
      } else if (role === "labadmin") {
        navigate("/labadmin/lab/overview", { replace: true });
      } else {
        navigate("/userprofile", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const request = await post('/api/auth/login', { email, password });
      if (request.status === 200) {
        const userData = request.data.data;

        if (rememberMe) {
          localStorage.setItem('authToken', request.data.token);
        } else {
          sessionStorage.setItem('authToken', request.data.token);
        }

        localStorage.setItem("userId", userData._id);
        dispatch(SetUser(userData));
        toast.success(request.data.message || "Login successful!");

        const role = userData.role?.toLowerCase()?.replace(/\s+/g, '');
        if (role === "superadmin") {
          navigate("/admin/super/overview", { replace: true });
        } else if (role === "labadmin") {
          navigate("/labadmin/lab/overview", { replace: true });
        } else {
          navigate("/userprofile", { replace: true });
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6">
      <div className="w-full max-w-6xl bg-bg-primary rounded-lg shadow-primary flex overflow-hidden">
        {/* Left Side Image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
          <h2 className="text-4xl font-bold text-center text-text-primary">Welcome to LabCore</h2>
          <p className="text-center text-text-secondary text-sm mt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">Sign up</Link>
          </p>

          {error && (
            <div className="bg-error/10 border border-error text-error px-4 py-3 rounded relative">
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="on">
            {/* Email */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Email</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-bg-secondary border-border">
                <FaEnvelope className="text-text-secondary" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-transparent ml-2 focus:outline-none text-text-primary placeholder-text-secondary"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Password</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-bg-secondary border-border">
                <FaLock className="text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent ml-2 focus:outline-none text-text-primary placeholder-text-secondary"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-text-secondary ml-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember me and Forgot Password */}
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
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
