import React, { useCallback } from 'react'
import Input from '../../components/Input'
import Feather from '@expo/vector-icons/Feather';
import SubmitButton from '../../components/buttons/SubmitButton'
import { GlobalStyles } from '../../constants/styles';
import { StyleSheet, Text } from 'react-native';
import { validateInput } from '../../util/actions/FormActions';
import { useReducer } from 'react';
import { signin } from '../../util/actions/AuthAction';
import { signInReducer } from '../../util/reducers/AuthReducer';


const initialState = {
    values:{
      email:false,
      password:false
    },
    actualValues:{
      email:"",
      password:""
    },
    formState:false
}




const SignInForm = () => {
 const [formValues, dispachFormValues] = useReducer(signInReducer,initialState);

 const SingInHandle = ()=>{
    signin(formValues.actualValues.email,formValues.actualValues.password);
 }
  
 
 const inputChangeHandler =  useCallback((inputId,inputValue) =>{
  const result = validateInput(inputId,inputValue)
  dispachFormValues({stateOfValue:result, inputId, inputValue})
  },[dispachFormValues])

  return (
    <>
        <Text  style={styles.Header}>Sign In</Text>
        <Input 
         inputOption={{keyboardType:'email-address',autoCapitalize:'none'}}
         error={formValues.values["email"]} 
         onInuptChange={inputChangeHandler} 
         id="email" 
         label="Email"
         iconName="mail" 
         IconPack={Feather}
       />

        <Input
          inputOption={{autoCapitalize:'none',secureTextEntry:true}}
          error={formValues.values["password"]}
          onInuptChange={inputChangeHandler}
          id="password"
          label="Password"
          iconName="lock" 
          IconPack={Feather}
        />

        <SubmitButton 
          disabeld={!formValues.formState}
          style={{marginTop:20}} 
          onPress={SingInHandle}
          title="Sign In" 
          color={GlobalStyles.colors.mainColor}
        />
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
