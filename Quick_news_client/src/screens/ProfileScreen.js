import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

//   const { userId } = route.params; // Assume that user ID is passed as a route parameter

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(`http://YOUR_API_URL/api/users/${userId}`);
//         const data = await response.json();
//         setUser(data);
//       } catch (err) {
//         setError('Failed to load user details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

  return (

    <View>
    <Button
        title="Go to Home"
        onPress={() =>
            navigation.navigate('SplitScreen')
        }/>
</View>


    // <View style={styles.container}>                
    //   {loading ? (
    //     <ActivityIndicator size="large" color="#0000ff" />
    //   ) : error ? (
    //     <Text style={styles.error}>{error}</Text>
    //   ) : (
    //     <View style={styles.profileContainer}>
    //       <Text style={styles.title}>User Profile</Text>
    //       <Text style={styles.label}>First Name:</Text>
    //       <Text style={styles.value}>{user.firstName}</Text>
          
    //       <Text style={styles.label}>Last Name:</Text>
    //       <Text style={styles.value}>{user.lastName}</Text>

    //       <Text style={styles.label}>Email:</Text>
    //       <Text style={styles.value}>{user.email}</Text>

    //       <Text style={styles.label}>Phone Number:</Text>
    //       <Text style={styles.value}>{user.phoneNumber}</Text>

    //       {/* Back Button */}
    //       <Button title="Back" onPress={() => navigation.goBack()} />
    //     </View>
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProfileScreen;
