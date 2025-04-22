import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import bgImage from "../assets/HeroLab1.png";
import { post } from '../Services/ApiEndpoints';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (user) {
      const role = user.role?.toLowerCase()?.replace(/\s+/g, '');
      console.log('User role:', role); 
      
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
      console.log('Full API Response:', request); 

      if (request.status === 200) {
        const userData = request.data.data;
        console.log('User Data from API:', userData);

        if (!userData) {
          console.error('No user data in response');
          setError('Invalid response from server');
          return;
        }

        // Store the token
        localStorage.setItem('authToken', request.data.token);
        console.log('Token stored in localStorage');

        // Set user in Redux
        dispatch(SetUser(userData));
        console.log('User data set in Redux:', userData);

        toast.success(request.data.message || "Login successful!");

        const role = userData.role?.toLowerCase()?.replace(/\s+/g, '');
        console.log('Processed Role:', role);

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

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-1">Password</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-bg-secondary border-border">
                <FaLock className="text-text-secondary" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent ml-2 focus:outline-none text-text-primary placeholder-text-secondary"
                  required
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
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
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
