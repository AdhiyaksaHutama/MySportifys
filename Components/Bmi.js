

import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image, StatusBar, Button} from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Modal from "react-native-modal";
import * as React from "react";
export default function Bmi(props) {
  const { akuns } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [akun, setakun] = React.useState(props.route.params.akun);
  const [bmi, setbmi] = React.useState(0);
  const [kategori, setKategori] = React.useState(null);
  const [getTinggi, setTinggi] = React.useState(0);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  function getRectArea() {
    bb = parseInt( akun.akun.bb)
    tb = parseInt( akun.akun.tb)/100
    rumus = bb /(tb*tb)
    if (rumus < 18.5) {
      setKategori('Underweight')
    }
    if (rumus >=18.5 && rumus <= 24.9) {
        setKategori('Normal')
    }
    if (rumus >=25 && rumus <= 29.9) {
      setKategori('Overweight')
  }
  if (rumus > 30) {
    setKategori('Obesitas')
  }
    return rumus.toFixed(1)
  }
  
  React.useEffect(() => {
    
    setbmi(getRectArea())
    console.log( getRectArea())
  
  },[]);
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
      <View style={{flex:1, alignSelf:'flex-start', marginTop:'20%', marginLeft:'10%'}}>
        <Text style={{fontSize:15, fontWeight:'bold'}}>Your BMI</Text>
        <View style={{width:Width - (Width*0.2), backgroundColor:'#1A374D', height:150, marginTop:'5%', borderRadius:20, paddingHorizontal:30}}>
          <Text style={{marginTop:'5%', color:'#fff'}}>Score</Text>
          <Text style={{color:'#9DCEFF', textAlign:'center', fontSize:40, marginTop:'5%'}} >{bmi}</Text>
          <Text style={{marginTop:'3%', color:'#fff', textAlign:'center'}}>{kategori}</Text>
        </View>

        
        <View style={{position:'relative', marginTop:'15%'}}>
          <Text style={{fontSize:24, fontWeight:'bold', marginLeft:'3%', top:'10%'}}>Body Index</Text>
          <View style={{flexDirection:'row'}}>
            <View style={{width:Width-(Width *0.65), height:151, backgroundColor:'#1A374D', borderRadius:16, paddingHorizontal:15, marginTop:'20%'}}>
              <Text style={{marginTop:'10%', color:'#fff'}}>Weight</Text>
              <Image source={require('../assets/berat.png')} style={{width:52, height:52, marginTop:'10%'}}/>
              <Text style={{color:'#9DCEFF', textAlign:'center', fontSize:24, marginTop:'5%'}} >{akun.akun.bb} kg</Text>
            </View>
            <View style={{width:Width-(Width *0.65), height:151, backgroundColor:'#1A374D', borderRadius:16, paddingHorizontal:15,marginLeft:'10%',marginBottom:'10%', bottom:'10%', }}>
              <Text style={{marginTop:'20%', color:'#fff', alignSelf:'flex-start'}}>Gender</Text>
            
              <Text style={{color:'#9DCEFF', textAlign:'center', fontSize:36, marginTop:'5%',}} >{akun.akun.jk}</Text>
            </View>
            
          </View>
          <View style={{width:Width-(Width *0.65), height:151, backgroundColor:'#1A374D', borderRadius:16, paddingHorizontal:15,marginRight:'3%', alignSelf:'flex-end', bottom:'18%'}}>
              <Text style={{marginTop:'20%', color:'#fff'}}>Tinggi Badan</Text>
              
              <Text style={{color:'#9DCEFF', textAlign:'center', fontSize:25, marginTop:'5%',}} >{akun.akun.tb}cm</Text>
            </View>
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
  header: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow:'scroll',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
});
