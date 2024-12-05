import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { loadShoppingList, saveShoppingList } from '../actions/shoppingListActions';


const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: uuid.v4(),
        name: action.payload.name,
        quantity: action.payload.quantity || 1,
        purchased: false,
      };
      state.items.push(newItem);
      console.log('Item added:', newItem); // Log the added item
      console.log('Updated shopping list:', state.items); // Log the updated list
       
      saveShoppingList(state.items);
    },

    editItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { 
          ...state.items[index], 
          ...action.payload 
        };
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    togglePurchased: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.items[index].purchased = !state.items[index].purchased;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading the shopping list
      .addCase(loadShoppingList.fulfilled, (state, action) => {
        state.items = action.payload; // Replace items with loaded data
        state.error = null;
      })
      .addCase(loadShoppingList.rejected, (state) => {
        state.error = 'Failed to load shopping list.';
      })
      // Handle saving the shopping list (no state change needed here)
      .addCase(saveShoppingList.rejected, (state) => {
        state.error = 'Failed to save shopping list.';
      });
  },
});

export const { addItem, editItem, deleteItem, togglePurchased } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
