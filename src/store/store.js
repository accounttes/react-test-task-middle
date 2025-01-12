import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
  return result;
};

const loadFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) return [];
    return JSON.parse(serializedCart);
  } catch (err) {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: {
    cart: loadFromLocalStorage(),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveToLocalStorage),
});
