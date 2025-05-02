// ✅ NEW VERSION: CartSection.jsx (Redux + API integrated)

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  removeItem,
  updateQuantity,
  setCart,
} from "../../redux/CartSlice";

const CartSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLabId = useSelector((state) => state.lab?.currentLabId);
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  const labCartItems = items.filter((item) => item.labId === currentLabId);

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
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
        // Prevent showing error toast if user not logged in
      }
    };
  
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchCart();
    }
  }, [dispatch]);
  

  const handleUpdate = (id, type) => {
    const existing = items.find((i) => i._id === id);
    if (!existing) return;
    const newQty = type === "inc" ? existing.quantity + 1 : Math.max(1, existing.quantity - 1);
    dispatch(updateQuantity({ _id: id, quantity: newQty }));
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
        dispatch(removeItem(id));
        toast.success("Removed from cart");
      } else {
        toast.error("Failed to remove");
      }
    } catch (err) {
      toast.error("Error removing item");
    }
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-primary mb-4">Your Cart</h2>
      {labCartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <>
          <div className="space-y-4">
            {labCartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    PKR {item.price} x {item.quantity} = PKR {item.price * item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdate(item._id, "dec")}
                    className="p-1 text-primary hover:bg-gray-100 rounded"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdate(item._id, "inc")}
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
            <span className="text-primary font-bold text-xl">PKR {totalAmount}</span>
          </div>

          <button
            onClick={() => navigate("/place-order")}
            className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
          >
            Proceed to Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartSection;
