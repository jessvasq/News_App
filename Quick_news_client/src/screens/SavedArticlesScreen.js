import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedArticlesScreen() {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          alert('You must be logged in to view saved articles.');
          return;
        }

        const response = await fetch('http://localhost:8088/articles/saved', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const articles = await response.json();
          console.log('Fetched data', articles)
          setSavedArticles(articles);
        } else {
          alert('Failed to fetch saved articles.');
        }
      } catch (err) {
        alert('An error occurred while fetching saved articles.');
      }
    };

    fetchSavedArticles();
  }, []);


  useEffect(() => {
    console.log('Number of saved articles:', savedArticles.length); 
  }, [savedArticles]);


  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', color: 'green', textAlign:'center', fontSize: 22, marginTop: 20, 
    marginBottom: 25}}>MY READING LIST</Text>
      <FlatList
        data={savedArticles}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Use a fallback for unique keys
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  article: {
    margin: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});






