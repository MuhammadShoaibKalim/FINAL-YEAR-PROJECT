import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        const data = await res.json();
        setCartItems(data.cartItems);
        const totalPrice = data.cartItems.reduce((sum, item) => sum + item.price, 0);
        setTotal(totalPrice);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    if (user) fetchCart();
  }, [user]);

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            testOrPackageId: item.testOrPackageId,
            type: item.type,
            name: item.name,
            price: item.price
          }))
        })
      });
  
      const result = await res.json();
  
      if (result.message) {
        alert("Order placed successfully!");
        setCartItems([]);
        setTotal(0);
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order. Please try again.");
    }
  };
  

  const handleRemove = async (id) => {
    await fetch(`/api/cart/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b py-2">
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <button onClick={() => handleRemove(item._id)} className="text-red-600">
                <FiTrash2 />
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-bold">Total: ${total}</p>
            <button onClick={handleCheckout} className="mt-2 px-4 py-2 bg-primary text-white rounded">
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
