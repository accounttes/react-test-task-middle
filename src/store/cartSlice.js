import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.find(
        (item) =>
          item.id === action.payload.id &&
          item.colorId === action.payload.colorId &&
          item.sizeId === action.payload.sizeId
      );
      if (!existingItem) {
        state.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      return state.filter((item, index) => index !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
