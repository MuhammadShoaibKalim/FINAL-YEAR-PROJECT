/*
const packages = [
  {
    title: "Full Body Check-Up",
    bookings: 250,
    description: "A comprehensive health check-up package that includes a wide range of tests to monitor your overall health.",
    rating: 4.5,
    price: 2000,
    tests: [
      "Complete Blood Count (CBC)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Blood Sugar Test",
      "Cholesterol Test",
    ],
  },
  {
    title: "Heart Health Package",
    bookings: 180,
    description: "This package focuses on heart health, including tests for cholesterol, ECG, and blood pressure.",
    rating: 4.2,
    tests: [
      "ECG (Electrocardiogram)",
      "Cholesterol Test",
      "Blood Pressure Measurement",
      "Liver Function Test (LFT)",
    ],
  },
  {
    title: "Women’s Health Package",
    bookings: 150,
    description: "Tailored for women's health, this package includes essential tests like pregnancy, thyroid function, and ultrasound.",
    tests: [
      "Pregnancy Test",
      "Thyroid Function Test (TFT)",
      "Vitamin D Test",
      "Complete Blood Count (CBC)",
      "Ultrasound",
    ],
  },
  {
    title: "Diabetes Care Package",
    bookings: 200,
    description: "Focused on managing diabetes, this package includes tests to monitor blood sugar levels and overall health.",
    rating: 4.0,
    tests: [
      "Blood Sugar Test",
      "HbA1c Test",
      "Kidney Function Test (KFT)",
      "Cholesterol Test",
    ],
  },
  {
    title: "Senior Citizen Health Package",
    bookings: 170,
    description: "Specially designed for senior citizens, this package includes tests for bone density, thyroid, and more.",
    tests: [
      "Bone Density Test",
      "Thyroid Function Test (TFT)",
      "Complete Blood Count (CBC)",
      "Vitamin B12 Test",
      "Urine Analysis",
    ],
  },
  {
    title: "Sports Fitness Package",
    bookings: 120,
    description: "Designed for active individuals, this package includes fitness-related tests like muscle enzyme and cholesterol tests.",
    tests: [
      "Liver Function Test (LFT)",
      "Muscle Enzyme Test",
      "Cholesterol Test",
      "Complete Blood Count (CBC)",
      "Vitamin D Test",
    ],
  },
];
*/ 


import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaHome, FaWalking } from "react-icons/fa";

const packages = [
  {
    title: "Full Body Check-Up",
    bookings: 250,
    description: "A comprehensive health check-up package that includes a wide range of tests to monitor your overall health.",
    rating: 4.5,
    price: 2000,
    tests: [
      "Complete Blood Count (CBC)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Blood Sugar Test",
      "Cholesterol Test",
    ],
  },
  {
    title: "Heart Health Package",
    bookings: 180,
    description: "This package focuses on heart health, including tests for cholesterol, ECG, and blood pressure.",
    rating: 4.2,
    tests: [
      "ECG (Electrocardiogram)",
      "Cholesterol Test",
      "Blood Pressure Measurement",
      "Liver Function Test (LFT)",
    ],
  },
  {
    title: "Women’s Health Package",
    bookings: 150,
    description: "Tailored for women's health, this package includes essential tests like pregnancy, thyroid function, and ultrasound.",
    tests: [
      "Pregnancy Test",
      "Thyroid Function Test (TFT)",
      "Vitamin D Test",
      "Complete Blood Count (CBC)",
      "Ultrasound",
    ],
  },
  {
    title: "Diabetes Care Package",
    bookings: 200,
    description: "Focused on managing diabetes, this package includes tests to monitor blood sugar levels and overall health.",
    rating: 4.0,
    tests: [
      "Blood Sugar Test",
      "HbA1c Test",
      "Kidney Function Test (KFT)",
      "Cholesterol Test",
    ],
  },
  {
    title: "Senior Citizen Health Package",
    bookings: 170,
    description: "Specially designed for senior citizens, this package includes tests for bone density, thyroid, and more.",
    tests: [
      "Bone Density Test",
      "Thyroid Function Test (TFT)",
      "Complete Blood Count (CBC)",
      "Vitamin B12 Test",
      "Urine Analysis",
    ],
  },
  {
    title: "Sports Fitness Package",
    bookings: 120,
    description: "Designed for active individuals, this package includes fitness-related tests like muscle enzyme and cholesterol tests.",
    tests: [
      "Liver Function Test (LFT)",
      "Muscle Enzyme Test",
      "Cholesterol Test",
      "Complete Blood Count (CBC)",
      "Vitamin D Test",
    ],
  },
];


const PackageCart = () => {
  const { title } = useParams();
  const selectedPackage = packages.find((pkg) => 
    pkg.title.toLowerCase() === title.replace(/-/g, " ").toLowerCase()
  );
  
  console.log(selectedPackage); 


  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  if (!selectedPackage) {
    console.warn(`Package with title "${title}" not found.`);
    return <div className="text-center text-red-500 mt-10">Package not found</div>;
  }
  

  return (
    <div className="bg-white shadow-lg p-10 max-w-8xl mx-auto md:mt-32 ">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-primary mb-4">Add to Cart</h1>

      {/* Dynamic Message */}
      <p className="text-lg mb-6">
        Complete the form below to confirm your booking for{" "}
        <span className="font-semibold text-primary">{selectedPackage.title}</span>.
      </p>

      {/* Two-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* Left Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          {/* Cart Title */}
          <h2 className="text-xl font-bold text-primary mb-4">Cart</h2>

          {/* Selected Package Card */}
          <div className="bg-white p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-black">{selectedPackage.title}</h3>
            <p className="text-gray-600">
              Tests: {selectedPackage.tests.join(", ")}
            </p>
            <p className="text-primary font-bold mt-2">Price: {selectedPackage.price}</p>
          </div>

          {/* Buttons for Sample Collection */}
          <div className="space-y-4 ">
            <div
              className={`flex items-center p-4 rounded-lg cursor-pointer ${selectedOption === "home" ? "border-primary border-2" : "bg-white"
                } shadow-lg `}
              onClick={() => handleSelectOption("home")}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mr-4">
                <FaHome size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary text-lg">
                  Home Test Sample Collection
                </h3>
                <p className="text-gray-600 text-sm">
                  I would like a professional to visit my home and collect the sample.
                </p>
              </div>
              {/* Circle Indicator */}
              <div
                className={`w-6 h-6 border-2 rounded-full ${selectedOption === "home" ? "bg-primary border-primary" : "border-gray"
                  }`}></div>
            </div>

            {/* Physical Sample Collection Button */}
            <div
              className={`flex items-center p-4 rounded-lg cursor-pointer ${selectedOption === "physical" ? "border-primary border-2" : "bg-white"
                } shadow-lg `}
              onClick={() => handleSelectOption("physical")}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mr-4">
                <FaWalking size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary text-lg">
                  Physical Test Sample Collection
                </h3>
                <p className="text-gray-600 text-sm">
                  I prefer to visit the lab for sample collection.
                </p>
              </div>
              {/* Circle Indicator */}
              <div
                className={`w-6 h-6 border-2 rounded-full ${selectedOption === "physical" ? "bg-primary border-primary " : "border-gray"
                  }`}></div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 ">
          {/* Step Title */}
          <h2 className="text-xl font-bold text-primary mb-4">Progressive Steps</h2>

          {/* Form */}
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray">Phone</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray">Gender</label>
              <select className="w-full mt-1 p-2 border rounded-lg outline-none ">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-lg outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray">Address</label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  className="w-1/2 mt-1 p-2 border rounded-lg outline-none"
                  placeholder="State"
                />
                <input
                  type="text"
                  className="w-1/2 mt-1 p-2 border rounded-lg outline-none"
                  placeholder="City"
                />
              </div>
            </div>

            {/* Total and Subtotal */}
            <div className="space-y-2 flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">
                Subtotal: <span className="font-bold">Rs {selectedPackage.price}</span>
              </p>
              <p className="text-sm font-medium text-gray-700">
                Total: <span className="font-bold">Rs {selectedPackage.price}</span>
              </p>
            </div>

            {/* Place Order Button */}
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg ">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageCart;
