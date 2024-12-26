import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItemsToStorage = async (items) => {
  try {
    await AsyncStorage.setItem('shoppingList', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving items:', error);
  }
};

export const getItemsFromStorage = async () => {
  try {
    const items = await AsyncStorage.getItem('shoppingList');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error retrieving items:', error);
    return [];
  }
};
