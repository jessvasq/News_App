import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import DropdownMenu from '../components/DropdownMenu';
import LocationDropdown from '../components/LocationDropdown';
import { useNavigation } from '@react-navigation/native';
import { GetTopHeadlines } from '../services/NewsService';
import { GetArticlesByCategory } from '../services/ArticleByCategory.js';
import { GetArticlesByLocation } from '../services/ArticleByLocation.js';
import { fetchArticlesByQuery } from '../services/ArticleByQuery.js';


const { width } = Dimensions.get("window");

const NewsList = ({ }) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [itemHeight, setItemHeight] = useState(100);
    const numColumns = 3;
    const numRows = 4;
  
      {/* SearchBar Component */}
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const navigation = useNavigation();
  
    const handleArticle = (article) => {
      navigation.navigate('ArticleDetails', {article})
    };

  // Function to fetch articles by search query
  const fetchArticlesBySearchQuery = async (query) => {
    setLoading(true);
    setError('');
    try {
      const articles = await fetchArticlesByQuery(query);
      setNewsArticles(articles);
    } catch (err) {
      setError('There was an error fetching articles based on the search query.');
    } finally {
      setLoading(false);
    }
  };
  

  // Function to fetch articles by the selected category
  const fetchArticlesByCategory = async (category) => {
    setLoading(true);
    setError('');
    try {
      const articles = await GetArticlesByCategory(category);
      setNewsArticles(articles);
    } catch (err) {
      setError('There was an error fetching articles for the selected category.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch articles by the selected category
  const fetchArticlesByLocation = async (category) => {
    setLoading(true);
    setError('');
    try {
      const articles = await GetArticlesByLocation(category);
      setNewsArticles(articles);
    } catch (err) {
      setError('There was an error fetching articles for the selected category.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if(selectedCategory) {
      fetchArticlesByCategory(selectedCategory)
    }
    if(selectedLocation){
      fetchArticlesByLocation(selectedLocation)
    }

    if(searchQuery){
      fetchArticlesBySearchQuery(searchQuery)
    }

    const fetchNews = async () => {
      const articles = await GetTopHeadlines();
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
  }, [selectedCategory, selectedLocation]);


  // Search and filtering logic
  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const results= await fetchArticles(searchQuery, selectedCategory, selectedLocation);
      setNewsArticles(results);
    } catch (err) {
      setError('There was an error with your request. Please try again later')
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style ={styles.container}>
    {/* SearchBar Component */}
   
      <SearchBar 
        searchQuery = {searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={fetchArticlesByQuery}
      />
 <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
      {/* Dropdown Menu for Filtering Categories */}
      <DropdownMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
     
      {/* Dropdown Menu for Location */}
      <LocationDropdown style ={styles.location}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
 </View>
     {/* Loading Indicator */}
     {loading && <ActivityIndicator size="large" color="#0000ff" />}

    {/* Error Message */}
    {error ? <Text style={styles.error}>{error}</Text> : null}


    {/* Display the filtered list - API DATA */}
    <FlatList
      data={newsArticles}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => 
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
      }
         resizeMode="contain"
      />

      {/* Redirect to article details */}
    <TouchableOpacity
            style={styles.article}
            onPress={onPress}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>{item.description}</Text>
    </TouchableOpacity>  


    <Text style={styles.source}>Source: {item.source?.name}</Text>
  </View>
  
);

const styles = StyleSheet.create({
  newsItem: {
    flex: 3, 
    margin: 10,
    marginTop: 50,
    height: 100,
    alignItems: "center",
    borderColor: 'green',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    justifyContent: "center",
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15, 
    textAlign: 'center',
    color: 'grey',
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
    height: 120, 
    marginTop:150,
    borderRadius: 8,
  },

  extraItem: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  extraTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  extraDescription: {
    marginTop: 5,
    fontSize: 14,
  },

  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },

  article: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default NewsList;
