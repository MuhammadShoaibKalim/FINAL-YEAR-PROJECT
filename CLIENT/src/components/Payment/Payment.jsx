import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const items = useSelector((state) => state.cart.items || []);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Loaded formData:", parsedData);
      setFormData(parsedData);
    } else {
      alert("Booking details not found!");
      navigate(-1); 
    }
  }, [navigate]);

  const makePayment = async () => {
    if (items.length === 0) {
      alert("Cart is empty.");
      return;
    }

    try {
      setIsLoading(true);
      const stripe = await stripePromise;

      const response = await fetch(
        "http://localhost:5000/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ items }),
        }
      );

      const session = await response.json();

      if (!session.id) {
        alert("Failed to create session");
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        alert("Stripe redirect failed.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 mt-32 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <div
        className="flex items-center gap-2 mb-4 text-primary cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <span className="font-semibold">Back</span>
      </div>

      <h2 className="text-2xl font-bold text-primary text-center mb-6">
        Confirm Payment
      </h2>

      {formData ? (
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="mb-4">
            <p className="text-lg">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> {formData.phoneNumber}
            </p>
            <p className="text-lg">
              <strong>Collection Method:</strong>{" "}
              {formData.collectionMethod || "Not selected"}
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Order Summary</h3>

          {items.length > 0 ? (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg"
                >
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Price: Rs {item.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-xl font-bold">
                    Rs {item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="text-right font-bold text-lg mt-2">
                Total: Rs {totalAmount}
              </div>
            </>
          ) : (
            <p className="text-red-500">No items in cart.</p>
          )}

          <button
            onClick={makePayment}
            disabled={isLoading}
            className={`mt-6 w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Redirecting to Stripe..." : "Proceed to Payment"}
          </button>
        </div>
      ) : (
        <p className="text-center text-red-500">No booking details found.</p>
      )}
    </div>
  );
};

export default Payment;
