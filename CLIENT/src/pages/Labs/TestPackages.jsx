// TestPackages.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaStar, FaEye, FaMapMarkerAlt, FaStarHalfAlt, FaRegStar, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { toast } from "react-hot-toast";
import CartSection from "../../components/Cart/CartSection";
import { setCurrentLabId } from "../../redux/LabSlice";
import { addItem } from "../../redux/CartSlice";

const TestPackages = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [tests, setTests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [labDetails, setLabDetails] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [addingItemId, setAddingItemId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [userRating, setUserRating] = useState(0);

  const handleAddToCart = async (item) => {
    try {
      setAddingItemId(item._id);
      const response = await axios.post(
        "/api/cart/add",
        {
          testOrPackageId: item._id,
          type: item.type,
          name: item.name,
          price: item.price,
          labId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.data.success) {
        const newCartItem = {
          _id: response.data.itemId || item._id,
          name: item.name,
          price: item.price,
          type: item.type,
          labId: id,
          quantity: 1,
        };
        dispatch(addItem(newCartItem));
        toast.success("Item added to cart");
      } else {
        toast.error(response.data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingItemId(null);
    }
  };

  const submitFeedback = async (itemId, type) => {
    try {
      await axios.post(
        "/api/tests/feedback/add",
        {
          testOrPackageId: itemId,
          type,
          rating: userRating,
          comment: feedbackText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Feedback submitted");
      setFeedbackText("");
      setUserRating(0);
      setSelectedItem(null);
    } catch (error) {
      toast.error("Failed to submit feedback");

    }
  };

  function renderBookedCount(bookedCount) {
    return (
      <div className="flex items-center gap-1">
        <FaEye className="text-gray-500" />
        <span className="text-sm text-gray-500">{bookedCount || 0}</span>
      </div>
    );
  }

  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        const { data } = await axios.get(`/api/labs/public/${id}`);
        setLabDetails(data.lab);
      } catch (error) {
        console.error("Error fetching lab details", error);
      }
    };
    fetchLabDetails();
  }, [id]);

  useEffect(() => {
    const fetchTestsAndPackages = async () => {
      try {
        const [testRes, packageRes] = await Promise.all([
          axios.get(`/api/tests/get-all-tests`),
          axios.get(`/api/tests/get-all-packages`),
        ]);
        setTests(testRes.data.tests.filter((t) => t.lab?.toString() === id || t.lab === id));
        setPackages(packageRes.data.packages.filter((p) => p.lab?.toString() === id || p.lab === id));
      } catch (error) {
        console.error("Error fetching test/package", error);
      }
    };
    fetchTestsAndPackages();
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(setCurrentLabId(id));
    }
  }, [id, dispatch]);

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
    if (sortOption === "lowrating") return (a.rating || 0) - (b.rating || 0);
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

      {labDetails && (
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-12 items-center md:items-start gap-12">
          <div className="w-full md:w-1/3 flex justify-center relative">
            <div className="w-72 h-72 rounded-2xl overflow-hidden border-4 border-primary shadow-lg relative">
              <img src={labDetails.image} alt={labDetails.name} className="w-full h-full object-cover object-center" />
              <div className="absolute top-4 right-4 flex items-center gap-1 z-10">
                <span className="font-semibold text-yellow-600 text-lg drop-shadow-md">{labDetails.rating?.toFixed(1) || "New"}</span>
                {renderBookedCount(labDetails.bookedCount)}
              </div>
            </div>
          </div>
          <div className="flex-1 relative flex flex-col justify-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark">{labDetails.name}</h1>
            </div>
            {labDetails.description && (
              <p className="mt-6 text-text-primary text-lg leading-relaxed mb-6">
                {labDetails.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-text-secondary mb-2">
              <FaMapMarkerAlt className="text-primary" />
              <span className="text-md">{labDetails.address || labDetails.location}</span>
            </div>
            <div className="flex flex-wrap gap-6 mt-2 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-primary" />
                <span>{labDetails.phone || labDetails.contactNumber || "Not available"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span>{labDetails.email || "Not available"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
              className={`px-4 py-2 border rounded-lg shadow transition ${activeFilter === type ? "bg-primary text-white" : "text-primary border-primary"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {combined.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-primary/90 rounded-full">
                        {item.type}
                    </span>
                    <div className="text-sm text-gray-500">
                        {renderBookedCount(item.bookedCount)}
                    </div>
                </div>
                <h2 className="font-bold text-lg text-gray-800 mb-4">{item.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                    {item.discount > 0 ? (
                        <>
                            <span className="text-xl font-bold text-primary">
                                PKR {Math.round(item.price * (1 - (item.discount || 0) / 100))}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                                PKR {item.price}
                            </span>
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                {item.discount}% OFF
                            </span>
                        </>
                    ) : (
                        <span className="text-xl font-bold text-primary">
                            PKR {item.price}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => handleViewDetails(item)}
                        className="px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => handleAddToCart(item)}
                        disabled={addingItemId === item._id}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                            addingItemId === item._id
                                ? 'bg-gray-300 text-gray-500'
                                : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                    >
                        {addingItemId === item._id ? "Adding..." : "Add to Cart"}
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
      <CartSection />
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-lg space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
            </div>
            <div className="text-gray-700 mb-2">{selectedItem.description}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-primary">PKR {selectedItem.price}</span>
              {selectedItem.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">PKR {selectedItem.price / (1 - (selectedItem.discount || 0) / 100)}</span>
              )}
              {selectedItem.discount > 0 && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{selectedItem.discount}% OFF</span>
              )}
            </div>
            {selectedItem.type === "Package" && (selectedItem.includedTests || selectedItem.tests) && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Included Tests:</h3>
                <ul className="list-inside text-gray-700">
                  {(selectedItem.includedTests || selectedItem.tests).map((test, idx) => {
                    // Alternate bullet styles: disc, circle, square
                    const bulletStyles = [
                      'list-disc',
                      'list-circle',
                      'list-square'
                    ];
                    const bullet = bulletStyles[idx % bulletStyles.length];
                    return (
                      <li key={idx} className={bullet + " ml-5"}>{test.name || test}</li>
                    );
                  })}
                </ul>
              </div>
            )}
            <button
              onClick={closeModal}
              className="text-red-500 hover:underline mt-4"
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
