import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (!storedData) {
      alert("Booking details not found!");
      navigate(-1);
    } else {
      setFormData(JSON.parse(storedData));
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          const updated = data.cartItems.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
            totalPrice: item.price * (item.quantity || 1),
          }));
          setCartItems(updated);
          const totalAmt = updated.reduce((sum, item) => sum + item.totalPrice, 0);
          setTotal(totalAmt);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [navigate]);

  const makePayment = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }
    try {
      setIsLoading(true);
      const stripe = await stripePromise;

      const response = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const session = await response.json();
      if (!session.id) {
        alert("Failed to create Stripe session");
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
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
            <p className="text-lg"><strong>Name:</strong> {formData.name}</p>
            <p className="text-lg"><strong>Email:</strong> {formData.email}</p>
            <p className="text-lg"><strong>Phone:</strong> {formData.phoneNumber}</p>
            <p className="text-lg"><strong>Collection:</strong> {formData.collectionMethod}</p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Order Summary</h3>

          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg"
                >
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Price: Rs {item.price}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xl font-bold">Rs {item.totalPrice}</p>
                </div>
              ))}
              <div className="text-right font-bold text-lg mt-2">
                Total: Rs {total}
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
