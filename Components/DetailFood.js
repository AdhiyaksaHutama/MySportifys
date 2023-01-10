

import { StyleSheet,StatusBar, Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, Button} from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet,{ useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
export default function DetailFood(props) {
  const [isFound, setFound] = React.useState(false);
  const [Food, setFood] = React.useState(props.route.params.food);
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["5%", "20%"], []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const renderItem = ({ item }) => (
    <View style={{flex:1, width:Width -(Width*0.1), height:150, padding:10, backgroundColor:'#fff',borderRadius:20,}}>
        <View style={{flexDirection:'row'}}>
        <Image source={item.image} style={{width:100, height:100, alignSelf:'center', resizeMode:'center', borderRadius:20, marginTop:'3%'}}/>
           <Text style={{marginLeft:'5%', marginTop:'3%',color:'#000'}}>{item.title}</Text>
        </View>
        <TouchableOpacity style={{alignSelf:'center', bottom:'25%', padding:10, backgroundColor:'#92A3FD', width:'40%', marginLeft:'15%', borderRadius:15}}><Text style={{textAlign:'center', fontWeight:'bold', color:'#fff'}}>View</Text></TouchableOpacity>
      
    </View>
   
  );
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
      <Image source={Food.image} style={{width:'100%', height:'50%'}}/>
      <View style={{flex:1}}>
        <View style={{width:Width, backgroundColor:'#fff', height:Height, bottom:'20%', borderTopStartRadius:30, borderTopEndRadius:30, padding:20}}>
          <Text style={{fontSize:20,color:'#000'}}>{Food.title}</Text>
          <Text style={{fontSize:15,color:'#000'}}>Category: {Food.Category}</Text>
          <Text style={{fontSize:15, marginTop:'5%', textAlign:'center',color:'#000'}}>{Food.difficulty}</Text>
          <Text style={{fontSize:20, marginTop:'5%', color:'#000'}}>Kandungan Gizi :</Text>
          <Text style={{fontSize:15, marginTop:'5%',color:'#000' }}>-. Lemak          :  {Food.lemak}</Text>
          <Text style={{fontSize:15, marginTop:'3%',color:'#000'}}>-. Protein         :  {Food.protein} </Text>
          <Text style={{fontSize:15, marginTop:'3%',color:'#000'}}>-. Karbohidrat :  {Food.karbohidrat}</Text>
          <Text style={{fontSize:15, marginTop:'3%', fontWeight:'bold',color:'#000' }}>-. Kalori           :  {Food.kalori}</Text>
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
    
    
  },
  header: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow:'scroll',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  passwordContainer: {
    flexDirection: 'row',

    marginTop:'15%',
    borderColor: '#000',
    borderRadius:15,
    backgroundColor:'#FFFCFC',
    elevation:10,
    padding: 10,
  },
  inputStyle: {
  
    width:Width - (Width *0.3)
  },
  button1:{
    width:80, height:100, backgroundColor:'#CA8FF8', alignItems:'center', justifyContent:'center', borderRadius:16, marginTop:'5%', marginLeft:'4.5%'
  },
  button2:{
    width:80, height:100, backgroundColor:'#758BFF', alignItems:'center', justifyContent:'center', borderRadius:16, marginTop:'5%', marginLeft:'4.5%'
  },
  textButton:{
    textAlign:'center', color:'#1D1617', marginTop:'5%'
  }
});
