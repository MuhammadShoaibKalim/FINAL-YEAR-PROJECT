import { createSlice } from "@reduxjs/toolkit";

const labSlice = createSlice({
  name: "lab",
  initialState: {
    currentLabId: null,
  },
  reducers: {
    setCurrentLabId: (state, action) => {
      state.currentLabId = action.payload;
    },
  },
});

export const { setCurrentLabId } = labSlice.actions;
export default labSlice.reducer;
