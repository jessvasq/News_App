import { useState, React } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-web';

export default function NavBar({ navigation }) {
    const [showNavBar, setShowNavBar] = useState(false)

    return (
        <View style={styles.container}>
            <Button style = {styles.menuTitle} color="black" title="Menu" 
                onPress={() => setShowNavBar(!showNavBar)} />
            {/* NavBar Items */}
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItem1}>
                    <Text style={styles.navText1}>QUICK NEWS</Text>
                </TouchableOpacity>

                {/* Remaining items spread across the page */}
                <View style={styles.navItem}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>Watch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>Markets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>Tech</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>Politics</Text>
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
      position: 'absolute', // Make it float above the content
      left: 10,
      right: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 1000, // Ensure it stays above other content
    },

    navbar: {
        flexDirection: 'row',
        flex: 1, 
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        textTransform: 'uppercase',
    },

    navItem1: {
        paddingVertical: 10,
        left: 5,
    },

    navItem: {
        // paddingVertical: 10,
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
    //   marginTop: 5,
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