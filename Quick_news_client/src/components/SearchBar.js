import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <View style={styles.container}>
      {/* TextInput for entering the search query */}
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {/* Custom TouchableOpacity Button for the Search Action */}
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}
    
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
      },
      input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
      },
    });
    