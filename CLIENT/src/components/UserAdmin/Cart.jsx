import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  removeItem,
  updateQuantity,
  setCart,
  deleteItem
} from "../../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

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

  const handleQuantityChange = async (id, type) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const newQty = type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    
    try {
      const res = await fetch(`/api/cart/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          testOrPackageId: id,
          quantity: newQty,
          type: item.type || "Test",
          name: item.name,
          price: item.price,
          labId: item.labId
        }),
      });

      const data = await res.json();
      if (data.success) {
        dispatch(updateQuantity({ _id: id, quantity: newQty }));
      } else {
        toast.error(data.message || "Failed to update quantity");
      }
    } catch (err) {
      console.error("Update quantity error:", err);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("authToken")}` 
        },
      });
      
      const data = await res.json();
      if (data.success) {
        dispatch(deleteItem(id));
        toast.success("Item removed");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Failed to remove item");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
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
                PKR {item.price} x {item.quantity} = PKR {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item._id, "dec")}
                className="p-1 rounded text-primary hover:bg-gray-100"
                disabled={isDeleting}
              >
                <FiMinus />
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item._id, "inc")}
                className="p-1 rounded text-primary hover:bg-gray-100"
                disabled={isDeleting}
              >
                <FiPlus />
              </button>
              <button
                onClick={() => handleRemove(item._id)}
                className="p-1 rounded text-red-500 hover:bg-red-50"
                disabled={isDeleting}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-lg">Total:</span>
        <span className="text-primary font-bold text-xl">PKR {total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleNavigate}
        disabled={isLoading || isDeleting}
        className={`mt-4 w-full py-2 rounded transition 
        ${(isLoading || isDeleting) ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`}
      >
        {isLoading ? "Loading..." : "Proceed to Order"}
      </button>
    </div>
  );
};

export default Cart; 
