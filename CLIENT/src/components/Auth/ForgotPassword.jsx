import { useState } from 'react';
import { post } from '../../Services/ApiEndpoints';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await post('/api/auth/forgot-password', { email });
      if (response.status === 200) {
        toast.success(response.data.message || 'Password reset email sent!');
      }
    } catch (error) {
      console.error('Forgot Password error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary p-8">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-text-primary">Forgot Password?</h2>
        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div>
            <label className="block text-text-secondary mb-2">Enter your registered email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-primary hover:underline text-sm">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
