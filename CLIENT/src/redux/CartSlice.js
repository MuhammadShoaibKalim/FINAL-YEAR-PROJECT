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
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount += item.price;
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i._id === id);
      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(i => i._id !== id);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }

      state.totalQuantity -= 1;
      state.totalAmount -= existingItem.price;
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i._id === id);
      if (!existingItem) return;

      state.items = state.items.filter(i => i._id !== id);
      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.items.find(i => i._id === _id);
      if (!existingItem) return;

      const diff = quantity - existingItem.quantity;
      existingItem.quantity = quantity;
      existingItem.totalPrice = existingItem.price * quantity;

      state.totalQuantity += diff;
      state.totalAmount += existingItem.price * diff;
    },
  },
});

export const {
  addItem,
  removeItem,
  deleteItem,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
