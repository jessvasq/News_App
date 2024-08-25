import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getTopHeadlines } from './NewsService';

const NewsList = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const articles = await getTopHeadlines();
      setNewsArticles(articles);
    };

    fetchNews();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.source}>Source: {item.source}</Text>
    </View>
  );

  return (
    <FlatList
      data={newsArticles}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  newsItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default NewsList;
