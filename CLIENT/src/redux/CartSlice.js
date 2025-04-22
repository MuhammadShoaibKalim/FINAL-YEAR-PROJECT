import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price
        });
      }

      // Update totals
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
    },

    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }

      // Update totals
      state.totalQuantity -= 1;
      state.totalAmount -= existingItem.price;
    },

    deleteItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Update totals
      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        const oldQuantity = existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
        state.totalQuantity += quantity - oldQuantity;
        state.totalAmount += existingItem.price * (quantity - oldQuantity);
      }
    }
  }
});

export const { addItem, removeItem, deleteItem, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer; 