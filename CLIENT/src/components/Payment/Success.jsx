import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeOrder = async () => {
      const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};

      try {
        const res = await fetch("/api/orders/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(bookingData), 
        });
        

        if (!res.ok) {
          throw new Error("Order creation failed");
        }

        await fetch("/api/cart/clear", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        toast.success("Order placed and cart cleared successfully!");
        localStorage.removeItem("bookingData");
        navigate("/profile/orders"); // needed to adjust

      } catch (err) {
        console.error("Error placing order:", err);
        toast.error("Something went wrong while saving your order.");
      }
    };

    completeOrder();
  }, [navigate]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful ✅</h1>
      <p>Processing your order, please wait...</p>
    </div>
  );
};

export default PaymentSuccess;
