// TestPackages.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaStar, FaEye, FaMapMarkerAlt } from "react-icons/fa";
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
        <div className="flex flex-col md:flex-row bg-bg-primary rounded-4xl shadow-primary p-10 border border-border-light mb-12 items-center md:items-start gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-72 h-72 rounded-4xl overflow-hidden border-4 border-primary shadow-lg">
              <img src={labDetails.image} alt={labDetails.name} className="w-full h-full object-cover object-center" />
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark">{labDetails.name}</h1>
              <div className="flex items-center gap-2 bg-warning text-text-dark px-4 py-2 rounded-full shadow-md">
                <FaStar className="text-lg" />
                <span className="text-lg font-semibold">{labDetails.rating?.toFixed(1)}</span>
              </div>
            </div>
            {labDetails.description && (
              <p className="mt-6 text-text-primary text-lg leading-relaxed mb-6">
                {labDetails.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-text-secondary">
              <FaMapMarkerAlt className="text-primary" />
              <span className="text-md">{labDetails.address || labDetails.location}</span>
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
          <div key={item._id} className="bg-white rounded-xl shadow-lg p-5 relative flex flex-col justify-between hover:shadow-2xl transition duration-200 border">
            <div className="flex justify-between items-center text-sm mb-3 text-gray-600">
              <div className="flex items-center gap-1"><FaEye /> {item.bookedCount || 0}</div>
              <div className="flex items-center gap-1">{renderStars(item.rating || 0)}</div>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">{item.name}</h2>

            <div className="text-center mb-4">
              <p className="text-md text-primary font-medium">PKR {item.price}</p>
              {item.discount && (
                <span className="inline-block mt-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-semibold">
                  {item.discount}% OFF
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <button
                disabled={addingItemId === item._id}
                onClick={() => handleAddToCart(item)}
                className={`bg-primary text-white rounded-md py-2 transition ${addingItemId === item._id ? "opacity-60 cursor-not-allowed" : "hover:bg-primary-hover"}`}
              >
                {addingItemId === item._id ? "Adding..." : "Add to Cart"}
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

      <CartSection />

      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-lg space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
              <div className="text-yellow-400 text-lg">{renderStars(selectedItem.rating || 0)}</div>
            </div>
            <div className="text-gray-700">{selectedItem.description}</div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-primary">PKR {selectedItem.price}</span>
              <button onClick={closeModal} className="text-red-500 hover:underline">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPackages;
