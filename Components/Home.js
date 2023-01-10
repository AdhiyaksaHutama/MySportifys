import { StyleSheet, Text, View, Dimensions, TouchableOpacity,StatusBar, ActivityIndicator, Image} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
var COLOR = '#FFF'
export default function Home({navigation}) {
  const { akuns } = useContext(AuthContext);
  const [akun, setAkun] = useState(null);
  const [progAB, setProgAB] = useState(false);
  const [progLT, setProgLT] = useState(false);
  const [progLR, setProgLR] = useState(false);
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function fetchMyAPI() {
      try {
       
        setAkun(akuns)
       
       
       
      } catch (error) {
         console.error(error);
      }
     
    }
    async function prog() {
      let person = await AsyncStorage.getItem('akunProgress')

      setProgAB(JSON.parse(person).selesai_ab)
      setProgLT(JSON.parse(person).selesai_lt)
      setProgLR(JSON.parse(person).selesai_lari)
      setDate(JSON.parse(person).days)
    }
    var day =  new Date()
    var days = day.toLocaleDateString("en-US")
    if (date != days ) {
      setProgAB(false)
      setProgLT(false)
      setProgLR(false)
    }
   
    prog()
    console.log(days, date, progAB)
    fetchMyAPI()
   
  },);
  const Load =()=>{
    return(
    <ActivityIndicator  size={50} />
    )
    
  }
  if (progAB == true ) {
      var COLOR = '#000'
  }
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
      <View style={{flexDirection:'row'}}>
          <View style={{flex:1, marginTop:'15%', marginLeft:'10%'}}>
            <Text style={{fontSize:20, color:'#000'}}>Hello, {akun == null ? Load():akun.akun.nama}</Text>
            
          </View>
      
      </View>
      <View style={{flex:1, alignItems:'center',}}>
          <View style={{backgroundColor:'#1A374D', width:Width-(Width*0.1), height: 192, marginTop:'0%', borderRadius:28}}>
              <Text style={{marginTop:'7%', marginLeft:'5%', color:'#FFFF', fontSize:20}}>BMI Calculator</Text>
              <Text style={{ marginLeft:'5%', color:'#FFFF', fontSize:12}}>(Body Mass Index)</Text>
              <Text style={{ marginTop:'2%',marginLeft:'5%', color:'#FFFF', fontSize:13}}>You have a normal weight</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Bmi',{akun:akun})} style={{padding:10,backgroundColor:'#B1D0E0', alignItems:'center', width:92, marginTop:'5%', marginLeft:'5%', borderRadius:18.5}}><Text style={{color:'#1A374D', fontSize:12, textAlign:'center'}}>Calculate</Text></TouchableOpacity>
          </View>
      </View>
     <View style={{flex:1}}>
        <View style={{marginHorizontal:'10%', bottom:'30%'}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16, color:'#000'}}>Todays Workout</Text>
          
          </View>
          <View style={{width:Width- (Width*0.2), height:'30%', backgroundColor:'#F2F0F0', marginTop:'5%', borderRadius:20, elevation:10, padding:10,}}>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../assets/ab.png')} style={{width:50, height:90, position:'absolute'}} />
              
              
            </View>
            <Text style={{marginLeft:'20%', color:'#000'}}>Angkat Beban</Text>
            <Text style={{marginLeft:'20%', color:'#000'}}>{progAB == false ? 'Belum Olahraga  !': 'Selamat sudah berolahraga'}</Text>
            <View style={ progAB== true?styles.BAR : styles.BUR}>
              <Text style={{textAlign:'center', color:'#000'}}>{progAB== true?'100%' : '0%'}</Text>
            </View>
          </View>
          <View style={{padding:10,width:Width- (Width*0.2), height:'30%', backgroundColor:'#F2F0F0', marginTop:'5%', borderRadius:20,elevation:10}}>
          <View style={{flexDirection:'row'}}>
              <Image source={require('../assets/lts.png')} style={{width:50, height:90, position:'absolute'}} />
           
            </View>
            <Text style={{marginLeft:'20%', color:'#000'}}>Lompat Tali</Text>
            <Text style={{marginLeft:'20%', color:'#000'}}>{progLT == false ? 'Belum Olahraga  !': 'Selamat sudah berolahraga'}</Text>
            <View style={progLT== true?styles.BAR : styles.BUR}>
            <Text style={{textAlign:'center', color:'#000'}}>{progLT== true?'100%' : '0%'}</Text>
            </View>
          </View>
          
          <View style={{padding:10,width:Width- (Width*0.2), height:'30%', backgroundColor:'#F2F0F0', marginTop:'5%', borderRadius:20,elevation:10}}>
          <View style={{flexDirection:'row'}}>
              <Image source={require('../assets/lari.png')} style={{width:70, height:90, position:'absolute'}} />
             
            </View>
            <Text style={{marginLeft:'20%' ,color:'#000'}}>Lari / Jogging</Text>
            <Text style={{marginLeft:'20%', color:'#000'}}>{progLR == false ? 'Belum Olahraga  !': 'Selamat sudah berolahraga'}</Text>
            <View style={progLR== true?styles.BAR : styles.BUR}>
            <Text style={{textAlign:'center', color:'#000',}}>{progLR== true?'100%' : '0%'}</Text>
            </View>
          </View>
        </View>
     </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow:'scroll'
    
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
    
  },
  BAR:{width:Width-(Width*0.4), justifyContent:'center',padding:1, backgroundColor:'#B1D0E0', position:'absolute', top:'80%', alignSelf:'center', marginLeft:'20%', left:'0%', borderRadius:20, borderColor:'#000', borderWidth:0, elevation:10},
  BUR:{width:Width-(Width*0.4),justifyContent:'center',padding:1,  backgroundColor:'#FFF', position:'absolute', top:'80%', alignSelf:'center', marginLeft:'20%', left:'0%', borderRadius:20, borderColor:'#000', borderWidth:1}
});
