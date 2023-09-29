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

const CustomDrawerItem = ({ label, icon, active, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.drawerItem, active && styles.activeItem]}>
      <Ionicons name={icon} size={24} color={active ? Colors.airGreen : 'black'} />
      <Text style={[styles.drawerItemText, active && styles.activeItemText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation, state }) => {
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null); // Add state for email

  useEffect(() => {
    // Check if the user is authenticated
    const currentUser = auth.currentUser;
    console.log("Current USER "+currentUser.uid);

    if (currentUser) {
      const userId = currentUser.uid;

      // Define a function to fetch user data (name and email)
      const fetchUserData = async () => {
        try {
          console.log("TRYING..............");
          const response = await axios.get(
            `https://us-central1-homebaba-de874.cloudfunctions.net/fetchUserFieldsById?userId=${userId}`
          );
          console.log('API Response:', response); // Log the entire response

          if (response.status === 200) {
            // Set displayName and email to the fetched data
            setDisplayName(response.data.name);
            setEmail(response.data.email); // Set email here
          } else {
            console.log('Error:', response.data.error || 'User document not found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      // Call the fetchUserData function to fetch and set the user data
      fetchUserData();
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
  <Text style={styles.drawerHi}>Hi,</Text>
  <Text style={styles.drawerDisplayName}>{displayName}</Text>
  {email && <Text style={styles.drawerEmail}>{email}</Text>}

</View>
      <CustomDrawerItem
        label="Home"
        icon="ios-home"
        active={state.routeNames[state.index] === 'BROKER-LINK'}
        onPress={() => navigation.navigate('BROKER-LINK')}
      />
      <CustomDrawerItem
        label="Assignment Sales"
        icon="ios-paper"
        active={state.routeNames[state.index] === 'Assignment'}
        onPress={() => navigation.navigate('Assignment')}
      />
      <CustomDrawerItem
        label="Logout"
        icon="ios-log-out"
        onPress={handleLogout}
      />
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
  drawerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20, // Reduced horizontal padding
    backgroundColor: '#fff',
  },
  drawerHeaderContainer: {
    flexDirection: 'column', // Change to column layout
    alignItems: 'flex-start', // Align text to the start of the column
    marginBottom: 20,
  },
  drawerEmail: {
    fontSize: 18, // Adjust the font size as needed
    color: Colors.black,
    marginTop: 5, // Add margin-top to separate from displayName
    flexWrap: 'wrap', // Allow text to wrap to the next line if it's too long
  },
  drawerHi: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color:Colors.black,
  },
  drawerDisplayName: {
    marginTop:15,
    fontSize: 30,
    fontWeight: 'bold',
    color:Colors.black,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  drawerItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  activeItem: {
  },
  activeItemText: {
    fontWeight: 'bold',
    color: Colors.airGreen,
  },
  
});


export default HomeScreen;
