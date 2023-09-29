import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllListingsScreen from './AssignmentTabs/AllListingsScreen';
import AddScreen from './AssignmentTabs/AddScreen';
import YourListingsScreen from './AssignmentTabs/YourLIstingsScreen';


const Tab = createBottomTabNavigator();

const AssignmentScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="All Listings"
        component={AllListingsScreen}
        options={{
          headerShown: false, // Hide the header for All Listings
        }}
      /> 
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          headerShown: false, // Hide the header for Add
        }}
      />
      <Tab.Screen
        name="Your Listings"
        component={YourListingsScreen}
        options={{
          headerShown: false, // Hide the header for Your Listings
        }}
      />
    </Tab.Navigator>
  );
};

export default AssignmentScreen;