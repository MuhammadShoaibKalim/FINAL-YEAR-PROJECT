import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaStar, FaEye } from "react-icons/fa";

const TestPackages = () => {
  const { id } = useParams(); 
  const [tests, setTests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); 

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {halfStar && <span className="text-yellow-400">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </>
    );
  };
  

  useEffect(() => {
    const fetchTestsAndPackages = async () => {
      try {
        const [testRes, packageRes] = await Promise.all([
          axios.get(`/api/tests/get-all-tests`),
          axios.get(`/api/tests/get-all-packages`),
        ]);

        // setTests(testRes.data.tests.filter((t) => t.lab?.toString() === id));
        // setPackages(packageRes.data.packages.filter((p) => p.lab?.toString() === id));
        setTests(testRes.data.tests.filter((t) => t.lab?.toString() === id || t.lab === id));
        setPackages(packageRes.data.packages.filter((p) => p.lab?.toString() === id || p.lab === id));

      } catch (error) {
        console.error("Error fetching test/package", error);
      }
    };

    fetchTestsAndPackages();
  }, [id]);

  const handleFilter = (type) => setActiveFilter(type);
  const handleSort = (value) => setSortOption(value);
  const handleViewDetails = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  let combined = [
    ...tests.map((item) => ({ ...item, type: "Test" })),
    ...packages.map((item) => ({ ...item, type: "Package" })),
  ];

  combined = combined.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeFilter === "All" || item.type === activeFilter)
  );

  combined.sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    if (sortOption === "booked") return (b.bookedCount || 0) - (a.bookedCount || 0);
    if (sortOption === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

<button
  onClick={() => window.history.back()}
  className="mb-6 inline-flex items-center text-primary hover:underline"
>
  <AiOutlineArrowRight className="rotate-180 mr-2" />
  Back to Labs
</button>

{/* Page Title */}
<h1 className="text-3xl font-bold text-primary mb-4">Tests & Packages</h1>

<div className="flex flex-wrap items-center justify-between gap-2 mb-4">
  <input
    type="text"
    placeholder="Search by name..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-grow min-w-[160px] px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
  />

  <select
    value={sortOption}
    onChange={(e) => handleSort(e.target.value)}
    className="w-auto px-4 py-2 border rounded shadow-sm"
  >
    <option value="">Sort by</option>
    <option value="low">Price: Low to High</option>
    <option value="high">Price: High to Low</option>
    <option value="booked">Most Booked</option>
    <option value="rating">Rating: High to Low</option>
    <option value="lowrating">Rating: Low to High</option>
  </select>
</div>


<div className="mb-8">
  <div className="flex gap-4">
    {["All", "Test", "Package"].map((type) => (
      <button
        key={type}
        onClick={() => handleFilter(type)}
        className={`px-4 py-2 border rounded-lg shadow transition ${
          activeFilter === type
            ? "bg-primary text-white"
            : "text-primary border-primary"
        } transition duration-200`}
      >
        {type}
      </button>
    ))}
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {combined.map((item) => (
    <div
      key={item._id}
      className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition duration-200 border"
    >
      {item.discount && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
          {item.discount}% OFF
        </div>
      )}

      <div className="flex justify-between items-center text-sm mb-3 text-gray-600">
        <div className="flex items-center gap-1">
          <FaEye /> {item.bookedCount || 0}
        </div>
        {/* <div className="flex items-center gap-1 text-yellow-500">
          <FaStar /> {item.rating || 0}
        </div> */}
        <div className="flex items-center gap-1">
          {renderStars(item.rating || 0)}
       </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
        {item.name}
      </h2>

      <p className="text-md text-center text-primary font-medium mb-4">
        PKR {item.price}
      </p>

      <div className="flex flex-col gap-2 mt-auto">
        <button
          className="bg-primary text-white rounded-md py-2 hover:bg-primary-hover transition"
          onClick={() => console.log("Added to cart:", item.name)}
        >
          Add to Cart
        </button>
        <button
          className="border border-primary text-primary rounded-md py-2 hover:bg-gray-50 transition"
          onClick={() => handleViewDetails(item)}
        >
          View Details
        </button>
      </div>
    </div>
  ))}
</div>

{/* View Details Modal */}
{selectedItem && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-lg space-y-4">

      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
        <div className="text-yellow-400 text-lg">
          {renderStars(selectedItem.rating || 0)}
        </div>
      </div>

      <div className="text-center text-gray-700 font-medium">
        PKR {selectedItem.price} <span className="mx-2">|</span> {selectedItem.type}
      </div>

      {selectedItem.description && (
  <p className="text-gray-600">{selectedItem.description}</p>
)}

      <button
        className="bg-primary hover:bg-primary-hover text-white rounded w-full py-2"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  </div>
)}


</div>

  );
};

export default TestPackages;
