import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaSpinner, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { get, put } from "../../Services/ApiEndpoints";

const LabApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await get("/api/labs/applications");
      if (response.success) {
        setApplications(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await put(`/api/labs/applications/${id}/status`, { status });
      if (response.success) {
        toast.success(`Application ${status} successfully`);
        fetchApplications(); // Refresh the list
      }
    } catch (error) {
      toast.error("Failed to update application status");
    }
  };

  const viewApplicationDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const ApplicationModal = ({ application, onClose }) => {
    if (!application) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-primary">Application Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Lab Owner Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lab Owner Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{application.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{application.ownerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{application.ownerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CNIC</p>
                  <p className="font-medium">{application.ownerCNIC}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{application.ownerAddress}</p>
                </div>
              </div>
            </div>

            {/* Lab Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lab Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Lab Name</p>
                  <p className="font-medium">{application.labName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{application.labPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City & Province</p>
                  <p className="font-medium">{application.cityProvince}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registration Number</p>
                  <p className="font-medium">{application.labRegistrationNumber || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{application.labAddress}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Specialties</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {application.labSpecialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Digital & Operational Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Digital & Operational Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Internet Access</p>
                  <p className="font-medium">{application.hasInternet ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking Software</p>
                  <p className="font-medium">{application.hasBookingSoftware ? "Yes" : "No"}</p>
                </div>
                {application.hasBookingSoftware && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Software Name</p>
                    <p className="font-medium">{application.bookingSoftwareName}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Staff Count</p>
                  <p className="font-medium">{application.staffCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Home Collection</p>
                  <p className="font-medium">{application.offersHomeCollection ? "Yes" : "No"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Lab License</p>
                  <a
                    href={application.labLicense}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View License
                  </a>
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Application Status</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : application.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(application.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {application.status === "pending" && (
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => handleStatusUpdate(application._id, "rejected")}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate(application._id, "approved")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Approve
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">Lab Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No applications found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lab Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {application.labName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.cityProvince}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.ownerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.ownerEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.ownerPhone}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.labPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : application.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => viewApplicationDetails(application)}
                        className="text-primary hover:text-primary-dark"
                        title="View Details"
                      >
                        <FaEye size={20} />
                      </button>
                      {application.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(application._id, "approved")}
                            className="text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <FaCheck size={20} />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, "rejected")}
                            className="text-red-600 hover:text-red-800"
                            title="Reject"
                          >
                            <FaTimes size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default LabApplications; 