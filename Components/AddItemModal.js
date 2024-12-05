import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/shoppingListSlice';
import Toast from 'react-native-toast-message';

const AddItemModal = ({ visible, onClose }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const dispatch = useDispatch();

  const handleAddItem = () => {
    // Enhanced validation
    if (!itemName.trim()) {
      Alert.alert('Invalid Input', 'Please enter an item name');
      return;
    }

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid quantity');
      return;
    }

    try {
      dispatch(addItem({
        name: itemName.trim(),
        quantity: parsedQuantity
      }));

      Toast.show({
        type: 'success',
        text1: 'Item Added',
        text2: `${parsedQuantity} x ${itemName} added to list`,
        position: 'top',
      });

      // Reset fields and close modal
      resetForm();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add item',
        position: 'top',
      });
    }
  };

  const resetForm = () => {
    setItemName('');
    setQuantity('1');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Item</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
            maxLength={50} // Limit item name length
          />
          
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={quantity}
            onChangeText={(text) => {
              // Only allow numeric input
              const numericText = text.replace(/[^0-9]/g, '');
              setQuantity(numericText);
            }}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={resetForm}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.addButton]} 
              onPress={handleAddItem}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  inputNotes:{
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height:200,
    textAlign:"center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#f0f0f0'
  },
  addButton: {
    backgroundColor: '#007bff'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default AddItemModal;