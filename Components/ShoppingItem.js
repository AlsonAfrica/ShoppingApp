import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ShoppingItem = ({ item, onDelete, onEdit }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        { borderLeftColor: item.priorityColor }
      ]}
    >
      <View style={styles.content}>
        <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => {
            }}
          >
            <View style={styles.checkboxInner}>
              {item.completed && (
                <Feather name="check" size={14} color="#4CAF50" />
              )}
            </View>
          </TouchableOpacity>
        <View style={styles.details}>
          <Text style={[styles.itemName,item.completed && styles.completedText]}>{item.name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Feather name="hash" size={14} color="#666" />
              <Text style={styles.infoText}>{item.quantity}</Text>
            </View>
            <View style={styles.infoItem}>
              <Feather name="dollar-sign" size={14} color="#666" />
              <Text style={styles.infoText}>
                {item.price ? item.price.toFixed(2) : 'N/A'}
              </Text>
            </View>
          </View>
          {item.notes && (
            <View style={styles.notes}>
              <Feather name="file-text" size={14} color="#666" />
              <Text style={styles.notesText} numberOfLines={2}>
                {item.notes}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => onEdit(item.id, item.name, item.quantity, item.price, item.priorityColor, item.notes)}
          >
            <Feather name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => onDelete(item.id)}
          >
            <Feather name="trash-2" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  details: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  notes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notesText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  actions: {
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#FF5252',
  },
  checkbox: {
    marginRight: 12,
    justifyContent: 'center',
  },
  checkboxInner: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
});

export default ShoppingItem;