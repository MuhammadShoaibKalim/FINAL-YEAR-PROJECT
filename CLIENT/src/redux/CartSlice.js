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
        existingItem.totalPrice = existingItem.quantity * Number(existingItem.price);
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          price: Number(item.price),
          totalPrice: Number(item.price),
        });
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i._id === id);
      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(i => i._id !== id);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * Number(existingItem.price);
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i._id === id);
      if (!existingItem) return;

      state.items = state.items.filter(i => i._id !== id);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
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

      existingItem.quantity = Math.max(1, quantity);
      existingItem.totalPrice = existingItem.quantity * Number(existingItem.price);

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
    },

    setCart: (state, action) => {
      state.items = action.payload.map(item => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity) || 1,
        totalPrice: Number(item.price) * (Number(item.quantity) || 1)
      }));
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
    }
  },
});

export const {
  addItem,
  removeItem,
  deleteItem,
  clearCart,
  updateQuantity,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer; 