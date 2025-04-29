import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaFilter, FaMapMarkerAlt, FaStar } from "react-icons/fa";

export default function Labs() {
  const [labs, setLabs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const { data } = await axios.get("/api/labs/public");
        
        setLabs(data.labs);
      } catch (error) {
        console.error("Error fetching labs", error);
      }
    };
    fetchLabs();
  }, []);

  const filteredLabs = labs
    .filter((lab) =>
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "price_low") return (a.price || 0) - (b.price || 0);
      if (sortOption === "price_high") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="max-w-7xl mx-auto bg-bg-primary rounded-4xl shadow-primary px-8 py-10 mb-12 text-center border border-border-primary">
        <h1 className="text-5xl font-bold text-text-dark mb-4">
          Explore Our Labs
        </h1>
        <p className="text-lg text-text-secondary">
          Choose from the best diagnostic labs offering top-rated tests and health packages.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search labs by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-border-primary text-text-dark focus:outline-none bg-bg-secondary shadow-sm"
          />
          <FaSearch className="absolute right-4 top-3.5 text-gray-dark" />
        </div>

        <div className="flex items-center gap-3">
          <FaFilter className="text-text-dark" />
          <select
            className="px-4 py-2 rounded-md border border-border-primary bg-bg-secondary text-text-dark focus:outline-none"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="rating">High Rating</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="space-y-8">
        {filteredLabs.length > 0 ? (
          filteredLabs.map((lab) => (
            <div
              key={lab._id}
              className="flex flex-col md:flex-row bg-bg-primary rounded-4xl shadow-primary overflow-hidden transition-transform hover:scale-[1.02] border border-border-light"
            >
              <div className="md:w-1/3 p-4">
                <div className="rounded-4xl overflow-hidden shadow-md">
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 md:w-2/3 relative">
                <div className="absolute top-6 right-6 flex items-center bg-warning text-text-dark px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                  <FaStar className="mr-1" /> {lab.rating}
                </div>

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-text-dark">{lab.name}</h2>
                  <div className="flex items-center gap-2 mt-3 text-text-secondary">
                    <FaMapMarkerAlt className="text-primary" />
                    <span className="text-md">{lab.address}, {lab.location}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                <Link to={`/labs/${lab._id}/testpackage`} className="flex-1 text-center bg-primary text-white font-semibold px-6 py-3 rounded-4xl hover:bg-primary-hover transition">
                          View Tests & Packages
                        </Link>

                  <Link
                    to={`/labs/${lab._id}/details`}
                    className="flex-1 text-center border border-primary text-primary font-semibold px-6 py-3 rounded-4xl hover:bg-primary hover:text-white transition"
                  >
                    View Lab Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-text-secondary text-xl">No labs found.</p>
        )}
      </div>
    </div>
  );
}
