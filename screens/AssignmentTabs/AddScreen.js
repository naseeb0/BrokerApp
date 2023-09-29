import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddScreen = () => (
  <View style={styles.tabContainer}>
    <Text>ADD Screen </Text>
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddScreen;
