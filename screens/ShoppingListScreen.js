import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EditItemModal from '../Components/EditItemModal';
import ShoppingListItem from '../Components/ShoppingItem';
import AddItemModal from '../Components/AddItemModal';
import Toast from 'react-native-toast-message';
import { loadShoppingList } from '../redux/actions/shoppingListActions';

const ShoppingListScreen = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track errors
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        dispatch(loadShoppingList(shoppingItems));
        setLoading(false); // Set loading to false after fetching is complete
      } catch (err) {
        setLoading(false);
        setError('Failed to load shopping list');
        console.error(err);
      }
    };

    fetchShoppingList(); // Call the function to load the shopping list
  }, [dispatch]);

  const shoppingItems = useSelector(state => state.shoppingList.items);

  const renderItem = ({ item }) => (
    <ShoppingListItem 
      item={item} 
      onEdit={() => setEditItem(item)}
    />
  );

  // Handle loading and error states
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="Dark"/>
      <Text style={styles.title}>Shopping List</Text>
      
      <FlatList
        data={shoppingItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            No items in your shopping list
          </Text>
        }
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Item</Text>
      </TouchableOpacity>

      <AddItemModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      />
      
      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
});

export default ShoppingListScreen;
