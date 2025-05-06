import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { post } from "../../Services/ApiEndpoints.jsx";
import bgImage from "../../assets/HeroLab1.png";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s'-]+$/, "First name must only contain letters"),
lastName: yup
  .string()
  .required("Last name is required")
  .matches(/^[a-zA-Z]+$/, "Name must contain only letters"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number and special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});


const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await post('/api/auth/register', formData);

      if (response.status === 201) {
        toast.success(response.data.message || 'Registered successfully!');
        navigate('/check-email');
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed. Try again.';
      toast.error(message);

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
    <div className="flex justify-center bg-bg-primary py-16 px-4 min-h-[700px]">
      <div className="w-full max-w-5xl bg-bg-primary rounded-lg shadow-primary flex overflow-hidden">
        <div className="hidden md:block w-1/2 bg-cover bg-center ml-12 mt-12" style={{ backgroundImage: `url(${bgImage})` }}></div>

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-center text-text-primary">Create an Account</h2>
          <p className="text-center text-text-secondary text-sm mt-2">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* First Name */}
            <InputField icon={<FaUser />} name="firstName" placeholder="Enter your first name" register={register} error={errors.firstName} />

            {/* Last Name */}
            <InputField icon={<FaUser />} name="lastName" placeholder="Enter your last name" register={register} error={errors.lastName} />

            {/* Email */}
            <InputField icon={<FaEnvelope />} name="email" placeholder="Enter your email" register={register} error={errors.email} type="email" />

            {/* Password */}
            <InputField
              icon={<FaLock />}
              name="password"
              placeholder="Enter your password"
              register={register}
              error={errors.password}
              type={showPassword ? 'text' : 'password'}
              toggleEye={() => setShowPassword(!showPassword)}
              showEye={showPassword}
            />

            {/* Confirm Password */}
            <InputField
              icon={<FaLock />}
              name="confirmPassword"
              placeholder="Confirm your password"
              register={register}
              error={errors.confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              toggleEye={() => setShowConfirmPassword(!showConfirmPassword)}
              showEye={showConfirmPassword}
            />

            {/* Submit */}
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

const InputField = ({ icon, name, placeholder, register, error, type = "text", toggleEye, showEye }) => (
  <div>
    <label className="block text-text-secondary text-sm mb-1 capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
    <div className={`flex items-center border rounded-md px-4 py-3 bg-bg-secondary ${error ? 'border-error' : 'border-border'}`}>
      <div className="text-text-secondary">{icon}</div>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent ml-3 focus:outline-none text-text-primary placeholder-text-secondary"
      />
      {toggleEye && (
        <button type="button" onClick={toggleEye} className="text-text-secondary ml-2">
          {showEye ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
    {error && <p className="text-error text-sm mt-1">{error.message}</p>}
  </div>
);

export default Register;
