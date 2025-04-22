import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, deleteItem, clearCart, updateQuantity } from '../../redux/CartSlice';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.Cart);
  const { user } = useSelector((state) => state.Auth);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    toast.success('Item added to cart');
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.success('Item removed from cart');
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
    toast.success('Item deleted from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed with checkout');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Navigate to payment page with cart data
    navigate('/payment', {
      state: {
        items,
        totalAmount,
        totalQuantity
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Add some items to your cart to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-12 text-center border rounded"
                    min="1"
                  />
                  <button
                    onClick={() => handleAddItem(item)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <FaPlus />
                  </button>
                </div>
                <p className="font-semibold">${item.totalPrice}</p>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">${totalAmount}</span>
              </div>
              <button
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 