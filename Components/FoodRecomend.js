

import { StyleSheet,StatusBar, Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, Button} from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import Foods from './Foods';
export default function FoodRecomend({navigation}) {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [recomend, setRecomend] = React.useState();
  const [getGender, setGender] = React.useState("");
  const [getWeight, setWeight] = React.useState(0);
  const [getTinggi, setTinggi] = React.useState(0);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    (async () => {
       let pie = Foods.filter(data => data.Category == "Pie")
       let cake = Foods.filter(data => data.Category == "Cake")
       let Salad = Foods.filter(data => data.Category == "Salad")
       let smoothies = Foods.filter(data => data.Category == "Smoothies")
       
       const recomends = [pie[0],cake[0], Salad[0], smoothies[0]]
       setRecomend(recomends)
       console.log(recomend)
    })();
  }, []);
   const Cake = () => {
    let cake = Foods.filter(data => data.Category == "Cake")
    navigation.navigate('FlatlistFood',{food:cake})
  };
  const Pie = () => {
    let food = Foods.filter(data => data.Category == "Pie")
    navigation.navigate('FlatlistFood',{food:food})
  };
  const Salad = () => {
    let food = Foods.filter(data => data.Category == "Salad")
    navigation.navigate('FlatlistFood',{food:food})
  };
  const Smoothies = () => {
    let food = Foods.filter(data => data.Category == "Smoothies")
    navigation.navigate('FlatlistFood',{food:food})
  };
  const renderItem = ({ item }) => (
    <View style={{flex:1, width:200, height:239, padding:10, backgroundColor:'#fff',borderRadius:20, justifyContent:'center'}}>
      <Image source={item.image} style={{width:Width-(Width*0.51), height:'60%', alignSelf:'center', resizeMode:'center', borderRadius:20, bottom:'13%'}}/>
      <Text style={{textAlign:'center', bottom:'5%',color:'#000'}}>{item.title}</Text>
      <Text style={{marginTop:'5%', fontSize:12, textAlign:'center',bottom:'5%',color:'#000'}}>{item.difficulty}</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('DetailFood',{food:item})} style={{padding:10, backgroundColor:'#758BFF', width:'60%', alignSelf:'center', borderRadius:15}}><Text style={{color:'#fff',textAlign:'center'}}>View</Text></TouchableOpacity>
    </View>
   
  );
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
    
    <View style={{flex:1, alignSelf:'flex-start', marginTop:'8%'}}>
        <Text style={{fontSize:24, fontWeight:'bold', marginLeft:'5%', color:'#000'}}>Category</Text>
        <View style={{flexDirection:'row', paddingRight:10}}>
            <TouchableOpacity style={styles.button1} onPress={()=>Cake()}>
                <View style={{justifyContent:'center'}}>
                    <Image source={require('../assets/cake1.png')}/>
                    <Text style={styles.textButton}>Cake</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={()=>Salad()}>
                <View style={{justifyContent:'center'}}>
                    <Image source={require('../assets/salad.png')}/>
                    <Text style={styles.textButton}>Salad</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={()=>Pie()}>
                <View style={{justifyContent:'center'}}>
                    <Image source={require('../assets/cake.png')}/>
                    <Text style={styles.textButton}>Pie</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={()=>Smoothies()}>
                <View style={{justifyContent:'center'}}>
                    <Image source={require('../assets/jeruk.png')} style={{alignSelf:'center'}}/>
                    <Text style={styles.textButton}>Smoothies</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>

    <View style={{flex:3, alignSelf:'flex-start', marginTop:'20%', paddingHorizontal:20}}>
        <Text style={{fontSize:24, fontWeight:'bold',  color:'#000', marginTop:'5%'}}>Recomendation for Diet</Text>
        <FlatList
        data={recomend}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginTop:'10%',}}
        overScrollMode={'always'}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return (
              <View
                  style={{
                  height:20,
                  width: 30,
                    
  
                  }}
              />
          );
      }}
        keyExtractor={item => item.id}
      />
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
    width:Width-(Width*0.8), height:100, backgroundColor:'#CA8FF8', alignItems:'center', justifyContent:'center', borderRadius:16, marginTop:'5%', marginLeft:'4.5%'
  },
  button2:{
    width:Width-(Width*0.8), height:100, backgroundColor:'#758BFF', alignItems:'center', justifyContent:'center', borderRadius:16, marginTop:'5%', marginLeft:'4.5%'
  },
  textButton:{
    textAlign:'center', color:'#1D1617', marginTop:'5%'
  }
});
