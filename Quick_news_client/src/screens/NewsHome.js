import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';


const NewsHome = () => {
    return (
        <View style={styles.container}>
          <Text>HOME PAGE</Text>
          <TouchableHighlight
            underlayColor={"#09f"}
            onPress={()=> alert('Hi there!')}
            style={{ width: 200, height:200, backgroundColor:'red', borderRadius:100, justifyContent:'center', alignItems:'center'}}>
            <Text style={{ color: 'white'}}>Click Here</Text>
        </TouchableHighlight>
      </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default NewsHome;