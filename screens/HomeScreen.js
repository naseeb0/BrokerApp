import React from 'react';
import { useState,useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EventsScreen from './EventsScreen';
import RecommendationScreen from './RecommendationScreen';
import SettingsScreen from './SettingsScreen';
import FavouritesScreen from './FavouritesScreen';
import Selling from './SellingScreen';
import News from './News';
import { Colors } from '../config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import axios from 'axios';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ACTIVE_TAB_COLOR = '#FF5A5F';
const INACTIVE_TAB_COLOR = '#aaa';

const headerStyles = {
  headerShown: false, // Hide the header
};


async function fetchUserNameById(userId) {
  try {
    const response = await axios.get(
      `https://us-central1-homebaba-de874.cloudfunctions.net/fetchUserNameById?userId=${userId}`
    );

    if (response.status === 200 && response.data.userName) {
      console.log('User name:', response.data.userName);
      return response.data.userName;
    } else {
      console.log('Error:', response.data.error || 'User document not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user name:', error);
    return null;
  }
}

const CustomDrawerContent = ({ navigation }) => {
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const currentUser = auth.currentUser;
    console.log("Current USER "+currentUser.uid);

    if (currentUser) {
      const userId = currentUser.uid;

      // Define a function to fetch user name
      const fetchUserName = async () => {
        try {
          console.log("TRYING..............");
          const response = await axios.get(
            `https://us-central1-homebaba-de874.cloudfunctions.net/fetchUserNameById?userId=${userId}`
          );
          console.log('API Response:', response); // Log the entire response

          if (response.status === 200 && response.data.userName) {
            // Set displayName to the fetched user name
            setDisplayName(response.data.userName);
            console.log("USER NAME");
            console.log(response.data.userName);
          } else {
            console.log('Error:', response.data.error || 'User document not found.');
          }
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      };

      // Call the fetchUserName function to fetch and set the user name
      fetchUserName();
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // User signed out successfully
        // You don't need setUser(null) here since you're not using it
      })
      .catch((error) => console.log('Error logging out: ', error));
  };
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeaderContainer}>
      <Text style={styles.drawerHi}>Hi</Text>
        <Text style={styles.drawerDisplayName}>{displayName}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Assignment')}>
        <Text style={styles.drawerItem}>Assignment Sales</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutContainer}>
          <Ionicons name="ios-log-out" size={24} color="red" />
          <Text style={styles.drawerItem}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

};


const TabNavigator = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Selling') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Upcoming') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'News') {
              iconName = focused ? 'ios-newspaper' : 'newspaper-outline';
            } else if (route.name === 'Events') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            } else if (route.name === 'Favourites') {
              iconName = focused ? 'heart' : 'ios-heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={Colors.black} />;
          },
          ...headerStyles,
          headerStyle: {
            backgroundColor: Colors.airGreen // Change this to your desired header color
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black', // Set the active icon color
          inactiveTintColor: 'gray', // Set the inactive icon color
        }}
      >
        <Tab.Screen name="Selling" component={Selling} options={{ tabBarLabel: "Selling" }} />
        <Tab.Screen name="Upcoming" component={RecommendationScreen} options={{ tabBarLabel: "Upcoming" }} />
        <Tab.Screen name="Events" component={EventsScreen} options={{ tabBarLabel: "Events" }} />
        <Tab.Screen name="News" component={News} options={{ tabBarLabel: "News" }} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ tabBarLabel: "Favourites" }} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export const HomeScreen = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="BROKER-LINK" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginTop: 20, // Add proper margin to the top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  drawerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    // Center horizontally
    justifyContent: 'space-between', // Arrange items vertically with space between
    paddingHorizontal: 60,
    paddingTop: 50,
    paddingBottom: 30, // Add padding to the bottom
    backgroundColor: '#fff',
  },
  drawerHi: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  drawerDisplayName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  }, 
  logoutContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Center items vertically
    marginVertical: 10,
    fontWeight: 'bold', // Add bold font weight
    color: 'blue', // Change the text color
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold', // Add bold font weight
    color: 'blue', // Change the text color
  },
});


export default HomeScreen;
