import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';

import { StyleSheet, Text, View, Dimensions, PermissionsAndroid,TouchableOpacity, ActivityIndicator, Image, Button, StatusBar} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import MapView,{PROVIDER_GOOGLE, Marker} from 'react-native-maps';
var GOOGLE_MAPS_APIKEY='AIzaSyCxn32kd619NS2s3S5fAxaO7BdntIP7zrc'
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet,{ useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import {getDistance,getPreciseDistance} from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Maps() {
    var [pin, setPin] = React.useState({
        latitude: 0,
        longitude: 0,
      });
    var [region, setRegion] = React.useState(null);
    const [Confirm, setConfirm] = React.useState(false);
    const [isFound, setFound] = React.useState(false);
    let[location, setLocation] = React.useState(null);
    let[finissh, setFinish] = React.useState(null);
    let[akun, setAkun] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
   
    const mapRef = useRef(null);
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ["5%", "20%"], []);
    const animationConfigs = useBottomSheetSpringConfigs({
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
      });
  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  useEffect(() => {
    (async () => {
        try {
            const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION )
          console.log(granted)
          const akun = await AsyncStorage.getItem('akun')
          setAkun(JSON.parse(akun))
          if (granted) {
    
            console.log( "You can use the ACCESS_FINE_LOCATION" )
            Geolocation.getCurrentPosition(
              (position) => {
                let region ={
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  heading:position.coords.heading,
                  latitudeDelta : 1 / 300,
                  longitudeDelta: 2 / 300
                }
                let pin = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                setPin(pin)
                setRegion(region)
                console.log(region)
              },
              (error) => {
                // See error code charts below.
                alert(error.message)
              },
              { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000, distanceFilter:100 }
          );
          Geolocation.watchPosition(
            (position) => {
              let region ={
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                heading:position.coords.heading,
                latitudeDelta : 1 / 300,
                longitudeDelta: 2 / 300
              }
             setRegion(region)
            },
            (error) => {
              // See error code charts below.
              alert(error.message)
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 2000, distanceFilter:100 }
        );
          } 
          else {
            console.log( "ACCESS_FINE_LOCATION permission denied" )
          }
          } catch (error) {
            console.error(error);
          }
    })();
  }, []);

  const storeData = async () => {
    var day =  new Date()
    let akunProgress = {
      nama : akun.akun.nama,
      selesai_lari: true,
      days : day.toLocaleDateString("en-US")
    }
    try {
          
         
    AsyncStorage.getItem('akunProgress')
    .then((contacts) => {
      const c = contacts ? akunProgress : [];
     
      AsyncStorage.setItem('akunProgress', JSON.stringify(c));
    
    });
    let person = await AsyncStorage.getItem('akunProgress')
   
    console.log(person)
   
    } catch (e) {
      // saving error
    }

    
  }
  const direct =()=>{
    if (isFound == true) {
        mapRef.current.fitToCoordinates([{latitude: region.latitude, longitude: region.longitude}, pin], {
            edgePadding: { top: 100, right: 10, bottom: 200, left: 10 },
            animated: true,
           }, 2000);
    }else{
        null
    }
   
  }
  const polyline =()=>{
    if (isFound == true) {
        return(<MapViewDirections
                      origin={{latitude:region.latitude, longitude:region.longitude}}
                      destination={pin}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={3}
                      strokeColor="rgb(0,139,241)"
                      resetOnChange={false} 
                      optimizeWaypoints={true}
                      precision="high"
                      />
        )
    }else{
        null
    }
   
  }
  const getDistances=()=>{
    let dis = getDistance(
        {latitude: region.latitude, longitude: region.longitude},
        {latitude: pin.latitude, longitude: pin.longitude},
    );
    return dis
  }
  if (region !=null) {
    return (
    
      <View style={styles.container}>
      <MapView 
    
    showsBuildings={true}
    followsUserLocation={true}
    showsScale={true}
    ref={mapRef}
  
    loadingEnabled={true}
    showsUserLocation={true}
    onLayout={direct()}
    initialRegion={region}
    provider={PROVIDER_GOOGLE}
    onMapReady={()=>{
      console.log( "You can use the ACCESS_FINE_LOCATION" )
      Geolocation.getCurrentPosition(
        (position) => {
          let region ={
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            heading:position.coords.heading,
            latitudeDelta : 1 / 300,
            longitudeDelta: 2 / 300
          }
          let pin = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
          }
          setPin(pin)
          setRegion(region)
          console.log(region)
        },
        (error) => {
          // See error code charts below.
          alert(error.message)
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000, distanceFilter:100 }
    );
    }}
    onMapLoaded={()=>{
      
    mapRef.current.animateToRegion(
      {
        latitude: region.latitude,
        longitude: region.longitude,
      
        latitudeDelta:1 / 300,
        longitudeDelta: 2 / 300
      },2000
      
    );
     }
    }
  
    style={styles.mapStyle}
   
  >
  <Marker
          draggable={isFound == true ? false: true}
          pinColor={'green'}
          title={"Tujuan Lari"}
          coordinate={pin}
      
          onDragEnd={e => {
            setPin(e.nativeEvent.coordinate);
            setConfirm(true)
          }} 
          onDrag={e =>{
              setConfirm(false)
          }}
          />
      {polyline()}
  </MapView>
  <View style={{width:Width, top:'60%', flex:1, justifyContent:'center'}} >
  <GestureHandlerRootView style={{  height:Height/2.2,width:Width, bottom:'7%',}}>
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          style={{bottom: '68%',}}
          handleIndicatorStyle={{backgroundColor:'#999',}}
        >
          {isFound == false ? <View style={{ backgroundColor:'#fff', height:Height, width:Width, borderRadius:30, elevation:10, padding:20}}>
            
            <Text style={{fontSize:18, color:'#000'}}>Tentukan tujuan larimu dengan menahan marker dan geser ! </Text>
            {Confirm == true ? <TouchableOpacity style={{padding:20, backgroundColor:'#92A3FD', borderRadius:20, marginTop:'5%'}} onPress={()=>{setFound(true)}}><Text style={{color:'#fff', fontWeight:'bold', textAlign:'center'}}>Confirm</Text></TouchableOpacity>
            :null}
            
          </View>: <View style={{ backgroundColor:'#fff', height:Height, width:Width, borderRadius:30, elevation:10, padding:20}}>
            {isFound == true ? <Text style={{fontSize:18, color:'#000'}}>Jarakmu dengan tujuan :{getDistances()} meter</Text>: null}
           
           <View style={{flexDirection:'row', justifyContent:'center'}}>
           {Confirm == true ? <TouchableOpacity style={{width:'30%',marginRight:'5%',alignSelf:'center',padding:15, backgroundColor:'#6070C6', borderRadius:20, marginTop:'15%'}} onPress={()=>{setFound(false)}}><Text style={{color:'#fff', fontWeight:'bold', textAlign:'center'}}>Batal</Text></TouchableOpacity>
            :null}
            <TouchableOpacity style={{width:'30%',marginLeft:'5%',alignSelf:'center',padding:15, backgroundColor:'#92A3FD', borderRadius:20, marginTop:'15%'}} onPress={()=>{storeData()}}><Text style={{color:'#fff', fontWeight:'bold', textAlign:'center'}}>Selesai</Text></TouchableOpacity>
            
           </View>
          
            
          </View> }
         
        </BottomSheet>
        </GestureHandlerRootView>
  </View>
      
         
      </View>
    )
  }else{
    <ActivityIndicator  style={styles.loading} size={100} />
  }
   
     

    
  } 
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#293462',
        justifyContent:'center',

        
      },
       mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position:'absolute'
     
    
      },
      loading: {
      
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