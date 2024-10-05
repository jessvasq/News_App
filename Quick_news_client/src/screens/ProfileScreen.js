import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  return (

    <View>
    <Button
        title="Go to Home"
        onPress={() =>
            navigation.navigate('SplitScreen')
        }/>
    </View>
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
