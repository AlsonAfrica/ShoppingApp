import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { 
  deleteItem, 
  togglePurchased 
} from '../redux/slices/shoppingListSlice';

const Checkbox = ({ checked }) => (
  <View style={[
    styles.checkbox, 
    checked && styles.checkedCheckbox
  ]}>
    {checked && <Text style={styles.checkmark}>✓</Text>}
  </View>
);

const ShoppingListItem = ({ item, onEdit }) => {
  const dispatch = useDispatch();

  const handleTogglePurchased = () => {
    dispatch(togglePurchased(item.id));
  };

  const handleDelete = () => {
    dispatch(deleteItem(item.id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.itemContent}
        onPress={handleTogglePurchased}
      >
        <Checkbox checked={item.purchased} />
        <Text 
          style={[
            styles.itemText, 
            item.purchased && styles.purchasedItem
          ]}
        >
          {item.name}
        </Text>
        <Text style={styles.quantityText}>
          Qty: {item.quantity}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={onEdit}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white'
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkedCheckbox: {
    backgroundColor: '#007bff'
  },
  checkmark: {
    color: 'white',
    fontSize: 16
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10
  },
  purchasedItem: {
    textDecorationLine: 'line-through',
    color: '#888'
  },
  quantityText: {
    fontSize: 14,
    color: '#666'
  },
  actionContainer: {
    flexDirection: 'row'
  },
  editButton: {
    marginRight: 10,
    padding: 5
  },
  deleteButton: {
    padding: 5
  },
  buttonText: {
    color: '#007bff',
    fontWeight: '600'
  }
});

export default ShoppingListItem;