import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { useNavigate, useParams } from "react-router-dom";
import { FaHome, FaHospital, FaClipboardList, FaArrowLeft } from "react-icons/fa";

const BookingForm = () => {
  const navigate = useNavigate();
  const { items, cartTotal } = useCart();
  const { itemId } = useParams();

  if (items.length === 0) {
    return <p className="text-center text-red-500">Your cart is empty</p>;
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    age: "",
    bookingDate: "",
    bookingTime: "",
    state: "",
    city: "",
    address: "",
    collectionMethod: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Save booking data to localStorage
    localStorage.setItem("bookingData", JSON.stringify(formData));
  
    navigate("/payment");
  };

  const handleCollectionMethod = (method) => {
    setFormData({ ...formData, collectionMethod: method });
  };

  const handleChangeMode = () => {
    setFormData({ ...formData, collectionMethod: "" });
  };

  return (
    <div className="p-6 mt-32 max-w-6xl mx-auto">
      <div className="flex justify-between items-center bg-white p-6 shadow-lg rounded-lg mb-6 border-b-2 border-primary">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Book Your Lab Test</h2>
          <p className="text-gray-600">Fill out the form below to confirm your appointment. Select your preferred collection method and provide accurate details for a smooth experience.</p>
        </div>
        <FaClipboardList className="text-primary text-4xl" />
      </div>

      <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded">

        <div className="w-full md:w-1/2 space-y-4">

          <div className="p-4 rounded-lg shadow-md bg-white border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-primary">Your Cart Items 🛒</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg">
                <div>
                  <p className="text-lg font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-gray-600">Price: Rs {item.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-xl font-bold text-primary">Rs {item.price * item.quantity}</p>
              </div>
            ))}

            <hr className="my-4 border-t border-gray-300" />
            <p className="text-xl font-semibold text-primary flex justify-between">
              <span>Total Amount:</span>
              <span>Rs {cartTotal}</span>
            </p>
          </div>

          <div className="border border-primary p-4 rounded-lg shadow-md bg-white">
            {formData.collectionMethod && (
              <div className="mt-4">
                <p className="text-black text-lg font-semibold">
                  <strong className="text-primary">Collection Method:</strong> {formData.collectionMethod}
                </p>
                <button 
                  onClick={handleChangeMode}
                  className="mt-2 text-sm text-red-500 underline"
                >
                  Change Mode
                </button>
              </div>
            )}
          </div>

          {!formData.collectionMethod && (
            <div className="border border-primary p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-bold mb-4">Select Collection Method</h2>
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => handleCollectionMethod("Home Collection")} 
                  className="flex items-center gap-2 px-4 py-2 border rounded border-primary hover:bg-primary hover:text-white">
                  <FaHome /> Home Collection
                </button>
                <button 
                  type="button" 
                  onClick={() => handleCollectionMethod("Lab Visit")} 
                  className="flex items-center gap-2 px-4 py-2 border rounded border-primary hover:bg-primary hover:text-white">
                  <FaHospital /> Lab Visit
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 border border-primary p-6 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-bold mb-4 text-center">Place Your Order</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full rounded" required />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="border p-2 w-full rounded" required />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="border p-2 w-full rounded" required />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="time" name="bookingTime" value={formData.bookingTime} onChange={handleChange} className="border p-2 w-full rounded" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-2 w-full rounded" required />
            </div>
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 w-full rounded" required />
            
            <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark" 
            >Confirm Booking</button>
            <button type="button" className="mt-4 flex items-center gap-2 text-primary hover:underline" onClick={() => navigate(-1)}> <FaArrowLeft /> Back to Cart</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;