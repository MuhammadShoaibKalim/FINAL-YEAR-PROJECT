import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ApplicationStatus = () => {
  const [email, setEmail] = useState('');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/labs/applications/status?email=${email}`);
      setApplication(response.data.application);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching application status');
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Check Application Status</h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </div>
        </form>

        {application && (
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">{application.labName}</h3>
              <span className={`font-semibold ${getStatusColor(application.status)}`}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Lab Owner Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {application.ownerName}</p>
                  <p><span className="font-medium">Email:</span> {application.ownerEmail}</p>
                  <p><span className="font-medium">Phone:</span> {application.ownerPhone}</p>
                  <p><span className="font-medium">CNIC:</span> {application.ownerCNIC}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Lab Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Address:</span> {application.labAddress}</p>
                  <p><span className="font-medium">Phone:</span> {application.labPhone}</p>
                  <p><span className="font-medium">City/Province:</span> {application.cityProvince}</p>
                  <p><span className="font-medium">Registration:</span> {application.labRegistrationNumber}</p>
                </div>
              </div>
            </div>

            {application.status === 'rejected' && application.rejectionReason && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-700 mb-2">Reason for Rejection</h4>
                <p className="text-red-600">{application.rejectionReason}</p>
              </div>
            )}

            {application.status === 'approved' && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Next Steps</h4>
                <p className="text-green-600">
                  Your application has been approved! Please check your email for login credentials
                  and instructions on how to access your lab dashboard.
                </p>
              </div>
            )}

            {application.status === 'pending' && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-700 mb-2">Application Under Review</h4>
                <p className="text-yellow-600">
                  Your application is currently being reviewed by our team. We will notify you
                  via email once the review is complete.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus; 