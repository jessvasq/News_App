import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Send login request to backend
      const response = await fetch('http://localhost:8088/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Retrieve token from response

        // Save token in AsyncStorage
        await AsyncStorage.setItem('jwtToken', token);

        Alert.alert('Login Successful', 'You are now logged in!');

        // Navigate to the HomeScreen or SavedArticlesScreen
        navigation.navigate('Home'); // Change to your home or main screen
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}> Welcome to Quick News </Text>
    <Text style={{ marginBottom: 40, fontWeight: 'semibold' }}> Gain unlimited access to all of Quick News for FREE! </Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        // placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        // placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        // placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

    <View>
      <TouchableOpacity style={styles.button} title="Login" onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
      

      <View style={{ borderTopWidth: 1, borderTopColor: 'grey', marginTop: 20, textAlign: 'center' }}>
            <TouchableOpacity style={{ marginTop: 10, fontWeight: 'bold' }}> SUBSCRIBE NOW </TouchableOpacity>
            <Text style={{  marginTop: 10, textAlign: 'center' }}> Cancel or pause anytime </Text>
            <Text style={{ textAlign: 'center' }}>Offer for a Quick News All Access subscription; current subscribers not eligible. </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'semibold', 
  },
  input: {
    height: 40,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',

  },
  error: {
    color: 'red',
    marginBottom: 16,
  },

    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
