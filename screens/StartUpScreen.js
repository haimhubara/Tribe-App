import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { authenticate, setDidTryAutoLogin } from '../store/authSlice';
import { getUserData } from '../util/actions/userAction'; 
import { GlobalStyles } from '../constants/styles';

const StartUpScreen = () => {

    const dispach = useDispatch();

    useEffect(()=>{
        const tryLogin = async () => {
            const storageAuthInfo = await AsyncStorage.getItem("userData");
            if(!storageAuthInfo){
                dispach(setDidTryAutoLogin());
                return;
            }
            const parsedData = JSON.parse(storageAuthInfo);
            const { token , userId, expiryDate:expiryDateString } = parsedData;
            const expiryDate = new Date(expiryDateString);
            if(expiryDate <= new Date() || !token || !userId){
                dispach(setDidTryAutoLogin());
                return;
            }
            const userData = await getUserData(userId)
            dispach(authenticate({token:token, userData}));
        };
        tryLogin();
    },[dispach]);
  return (
    <View style={{flex:1, justifyContent:"center",alignItems:'center'}}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.primary}/>
    </View>
  )
}

export default StartUpScreen
