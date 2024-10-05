import React, { useState } from 'react';
import { TextInput,  Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [language, setLanguage] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8088/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username,
                    password,
                    email, 
                    profilePicture, 
                    language
                }),
            });

            const data = await response.json();
            console.log('User registered successfully:', data);

            // Check if the response is successful
            if (response.ok) {
                alert('User registered successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error during registration:', errorData);
                alert(`Error: ${errorData.message || 'Registration failed'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error during registration');
        }
    };

    return (
        <View style={styles.container}>
         <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}> Welcome to Quick News </Text>
         <Text style={{ marginBottom: 40, fontWeight: 'bold', fontSize: 18, }}> CREATE AN ACCOUNT </Text>
            <Text style={styles.label}>Username</Text>
            <TextInput 
                style={styles.input}
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <Text style={styles.label}>Profile Picture</Text>

            <TextInput 
                style={styles.input} 
                value={profilePicture} 
                onChange={(e) => setProfilePicture(e.target.value)} 
            />

            <Text style={styles.label}>Language</Text>
            <TextInput
                style={styles.input} 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)} 
            />

            <Text style={styles.label}>Password</Text>
            <TextInput 
                style={styles.input} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                 style={styles.input}
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
    <View>
        <TouchableOpacity style={styles.button} title="Login" onClick={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
    </View>
      
            <View style={{ borderTopWidth: 1, borderTopColor: 'grey', marginTop: 20, textAlign: 'center' }}>
            <TouchableOpacity style={{ marginTop: 10, fontWeight: 'semibold' }}> SUBSCRIBE NOW </TouchableOpacity>
            <Text style={{  marginTop: 10, textAlign: 'center' }}> Cancel or pause anytime </Text>
            <Text style={{ textAlign: 'center' }}>Offer for a Quick News All Access subscription; current subscribers not eligible. </Text>
      </View>
        </View>
    );
};


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

export default Register;
