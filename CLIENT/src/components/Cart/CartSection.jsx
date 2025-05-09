import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setCart, updateQuantity, deleteItem } from "../../redux/CartSlice";

const CartSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentLabId = useSelector((state) => state.lab?.currentLabId);
  const cartItems = useSelector((state) => state.cart.items);
  const labCartItems = cartItems.filter((item) => item.labId === currentLabId);
  const total = labCartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

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
        dispatch(setCart(data.cartItems));
      } else {
        toast.error(data.message || "Failed to load cart");
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
      toast.error("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);
    
    try {
      const res = await fetch(`/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        dispatch(deleteItem(id));
        toast.success("Item removed from cart");
      } else {
        toast.error(data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error("Error removing item");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleQuantityChange = async (id, type) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) {
      console.error("Item not found in cart:", id);
      return;
    }

    const newQty = type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);

    try {
      const requestBody = {
        quantity: newQty
      };

      const res = await fetch(`/api/cart/quantity/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", {
          status: res.status,
          statusText: res.statusText,
          body: errorText
        });
        throw new Error(`Server returned ${res.status}: ${errorText}`);
      }

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
                    PKR {item.price} x {item.quantity} = PKR {(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, "dec")}
                    className="p-1 text-primary hover:bg-gray-100 rounded"
                    disabled={isDeleting}
                  >
                    <FiMinus />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, "inc")}
                    className="p-1 text-primary hover:bg-gray-100 rounded"
                    disabled={isDeleting}
                  >
                    <FiPlus />
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
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
            onClick={() => {
              setIsLoading(true);
              navigate("/place-order");
            }}
            disabled={isLoading || isDeleting}
            className={`mt-4 w-full py-2 rounded transition 
              ${(isLoading || isDeleting) ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark text-white"}`}
          >
            {isLoading ? "Loading..." : "Proceed to Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default CartSection; 
