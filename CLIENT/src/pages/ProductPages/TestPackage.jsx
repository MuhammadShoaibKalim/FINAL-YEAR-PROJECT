  import React from "react";
  import { useParams, useNavigate } from "react-router-dom";
  
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
  
  const TestPackageDetails = () => {
    const { title } = useParams();
    const navigate = useNavigate();
  
    // Find the selected package by title
    const selectedPackage = packages.find(
      (pkg) => pkg.title === decodeURIComponent(title)
    );
  
    // Handle navigation to the selected test detail page
    const handleTestDetailNavigation = (testTitle) => {
      navigate(`/test/${encodeURIComponent(testTitle)}`); 
    };
  
    if (!selectedPackage) {
      return <div className="text-center text-red-500 mt-10">Package not found</div>;
    }
  
    return (
      <div className="bg-white shadow p-10 max-w-2xl mx-auto md:mt-28 md:mb-12">
        <h1 className="text-3xl font-bold text-primary mb-6">{selectedPackage?.title}</h1>
  
        {/* Display the tests in the selected package */}
        <ul className="space-y-4">
          {selectedPackage?.tests.map((test, index) => (
            <li
              key={index}
              className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
              onClick={() => handleTestDetailNavigation(test)}
            >
              {test}
            </li>
          ))}
        </ul>
  
        {/* Proceed to booking */}
        <button
          className="mt-6 bg-primary text-white py-2 px-4 rounded-lg"
          onClick={() => navigate(`/booking/package/${encodeURIComponent(selectedPackage.title)}`)}
        >
          Proceed to Booking
        </button>
      </div>
    );
  };
  
  export default TestPackageDetails;
  