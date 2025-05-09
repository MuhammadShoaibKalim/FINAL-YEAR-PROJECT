import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const CartSection = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const currentLabId = useSelector((state) => state.lab?.currentLabId);
  const labCartItems = cartItems.filter((item) => item.labId === currentLabId);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.cartItems)) {
        const itemsWithQty = data.cartItems.map((item) => ({ ...item, quantity: 1 }));
        setCartItems(itemsWithQty);
        calculateTotal(itemsWithQty);
      } else {
        toast.error(data.message || "Failed to load cart");
        setCartItems([]);
        setTotal(0);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
      toast.error("Failed to fetch cart");
      setCartItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const totalPrice = items
      .filter((item) => item.labId === currentLabId)
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalPrice);
  };

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Item removed from cart");
        const updatedItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedItems);
        calculateTotal(updatedItems);
      } else {
        toast.error(data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error("Error removing item");
    }
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

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <p className="text-gray-600 mt-6">Loading cart...</p>;
  }

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-primary mb-4">Your Cart</h2>
      {labCartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <>
          <div className="space-y-4">
            {labCartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    PKR {item.price} x {item.quantity} = PKR {item.price * item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, "dec")}
                    className="p-1 text-primary hover:bg-gray-100 rounded"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, "inc")}
                    className="p-1 text-primary hover:bg-gray-100 rounded"
                  >
                    <FiPlus />
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
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
            onClick={() => {
              setIsLoading(true);
              navigate("/place-order");
            }}
            disabled={isLoading}
            className={`mt-4 w-full py-2 rounded transition 
        ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark text-white"}`}
          >
            {isLoading ? "Loading..." : "Proceed to Order"}
          </button>

        </>
      )}
    </div>
  );
};

export default CartSection;
