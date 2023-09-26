import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EventsScreen from './EventsScreen';
import RecommendationScreen from './RecommendationScreen';
import SettingsScreen from './SettingsScreen';
import FavouritesScreen from './FavouritesScreen';
import Selling from './SellingScreen';
import News from './News';
import { Colors } from '../config';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ACTIVE_TAB_COLOR = '#FF5A5F';
const INACTIVE_TAB_COLOR = '#aaa';

const headerStyles = {
  headerShown: false, // Hide the header
};

const CustomDrawerContent = ({ navigation }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can clear authentication tokens or perform other necessary actions.
    // After logout, you can navigate the user to the login screen or perform any other required behavior.
    // navigation.navigate('Login'); // Replace 'Login' with your actual login screen route.
  };

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Assignment')}>
        <Text style={styles.drawerItem}>Assignment Sales</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.drawerItem}>Logout</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default HomeScreen;
