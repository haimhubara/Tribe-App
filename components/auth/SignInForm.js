import React from 'react'
import Input from '../../components/Input'
import Feather from '@expo/vector-icons/Feather';
import SubmitButton from '../../components/buttons/SubmitButton'
import { GlobalStyles } from '../../constants/styles';
import { StyleSheet, Text } from 'react-native';


const SignInForm = () => {
  return (
    <>
        <Text  style={styles.Header}>Sign In</Text>
        <Input label="Email" iconName="mail" IconPack={Feather}/>
        <Input label="Password" iconName="lock" IconPack={Feather}/>
        <SubmitButton style={{marginTop:20}} onPress={()=>{}} title="Sign In" color={GlobalStyles.colors.mainColor}/>
  </>
       
  )
}

const styles = StyleSheet.create({
  Header:{
    textAlign:'center',
    fontSize:32,
    fontFamily:'bold',
    letterSpacing:0.3,
    color:GlobalStyles.colors.textColor,
  }
})

export default SignInForm
