// import React from 'react';
// import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// export default function ArticleDetails ({ route }) {
//   const { article } = route.params; // Retrieve the article from the navigation parameters

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{article.title}</Text>
//       {article.urlToImage ? (
//         <Image style={styles.image} source={{ uri: article.urlToImage }} />
//       ) : null}

//       <View style={styles.metaData}>
//         <Text style={styles.author}>By: {article.author || 'Unknown Author'}</Text>
//         <Text style={styles.source}>Source: {article.source.name}</Text>
//         <Text style={styles.source}>{article.description}</Text>
//       </View>
      
//       <Text style={styles.content}>{article.content || 'No content available'}</Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#ffffff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   metaData: {
//     marginBottom: 20,
//   },
//   author: {
//     fontStyle: 'italic',
//     marginBottom: 5,
//   },
//   source: {
//     fontWeight: '600',
//   },
//   content: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
// });


////////////////////////////

import React from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArticleDetails({ route }) {
  const { article } = route.params;

  const saveArticle = async () => {
    try {
      // Retrieve the stored token
      const token = await AsyncStorage.getItem('jwtToken');

      // Check if token is present
      if (!token) {
        Alert.alert('Error', 'You must be logged in to save articles.');
        return;
      }

      // Send request to backend to save the article
      const response = await fetch('http://localhost:8088/articles/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(article),
      });

      if (response.ok) {
        Alert.alert('Success', 'Article saved successfully!');
      } else {
        Alert.alert('Error', 'Failed to save the article.');
      }
    } catch (err) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      {article.urlToImage ? (
        <Image style={styles.image} source={{ uri: article.urlToImage }} />
      ) : null}

      <View style={styles.metaData}>
        <Text style={styles.author}>By: {article.author || 'Unknown Author'}</Text>
        {/* <Text style={styles.source}>Source: {article.source.name}</Text> */}
        {/* <Text style={styles.description}>{article.content}</Text> */}
      </View>

      <Text style={styles.content}>{article.content || 'No content available'}</Text>
    

      <TouchableOpacity style={styles.button} title="Save Article" onPress={saveArticle}>
        <Text style={styles.buttonText}>Add to My Reading List</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margrin: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  metaData: {
    marginBottom: 16,
  },
  author: {
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 10,
  },
  source: {
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 8,
  },
  content: {
    marginTop: 20,
    fontSize: 16,
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

