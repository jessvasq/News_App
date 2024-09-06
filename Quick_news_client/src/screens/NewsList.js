import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { getTopHeadlines } from '../services/NewsService';
import { Button } from 'react-native-web';


const { width } = Dimensions.get("window");

const NewsList = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [itemHeight, setItemHeight] = useState(100);
  const numColumns = 3;
  const numRows = 4;

  useEffect(() => {
    const fetchNews = async () => {
      const articles = await getTopHeadlines();
      setNewsArticles(articles);
    };

    fetchNews();

    const updateItemHeight = () => {
      const { height } = Dimensions.get("window");
      const newItemHeight = Math.floor( height / numRows)
      setItemHeight(newItemHeight);
    }
    
    // Set initial item height 
    updateItemHeight();
    Dimensions.addEventListener('change', updateItemHeight);
    
    return () => {
      Dimensions.removeEventListener('change', updateItemHeight); // Remove event listener
    };


  }, []);

  return (
    <FlatList
      data={newsArticles}
      renderItem={({ item }) => <GridItem item={item} itemHeight={itemHeight} />}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
    />
  );
};

const GridItem = ({ item, itemHeight }) => (
  <View style={[styles.newsItem, { height: itemHeight }]}>
    <Image style={styles.tinyLogo} 
      source={
        item.urlToImage
        ? {uri: item.urlToImage}
        : {uri:'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
      }/>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.source}>Source: {item.source}</Text>
  </View>
  
);


const styles = StyleSheet.create({
  newsItem: {
    flex: 1, 
    margin: 10,
    marginTop: 50,
    height: 100,
    alignItems: "center",
    backgroundColor: "green",
    padding: 15,
    justifyContent: "center",
    borderRadius: 8,
    overflow: 'hidden',

  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5, 
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },

  source: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  tinyLogo: {
    width: '100%',
    height: 140, 
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default NewsList;
