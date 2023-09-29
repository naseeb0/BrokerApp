import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const News = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('https://api.condomonk.ca/api/news/')
      .then((response) => response.json())
      .then((data) => {
        setNewsList(data.results); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {newsList.map((news, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="newspaper-outline" size={24} color="#888" />
              <Text style={styles.date}>{news.date_of_upload}</Text>
            </View>
            <Image
  source={{ uri: news.news_thumbnail }}
  style={styles.thumbnail}
  resizeMode="cover" // or resizeMode="contain"
/>
            <Text style={styles.title}>{news.news_title}</Text>
            <Text style={styles.description}>{news.news_description}</Text>
            <TouchableOpacity
              onPress={() => {
                // Open the news link when pressed
                Linking.openURL(news.news_link);
              }}
            >
              <Text style={styles.link}>Learn More</Text>
            </TouchableOpacity>
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
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default News;
