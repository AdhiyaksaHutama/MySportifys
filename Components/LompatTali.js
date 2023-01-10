

import { StyleSheet,StatusBar, Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, Button} from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LompatTali(props) {
 
  
 
  const [isMinutes, setMinutes] = useState(3);
  const [isSeconds, setSeconds] = useState(59);
  const [countdown, setCountdown] = useState(59);
  const [isCalories, setCalories] = useState(0);
  const [isStart, setStart] = useState(false);
  const[akun, setAkun] = React.useState(null);
  const inc = () => {

    setCalories(isCalories => isCalories + 2);

    setCountdown(countdown => countdown + 10)
    if (countdown > 45) {
        setCountdown(countdown => countdown + 10 - 60)
        setMinutes(isMinutes + 1)
    }   
  };
  const dec = () => {

 
    setCalories(isCalories => isCalories - 2);

    setCountdown(countdown => countdown - 10)
    if (countdown < 10) {
        
        setCountdown(countdown => (countdown - 10) + 70)
        setMinutes(isMinutes - 1)
        if (isMinutes <= 0 && isSeconds <= 10) {
            setMinutes(0)
            setCountdown(0)
        }
        
    }
    
  };
  const updateTime = () => {
    var token = null;
    setStart(true)
    if (isStart == true) {
      setTimeout(() => {
        if (isSeconds <= 0) {
          setSeconds(59);
          setMinutes(isMinutes => isMinutes - 1);
          
        
        } else {
           
          setSeconds(isSeconds => isSeconds - 1);
         
        }
      }, 1000);
       
    }else{
      clearTimeout(token);
    }
    
      
       
      
    
  };
 
useEffect(() => {
  console.log(isStart)
    const getData = async()=>{
      const akun = await AsyncStorage.getItem('akun')
      setAkun(JSON.parse(akun))
    }
    getData()
    const intervalID = setInterval( () => {
      setCountdown(prev => {
      
        if( prev <= 2 && isMinutes > 0) setMinutes(isMinutes => isMinutes - 1),setCountdown(59)
        if (prev <2  && isMinutes == 0 ) clearInterval(intervalID), setCountdown(0);
        
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalID);
  
 
}, []);

const storeData = async () => {
  var day =  new Date()
  let akunProgress = {
    nama : akun.akun.nama,
    selesai_lari: true,
    selesai_lt: true,
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
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
     
    <View style={{flex:1,}}>
        <Image source={require('../assets/lts.png')} style={{width:316, height:415, marginTop:'5%', alignSelf:'center'}}/>
       <View style={{width:Width, height:Height, backgroundColor:'#fff', borderTopStartRadius:30, borderTopEndRadius:30, padding:15}}>
       <Text style={{fontSize:20, textAlign:'center', fontWeight:'bold', color:'#000' }}>Workout </Text>
       <Text style={{fontSize:15, textAlign:'center', color:'#000' }}>Lompat Tali </Text>
       <Text style={{color:'#000',top:'1%'}}>Est Burned Calories: {isCalories} </Text>
       <View style={{flexDirection:'row', marginTop:'3%'}}>
       <Text style={{textAlign:'center', color:'#000', alignSelf:'center', fontSize:20, marginLeft:'3%'}}>Minutes :</Text>
        <Text style={{textAlign:'center', color:'#000', alignSelf:'center', fontSize:20, marginLeft:'3%'}}>{isMinutes}</Text>
        <Text style={{textAlign:'center', color:'#000', alignSelf:'center', fontSize:20, marginLeft:'3%'}}>Seconds :</Text>
        <Text style={{textAlign:'center', color:'#000', alignSelf:'center', fontSize:20, marginLeft:'3%'}}>{countdown}</Text>
       
       </View>  
       <View style={{flexDirection:'row', paddingRight:10, marginTop:'5%'}}>
       <TouchableOpacity onPress={()=> inc()} style={{padding:20, backgroundColor:'#758BFF', borderRadius:15}}><Text style={{color:'#fff'}}>+10</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>storeData()}  style={{padding:20,width:'50%', backgroundColor:'#758BFF' ,borderRadius:15,marginLeft:'10%', alignSelf:'center'}}><Text style={{color:'#fff', textAlign:'center'}}>Finish</Text></TouchableOpacity>
       <TouchableOpacity onPress={dec} style={{padding:20, backgroundColor:'#758BFF', borderRadius:15,marginLeft:'5%'}}><Text style={{color:'#fff'}}>-10</Text></TouchableOpacity>
       </View>
       
       <View style={{marginTop:'10%'}}>
       
       </View>
       <View style={{flexDirection:'row', marginTop:'10%', justifyContent:'center'}}>
     
     
       </View>
       
       </View>
    
      </View>
    </View>
  ); 
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#92A3FD',
    overflow:'scroll',
    alignItems:'center',
    justifyContent:'center',
    
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
