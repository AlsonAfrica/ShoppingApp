import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useSelector } from 'react-redux';
import EditItemModal from '../Components/EditItemModal';
import ShoppingListItem from '../Components/ShoppingItem';
import AddItemModal from '../Components/AddItemModal';
import Toast from 'react-native-toast-message';

const ShoppingListScreen = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const shoppingItems = useSelector(
    state => state.shoppingList.items
  );

  const renderItem = ({ item }) => (
    <ShoppingListItem 
      item={item} 
      onEdit={() => setEditItem(item)}
    />
  );

  return (
    <View style={styles.container}>
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
      <Toast/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: 'white'
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center'
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888'
  }
});

export default ShoppingListScreen;