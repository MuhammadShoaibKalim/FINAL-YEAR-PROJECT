import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaHome, FaWalking } from "react-icons/fa";

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

const Cart = () => {
    const { testId } = useParams();
    const test = tests.find((t) => t.title === decodeURIComponent(testId));


    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };


    if (!test) {
        return <div className="text-center text-red-500 mt-10">Test not found</div>;
    }

    return (
        <div className="bg-white shadow-lg p-10 max-w-8xl mx-auto md:mt-32 ">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-primary mb-4">Add to Cart</h1>

            {/* Dynamic Message */}
            <p className="text-lg mb-6">
                Complete the form below to confirm your booking for{" "}
                <span className="font-semibold text-primary">{test.title}</span>.
            </p>

            {/* Two-column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                {/* Left Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                    {/* Cart Title */}
                    <h2 className="text-xl font-bold text-primary mb-4">Cart</h2>

                    {/* Selected Test/Package Card */}
                    <div className="bg-white p-4 rounded-lg mb-6">
                        <h3 className="text-lg font-semibold text-black">{test.title}</h3>
                        <p className="text-gray-600">{test.description}</p>
                        <p className="text-primary font-bold mt-2">Price: {test.price}</p>
                    </div>

                    {/* Buttons for Sample Collection */}
                    <div className="space-y-4 " >
                        <div
                            className={`flex items-center p-4 rounded-lg cursor-pointer ${selectedOption === "home" ? "border-primary border-2" : "bg-white"
                                } shadow-lg `}
                            onClick={() => handleSelectOption("home")}
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mr-4">
                                <FaHome size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-primary text-lg">
                                    Home Test Sample Collection
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    I would like a professional to visit my home and collect the sample.
                                </p>
                            </div>
                            {/* Circle Indicator */}
                            <div
                                className={`w-6 h-6 border-2 rounded-full ${selectedOption === "home" ? "bg-primary border-primary" : "border-gray"
                                    }`}
                            ></div>
                        </div>

                        {/* Physical Sample Collection Button */}
                        <div
                            className={`flex items-center p-4 rounded-lg cursor-pointer ${selectedOption === "physical" ? "border-primary border-2" : "bg-white"
                                } shadow-lg `}
                            onClick={() => handleSelectOption("physical")}
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mr-4">
                                <FaWalking size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-primary text-lg">
                                    Physical Test Sample Collection
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    I prefer to visit the lab for sample collection.
                                </p>
                            </div>
                            {/* Circle Indicator */}
                            <div
                                className={`w-6 h-6 border-2 rounded-full ${selectedOption === "physical" ? "bg-primary border-primary " : "border-gray"
                                    }`}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-4 ">
                    {/* Step Title */}
                    <h2 className="text-xl font-bold text-primary mb-4">Progressive Steps</h2>

                    {/* Form */}
                    <form className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray">Name</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray">Phone</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg outline-none"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray">Gender</label>
                            <select className="w-full mt-1 p-2 border rounded-lg outline-none ">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full mt-1 p-2 border rounded-lg outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray">Address</label>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    className="w-1/2 mt-1 p-2 border rounded-lg outline-none"
                                    placeholder="State"
                                />
                                <input
                                    type="text"
                                    className="w-1/2 mt-1 p-2 border rounded-lg outline-none"
                                    placeholder="City"
                                />
                            </div>
                        </div>

                        {/* Total and Subtotal */}
                        <div className="space-y-2 flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-700">
                                Subtotal: <span className="font-bold">Rs {test.price}</span>
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                                Total: <span className="font-bold">Rs 1500</span>
                            </p>
                        </div>

                        {/* Place Order Button */}
                        <button className="w-full bg-primary text-white py-2 px-4 rounded-lg ">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Cart;
