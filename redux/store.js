import { configureStore } from '@reduxjs/toolkit';
import ShoppingListSlice from './ShoppingListSlice';

export const store = configureStore({
  reducer: {
    shopping: ShoppingListSlice,
  },
});
