import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AssignmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assignment Screen</Text>
      <Text style={styles.description}>This is a simple Assignment Screen.</Text>
      {/* Add your assignment-related content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
});

export default AssignmentScreen;
