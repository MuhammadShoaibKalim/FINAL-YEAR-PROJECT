import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { 
    totalUniqueItems,
    items, 
    updateItemQuantity, 
    removeItem, 
    totalItems, 
    cartTotal, 
    emptyCart,
    setItems
  } = useCart();

  const navigate = useNavigate();
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load cart from localStorage on first render
  useEffect(() => {
    if (!cartLoaded) {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart && storedCart.length > 0) {
        setItems(storedCart);
      }
      setCartLoaded(true);
    }
  }, [cartLoaded, setItems]);

  // Sync cart with localStorage whenever items change
  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, cartLoaded]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-12">
      <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-t-lg">
        <h2 className="text-2xl font-semibold text-white">Your Cart</h2>
        <h3 className="text-sm text-white mt-2">Total Items: {totalUniqueItems} - Quantity: {totalItems}</h3>
      </div>

      {totalItems === 0 ? (
        <p className="text-center text-gray-600 text-sm mt-6">Your cart is empty</p>
      ) : (
        <div className="space-y-4 mt-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-6 rounded-xl shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex flex-col">
                <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Price: <span className="font-semibold text-primary">${item.price}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: <span className="font-semibold">{item.quantity}</span>
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  className="px-3 py-1 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/80 transition-all"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  <span className="text-xl font-bold">+</span>
                </button>
                <button
                  className="px-3 py-1 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/80 transition-all"
                  onClick={() => {
                    if (item.quantity > 1) {
                      updateItemQuantity(item.id, item.quantity - 1);
                    } else {
                      removeItem(item.id);
                    }
                  }}
                >
                  <span className="text-xl font-bold">-</span>
                </button>
                <button
                  className="px-3 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-all"
                  onClick={() => removeItem(item.id)}
                >
                  <FiTrash2 className="text-xl" /> 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-md">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Price:</h3>
            <p className="text-lg font-semibold text-primary">${cartTotal}</p>
          </div>

          <div className="flex justify-end space-x-6">
            <button
              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-all"
              onClick={() => {
                emptyCart();
                localStorage.removeItem("cart");
              }}
            >
              Clear Cart
            </button>
            <button
              className="px-3 py-3 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/80 transition-all"
              onClick={() => navigate("/booking", { state: { cart: items } })}
            >
              Proceed Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
