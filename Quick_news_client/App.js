import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import NewsList from './src/screens/NewsList';
import NewsHome from './src/screens/NewsHome';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='NewsList'>
        {/* <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" /> */}
          <Stack.Screen name="NewsList" component={NewsList}  options={{ title: 'BREAKING NEWS', headerStyle: { backgroundColor: '#f4511e' }, headerTintColor: '#fff' }}/>
          <Stack.Screen name="Profile" component={NewsHome} options={{ title: 'Details Page' }}/> 
        {/* </SafeAreaView> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
