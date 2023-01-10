
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Route from './Route/Route';
import SplashScreen from './Components/SplashScreen';

import Login from './Components/Login';
import Register from './Components/Register';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStack } from './StackNavigator';
import * as React from 'react';
import AuthProvider  from './Context/AuthContext';

import { AkunStack } from './Route/StackNavigator';
import { Navigation } from './Route/Navigation';
const Stack = createNativeStackNavigator()

export default function App() {
  
      return (
        <AuthProvider>
          <NavigationContainer>
          <Navigation/>
          </NavigationContainer>
           
          </AuthProvider>
      )
    }