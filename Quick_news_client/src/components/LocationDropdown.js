import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const locations = ['All', 'US', 'UK', 'China', 'Mexico', 'Rusia'];

const LocationDropdown = ({ selectedLocation, setSelectedLocation }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
            style={styles.button} 
            onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.buttonText}>
            {selectedLocation || 'Select Location'}
        </Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdown}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedLocation(location === 'All' ? '' : location);
                setShowDropdown(false); // Close the dropdown menu
              }}
            >
              <Text style={styles.dropdownText}>
                {location}
              </Text>
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

export default LocationDropdown;
