
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image, StatusBar, ActivityIndicator, LogBox} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AkunStack, HomeStack} from '../Route/StackNavigator'
import { useNavigation } from '@react-navigation/native';
export default function SplashScreen(props) {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
  const [timePassed, setTimePassed] = useState(false);
  const [token, setToken] = useState('');
    //setTimeout(() => {
    //    setTimePassed(!timePassed)
    //}, 2000);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <StatusBar style="transparent" />
          <Image source={require('../assets/my.png')} style={{width:250, height:220}} />
        
        </View>
      ); 
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B1D0E0',
    overflow:'scroll',
    alignItems:'center',
    justifyContent:'center'
    
  },
});
