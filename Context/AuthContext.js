import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
export const AuthContext = React.createContext();

export default function AuthProvider({children}){
    const [isLoading, setLoading] = React.useState(false)
    const [userToken, setToken] = React.useState(null)
    const [akuns, setAkuns] = React.useState(null)
   const login = (akun)=>{
    setLoading(true)
    setToken('konto')
    setAkuns(akun)
    AsyncStorage.setItem('akun', JSON.stringify(akun))
    AsyncStorage.setItem('userToken', 'konto')
    setLoading(false)
   }
   const logout = ()=>{
    setLoading(true)
    setToken(null)
    AsyncStorage.removeItem('userToken')
    setLoading(false)
   }
   const isLoggedIn = async()=>{
    try {
        setLoading(true)
        let userToken = await AsyncStorage.getItem('userToken')
        setLoading(false)
    } catch(e){
        console.log('Login Error')
    }
 
   }
   React.useEffect(() => {
    isLoggedIn()
    
    
  }, [])
    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken, akuns}}>
            {children}
        </AuthContext.Provider>
    )
}