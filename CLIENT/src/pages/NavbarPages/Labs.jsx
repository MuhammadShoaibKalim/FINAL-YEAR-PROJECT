import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFlask, FaBox, FaSearch, FaFilter } from "react-icons/fa";
import ServiceCard from "./ServicesCard.jsx";
import BookingForm from "./BookingForm.jsx";

const Button = ({ children, onClick, variant = "primary", type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white font-semibold ${variant === "outline"
        ? "border border-gray-500 text-gray-700"
        : "bg-primary hover:bg-primary/90"
        } ${className}`}
    >
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

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

const services = [
  ...packages.map((pkg) => ({ ...pkg, type: "package" })),
  ...tests.map((test) => ({ ...test, type: "test" })),
];


const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");

  const handleBook = (serviceId) => {
    setSelectedService(serviceId);
    setShowBookingForm(true);
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowDetails(true);
  };

  const filteredServices = services
    .filter((service) => {
      return (
        (filter === "all" || service.type === filter) &&
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOption === "price_low") {
        return (a.price || 0) - (b.price || 0);
      } else if (sortOption === "price_high") {
        return (b.price || 0) - (a.price || 0);
      } else if (sortOption === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      {/* Title & Browse Buttons */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-12">Our Services</h1>
        <p className="text-gray-700 mb-8">Comprehensive diagnostic solutions for your health needs.</p>
        {/* <div className="flex justify-center gap-4 mb-6">
          <Link to="/services/lab-tests">
            <Button className="flex items-center gap-2">
              <FaFlask className="h-5 w-5" />
              Browse Tests
            </Button>
          </Link>
          <Link to="/services/test-packages">
            <Button className="flex items-center gap-2">
              <FaBox className="h-5 w-5" />
              Browse Packages
            </Button>
          </Link>
        </div> */}
      </div>

      {/* Search Bar */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Search for a test or package..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-md text-black border border-black focus:outline-none"
        />
        <FaSearch className="absolute right-3 top-3 text-black" />
      </div>

      {/* Filters & Sorting Section */}
      <div className="flex items-center justify-between bg-p-4 rounded-md text-black mb-6">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-md ${filter === "all" ? "text-white bg-primary" : "text-black bg-white border border-primary"} shadow-md`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === "test" ? "text-white bg-primary" : "text-black bg-white border border-primary"} shadow-md`}
            onClick={() => setFilter("test")}
          >
            Tests
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === "package" ? "text-white bg-primary" : "text-black bg-white border border-primary"} shadow-md`}
            onClick={() => setFilter("package")}
          >
            Packages
          </button>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center gap-2 ">
          <FaFilter className="text-black text-lg" />
          <select
            className="text-black px-3 py-2 rounded-md focus:outline-none border border-gray"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredServices.length > 0 ? (
    filteredServices.map((service) => (
      <ServiceCard
        key={service.title}
        viewCount={service.bookings}
        title={service.title}
        rating={service.rating || " "}
        price={service.price}
        description={service.description}
        type={service.type} 
        onViewDetails={() => handleViewDetails(service)}
      />
    ))
  ) : (
    <p className="text-black text-center col-span-3">No services found.</p>
  )}
</div>

      {/* Booking Modal */}
      <Modal isOpen={showBookingForm} onClose={() => setShowBookingForm(false)}>
        {selectedService && (
          <BookingForm
            serviceName={selectedService}
            onClose={() => setShowBookingForm(false)}
          />
        )}
      </Modal>

      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
  {selectedService && (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">{selectedService.title}</h2>
      <p className="text-gray-600">
        {selectedService.description || "No description available."}
      </p>
      <div className="flex items-center text-black">
        <span className="font-medium">Price:</span>
        <span className="ml-2 text-lg">
          {selectedService.price ? `$${selectedService.price}` : "Price on request"}
        </span>
      </div>
      {selectedService.tests && (
        <div className="flex flex-col text-black">
          <span className="font-medium">Included Tests:</span>
          <ul className="list-disc ml-4">
            {selectedService.tests.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center text-black">
        <span className="font-medium">Rating:</span>
        <span className="ml-2 text-lg">
          {selectedService.rating ? `${selectedService.rating} ⭐` : "No rating"}
        </span>
      </div>
      <div className="flex items-center text-black">
        <span className="font-medium">Bookings:</span>
        <span className="ml-2 text-lg">
          {selectedService.bookings || "No bookings yet"}
        </span>
      </div>
    </div>
  )}
</Modal>



    </div>
  );
};

export default Services;
