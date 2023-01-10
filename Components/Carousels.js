
import * as React from "react";

import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar, Image} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import Carousel from 'react-native-reanimated-carousel';
import Datas from './Datas.js'
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
export default function Carousels() {

  
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
const Confirm = () => {

  navigation.navigate(Datas[isIndex].route,{isIndex:isIndex})
};
  return (
    <View style={styles.container}>
      <StatusBar style="transparent" />
      <View style={{flex:1, marginTop:'10%'}}>
        <Text style={{fontSize:18, fontWeight:'bold', color:'#000'}}>Choose Workout</Text>
        <Text style={{fontSize:18, textAlign:'center', color:'#000'}}>{Datas[isIndex].jenis}</Text>
      </View>
      <View style={{flex:3, marginBottom:'20%'}}>
      <GestureHandlerRootView>
      <Carousel
                loop
                width={Width-(Width*0.2)}
                height={Height / 1.7}
                autoPlay={false}
                data={Datas}
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
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                         
                            justifyContent: 'center',
                            backgroundColor:'#92A3FD',
                            marginHorizontal:'3%',
                            elevation:10,
                            borderRadius:20
                          
                         
                        }}
                    >
                      <Image source={Datas[index].image} style={{alignSelf:'center'}}/>
                      <Text style={{textAlign:'center', marginTop:'5%', fontSize:18, fontWeight:'bold', color:'#fff'}}>{Datas[index].title}</Text>
                      <Text style={{textAlign:'center', marginTop:'5%', fontSize:16, color:'#fff', width:'90%', alignSelf:'center'}}>{Datas[index].body}</Text>
                    </View>
                )}
            />
      </GestureHandlerRootView>
      </View>
      <View style={{flex:2}}>
        <TouchableOpacity onPress={()=> Confirm()} style={{marginTop:'30%', padding:20, width:Width - (Width *0.3),backgroundColor:'#92A3FD', borderRadius:30}}><Text style={{fontSize:15, textAlign:'center', color:'#fff', fontWeight:'bold'}}>Confirm</Text></TouchableOpacity>
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
