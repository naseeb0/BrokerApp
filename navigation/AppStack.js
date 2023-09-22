import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, AdminHome } from '../screens';
import SettingsScreen from '../screens/SettingsScreen';
import DisplayScreen from '../screens/DisplayScreen';
import MapsScreen from '../screens/MapsScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { Colors } from '../config';
const Stack = createStackNavigator();

const ACTIVE_TAB_COLOR = '#FF2400'
const INACTIVE_TAB_COLOR = '#aaa'
const headerStyles = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: "#D61200",
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 }
  }
};

export const AppStack = () => {
  return (
    <Stack.Navigator 
    screenOptions={headerStyles}>
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Details' component={DetailsScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Settings' component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name='Admin' component={AdminHome} />
      <Stack.Screen name='DisplayScreen' component={DisplayScreen} />
      <Stack.Screen name='MapsScreen' component={MapsScreen} />
    </Stack.Navigator>
  );
};
