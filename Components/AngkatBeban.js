
import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar, Image} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import Carousel from 'react-native-reanimated-carousel';
import Datas from './Datas.js'
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WebView from 'react-native-webview';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
export default function AngkatBeban(props) {

  
  const navigation = useNavigation();
  const colors = [
    '#26292E',
    '#899F9C',
    '#B3C680',
    '#5C6265',
    '#F5D399',
    '#F1F1F1',
];
const [isVertical, setIsVertical] = React.useState(false);
const [isIndex, setIndex] = React.useState(0);
const [autoPlay, setAutoPlay] = React.useState(false);
const [pagingEnabled, setPagingEnabled] = React.useState(true);
const [snapEnabled, setSnapEnabled] = React.useState(true);
const progressValue = useSharedValue(0);
const[akun, setAkun] = React.useState(null);
useEffect(() => {
    (async () => {
      const getData = async()=>{
        const akun = await AsyncStorage.getItem('akun')
        setAkun(JSON.parse(akun))
      }
      getData()
       console.log(Datas[props.route.params.isIndex])
    })();
  }, []);
  const storeData = async () => {
    var day =  new Date()
    let akunProgress = {
      nama : akun.akun.nama,
      selesai_lari: true,
      selesai_lt: true,
      selesai_ab : true,
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
      <View style={{flex:1, marginTop:'10%'}}>
        <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center'}}>Workout</Text>
        <Text style={{fontSize:18, textAlign:'center',}}>{Datas[props.route.params.isIndex].jenis}</Text>
        <Text style={{fontSize:18, textAlign:'center', fontWeight:'bold'}}>{isIndex+1} / {Datas[props.route.params.isIndex].typewo.length}</Text>
      </View>
      <View style={{flex:7, marginBottom:'30%'}}>
      <GestureHandlerRootView>
      <Carousel
                loop
                width={Width}
                height={Height/1.5}
                autoPlay={false}
                data={Datas[props.route.params.isIndex].typewo}
                panGestureHandlerProps={{
                  activeOffsetX: [-10, 10],
                }}
                pagingEnabled={pagingEnabled}
                snapEnabled={snapEnabled}
                onProgressChange={(_, absoluteProgress) =>
                  (progressValue.value = absoluteProgress)
              }
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
            }}
         
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setIndex(index)}
                renderItem={({ item,index }) => (
                    <View
                        style={{
                            flex: 1,
                         
                         
                            backgroundColor:'#92A3FD',
                            width:Width,
                            elevation:10,
                            borderRadius:20
                          
                         
                        }}
                    >
                    <View style={{width:Width, height:200, borderRadius:30, backgroundColor:'#fff'}}>
                        <WebView
                       style={{
                        position:'absolute',
                        height: 200,
                        alignSelf:'center',
                        width: Width,
                        borderRadius:50,
                        
                      }}
                       source={{
                                  uri: `https://www.youtube.com/embed/${item.Video}?rel=0&autoplay=0&showinfo=0&controls=0`,
                              }}
                       javaScriptEnabled={true}
                    />
                    </View>
                   
                            <Text style={{fontSize:24, marginTop:'10%', marginLeft:'5%'}}>{item.titleWo}</Text>
                            <View style={{flexDirection:'row', marginLeft:'5%', marginTop:'10%'}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Set : </Text>
                                <Text style={{textAlign:'center', color:'#fff', fontSize:30, marginLeft:'32%', marginBottom:'1%', bottom:'1%'}}>{item.set}</Text>
                            </View>
                            <Image source={require('../assets/line.png')} style={{width:'100%'}}/>
                            <View style={{flexDirection:'row', marginLeft:'5%', marginTop:'10%'}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>Repetisi : </Text>
                                <Text style={{textAlign:'center', color:'#fff', fontSize:30, marginLeft:'20%', marginBottom:'1%', bottom:'1%'}}>{item.rep}</Text>
                            </View>
                            <Image source={require('../assets/line.png')} style={{width:'100%'}}/>
                           
                        
                   
                    </View>
                )}
            />
      </GestureHandlerRootView>
      <TouchableOpacity onPress={()=>storeData()}
      style={{padding:20, backgroundColor:'#6070C6', width:'50%', alignSelf:'center', borderRadius:20, marginTop:'3%'}}>
                            <View style={{flexDirection:'row'}}>
                            <Icon
                               name="checkmark-circle"
                               color='#fff'
                               size={20}
                               style={{marginHorizontal:'5%',}}
                             />
                            <Text style={{textAlign:'center', color:'#fff'}}>Tandai Selesai</Text>
                            </View>
                           
                            </TouchableOpacity>
      </View>
    
    </View>
  ); 
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow:'scroll',
    alignItems:'center',

    
  },
});
