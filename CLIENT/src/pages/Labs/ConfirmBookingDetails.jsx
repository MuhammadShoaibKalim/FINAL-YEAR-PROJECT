import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ConfirmBookingDetails = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const data = await res.json();
        if (data.success && Array.isArray(data.cartItems)) {
          const itemsWithQuantity = data.cartItems.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
            totalPrice: item.price * (item.quantity || 1),
          }));

          const total = itemsWithQuantity.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );

          setCartItems(itemsWithQuantity);
          setTotalAmount(total);
        } else {
          setCartItems([]);
          setTotalAmount(0);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
        setTotalAmount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
      

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
        toast.error("Failed to create Stripe session");
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.error(result.error.message);
        toast.error("Stripe redirect failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Try again later.");
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) return <p className="text-center">Loading booking details...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <button
        className="text-primary hover:underline flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </button>

      <h1 className="text-3xl font-bold text-primary mb-4">Review Your Booking</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white p-6 rounded shadow-md border flex-1">
          <h2 className="text-xl font-bold mb-4 text-primary">Patient Details</h2>
          <ul className="space-y-1 text-gray-800">
            <li><strong>Name:</strong> {bookingData.name}</li>
            <li><strong>Email:</strong> {bookingData.email}</li>
            <li><strong>Phone:</strong> {bookingData.phoneNumber}</li>
            <li><strong>Age:</strong> {bookingData.age}</li>
            <li><strong>Gender:</strong> {bookingData.gender}</li>
            <li><strong>Address:</strong> {bookingData.address}</li>
            <li><strong>State:</strong> {bookingData.state}</li>
            <li><strong>Collection Method:</strong> {bookingData.collectionMethod}</li>
            <li><strong>Date:</strong> {bookingData.bookingDate}</li>
            <li><strong>Time:</strong> {bookingData.bookingTime}</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded shadow-md border flex-1">
          <h2 className="text-xl font-bold mb-4 text-primary">Cart Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex justify-between border-b py-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    PKR {item.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">PKR {item.totalPrice}</p>
              </div>
            ))
          )}

          <div className="flex justify-between mt-4 text-lg font-bold text-primary">
            <span>Total Amount:</span>
            <span>PKR {totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handlePayment}
          disabled={isPaying}
          className={`w-full text-white text-lg py-3 rounded transition 
          ${isPaying ? 'bg-primary cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
        >
          {isPaying ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmBookingDetails;
