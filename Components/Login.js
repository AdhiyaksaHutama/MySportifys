
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image, StatusBar,ActivityIndicator, ToastAndroid, Alert} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import { useNavigation,useIsFocused,useFocusEffect   } from '@react-navigation/native';
import { HomeStack } from '../Route/StackNavigator';
import { AuthContext } from '../Context/AuthContext';
export default function Login() {
  const { login } = React.useContext(AuthContext);
  const [ArrAkun, setAkun] = useState([]);
  const [email, setEmail] = useState('');
  const [tokens, setToken] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Password, setPassword] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const Login =() => {
   
    try {
       const tempEmail = ArrAkun.find(data => data.email == email).email
       const password = ArrAkun.find(data => data.password == Password).password
       const person = ArrAkun.find(data => data.email == email)

   if (email == tempEmail && Password == password) {
      console.log('Find it')
      
      let akun = {
        nama : person.nama,
        email : person.email,
        passwords : person.password,
        foto : person.Image,
        bb : person.berat_badan,
        tb : person.tinggi_badan,
        jk : person.jenis_kelamin
      }

      
   
      setLoading(true)
      ToastAndroid.show("Mencocokan datamu..", ToastAndroid.SHORT)
      setTimeout(() => {
        setLoading(false)
        login({akun})
       
      }, 2000);
   }
    } catch (error) {
      if (email == '' || Password == '' || email == undefined || Password == undefined) {
        ToastAndroid.show("Data Ada yang kosong", ToastAndroid.SHORT)
      }else{
        ToastAndroid.show("Email atau password salah", ToastAndroid.SHORT)
      }
     
    }
    
  };
  //JSON.parse(gate).find(data => data.nama == 'Sayang')
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const gate = await AsyncStorage.getItem('arrayAkun')
     
       
        setAkun([...JSON.parse(gate)])
        console.log(ArrAkun)
       
      } catch (error) {
         console.error(error);
      }
     
    }
    const  focusHandler = navigation.addListener('focus', async() => {

      console.log('Fokus')
      try {
        const gate = await AsyncStorage.getItem('arrayAkun')
     
       
        setAkun([...JSON.parse(gate)])
        console.log(ArrAkun.find(data => data.email == 'kicak').password)
       
      } catch (error) {
         console.error(error);
      }
      fetchMyAPI()
  });

   
    return focusHandler;
  

  }, [])
 
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
      <Image source={require('../assets/my.png')} style={{width:190, height:170}} />
      <TextInput onChangeText={(text)=>setEmail(text)} placeholder='Email atau username' style={{backgroundColor:'#1A374D', width:Width- (Width* 0.3), padding:10, borderRadius:10}} />
      <TextInput secureTextEntry onChangeText={(text)=>setPassword(text)} placeholder='Password' style={{backgroundColor:'#1A374D', width:Width- (Width* 0.3), padding:10, borderRadius:10, marginTop:'5%'}}/>
     <TouchableOpacity onPress={()=>Login()} style={{backgroundColor:'#406882', width:Width- (Width* 0.2), padding:15, borderRadius:10, marginTop:'15%',}}><Text style={{textAlign:'center', fontWeight:'bold', color:'#fff'}}>LOGIN</Text></TouchableOpacity>
     <View style={{flexDirection:'row'}}>
      <Text style={{marginTop:'5%'}}>Don't have an account ? </Text>
      <Text onPress={()=>navigation.navigate('Register')} style={{marginTop:'5%', marginLeft:'1%', fontWeight:'bold'}}>Register</Text>
     </View>
     <ActivityIndicator animating={Loading} style={styles.loading} size={100} />
     
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
