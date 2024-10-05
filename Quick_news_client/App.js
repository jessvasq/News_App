import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplitScreen from './src/screens/SplitScreen';
import Details from './src/screens/Details';
import ArticleDetails from './src/screens/ArticleDetails';
import ProfileScreen from './src/screens/ProfileScreen';
import  React, { useState } from 'react';
import Register from './src/screens/Register';
import LoginScreen from './src/screens/LoginScreen';
import SavedArticlesScreen from './src/screens/SavedArticlesScreen';
import LogoutScreen from './src/screens/LogoutScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='NewsList'
        screenOptions={{ header: (props) => <NavBar {...props} /> }} // Set NavBar as custom header for all screens
      >
          <Stack.Screen name="SplitScreen" component={SplitScreen}/> 
          <Stack.Screen name="Details" component={Details}/> 
          <Stack.Screen name="LoginScreen" component={LoginScreen}/> 
          <Stack.Screen name="SavedArticlesScreen" component={SavedArticlesScreen}/> 
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Logout" component={LogoutScreen} />
          <Stack.Screen name="ArticleDetails" component={ArticleDetails} options={{ title: 'Article Details' }} />
      
      </Stack.Navigator>

      {/* <NavBar/> */}
    </NavigationContainer>
  );
}


// Custom NavBar component 
function NavBar({ navigation }){

  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Button style = {styles.menuTitle} color="black" title="Menu" 
          onPress={() => setShowNavBar(!showNavBar)} /> */}
      {/* NavBar Items */}
      <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem1}>
              <Text style={styles.navText1} onPress={() => navigation.navigate('SplitScreen')}>QUICK NEWS</Text>
          </TouchableOpacity>

          {/* Remaining items spread across the page */}
          <View style={styles.navItem}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SplitScreen')}>
              <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SavedArticlesScreen')}>
              <Text style={styles.navText}>My Articles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.navText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.navText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Logout')}>
              <Text style={styles.navText}>Logout</Text>
          </TouchableOpacity>
          </View>
      </View>

      {/* Dropdown Menu */}
      {showNavBar && (
          <View style={styles.menu}>
              <Text style={styles.menuItem}>Home</Text>
              <Text style={styles.menuItem}>US</Text>
              <Text style={styles.menuItem}>Markets</Text>
              <Text style={styles.menuItem}>Politics</Text>
              <Text style={styles.menuItem}>Tech</Text>
              <Text style={styles.menuItem}>Watch</Text>
          </View>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    left: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  navbar: {
    flexDirection: 'row',
    flex: 1, 
    alignItems: 'center',
    backgroundColor: 'white',
    textTransform: 'uppercase',
},

  navItem1: {
      paddingVertical: 10,
      left: 5,
  },

  navItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
  },

  navText: {
      fontSize: 16,
      fontWeight: 'bold',
  },

  navText1: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'green',
  },

  menu: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    position: 'absolute',
    top: 50,
    left: 10, 
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 5,
    fontSize: 16,
    textTransform: 'uppercase',
  },

  menuTitle: {
      backgroundColor: 'black',  
  }
});
