import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import {FaArrowLeft } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { items, emptyCart } = useCart();
  const [formData, setFormData] = useState(null);

  const navigate = useNavigate();

  const handlePayment = (isSuccess) => {
    if (isSuccess) {
      emptyCart();  
      localStorage.removeItem("cart"); 
      navigate("/payment/success");
    } else {
      navigate("/payment/failure");
    }
  };
  

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51QPlVsK9kLyXTQ9cCLe96E5zOAePenhwLKZazAzY68gqYXJ7nA0bYA2K8uV7082W8bz2pVqqajzgczIVcqNZGqD50019VaBtXb"
    );

    const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        items,
        currency: "usd"
       }),

    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error);
    } else {
      emptyCart();
    }
  };

  return (
    <div className="p-6 mt-32 max-w-7xl mx-auto bg-white shadow-lg rounded-lg h-min-screen">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">Confirm Payment</h2>

      {formData ? (
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-lg"><strong>Name:</strong> {formData.name}</p>
          <p className="text-lg"><strong>Email:</strong> {formData.email}</p>
          <p className="text-lg"><strong>Phone:</strong> {formData.phoneNumber}</p>
          <p className="text-lg"><strong>Collection Method:</strong> {formData.collectionMethod}</p>

          <h3 className="text-xl font-semibold mt-6">Order Details</h3>
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

          <button
            className="mt-4 w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
            onClick={makePayment}
          >
            Proceed to Payment
          </button>
          
          <button type="button" className="mt-4 flex items-center gap-2 text-primary hover:underline" onClick={() => navigate(-1)}> <FaArrowLeft /> Back to Order </button>
        </div>
      ) : (
        <p className="text-center text-red-500">No booking details found.</p>
      )}
    </div>
  );
};

export default Payment;
