import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const calledRef = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("invalid");
        return;
      }

      if (calledRef.current) return;
      calledRef.current = true;

      try {
        const response = await axios.get(`/api/users/verify-email?token=${token}`);
        const message = response.data?.message || "Email verified successfully!";

        if (response.data?.alreadyVerified) {
          toast.success("Email already verified. You can now log in.");
          setStatus("already-verified");
          return;
        }

        toast.success(message);
        setStatus("success");

        // Optional auto-redirect after 3s
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(error?.response?.data?.message || "Verification failed");
        setStatus("failed");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex items-center space-x-3 text-lg text-primary">
            <ImSpinner8 className="animate-spin text-2xl" />
            <span>Verifying your email...</span>
          </div>
        );
      case "success":
        return (
          <div className="text-green-600 text-xl font-semibold space-y-2">
            <p>Email verified! Redirecting to login...</p>
            <p>Not redirected? <Link to="/login" className="underline text-primary">Click here</Link></p>
          </div>
        );
      case "already-verified":
        return (
          <div className="text-green-600 text-xl font-semibold space-y-2">
            <p>Your email is already verified.</p>
            <Link to="/login" className="underline text-primary">Click here to login</Link>
          </div>
        );
      case "failed":
        return (
          <div className="text-red-600 text-lg space-y-2">
            <p>Verification failed. Link may be invalid or expired.</p>
            <Link to="/login" className="underline text-primary">Go to login</Link>
          </div>
        );
      case "invalid":
        return (
          <div className="text-red-600 text-lg space-y-2">
            <p>Invalid verification link.</p>
            <Link to="/login" className="underline text-primary">Go to login</Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4 text-center">
      <h1 className="text-3xl font-bold text-text-primary mb-4">Email Verification</h1>
      {renderContent()}
    </div>
  );
};

export default EmailVerification;
