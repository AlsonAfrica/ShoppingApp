import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({
        id: uuid.v4(),
        name: action.payload.name,
        quantity: action.payload.quantity || 1,
        purchased: false
      });
    },
    editItem: (state, action) => {
      const index = state.items.findIndex(
        item => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { 
          ...state.items[index], 
          ...action.payload 
        };
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },
    togglePurchased: (state, action) => {
      const index = state.items.findIndex(
        item => item.id === action.payload
      );
      if (index !== -1) {
        state.items[index].purchased = 
          !state.items[index].purchased;
      }
    }
  }
});

export const { 
  addItem, 
  editItem, 
  deleteItem, 
  togglePurchased 
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;