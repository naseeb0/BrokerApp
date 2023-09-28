import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../config';
// FETCHING REAL EVENTS
const eventsData = [
  {
    date: '14',
    month: 'AUG',
    time: '10 AM',
    title: 'Pivot Day by Marlin Spring',
    organizer: {
      image: 'https://api.homebaba.ca/media/rego-realty_brokerage.png', // Replace with actual image URL
      name: 'REGO REALITY',
      location: 'Berhein, ON',
      duration: '3 hours',
    },
  },
  {
    date: '15',
    month: 'AUG',
    time: '12 PM',
    title: 'The Homes and the Prices',
    organizer: {
      image: 'organizer_image_url', // Replace with actual image URL
      name: 'Organizer Name',
      location: 'Event Location',
      duration: '3 hours',
    },
  },
  {
    date: '15',
    month: 'AUG',
    time: '12 PM',
    title: 'Lets Have a Look at the Homes',
    organizer: {
      image: 'organizer_image_url', // Replace with actual image URL
      name: 'Organizer Name',
      location: 'Event Location',
      duration: '3 hours',
    },
  },
  {
    date: '15',
    month: 'AUG',
    time: '12 PM',
    title: 'Homebaba Fair 2021',
    organizer: {
      image: 'organizer_image_url', // Replace with actual image URL
      name: 'Organizer Name',
      location: 'Event Location',
      duration: '3 hours',
    },
  },
  {
    date: '15',
    month: 'AUG',
    time: '12 PM',
    title: 'Finding the Right Home for You',
    organizer: {
      image: 'organizer_image_url', // Replace with actual image URL
      name: 'Organizer Name',
      location: 'Event Location',
      duration: '3 hours',
    },
  },
  {
    date: '15',
    month: 'AUG',
    time: '12 PM',
    title: 'Pivot Day by Marlin Spring',
    organizer: {
      image: 'organizer_image_url', // Replace with actual image URL
      name: 'Organizer Name',
      location: 'Event Location',
      duration: '3 hours',
    },
  },
  {
    date: '15',
    month: 'AUG',
    time: '12 PM',
    title: 'Pivot Day by Marlin Spring',
    organizer: {
      image: 'organizer_image_url', // Replace with actual image URL
      name: 'Organizer Name',
      location: 'Event Location',
      duration: '3 hours',
    },
  },
  // Add more events here...
];

const EventScreen = () => {
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
  const [expanded, setExpanded] = useState(false);
  const contentHeight = useState(new Animated.Value(0))[0];

  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(contentHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(contentHeight, {
        toValue: 180, // Adjust the value as needed
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={toggleExpand}>
      <View style={styles.leftContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.day}>{event.date}</Text>
          <Text style={styles.month}>{event.month}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={18} color="#fff" />
          <Text style={styles.time}>{event.time}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>RSVP</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.content, { height: contentHeight }]}>
          {/* Organizer Details */}
          <Image style={styles.organizerImage} source={{ uri: event.organizer.image }} />
          <Text style={styles.organizerName}>{event.organizer.name}</Text>
          <Text style={styles.organizerLocation}>{event.organizer.location}</Text>
          <Text style={styles.eventDuration}>Event Duration: {event.organizer.duration}</Text>
        </Animated.View>
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
        // Add top padding/margin
        paddingHorizontal: 6, // Add horizontal padding
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.airGreen,
  },
  dateContainer: {
    alignItems: 'center',
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#fff',
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
  content: {
    overflow: 'hidden',
    marginTop: 10,
  },
  organizerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  organizerLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  eventDuration: {
    fontSize: 14,
    color: '#666',
  },
});

export default EventScreen;
