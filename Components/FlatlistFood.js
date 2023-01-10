

import { StyleSheet,StatusBar, Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, Button} from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Foods from './Foods';
export default function FlatListFood(props) {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [Food, setFood] = React.useState();
  const [getGender, setGender] = React.useState("");
  const [getWeight, setWeight] = React.useState(0);
  const [getTinggi, setTinggi] = React.useState(0);
  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    (async () => {

       setFood(props.route.params.food)
       console.log(Food)
    })();
  },);
  const Detail = (item) => {
    navigation.navigate('DetailFood',{food:item})
  };
  const renderItem = ({ item }) => (
    <View style={{flex:1, width:Width -(Width*0.1), height:150, padding:10, backgroundColor:'#fff',borderRadius:20,}}>
        <View style={{flexDirection:'row'}}>
        <Image source={item.image} style={{width:100, height:100, alignSelf:'center', resizeMode:'center', borderRadius:20, marginTop:'3%'}}/>
           <Text style={{marginLeft:'5%', marginTop:'3%', color:'#000'}}>{item.title}</Text>
        </View>
        <TouchableOpacity onPress={()=>Detail(item)} style={{alignSelf:'center', bottom:'25%', padding:10, backgroundColor:'#92A3FD', width:'40%', marginLeft:'15%', borderRadius:15}}><Text style={{textAlign:'center', fontWeight:'bold', color:'#fff'}}>View</Text></TouchableOpacity>
      
    </View>
   
  );
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
    
    <View style={{flex:1, alignSelf:'flex-start', marginTop:'15%', paddingBottom:50}}>
        <Text style={{fontSize:24, fontWeight:'bold', marginLeft:'5%',color:'#000'}}>{props.route.params.food[0].Category}</Text>
        <View style={{alignSelf:'center',marginLeft:'5%'}}>
        <FlatList
        data={Food}
 
        showsHorizontalScrollIndicator={false}
        style={{marginTop:'10%',}}
        overScrollMode={'always'}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return (
              <View
                  style={{
                  height:30,
                  width: 50,
               
                    
  
                  }}
              />
          );
      }}
        keyExtractor={item => item.id}
      />
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
