import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaStar, FaStarHalfAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const LabTests = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const tests = [
    {
      title: "Complete Blood Count (CBC)",
      description: "A complete blood count test to check overall health.",
      price: "Rs 800",
      bookings: 150,
      rating: 4.5,
      category: "FAQ",
    },
    {
      title: "Liver Function Test (LFT)",
      description: "A test to assess liver health and function.",
      price: "Rs 1000",
      bookings: 200,
      rating: 5.0,
      category: "FAQ",
    },
    {
      title: "Blood Sugar Test",
      description: "A test to measure blood glucose levels.",
      price: "Rs 700",
      bookings: 120,
      rating: 3.5,
      category: "FAQ",
    },
    {
      title: "Kidney Function Test (KFT)",
      description: "A test to evaluate kidney performance and detect issues.",
      price: "Rs 1200",
      bookings: 80,
      category: "New", // No rating
    },
    {
      title: "Vitamin D Test",
      description: "A test to measure Vitamin D levels in the body.",
      price: "Rs 1500",
      bookings: 95,
      category: "New", // No rating
    },
    {
      title: "Thyroid Function Test (TFT)",
      description: "A test to evaluate thyroid gland functionality.",
      price: "Rs 1100",
      bookings: 50,
      category: "New", // No rating
    },
  ];

  // Filtered tests based on active filter
  const filteredTests =
    activeFilter === "All"
      ? tests
      : tests.filter((test) => test.category === activeFilter);

  return (
    <div className="bg-white shadow py-10 px-4 md:px-20 lg:px-40 mt-12">
      <h1 className="text-3xl font-bold text-primary mb-6">Lab Test Services</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {["All", "FAQ", "New"].map((filter) => (
          <button
            key={filter}
            className={`py-2 px-6 rounded-lg shadow-lg font-medium transition ${activeFilter === filter
                ? "bg-primary text-white"
                : "bg-white text-black"
              }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTests.map((test, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded p-6 flex flex-col items-center text-center"
          >
            {/* Bookings */}
            <div className="flex justify-between w-full">
              <div className="flex items-center text-sm text-black mt-2">
                <FaEye className="text-black" />
                <span className="ml-1 font-bold">{test.bookings}</span> Booked
              </div>
              {/* Only show ratings for FAQ category */}
              {test.rating && (
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => {
                    if (i < Math.floor(test.rating)) {
                      return <FaStar key={i} className="text-yellow-500" />;
                    } else if (
                      i === Math.floor(test.rating) &&
                      test.rating % 1 !== 0
                    ) {
                      return (
                        <FaStarHalfAlt key={i} className="text-yellow-500" />
                      );
                    } else {
                      return <FaStar key={i} className="text-black" />;
                    }
                  })}
                </div>
              )}
            </div>

            {/* Test Details */}
            <h2 className="text-lg font-bold text-black mt-2">{test.title}</h2>
            <p className="text-black mt-2">{test.description}</p>

            {/* Price and Booking Button */}
            <div className="flex justify-between items-center w-full mt-4">
              <div className="text-black bg-white rounded-full py-2 px-6">{test.price}</div>
              <Link to={`/test/${encodeURIComponent(test.title)}`}>
                <button className="flex items-center justify-center bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition">
                  Book Now <AiOutlineArrowRight className="ml-2" />
                </button>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTests;
