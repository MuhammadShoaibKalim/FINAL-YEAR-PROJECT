import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { post } from "../../Services/ApiEndpoints.jsx";
import bgImage from "../../assets/HeroLab1.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, password, confirmPassword } = formData;
  
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    else {
      if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
        if (!strongPasswordRegex.test(password)) {
          newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }
      }
    }
  
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const request = await post('/api/auth/register', formData);
      const response = request.data;

      if (request.status === 201) {
        toast.success(response.message || 'Registered successfully!');
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-8">
      <div className="w-full max-w-5xl bg-bg-primary rounded-lg shadow-primary flex overflow-hidden">
        {/* Left Side Image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center ml-12 mt-12"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-center text-text-primary">Create an Account</h2>
          <p className="text-center text-text-secondary text-sm mt-2">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">First Name</label>
              <div className={`flex items-center border rounded-md px-4 py-3 bg-bg-secondary ${errors.firstName ? 'border-error' : 'border-border'}`}>
                <FaUser className="text-text-secondary" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full bg-transparent ml-3 focus:outline-none text-text-primary placeholder-text-secondary"
                  required
                />
              </div>
              {errors.firstName && <p className="text-error text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Last Name</label>
              <div className={`flex items-center border rounded-md px-4 py-3 bg-bg-secondary ${errors.lastName ? 'border-error' : 'border-border'}`}>
                <FaUser className="text-text-secondary" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full bg-transparent ml-3 focus:outline-none text-text-primary placeholder-text-secondary"
                  required
                />
              </div>
              {errors.lastName && <p className="text-error text-sm mt-1">{errors.lastName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Email</label>
              <div className={`flex items-center border rounded-md px-4 py-3 bg-bg-secondary ${errors.email ? 'border-error' : 'border-border'}`}>
                <FaEnvelope className="text-text-secondary" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-transparent ml-3 focus:outline-none text-text-primary placeholder-text-secondary"
                  required
                />
              </div>
              {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Password</label>
              <div className={`flex items-center border rounded-md px-4 py-3 bg-bg-secondary ${errors.password ? 'border-error' : 'border-border'}`}>
                <FaLock className="text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent ml-3 focus:outline-none text-text-primary placeholder-text-secondary"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="text-text-secondary ml-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-text-secondary text-sm mb-1">Confirm Password</label>
              <div className={`flex items-center border rounded-md px-4 py-3 bg-bg-secondary ${errors.confirmPassword ? 'border-error' : 'border-border'}`}>
                <FaLock className="text-text-secondary" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full bg-transparent ml-3 focus:outline-none text-text-primary placeholder-text-secondary"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="text-text-secondary ml-2"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 bg-primary text-white px-6 py-3 rounded-md transition-colors text-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
              }`}
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaUserPlus />} Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
