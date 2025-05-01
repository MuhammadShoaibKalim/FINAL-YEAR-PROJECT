import React, { useEffect, useState } from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
    const handleNavigate = () => {
      setIsLoading(true);
      navigate("/place-order");
    };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        const data = await res.json();
        const itemsWithQty = data.cartItems.map((item) => ({ ...item, quantity: 1 }));
        setCartItems(itemsWithQty);
        calculateTotal(itemsWithQty);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    if (user) fetchCart();
  }, [user]);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  const updateQuantity = (id, type) => {
    const updated = cartItems.map((item) => {
      if (item._id === id) {
        const newQty = type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    calculateTotal(updated);
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            testOrPackageId: item.testOrPackageId,
            type: item.type,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const result = await res.json();

      if (result.message) {
        toast.success("Order placed successfully!");
        setCartItems([]);
        setTotal(0);
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to place order.");
    }
  };

  const handleRemove = async (id) => {
    await fetch(`/api/cart/remove/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
    const filtered = cartItems.filter((item) => item._id !== id);
    setCartItems(filtered);
    calculateTotal(filtered);
  };

  if (loading) return <p className="text-gray-600 mt-6">Loading cart...</p>;

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-primary mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    PKR {item.price} x {item.quantity} = PKR {item.price * item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id, "dec")}
                    className="p-1 rounded text-primary hover:bg-gray-100"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, "inc")}
                    className="p-1 rounded text-primary hover:bg-gray-100"
                  >
                    <FiPlus />
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-1 rounded text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-lg">Total:</span>
            <span className="text-primary font-bold text-xl">PKR {total}</span>
          </div>

          <button
            onClick={handleNavigate}
            disabled={isLoading}
            className={`mt-4 w-full py-2 rounded transition 
        ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`}
          >
            {isLoading ? "Loading..." : "Proceed to Order"}
          </button>

        </>
      )}
    </div>
  );
};

export default Cart;
