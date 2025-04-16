import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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

const Product = () => {
  const { testId } = useParams(); 
  const navigate = useNavigate(); 

  const test = tests.find((t) => t.title === decodeURIComponent(testId)); 

  if (!test) {
    return <div className="text-center text-red-500 mt-10">Test not found</div>;
  }

  // Handle navigation to the booking page
  const handleBooking = () => {
    navigate(`/booking/test/${encodeURIComponent(test.title)}`);
  };

  return (
    <div className="bg-white shadow p-10 max-w-2xl mx-auto md:mt-32 md:mb-12">
      <h1 className="text-3xl font-bold text-primary">{test.title}</h1>
      <p className="text-lg mt-4">{test.description}</p>
      <p className="text-xl font-semibold mt-2">Price: {test.price}</p>
      <p className="text-md text-gray-500">Bookings: {test.bookings}</p>
      <button
        className="mt-6 bg-primary text-white py-2 px-4 rounded-lg"
        onClick={handleBooking}
      >
        Proceed to Booking
      </button>
    </div>
  );
};

export default Product;
