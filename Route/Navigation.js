import { AkunStack } from "./StackNavigator"
import Route from "./Route"
import { NavigationContainer } from "@react-navigation/native"
import * as React from 'react';
import { AuthContext } from "../Context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator ,StyleSheet, Dimensions} from "react-native";
import SplashScreen from "../Components/SplashScreen";
const Height = Dimensions.get('window').height;
export function Navigation() {
    const {isLoading, userToken} = React.useContext(AuthContext)
    const [timepassed, setTimePassed] = React.useState(false)
    if (isLoading) {
        <ActivityIndicator animating={isLoading} size={100} />
    }
    React.useEffect(() => {

        setTimeout(() => {
            setTimePassed(!timepassed)
        }, 2000);
       
      }, []);
      if (!timepassed) {
        return(
            <SplashScreen/>
        )
      
      } else {
        return(
        
            userToken !== null?<Route/>:<AkunStack/>
            
          
    
    )
      }
   
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B1D0E0',
      overflow:'scroll',
      alignItems:'center',
      justifyContent:'center'
      
    },
   
  });
  