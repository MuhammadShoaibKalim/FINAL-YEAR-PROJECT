import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary text-center px-6">
      <FaLock className="text-6xl text-error mb-4" />
      <h1 className="text-3xl font-bold text-text-primary mb-2">Access Denied</h1>
      <p className="text-text-secondary mb-6">
        You do not have permission to view this page. Please return to a valid section.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
