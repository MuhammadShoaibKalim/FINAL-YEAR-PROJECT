import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaHospital } from "react-icons/fa";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    age: "",
    address: "",
    state: "",
    country: "Pakistan",
    collectionMethod: "",
    bookingDate: "",
    bookingTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      gender: "Male",
      age: "",
      address: "",
      state: "",
      country: "Pakistan",
      collectionMethod: "",
      bookingDate: "",
      bookingTime: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.collectionMethod) {
      toast.error("Please select a collection method");
      return;
    }

    localStorage.setItem("bookingData", JSON.stringify(formData));
    navigate("/confirm-booking");
  };

  const handleCollectionMethod = (method) => {
    setFormData({ ...formData, collectionMethod: method });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        className="text-primary hover:underline flex items-center gap-2 mb-6"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back to Cart
      </button>

      <div className="bg-white p-6 rounded-lg shadow border border-primary mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Book Your Lab Test</h1>
        <p className="text-gray-600">
          Provide accurate information and select your preferred collection method.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 border rounded-lg shadow space-y-6"
      >
        <div>
          <label className="block text-lg font-medium mb-2">Collection Method</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleCollectionMethod("Home Collection")}
              className={`flex items-center gap-2 px-4 py-2 border rounded w-full justify-center ${
                formData.collectionMethod === "Home Collection"
                  ? "bg-primary text-white"
                  : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              <FaHome /> Home Collection
            </button>
            <button
              type="button"
              onClick={() => handleCollectionMethod("Lab Visit")}
              className={`flex items-center gap-2 px-4 py-2 border rounded w-full justify-center ${
                formData.collectionMethod === "Lab Visit"
                  ? "bg-primary text-white"
                  : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              <FaHospital /> Lab Visit
            </button>
          </div>
          {formData.collectionMethod && (
            <p className="mt-2 text-green-600 font-medium">
              Selected: {formData.collectionMethod}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-primary"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-primary"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-primary"
              placeholder="03XXXXXXXXX"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-primary"
              placeholder="Your age"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Booking Date</label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Booking Time</label>
            <input
              type="time"
              name="bookingTime"
              value={formData.bookingTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-primary"
              placeholder="Province/State"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-primary"
              placeholder="Street, Area, City"
              required
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
