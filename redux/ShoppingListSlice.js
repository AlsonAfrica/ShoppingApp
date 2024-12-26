import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shopping',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    updateItem: (state, action) => {
      const { id, name, quantity, price, priorityColor, notes } = action.payload;
      const index = state.findIndex(item => item.id === id);
      if (index !== -1) {
        // Update only the changed fields
        state[index] = {
          ...state[index],
          name: name !== undefined ? name : state[index].name,
          quantity: quantity !== undefined ? quantity : state[index].quantity,
          price: price !== undefined ? price : state[index].price,
          priorityColor: priorityColor !== undefined ? priorityColor : state[index].priorityColor,
          notes: notes !== undefined ? notes : state[index].notes,
        };
      }
    },
    deleteItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    setItems: (state, action) => {
      return action.payload;
    },
  },
});

export const { addItem, updateItem, deleteItem, setItems } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
