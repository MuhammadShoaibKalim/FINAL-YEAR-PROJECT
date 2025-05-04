import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeOrder = async () => {
      const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};
  
      try {
        const cartRes = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
  
        const cartData = await cartRes.json();
  
        if (!cartData.success || !cartData.cartItems) {
          throw new Error("Cart is empty or unavailable.");
        }
  
        const items = cartData.cartItems.map((item) => {
          if (!item.testOrPackageId && !item._id) {
            throw new Error("Cart item missing testOrPackageId");
          }
        
          if (!item.type) {
            throw new Error(`Cart item '${item.name}' is missing 'type' field`);
          }
        
          return {
            testOrPackageId: item.testOrPackageId || item._id,
            name: item.name || "Unnamed Item",
            price: item.price || 0,
            type: item.type,
            labId: item.labId || null,
          };
        });
        
        const firstItem = items[0];

        const orderPayload = {
          ...bookingData,
          testOrPackageId: firstItem.testOrPackageId,
          type: firstItem.type,
          name: firstItem.name,
          items,
        };
  
        // const orderPayload = {
        //   ...bookingData,
        //   items, 
        // };
        
  
        const res = await fetch("/api/orders/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(orderPayload),
        });
  
        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error("Order creation failed: " + errMsg);
        }
  
        // 🔹 5. Clear cart
        await fetch("/api/cart/clear", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
  
        toast.success("Order placed and cart cleared!");
        localStorage.removeItem("bookingData");
        navigate("/user/orders");
  
      } catch (err) {
        console.error("Error placing order:", err);
        toast.error("Order placement failed: " + err.message);
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
