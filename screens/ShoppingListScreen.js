import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem, deleteItem, toggleItemCompleted, setItems } from '../redux/ShoppingListSlice';
import { saveItemsToStorage, getItemsFromStorage } from '../utils/asyncStorageHelpers';
import ShoppingItem from '../Components/ShoppingItem';

const ShoppingListScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [priorityColor, setPriorityColor] = useState('');
  const [notes, setNotes] = useState('');
  
  const shoppingList = useSelector(state => state.shopping);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadItems = async () => {
      const items = await getItemsFromStorage();
      dispatch(setItems(items));
    };
    loadItems();
  }, []);

  useEffect(() => {
    saveItemsToStorage(shoppingList);
  }, [shoppingList]);

  const handleAddItem = () => {
    if (itemName.trim() && quantity && price) {
      dispatch(
        addItem({
          id: Date.now().toString(),
          name: itemName.trim(),
          quantity: parseInt(quantity, 10),
          price: parseFloat(price),
          priorityColor,
          notes,
        })
      );
      setIsModalVisible(false);
      resetForm();
    }
  };

  const handleEditItem = (id, name, quantity, price, priorityColor, notes) => {
    setCurrentItemId(id);
    setItemName(name);
    setQuantity(quantity.toString());
    setPrice(price.toString());
    setPriorityColor(priorityColor);
    setNotes(notes);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (itemName.trim() && quantity && price) {
      dispatch(
        updateItem({
          id: currentItemId,
          name: itemName.trim(),
          quantity: parseInt(quantity, 10),
          price: parseFloat(price),
          priorityColor,
          notes,
        })
      );
      setIsModalVisible(false);
      resetForm();
      setIsEditing(false);
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleItemCompleted(id));
  };

  const resetForm = () => {
    setItemName('');
    setQuantity('');
    setPrice('');
    setPriorityColor('');
    setNotes('');
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your shopping list is empty</Text>
      <Text style={styles.emptySubText}>Tap the + button to add items</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Shopping List</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setIsModalVisible(true);
              setIsEditing(false);
            }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={shoppingList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ShoppingItem
              item={item}
              onDelete={handleDeleteItem}
              onEdit={handleEditItem}
              onToggleCompleted={handleToggleCompleted}
            />
          )}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={styles.listContainer}
        />

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {isEditing ? 'Edit Item' : 'Add New Item'}
              </Text>
              
              <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={itemName}
                onChangeText={setItemName}
                placeholderTextColor="#94a3b8"
              />
              
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Quantity"
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  placeholderTextColor="#94a3b8"
                />
                
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Price"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Priority Color (e.g., red, green)"
                value={priorityColor}
                onChangeText={setPriorityColor}
                placeholderTextColor="#94a3b8"
              />

              <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Additional Notes"
                value={notes}
                onChangeText={setNotes}
                multiline
                placeholderTextColor="#94a3b8"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setIsModalVisible(false);
                    resetForm();
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={isEditing ? handleSaveEdit : handleAddItem}
                >
                  <Text style={styles.saveButtonText}>
                    {isEditing ? 'Save Changes' : 'Add Item'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  halfInput: {
    flex: 1,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
  },
  cancelButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ShoppingListScreen;