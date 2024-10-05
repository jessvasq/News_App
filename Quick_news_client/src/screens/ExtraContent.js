// ExtraContent.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get("window");

const ExtraContent = ({}) => {

  const [sportsArticles, setSportsArticles] = useState('')
  const [itemHeight, setItemHeight] = useState(100);
  const numColumns = 1;
  const numRows = Dimensions.get("window");

  const handleArticle = (article) => {
    navigation.navigate('ArticleDetails', {article})
  };


  useEffect(() => {
    const fetchSportsArticles = async() => {
      try{
        const response = await fetch('http://localhost:8088/api/sports', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      });

      if (response.ok) {
        const articles = await response.json();
        setSportsArticles(articles);
      } else {
        alert('Failed to fetch saved articles');
      }
    } catch (err) {
      alert('An error occurred while fetching saved articles.')
    }
  };

    fetchSportsArticles();


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
    <View style={styles.extraContainer}>
    <Text style={styles.extraText}>TRENDING SPORTS</Text>
      <FlatList
        data = {sportsArticles}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) => 
          <GridItem item={item} itemHeight={itemHeight} onPress={() => handleArticle(item)} />
          }
          numColumns={numColumns}
       />
    </View>
  );
};


const GridItem = ({ item, itemHeight, onPress }) => (
  <View style={[styles.newsItem, { height: itemHeight }]}>
    <Image style={styles.tinyLogo} 
      source={
        item.urlToImage
        ? {uri: item.urlToImage}
        : {uri:'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
      }/>

      {/* Redirect to article details */}
    <TouchableOpacity
            style={styles.article}
            onPress={onPress}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>{item.description}</Text>
        <Text style={styles.source}>Source: {item.source?.name}</Text>
    </TouchableOpacity>  
  </View>
  
);

const styles = StyleSheet.create({
  extraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginLeft: 10, 
    marginRight: 10,
  },
  extraText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green',
  },
  article: {
    marginBottom: 16,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'green',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  source: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
});

export default ExtraContent;
