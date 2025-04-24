import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaUsers } from "react-icons/fa";
import { useCart } from "react-use-cart";
import { labsData } from "./LabData";
import toast, { Toaster } from "react-hot-toast";
import Cart from "../../../components/UserAdmin/Cart";

export default function LabDetails() {
  const { addItem, inCart, isEmpty, items } = useCart();
  const { labId } = useParams();
  const navigate = useNavigate();
  const lab = labsData.find((l) => l.id === parseInt(labId));

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("rating");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  if (!lab) return <p className="text-center text-red-500">Lab not found</p>;

  const filteredTests = lab.tests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPackages = lab.packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredItems =
    activeFilter === "all"
      ? [...filteredTests, ...filteredPackages]
      : activeFilter === "tests"
      ? filteredTests
      : filteredPackages;

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "booked") return b.bookedCount - a.bookedCount;
    return 0;
  });

  const handleAddToCart = (item) => {
    console.log("Before adding:", inCart(item.id), items);
    if (inCart(item.id)) {
      toast.error("Already in cart");
    } else {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        labId: parseInt(labId),
      });
      console.log("After adding:", items);
      toast.success("Added to cart successfully");
    }
  };
  

  return (
    <div className="p-6 max-w-7xl mx-auto mt-32 relative">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-lg bg-white rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{lab.name}</h2>
          <span className="bg-yellow-500 text-white text-sm px-3 py-1 font-semibold rounded-md">
            {lab.rating} ⭐
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <p className="text-gray-700 text-sm leading-relaxed flex-1">{lab.description}</p>
          <img src={lab.image} alt={lab.name} className="w-32 h-32 object-cover shadow-md" />
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search Tests & Packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg text-black ${activeFilter === "all" ? "bg-primary text-white" : "border border-primary text-primary"}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("tests")}
            className={`px-4 py-2 rounded-lg text-black ${activeFilter === "tests" ? "bg-primary text-white" : "border border-primary text-primary"}`}
          >
            Tests
          </button>
          <button
            onClick={() => setActiveFilter("packages")}
            className={`px-4 py-2 rounded-lg text-black ${activeFilter === "packages" ? "bg-primary text-white" : "border border-primary"}`}
          >
            Packages
          </button>
        </div>

        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-black border border-primary outline-none"
          >
            <option value="rating">Sort by Rating</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="booked">Most Booked</option>
          </select>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-6">Available Tests & Packages</h3>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="p-6 border border-gray-300 rounded-2xl shadow-md bg-white transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col gap-4"
          >
            {/* Top Section: Rating & Booked Count */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <FaUsers className="text-primary text-lg" />
                <span className="text-sm font-medium">{item.bookedCount || 0} Booked</span>
              </div>
              <span className="bg-yellow-500 text-white text-xs px-3 py-1 font-semibold rounded-md">
                {item.rating} ⭐
              </span>
            </div>

            {/* Title */}
            <h4 className="text-lg font-semibold text-center text-gray-900">{item.name}</h4>

            {/* Price Section */}
            <div className="text-center">
              <span className="text-xl font-bold text-primary">${item.price}</span>
              <p className="text-sm text-gray-500">Inclusive of all charges</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleAddToCart(item)}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedItem(item)}
                className="flex-1 border border-primary text-primary px-4 py-2 rounded-lg shadow-md hover:bg-primary hover:text-white transition-all"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Back to Lab button */}
      <div className="mt-6">
            <button type="button" className="mt-4 flex items-center gap-2 text-primary hover:underline" onClick={() => navigate(-1)}> <FaArrowLeft /> Back to Labs</button>   
      </div>

      {/* Conditionally render Cart component */}
      {!isEmpty && <Cart />}

      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative flex flex-col gap-4">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setSelectedItem(null)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold text-center">{selectedItem.name}</h3>
            <p className="text-sm text-gray-600">{selectedItem.description}</p>
            <p className="text-lg font-semibold">Price: ${selectedItem.price}</p>
            <p className="text-sm text-gray-500">Rating: {selectedItem.rating} ⭐</p>
          </div>
        </div>
      )}
    </div>
  );
}