

import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, StatusBar, ToastAndroid} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
export default function Register(props) {
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'}
  ]);
  const [ArrAkun, setAkun] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [tb, setTb] = useState('');
  const [bb, setBb] = useState('');
  const [jk, setJk] = useState('');
  const [path, setPath] = useState('');
  const navigation = useNavigation();
  const launchImageLibrarys = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
   
        setFilePath(response)
        
        setFileUri(response.assets[0].uri)
            console.log('response', response.assets[0]);
      }
    });

  }

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }
  const storeData = async () => {
    let value = {
      nama : fullName,
      email: email,
      password:Password,
      tinggi_badan:tb,
      berat_badan:bb,
      jenis_kelamin : jk,
      Image:fileUri
    }
    
    if (value.nama == '' || value.email == ''|| value.password == ''|| value.tinggi_badan == ''|| value.berat_badan == ''|| value.jenis_kelamin == ''|| value.Image == '') {
      ToastAndroid.show("Data Ada yang kosong", ToastAndroid.SHORT)
    }else{
      ToastAndroid.show("Data terisi, Creating Cridential ...", ToastAndroid.SHORT)
      
      
      setLoading(true)
     
      setTimeout(() => {
        
        try {
          
         
          AsyncStorage.getItem('arrayAkun')
      .then((contacts) => {
        const c = contacts ? JSON.parse(contacts) : [];
        c.push(value);
        AsyncStorage.setItem('arrayAkun', JSON.stringify(c));
    
      });
          setLoading(false)
          
          navigation.navigate('Login', {'paramPropKey': 'paramPropValue'})
       
        } catch (e) {
          // saving error
        }
        
      }, 3000);
      
     
    }
    
  }
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
      <Text style={{bottom:'4%', fontSize:15, textAlign:'center'}}>Hey There,</Text>
      <Text style={{bottom:'4%', fontWeight:'bold', fontSize:15, color:'#1A374D'}}>Create an Account</Text>
      <View style={{marginBottom:'15%', marginLeft:'5%'}}>
        
      <TextInput inputStyle={{color: 'red'}} onChangeText={(fn)=>setFullName(fn)} placeholder='Full Name' style={{color:'#green',backgroundColor:'#1A374D', width:Width- (Width* 0.2), padding:10, borderRadius:10,marginTop:'5%'}} />
      <TextInput  onChangeText={(text)=>setEmail(text)} placeholder='Email atau username' style={{backgroundColor:'#1A374D', width:Width- (Width* 0.2), padding:10, borderRadius:10, marginTop:'5%'}} />
      <TextInput secureTextEntry onChangeText={(text)=>setPassword(text)} placeholder='Password' style={{backgroundColor:'#1A374D', width:Width- (Width* 0.2), padding:10, borderRadius:10, marginTop:'5%'}}/>
      <View style={{flexDirection:'row', flex:1,}}>
      <TextInput onChangeText={(text)=>setTb(text)} placeholder='Tinggi Badan' keyboardType='numeric' style={{backgroundColor:'#1A374D', width:'42.5%', padding:10, borderRadius:10,marginTop:'5%',marginRight:'5%', marginLeft:'1%' }} />
      <TextInput onChangeText={(text)=>setBb(text)} placeholder='Berat Badan' keyboardType='numeric' style={{backgroundColor:'#1A374D', width:'42.9%', padding:10, borderRadius:10, marginTop:'5%', }} />
      </View>
      

      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      placeholder={'Jenis Kelamin'}
      dropDownContainerStyle={{ borderColor: '#707070',
      borderTopColor:'#B1D0E0',
      borderEndColor:'#B1D0E0',
      borderBottomColor:'#B1D0E0',
      borderStartColor:'#B1D0E0',
      borderTopWidth: 0.7,
      width: '84%',
      marginTop:'5%',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,}}
      style={{width:'84%', marginTop:'5%', borderColor:'#fff', zIndex:-10}}
      onSelectItem={(Text)=>setJk(Text.value)}
      setValue={setValue}
      setItems={setItems}
    />
  
     <TouchableOpacity onPress={()=>launchImageLibrarys()} style={{padding:20, backgroundColor:'#1A374D', width:Width-(Width*0.2), borderRadius:20, marginTop:'5%'}}  >
                <Text style={{textAlign:'center'}}>{fileUri == ''? 'Pilih Foto profile':'Foto Disimpan'}</Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>storeData()} style={{backgroundColor:'#406882', width:Width- (Width* 0.2), padding:15, borderRadius:10, marginBottom:'10%'}}><Text style={{textAlign:'center', fontWeight:'bold', color:'#fff'}}>Register</Text></TouchableOpacity>
          <ActivityIndicator animating={Loading} style={styles.loading} size={100} />
          <View style={{flexDirection:'row'}}>
      <Text style={{marginTop:'2%'}}>Already have an account ? </Text>
      <Text onPress={()=>navigation.navigate('Login')} style={{marginTop:'2%', marginLeft:'1%', fontWeight:'bold'}}>Login</Text>
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
