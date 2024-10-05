import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const categories = ['General', 'Business', 'Entertainment', 'Sports', 'Technology', 'Science'];

const DropdownMenu = ({ selectedCategory, setSelectedCategory }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.container}>
      {/* Toggle Dropdown Button */}
      <TouchableOpacity style={styles.button} onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.buttonText}>{selectedCategory || 'Categories'}</Text>
      </TouchableOpacity>

      {/* Dropdown List */}
      {showDropdown && (
        <View style={styles.dropdown}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedCategory(category === 'All' ? '' : category);
                setShowDropdown(false); // Close the dropdown menu
              }}>
              <Text style={styles.dropdownText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    zIndex: 1000,
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
  },
});

export default DropdownMenu;
