import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaClock,
  FaPhone,
  FaCalendarAlt
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return <span className="flex items-center gap-0.5">{stars}</span>;
}

export default function Labs() {
  const [labs, setLabs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/labs/public");
        setLabs(data.labs);
      } catch (error) {
        console.error("Error fetching labs", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLabs();
  }, []);

  const filteredLabs = labs
    .filter((lab) =>
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.location.toLowerCase().includes(searchQuery.toLowerCase())
    .sort((a, b) => {
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "price_low") return (a.price || 0) - (b.price || 0);
      if (sortOption === "price_high") return (b.price || 0) - (a.price || 0);
      return 0;
    })
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-lg px-8 py-12 mb-12 text-center border border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Find Premium Diagnostic Labs
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover accredited labs with state-of-the-art facilities and accurate test results.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search labs by name, location or test..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          />
          <FaSearch className="absolute right-5 top-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="hidden md:block text-gray-700 font-medium">Filter:</div>
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-300">
            <FaFilter className="text-gray-600" />
            <select
              className="bg-transparent text-gray-800 focus:outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="rating">Highest Rating</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="distance">Nearest First</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-10 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLabs.length > 0 ? (
            filteredLabs.map((lab) => (
              <LabCard key={lab._id} lab={lab} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-xl mb-4">No labs match your search</div>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSortOption("");
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LabCard({ lab }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-bg-primary rounded-2xl shadow-primary overflow-hidden hover:shadow-xl transition-all duration-300 border border-border-primary flex flex-col h-full">
      {/* Lab Image with Badge */}
      <div className="relative">
        <img
          src={lab.image || "/default-lab.jpg"}
          alt={lab.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "/default-lab.jpg";
          }}
        />
        {lab.isCertified && (
          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
            <span>Certified</span>
          </div>
        )}
      </div>

      {/* Lab Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold text-text-dark">{lab.name}</h2>
          <div className="flex items-center gap-1 bg-bg-secondary px-2.5 py-1 rounded-full">
            <span className="font-semibold text-primary text-sm">
              {lab.rating?.toFixed(1) || "New"}
            </span>
            {lab.rating ? renderStars(lab.rating) : null}
          </div>
        </div>

        <div className="flex items-center gap-2 text-text-secondary mb-3 text-sm">
          <FaMapMarkerAlt className="text-primary" />
          <span className="truncate">{lab.location}</span>
        </div>

        <div className="text-text-tertiary text-sm mb-4 line-clamp-2">
          {lab.description || "Premium diagnostic lab with advanced testing facilities."}
        </div>

        {/* Lab Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <FaClock className="text-primary" />
            <span>{lab.hours || "24/7"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <FaPhone className="text-primary" />
            <span>{lab.phone || "Contact"}</span>
          </div>
        </div>

        {/* Expandable Details */}
        {expanded && (
          <div className="mt-2 mb-4 space-y-3 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              <span>Same day results: {lab.sameDayResults ? "Yes" : "No"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-center">🏥</span>
              <span>Specialties: {lab.specialties?.join(", ") || "General"}</span>
            </div>
            {lab.distance && (
              <div className="flex items-center gap-2">
                <span className="w-4 text-center">📍</span>
                <span>{lab.distance.toFixed(1)} km away</span>
              </div>
            )}
          </div>
        )}

        {/* View More Button */}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center text-primary text-sm font-medium mb-4 hover:text-primary-dark"
        >
          {expanded ? "Show less" : "View more details"} 
          <IoIosArrowForward className={`ml-1 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>

        {/* Action Buttons */}
        <div className="mt-auto space-y-3">
          <Link
            to={`/labs/${lab._id}/testpackage`}
            className="block text-center bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            View Tests & Packages
          </Link>
          <Link
            to={`/labs/${lab._id}/details`}
            className="block text-center border border-primary text-primary hover:bg-primary hover:text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            Lab Details
          </Link>
        </div>
      </div>
    </div>
  );
}