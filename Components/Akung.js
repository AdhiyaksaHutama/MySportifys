
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image, StatusBar, ActivityIndicator, LogBox} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AkunStack, HomeStack} from '../Route/StackNavigator'
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
export default function Akung(props) {
const { logout } = useContext(AuthContext);
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
  const [timePassed, setTimePassed] = useState(false);
  const [token, setToken] = useState('');
  const [akun, setAkun] = useState(null);
  const [images, setImage] = useState(null);
    //setTimeout(() => {
    //    setTimePassed(!timePassed)
    //}, 2000);
    const navigation = useNavigation();
    React.useEffect(() => {
        const getUser =async ()=>{
            try {
                let userToken = await AsyncStorage.getItem('akun')
                setAkun(JSON.parse(userToken))
            } catch (error) {
                
            }
           
        }
        getUser()
        
      
      });
      const Load =()=>{
        return(
        <ActivityIndicator  style={styles.loading} size={100} />
        )
        
      }
    return (
        <View style={styles.container}>
          <StatusBar style="transparent" />
          <View style={{flex:1, width:Width, backgroundColor:'#B1D0E0', height:Height-300}}>
            <View style={{elevation:10,padding:20,width:Width-(Width*0.1),alignSelf:'center' ,backgroundColor:'#fff', height:'80%',borderRadius:29 ,marginTop:'10%'}}>
            <Text style={{fontSize:20, color:'#000'}}>Hi {akun == null ?Load():akun.akun.nama},</Text>
            <Image source={akun == null?Load():{uri: akun.akun.foto}} style={{width:150, height:150, alignSelf:'center', borderRadius:30, marginTop:'10%'}}/>
            </View>
          </View>
          <View style={{flex:1,padding:20, width:Width, backgroundColor:'#B1D0E0', height:Height-300,}}>
          <View style={{elevation:10,padding:20,width:Width-(Width*0.1),alignSelf:'center' ,backgroundColor:'#fff', height:'90%',borderRadius:29 ,marginTop:'2%', }}>
            <Text style={{fontSize:20, color:'#000'}}>About You</Text>
            <Text style={{fontSize:15, marginTop:'10%', marginLeft:'5%', color:'#000'}}>Nama                     : {akun == null?Load():akun.akun.nama}</Text>
            <Text style={{fontSize:15, marginTop:'5%', marginLeft:'5%', color:'#000'}}>Tinggi Badan        : {akun == null?Load():akun.akun.tb} cm</Text>
            <Text style={{fontSize:15, marginTop:'5%', marginLeft:'5%', color:'#000'}}>Email                      : {akun == null?Load():akun.akun.email}</Text>
            <Text style={{fontSize:15, marginTop:'5%', marginLeft:'5%', color:'#000'}}>Jenis Kelamin       : {akun == null?Load():akun.akun.jk}</Text>
            <Text style={{fontSize:15, marginTop:'5%', marginLeft:'5%', color:'#000'}}>Berat Badan           : {akun == null?Load():akun.akun.tb} kg</Text>
            <TouchableOpacity onPress={()=>logout()} style={{padding:10,backgroundColor:'#9F3A4D', alignSelf:'center', width:92, marginTop:'8%', marginLeft:'5%', borderRadius:18.5}}><Text style={{color:'#fff', fontSize:12, textAlign:'center', fontWeight:'bold'}}>Logout</Text></TouchableOpacity>
            </View>
          </View>
      
        
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
  loading: {
    position: 'absolute',
    flex:1,
    height:Height,
    left: 0,
    right: 0,
    top: 0,
    bottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});
