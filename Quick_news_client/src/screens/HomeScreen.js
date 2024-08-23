import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { getTopHeadlines } from '../services/newsService';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getTopHeadlines('us');
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);


  if (articles.length === 0) {
    return <Text>No articles found. Please try again later.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
      <Button
        title="Go to News"
        onPress={() => navigation.navigate('News')}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  articleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
