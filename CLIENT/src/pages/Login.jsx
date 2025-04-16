import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import bgImage from "../assets/HeroLab1.png";
import { post } from '../Services/ApiEndpoints';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError, clearError } from '../redux/AuthSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      dispatch(setError("Both fields are required!"));
      return;
    }

    dispatch(setLoading(true));
    try {
      const request = await post('/api/auth/login', { email, password });
      const response = request.data;

      if (response.success) {
        dispatch(setUser({
          user: response.user,
          token: response.token
        }));
        toast.success(response.message);

        // Navigate based on user role
        if (response.user.role === "admin") {
          navigate("/admin");
        } else if (response.user.role === "superadmin") {
          navigate("/superadmin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        dispatch(setError(response.message || "Login failed. Please try again."));
      }
    } catch (error) {
      console.error("Login Error:", error);
      dispatch(setError(error?.response?.data?.message || "Login failed. Please try again."));
    }
    dispatch(setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6">
      <div className="w-full max-w-6xl bg-bg-primary rounded-lg shadow-primary flex overflow-hidden">
        {/* Left Side Image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
        ></div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
          <h2 className="text-4xl font-bold text-center text-text-primary">Welcome to LabCore</h2>
          <p className="text-center text-text-secondary text-sm mt-2">
            {`Don't have an account?`}{' '}
            <Link to="/register" className="text-primary hover:underline">Sign up</Link>
          </p>
          {error && (
            <div className="bg-error/10 border border-error text-error px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-text-secondary text-sm mb-1">Email</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-bg-secondary border-border">
                <FaEnvelope className="text-text-secondary" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full bg-transparent ml-2 focus:outline-none text-text-primary placeholder-text-secondary"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-text-secondary text-sm mb-1">Password</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-bg-secondary border-border">
                <FaLock className="text-text-secondary" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-transparent ml-2 focus:outline-none text-text-primary placeholder-text-secondary"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-text-secondary">
                <input type="checkbox" className="mr-2 accent-primary" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password}
              className={`w-full flex items-center justify-center gap-2 bg-primary text-text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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