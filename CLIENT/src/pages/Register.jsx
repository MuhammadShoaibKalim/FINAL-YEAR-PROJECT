import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { post } from "../Services/ApiEndpoints";
import bgImage from "../assets/HeroLab1.png";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, clearError } from '../redux/AuthSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one number and one letter
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for the current field
    setErrors((prev) => ({ ...prev, [name]: '' }));
    
    // Validate the field immediately
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }
    
    if (name === 'password' && value) {
      if (!validatePassword(value)) {
        setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters long and contain at least one number and one letter' }));
      }
    }
    
    if (name === 'confirmPassword' && value) {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      }
    }
    
    dispatch(clearError());
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });

    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password && !validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and contain at least one number and one letter';
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const isFormValid = () => {
    const validationErrors = validateForm();
    return Object.keys(validationErrors).length === 0 && termsAccepted;
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error('You must accept the terms and conditions!');
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch(setLoading(true));
      const { confirmPassword, ...payload } = formData;
      
      const response = await post("/api/auth/register", payload);
      
      if (response.status === 201) {
        toast.success(response.data.message || "Successfully registered!");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-8 ">
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
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map((field, index) => (
              <div key={index} className="relative">
                <label className="block text-text-secondary text-sm mb-1">
                  {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className={`flex items-center border rounded-md px-4 py-3 bg-bg-secondary ${errors[field] ? 'border-error' : 'border-border'}`}>
                  {field === 'email' ? (
                    <FaEnvelope className="text-text-secondary" />
                  ) : field.includes('password') ? (
                    <FaLock className="text-text-secondary" />
                  ) : (
                    <FaUser className="text-text-secondary" />
                  )}
                  <input
                    type={
                      field === 'password' 
                        ? (showPassword ? 'text' : 'password')
                        : field === 'confirmPassword'
                        ? (showConfirmPassword ? 'text' : 'password')
                        : 'text'
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    placeholder={`Enter your ${field}`}
                    className="w-full bg-transparent ml-3 focus:outline-none text-text-primary placeholder-text-secondary"
                  />
                  {(field === 'password' || field === 'confirmPassword') && (
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field)}
                      className="text-text-secondary hover:text-text-primary focus:outline-none ml-2"
                    >
                      {field === 'password' 
                        ? (showPassword ? <FaEyeSlash /> : <FaEye />)
                        : (showConfirmPassword ? <FaEyeSlash /> : <FaEye />)
                      }
                    </button>
                  )}
                </div>
                {errors[field] && (
                  <p className="text-error text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2 accent-primary"
              />
              <label htmlFor="terms" className="text-text-secondary">
                I accept the{' '}
                <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className={`w-full flex items-center justify-center gap-3 bg-primary text-text-white px-6 py-3 rounded-md transition-colors text-lg ${
                !isFormValid() || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
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