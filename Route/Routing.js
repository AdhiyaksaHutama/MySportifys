
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Route from './Route';
import SplashScreen from '../Components/SplashScreen';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Home from '../Components/Home'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStack } from './StackNavigator';
import * as React from 'react';
const Stack = createNativeStackNavigator()

export default function Routing() {
  const AuthContext = React.createContext();

    const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'SIGN_IN':
            return {
              ...prevState,
              isSignout: false,
              userToken: action.token,
            };
          case 'SIGN_OUT':
            return {
              ...prevState,
              isSignout: true,
              userToken: null,
            };
        }
      },
      {
        isLoading: true,
        isSignout: false,
        userToken: null,
      }
    );
    React.useEffect(() => {
        // Your code here
        const getData = async () => {
          let userToken;
            try {
              userToken = await AsyncStorage.getItem('tokenssss')
           
        
             
            } catch(e) {
              // error reading value
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        }
        getData()
        
      }, []);
      const authContext = React.useMemo(
        () => ({
          signIn: async (data) => {
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token', akun: data });
          },
          signOut: () => dispatch({ type: 'SIGN_OUT' }),
          signUp: async (data) => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
        }),
        []
      );
      return (
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
          <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen}  options={{headerShown:false }} />
          ) :state.userToken == null ? (
               <>
                <Stack.Screen name="SplashScreen" component={SplashScreen}  options={{headerShown:false }} />
                <Stack.Screen name="Login" component={Login}  options={{headerShown:false }} />
                <Stack.Screen name="Register" component={Register}  options={{headerShown:false }} /> 
              
              
               </>
             
            ) : (
              <>
                 <Stack.Screen name="Home" component={Route}  options={{headerShown:false }} />
              </>
            )}
          </Stack.Navigator>
          </NavigationContainer>
         
          </AuthContext.Provider>
      )
    }