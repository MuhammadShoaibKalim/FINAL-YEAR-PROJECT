import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  removeItem,
  updateQuantity,
  setCart,
} from "../../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNavigate = () => {
    setIsLoading(true);
    navigate("/place-order");
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setCart(data.cartItems));
        } else {
          toast.error("Failed to load cart");
        }
      } catch (err) {
        console.error("Fetch cart failed:", err);
        toast.error("Error loading cart");
      }
    };

    if (user) fetchCart();
  }, [dispatch, user]);

  const handleQuantityChange = (id, type) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const newQty = type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    dispatch(updateQuantity({ _id: id, quantity: newQty }));
  };

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      const data = await res.json();
      if (data.success) {
        dispatch(removeItem(id));
        toast.success("Item removed");
      } else {
        toast.error("Remove failed");
      }
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Remove failed");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
       <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto ">
        <h2 className="text-xl font-bold text-primary mb-4">Your Cart</h2>
        <p className="text-gray-500">No items in cart.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-primary mb-4">Your Cart</h2>
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
                onClick={() => handleQuantityChange(item._id, "dec")}
                className="p-1 rounded text-primary hover:bg-gray-100"
              >
                <FiMinus />
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item._id, "inc")}
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
    </div>
  );
};

export default Cart;
