import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import DetailsScreen from './screens/details';

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Index' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
        {/* Add other screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

