import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LogoutScreen() {
  const navigation = useNavigation();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Clear JWT token from AsyncStorage
      await AsyncStorage.removeItem('jwtToken');
      Alert.alert('Logout Successful', 'You have been logged out.');
      
      // Navigate to Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    } catch (err) {
      Alert.alert('Error', 'An error occurred during logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
});
