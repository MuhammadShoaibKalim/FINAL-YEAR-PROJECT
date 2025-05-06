// ✅ 1. Updated CheckEmail.jsx with resend link
import { Link } from "react-router-dom";

const CheckEmail = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-bg-primary px-4">
      <h1 className="text-3xl font-bold text-text-primary mb-4">Check Your Email</h1>
      <p className="text-text-secondary max-w-md">
        We've sent a verification link to your email address. Please verify your account by clicking the link in your inbox.
      </p>
      <p className="text-text-secondary mt-2">
        After verification, you can log in to your account.
      </p>

      {/* 🔁 Add this resend link */}
      <p className="text-text-secondary mt-4">
        Didn't receive the email?{' '}
        <Link to="/resend-verification" className="text-primary underline">
          Resend Verification Email
        </Link>
      </p>

      <Link to="/login" className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition">
        Go to Login
      </Link>
    </div>
  );
};

export default CheckEmail;
