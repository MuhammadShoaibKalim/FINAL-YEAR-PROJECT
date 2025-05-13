import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaStar, FaMapMarkerAlt, FaFilter, FaEye } from "react-icons/fa";
import { addItem } from "../../redux/CartSlice";

const AllTests = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [tests, setTests] = useState([]);
    const [labsMap, setLabsMap] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        priceRange: [0, 10000],
        lab: "",
        type: "",
        sort: "popular",
    });
    const [showFilters, setShowFilters] = useState(false);
    const [addingItemId, setAddingItemId] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [displayCount, setDisplayCount] = useState(9); 
    const [showBackToTop, setShowBackToTop] = useState(false);
    const ITEMS_PER_LOAD = 9; 
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchAllTests = async () => {
        try {
            const res = await axios.get("/api/tests/public-tests");
            if (res.data.success) {
                setTests(res.data.tests || []);
            } else {
                toast.error(res.data.message || "Failed to load tests");
            }
        } catch (err) {
            console.error("Error fetching tests:", err);
            toast.error(err.response?.data?.message || "Failed to load tests. Please try again later.");
        }
    };
    const fetchAllPackages = async () => {
        try {
            const res = await axios.get("/api/packages/public-packages");
            if (res.data.success) {
                const packageData = (res.data.packages || []).map(pkg => ({
                    ...pkg,
                    type: "Package",
                    lab: pkg.lab?._id || pkg.lab
                }));
                setTests(prev => [...prev, ...packageData]);
            } else {
                toast.error(res.data.message || "Failed to load packages");
            }
        } catch (err) {
            console.error("Error fetching packages:", err);
            toast.error(err.response?.data?.message || "Failed to load packages. Please try again later.");
        }
    };
    const fetchLabs = async () => {
        try {
            const res = await axios.get("/api/labs/get-all");
            if (res.data.success) {
                const labData = {};
                res.data.labs.forEach((lab) => {
                    labData[lab._id] = lab;
                });
                setLabsMap(labData);
            } else {
                toast.error(res.data.message || "Failed to load labs");
            }
        } catch (err) {
            console.error("Error fetching labs:", err);
            toast.error(err.response?.data?.message || "Failed to load labs. Please try again later.");
        }
    };
    useEffect(() => {
        fetchAllTests();
        fetchAllPackages();
        fetchLabs();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleAddToCart = async (item) => {
        try {
            setAddingItemId(item._id);
            
            const finalPrice = item.discount 
                ? Math.round(item.price * (1 - (item.discount / 100))) 
                : Number(item.price);

            const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
            const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

            const response = await axios.post(
                "/api/cart/add",
                {
                    testOrPackageId: item._id,
                    type: item.type || "Test",
                    name: item.name,
                    price: finalPrice,
                    labId: item.lab?._id || item.lab || "Unknown",
                    quantity: newQuantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );

            if (response.data.success) {
                const cartItem = {
                    _id: response.data.itemId || item._id,
                    name: item.name,
                    price: finalPrice,
                    type: item.type || "Test",
                    labId: item.lab?._id || item.lab || "Unknown",
                    labName: item.lab?.name || labsMap[item.lab]?.name || "Unknown Lab",
                    quantity: 1
                };

                dispatch(addItem(cartItem));
                toast.success("Added to cart successfully");
            } else {
                toast.error(response.data.message || "Failed to add to cart");
            }
        } catch (err) {
            console.error("Cart error:", err);
            toast.error(err.response?.data?.message || "Failed to add to cart");
        } finally {
            setAddingItemId(null);
        }
    };
    const renderStars = (rating, bookedCount) => {
        return (
            <div className="flex items-center gap-1">
                <FaEye className="text-gray-500" />
                <span className="text-sm text-gray-500">{bookedCount || 0}</span>
            </div>
        );
    };
    const filteredTests = tests
        .filter((test) => {
            const finalPrice = test.price - (test.discount || 0);
            const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = finalPrice >= filters.priceRange[0] && finalPrice <= filters.priceRange[1];
            const testLabId = typeof test.lab === 'object' ? test.lab?._id : test.lab;
            const matchesLab = !filters.lab || testLabId === filters.lab;
            const matchesType = !filters.type ||
                (filters.type === "Package" ? test.type === "Package" :
                    filters.type === "Test" ? test.type !== "Package" : true);
            return matchesSearch && matchesPrice && matchesLab && matchesType;
        })
        .sort((a, b) => {
            const priceA = a.price - (a.discount || 0);
            const priceB = b.price - (b.discount || 0);
            if (filters.sort === "low") return priceA - priceB;
            if (filters.sort === "high") return priceB - priceA;
            if (filters.sort === "rating") return (b.rating || 0) - (a.rating || 0);
            return (b.popularity || 0) - (a.popularity || 0);
        });
    const uniqueLabs = Object.values(labsMap).filter(
        (lab, index, self) => index === self.findIndex((t) => t._id === lab._id)
    );
    const testTypes = [...new Set(tests.map((test) => test.type))];

    const handleLoadMore = () => {
        setDisplayCount(prev => prev + ITEMS_PER_LOAD);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">Find Your Medical Tests & Packages</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Search and compare tests from 20+ trusted labs. Get accurate results at affordable prices with our partner laboratories.
                </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search tests (e.g. CBC, Lipid Profile)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <FaFilter className="text-gray-600" />
                        <span>Filters</span>
                    </button>
                </div>
                {showFilters && (
                    <div className="mt-4 p-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <h3 className="font-medium mb-2">Price Range</h3>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.priceRange[0]}
                                        onChange={(e) => setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <span>to</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Lab</h3>
                                <select
                                    value={filters.lab}
                                    onChange={(e) => setFilters({ ...filters, lab: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">All Labs</option>
                                    {uniqueLabs.map((lab) => (
                                        <option key={lab._id} value={lab._id}>{lab.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Type</h3>
                                <select
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">All Types</option>
                                    <option value="Test">Tests Only</option>
                                    <option value="Package">Packages Only</option>
                                    {testTypes.filter(type => type !== "Test" && type !== "Package").map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Sort By</h3>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="low">Price: Low to High</option>
                                    <option value="high">Price: High to Low</option>
                                    <option value="rating">Highest Rating</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-primary">Total Tests Found:</span>
                    <span className="text-lg font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {filteredTests.length} {filteredTests.length === 1 ? 'Test' : 'Tests'}
                    </span>
                </div>
                <div className="flex flex-row gap-4">
                    {filteredTests.length > displayCount && !showAll && (
                        <button
                            onClick={handleLoadMore}
                            className="px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Load More
                        </button>
                    )}
                    {filteredTests.length > displayCount && (
                        <button
                            onClick={() => {
                                if (showAll) {
                                    setDisplayCount(9);
                                    setShowAll(false);
                                    scrollToTop();
                                } else {
                                    setDisplayCount(filteredTests.length);
                                    setShowAll(true);
                                }
                            }}
                            className="px-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            {showAll ? "Show Less" : "View All"}
                        </button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.slice(0, displayCount).map((test) => {
                    const lab = labsMap[test.lab];
                    const hasDiscount = test.discount && test.discount < test.price;
                    const discountPercentage = hasDiscount
                        ? Math.round(((test.price - test.discount) / test.price) * 100)
                        : 0;
                    return (
                        <div key={test._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-primary/90 rounded-full">
                                        {test.type ? test.type : (test.name?.toLowerCase().includes("package") ? "Package" : "Test")}
                                    </span>
                                    <div>
                                        {renderStars(test.rating, test.bookedCount)}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="font-bold text-lg text-gray-800">{test.name}</h2>
                                    <div className="text-sm text-gray-600">
                                        <span >LAB : </span>
                                        <span className="italic">
                                            {test.lab?.name || labsMap[test.lab]?.name || "Unknown Lab"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    {test.discount > 0 ? (
                                        <>
                                            <span className="text-xl font-bold text-primary">
                                                <span className="text-xl font-bold text-primary">
                                                    PKR {Math.round(test.price * (1 - (test.discount || 0) / 100))}
                                                </span>
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                PKR {test.price}
                                            </span>
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                                {test.discount}% OFF
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xl font-bold text-primary">
                                            PKR {test.price}
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        className="px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                                        onClick={() => setSelectedItem(test)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(test)}
                                        disabled={addingItemId === test._id}
                                        className={`px-3 py-2 rounded-lg transition-colors ${addingItemId === test._id
                                            ? 'bg-gray-300 text-gray-500'
                                            : 'bg-primary text-white hover:bg-primary-dark'
                                            }`}
                                    >
                                        {addingItemId === test._id ? "Adding..." : "Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {filteredTests.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">No tests found matching your criteria</div>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setFilters({
                                priceRange: [0, 10000],
                                lab: "",
                                type: "",
                                sort: "popular",
                            });
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
            {/* View Details Modal */}
            {selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-lg space-y-4">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
                            <button onClick={() => setSelectedItem(null)} className="text-red-500 hover:underline">Close</button>
                        </div>
                          {/* Price Section */}
                          <div className="flex items-center gap-2 mb-2">
                             <h3 className="font-semibold mb-1">Price :</h3>
                            <span className="text-lg font-bold text-primary">PKR {selectedItem.price}</span>
                            {selectedItem.discount > 0 && (
                                <span className="text-sm text-gray-500 line-through">PKR {selectedItem.price / (1 - (selectedItem.discount || 0) / 100)}</span>
                            )}
                            {selectedItem.discount > 0 && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{selectedItem.discount}% OFF</span>
                            )}
                        </div>
                        {/* Description Section */}
                        <div className="mb-2">
                            <h3 className="font-semibold mb-1">Description:</h3>
                            <div className="text-gray-700">{selectedItem.description}</div>
                        </div>
                      
                        {/* Included Tests Section (for packages) */}
                        <h3 className="font-semibold mb-1">Included Tests:</h3>

                        {selectedItem.type === "Package" && (selectedItem.includedTests || selectedItem.tests) && (
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Included Tests:</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    {(selectedItem.includedTests || selectedItem.tests).map((test, idx) => (
                                        <li key={idx}>{test.name || test}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllTests; 
   
