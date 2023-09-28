import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../config';

const EventScreen = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    // Fetch event data from the API endpoint
    fetch('https://api.condomonk.ca/api/events/')
      .then((response) => response.json())
      .then((data) => {
        // Extract the event data from the API response
        const events = data.results;
        setEventsData(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {eventsData.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </ScrollView>
    </View>
  );
};

const EventCard = ({ event }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.leftContainer}>
        <Text style={styles.day}>{new Date(event.event_date).getDate()}</Text>
        <Text style={styles.month}>{new Date(event.event_date).toLocaleString('default', { month: 'short' })}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.eventTitle}>{event.event_title}</Text>
        <Text style={styles.eventDescription}>{event.event_description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL("https://www.google.com")}>
            <Text style={styles.buttonText}>RSVP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    overflow: 'hidden',
    marginVertical: 10,
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.airGreen,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  month: {
    fontSize: 16,
    color: '#fff',
    marginTop: -5,
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.airPurp,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default EventScreen;
