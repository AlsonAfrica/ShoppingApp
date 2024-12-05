import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for loading shopping list from storage
export const loadShoppingList = createAsyncThunk(
  'shoppingList/loadList',
  async () => {
    try {
      const savedList = await AsyncStorage.getItem('shoppingList');
      return savedList ? JSON.parse(savedList) : [];
    } catch (error) {
      console.error('Error loading shopping list:', error);
      return [];
    }
  }
);

// Async thunk for saving shopping list to storage
export const saveShoppingList = createAsyncThunk(
  'shoppingList/saveList',
  async (items) => {
    try {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(items));
      console.log('items saved')
      return items;
    } catch (error) {
      console.error('Error saving shopping list:', error);
      return items;
    }
  }
);

// Error handling action creator
export const handleShoppingListError = (errorMessage) => ({
  type: 'shoppingList/ERROR',
  payload: errorMessage
});

// Validation action creator
export const validateShoppingItem = (item) => {
  const errors = [];

  if (!item.name || item.name.trim() === '') {
    errors.push('Item name cannot be empty');
  }

  if (item.quantity <= 0) {
    errors.push('Quantity must be greater than zero');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Bulk actions
export const bulkAddItems = (items) => ({
  type: 'shoppingList/BULK_ADD',
  payload: items
});

export const clearShoppingList = () => ({
  type: 'shoppingList/CLEAR'
});