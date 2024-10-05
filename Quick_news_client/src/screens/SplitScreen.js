import React from 'react';
import { View, StyleSheet } from 'react-native';
import NewsList from './NewsList';
import ExtraContent from './ExtraContent';
import { ScrollView } from 'react-native-web';

const SplitScreen = () => {
  return (
    <View style={styles.container}>
        <ScrollView style={styles.newsListContainer} showsVerticalScrollIndicator={false}>
            {/* NewsList will occupy 3/4 of the screen */}
                <NewsList />
        </ScrollView>

        {/* ExtraContent will occupy 1/4 of the screen */}
        <View style={styles.extraContentContainer}>
            <ExtraContent />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  newsListContainer: {
    marginTop: 15,
    flex: 3, // Takes up 3/4 of the width
    borderRightWidth: 2, 
    borderRightColor: 'grey'
  },
  extraContentContainer: {
    flex: 0.5, // Takes up 1/4 of the width
  },
});

export default SplitScreen;
