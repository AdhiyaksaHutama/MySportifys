import Home from '../Components/Home'
import Bmi from '../Components/Bmi'
import FoodRecomend from '../Components/FoodRecomend'
import Maps from '../Components/Maps';
import Carousels from '../Components/Carousels'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlatListFood from '../Components/FlatlistFood';
import DetailFood from '../Components/DetailFood';
import LompatTali from '../Components/LompatTali';
import AngkatBeban from '../Components/AngkatBeban';
import Register from '../Components/Register'
import SplashScreen from '../Components/SplashScreen';
import Login from '../Components/Login';
import { AuthContext } from '../Context/AuthContext';
import React, { useState, useEffect, useRef,useMemo, useContext } from 'react';
import Akung from '../Components/Akung';
const Stack = createNativeStackNavigator();

export function HomeStack() {
    return (
   
    <Stack.Navigator initialRouteName="Home" >
    <Stack.Group >
   
      <Stack.Screen name="Home" component={Home} options={{headerShown:false }}  />
      <Stack.Screen name="Bmi" component={Bmi} options={{ headerStyle: { backgroundColor: 'papayawhip' }, headerShown:false }}/>
         
    </Stack.Group>
   
  </Stack.Navigator>
 
    );
  }
  export function Akuns() {
    
    return (
   
    <Stack.Navigator initialRouteName="Akung" >
    <Stack.Group >
    <Stack.Screen name="Akung" component={Akung} options={{headerShown:false }}  />
   
    </Stack.Group>
   
  </Stack.Navigator>
 
    );
  }
  export function AkunStack() {
    
    return (
   
    <Stack.Navigator initialRouteName="Login" >
    <Stack.Group >
    <Stack.Screen name="Register" component={Register} options={{headerShown:false }}  />
    <Stack.Screen name="Login" component={Login} options={{headerShown:false }}  />
    <Stack.Screen name="Home" component={Home} options={{headerShown:false }}  />
         
    </Stack.Group>
   
  </Stack.Navigator>
 
    );
  }
  export function FoodStack() {
    return (
    
       <Stack.Navigator initialRouteName="FoodRecomend" >
    <Stack.Group >
  
      <Stack.Screen name="FoodRecomend" component={FoodRecomend} options={{headerShown:false }}  />
      <Stack.Screen name="FlatlistFood" component={FlatListFood} options={{headerShown:false }}  />
      <Stack.Screen name="DetailFood" component={DetailFood} options={{headerShown:false,  }}  />
    </Stack.Group>
   
  </Stack.Navigator>
  
    );
  }

  export function WorkoutStack() {
    return (
    
       <Stack.Navigator initialRouteName="Carousels" >
    <Stack.Group >
  
      <Stack.Screen name="Carousels" component={Carousels} options={{headerShown:false }}  />
      <Stack.Screen name="LompatTali" component={LompatTali} options={{headerShown:false }}  />
      <Stack.Screen name="AngkatBeban" component={AngkatBeban} options={{headerShown:false }}  />
      <Stack.Screen name="Maps" component={Maps} options={{headerShown:false }}  />      
    </Stack.Group>
   
  </Stack.Navigator>
     
    );
  }