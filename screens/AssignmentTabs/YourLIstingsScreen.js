import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const YourListingsScreen = () => (
  <View style={styles.tabContainer}>
    <Text>All Listings Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YourListingsScreen;
