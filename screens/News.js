import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo's vector icons library

const News = () => {
  // List of news items
  const newsList = [
    {
      title: "Marling Spring announces 2 projects in Oshawa",
      date: "August 18, 2023",
    },
    {
      title: "Daniels launching sales in Pickering on 23rd of August",
      date: "August 17, 2023",
    },
    {
      title: "New condos coming in Brampton",
      date: "August 16, 2023",
    },
    {
      title: "New Parkview Residences in Mississauga",
      date: "August 15, 2023",
    },
    {
      title: "Luxury condos available in Toronto downtown",
      date: "August 14, 2023",
    },
    {
      title: "Affordable housing initiative in Scarborough",
      date: "August 13, 2023",
    },
    {
      title: "Lakefront properties now open for bookings",
      date: "August 12, 2023",
    },
    {
      title: "Green Living Estates: A sustainable living community",
      date: "August 11, 2023",
    },
    {
      title: "New Homebuyers Expo this weekend",
      date: "August 10, 2023",
    },
    // ... more news items ...
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {newsList.map((news, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="newspaper-outline" size={24} color="#888" />
              <Text style={styles.date}>{news.date}</Text>
            </View>
            <Text style={styles.title}>{news.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
});

export default News;