import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const TestPackages = () => {
  // State to track the active filter
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "FAQ"];
  const packages = [
    {
      title: "Full Body Check-Up",
      bookings: 250,
      rating: 4.5,
      category: "FAQ",
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
      rating: 4.2,
      category: "FAQ",
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
      category: "All",
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
      rating: 4.0,
      category: "FAQ",
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
      category: "All",
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
      category: "All",
      tests: [
        "Liver Function Test (LFT)",
        "Muscle Enzyme Test",
        "Cholesterol Test",
        "Complete Blood Count (CBC)",
        "Vitamin D Test",
      ],
    },
  ];

  // Filtered packages based on the active filter
  const filteredPackages =
    activeFilter === "All"
      ? packages
      : packages.filter((pkg) => pkg.category === activeFilter);

  return (
    <div className="bg-white shadow py-10 px-4 md:px-20 lg:px-40 mt-12">
      <h1 className="text-3xl font-bold text-primary mb-6">Test Packages</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`font-medium py-2 px-4 rounded-lg shadow transition ${
              activeFilter === filter
                ? "bg-primary text-white"
                : "bg-white text-black hover:bg-white"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Test Packages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
          >
            <p className="text-sm text-black">Package</p>
            <h3 className="text-lg font-bold text-black">{pkg.title}</h3>
                {/* Show button to book */}
            <Link to={`/test-package/${encodeURIComponent(pkg.title)}`}>
              <button className="flex items-center justify-center bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition mt-4">
                View Details <AiOutlineArrowRight className="ml-2" />
              </button>
            </Link>
             {/* Display Tests Included */}
             <div className="flex justify-center w-full mt-4">
              <div className="flex items-center text-sm text-black pr-4">
                <span className="font-bold">{pkg.tests.length}</span> Tests Included
              </div>
            </div>
            {/* Rating and Booked Count */}
            <div className="flex justify-between w-full mt-4">
              {/* Left side: Booked Count */}
              <div className="flex items-center text-sm text-black pr-4">
                <FaEye className="text-black mr-1" />
                <span className="font-bold">{pkg.bookings}</span> Booked
              </div>

              {/* Right side: Rating (Only if category is FAQ) */}
              {pkg.category === "FAQ" && (
                <div className="flex items-center text-sm text-black">
                  <span className="font-bold">{pkg.rating}</span> ⭐
                </div>
                
              )}
            </div>

           

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPackages;
