import * as React from 'react';

import Home from '../Components/Home'
import Bmi from '../Components/Bmi'
import FoodRecomend from '../Components/FoodRecomend'
import Maps from '../Components/Maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {HomeStack,FoodStack,WorkoutStack, akuns, Akuns} from'../Route/StackNavigator'
import Carousels from '../Components/Carousels';
const Tab = createBottomTabNavigator();
export default function Route() {
  return (
    <>

      <Tab.Navigator
       screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarStyle:{
            backgroundColor:'#B1D0E0',
        }
      }}
      initialRouteName='Home'
      
      >
        <Tab.Screen
          name="Screen 1"
          
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle:{
                fontWeight:'bold'
            },
            headerShown:false, tabBarActiveBackgroundColor:'#1A374D', tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ), }}
          
          component={HomeStack}  // Replaced Screen 1
        />
        <Tab.Screen
          name="Screen 2"
     
          component={FoodStack}
          options={{
            tabBarLabel: 'Food',
            tabBarLabelStyle:{
                fontWeight:'bold'
            },
            headerShown:false, tabBarActiveBackgroundColor:'#CA8FF8', tabBarIcon: ({ color, size }) => (
            <Icon name="fast-food" color={color} size={size} />
          ), }}
            // Replaced Screen 2
        />
        <Tab.Screen
          name="Screen 3"
          options={{
            tabBarLabel: 'Workout',
            tabBarLabelStyle:{
                fontWeight:'bold'
            },
            headerShown:false, tabBarActiveBackgroundColor:'#758BFF', tabBarIcon: ({ color, size }) => (
            <Icon name="fitness" color={color} size={size} />
          ), }}
          component={WorkoutStack}  // Replaced Screen 3
        />
         <Tab.Screen
          name="Screen 4"
          options={{
            tabBarLabel: 'My Akun',
            tabBarLabelStyle:{
                fontWeight:'bold'
            },
            headerShown:false,
            tabBarActiveBackgroundColor:'#1A5887', tabBarIcon: ({ color, size }) => (
            <Icon name="person-circle-outline"  color={color} size={size} />
          ), }}
          component={Akuns}  // Replaced Screen 3
        />
      </Tab.Navigator>

  </>
  );
}



