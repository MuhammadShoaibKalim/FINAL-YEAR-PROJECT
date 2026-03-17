import React, { useState } from "react";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";

const Join = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Lab Owner Information
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerCNIC: "",
    ownerAddress: "",
    
    // Lab Details
    labName: "",
    labAddress: "",
    labPhone: "",
    cityProvince: "",
    labRegistrationNumber: "",
    labSpecialties: [],
    
    // Digital & Operational Info
    hasInternet: false,
    hasBookingSoftware: false,
    bookingSoftwareName: "",
    staffCount: "",
    offersHomeCollection: false,
    labLicense: null
  });

  const specialties = [
    "Blood Tests",
    "Hormones",
    "Thyroid",
    "Diabetes",
    "Cardiac",
    "Liver Function",
    "Kidney Function",
    "Urine Analysis",
    "Microbiology",
    "Pathology"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "checkbox") {
      if (name === "labSpecialties") {
        const updatedSpecialties = checked
          ? [...formData.labSpecialties, value]
          : formData.labSpecialties.filter(item => item !== value);
        setFormData(prev => ({ ...prev, labSpecialties: updatedSpecialties }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === "labSpecialties") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch("/api/labs/apply", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully!");
        // Reset form
        setFormData({
          ownerName: "",
          ownerEmail: "",
          ownerPhone: "",
          ownerCNIC: "",
          ownerAddress: "",
          labName: "",
          labAddress: "",
          labPhone: "",
          cityProvince: "",
          labRegistrationNumber: "",
          labSpecialties: [],
          hasInternet: false,
          hasBookingSoftware: false,
          bookingSoftwareName: "",
          staffCount: "",
          offersHomeCollection: false,
          labLicense: null
        });
      } else {
        toast.error(data.message || "Failed to submit application");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-secondary min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Partner with TestSahulat</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join our growing network of diagnostic labs and reach more patients through our platform.
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-primary space-y-8">
          <h2 className="text-2xl font-semibold text-primary mb-6">Lab Application Form</h2>
          
          {/* Lab Owner Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Lab Owner Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CNIC / National ID *</label>
                <input
                  type="text"
                  name="ownerCNIC"
                  value={formData.ownerCNIC}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{"Owner's"} Address *</label>
                <textarea
                  name="ownerAddress"
                  value={formData.ownerAddress}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Lab Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Lab Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lab Name *</label>
                <input
                  type="text"
                  name="labName"
                  value={formData.labName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lab Phone Number *</label>
                <input
                  type="tel"
                  name="labPhone"
                  value={formData.labPhone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City & Province *</label>
                <input
                  type="text"
                  name="cityProvince"
                  value={formData.cityProvince}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lab Registration Number</label>
                <input
                  type="text"
                  name="labRegistrationNumber"
                  value={formData.labRegistrationNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Lab Address *</label>
                <textarea
                  name="labAddress"
                  value={formData.labAddress}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Lab Specialties *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {specialties.map((specialty) => (
                    <label key={specialty} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="labSpecialties"
                        value={specialty}
                        checked={formData.labSpecialties.includes(specialty)}
                        onChange={handleChange}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Digital & Operational Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Digital & Operational Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Does your lab have internet access? *</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasInternet"
                      checked={formData.hasInternet}
                      onChange={() => setFormData(prev => ({ ...prev, hasInternet: true }))}
                      required
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasInternet"
                      checked={!formData.hasInternet}
                      onChange={() => setFormData(prev => ({ ...prev, hasInternet: false }))}
                      required
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you currently using any software for bookings? *</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBookingSoftware"
                      checked={formData.hasBookingSoftware}
                      onChange={() => setFormData(prev => ({ ...prev, hasBookingSoftware: true }))}
                      required
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBookingSoftware"
                      checked={!formData.hasBookingSoftware}
                      onChange={() => setFormData(prev => ({ ...prev, hasBookingSoftware: false }))}
                      required
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              {formData.hasBookingSoftware && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Which software are you using?</label>
                  <input
                    type="text"
                    name="bookingSoftwareName"
                    value={formData.bookingSoftwareName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How many lab staff do you have? *</label>
                <input
                  type="number"
                  name="staffCount"
                  value={formData.staffCount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Do you offer home sample collection? *</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="offersHomeCollection"
                      checked={formData.offersHomeCollection}
                      onChange={() => setFormData(prev => ({ ...prev, offersHomeCollection: true }))}
                      required
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="offersHomeCollection"
                      checked={!formData.offersHomeCollection}
                      onChange={() => setFormData(prev => ({ ...prev, offersHomeCollection: false }))}
                      required
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Lab License *</label>
                <input
                  type="file"
                  name="labLicense"
                  onChange={handleChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, JPG, JPEG, PNG</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Application</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
