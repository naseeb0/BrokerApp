
import React,{useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EventsScreen from './EventsScreen';
import RecommendationScreen from './RecommendationScreen';
import SettingsScreen from './SettingsScreen';
import FavouritesScreen from './FavouritesScreen';
import Selling from './SellingScreen';
import News from './News';
import {Colors} from '../config';
const Tab = createBottomTabNavigator();
const ACTIVE_TAB_COLOR = '#FF5A5F'
const INACTIVE_TAB_COLOR = '#aaa'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Icon } from "@rneui/base";

const headerStyles = {
  headerTintColor: '#000',
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#FF385C',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 }
  }
}


// Define your Header component here
const MyHeader = () => {
  return (
    <Header
      backgroundImageStyle={{}}
      barStyle='default'
      centerComponent={{
        text: "BROKER-LINK",
        // color option rgba(251, 225, 4, 0.9)
        style: { color: "#fff", fontSize: 20, fontWeight: 'bold' },
      
      }}
      centerContainerStyle={{}}
      leftComponent={{ icon: "menu", color: "#fff" }}
      leftContainerStyle={{}}
      linearGradientProps={{ colors: ['red', 'pink'],
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },}}
      placement="center"
      rightComponent={{ icon: "home", color: "#fff" }}
      rightContainerStyle={{}}
      statusBarProps={{}}
      backgroundColor= {Colors.airGreen}
          />
  );
};






const TabNavigator = () => {
  return (
    <SafeAreaProvider>
      {/* Add the Header component */}
      <MyHeader />
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
          headerShown: false,
          ...headerStyles,
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
  return <TabNavigator />;
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
  
});
export default HomeScreen;
