import React, { useCallback,useState,useEffect } from 'react'
import Input from '../../components/Input'
import Feather from '@expo/vector-icons/Feather';
import SubmitButton from '../../components/buttons/SubmitButton'
import { GlobalStyles } from '../../constants/styles';
import { StyleSheet, Text } from 'react-native';
import { validateInput } from '../../util/actions/FormActions';
import { useReducer } from 'react';
import { signin } from '../../util/actions/AuthAction';
import { signInReducer } from '../../util/reducers/AuthReducer';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';


const isTestMode = true;


const initialState = {
    values:{
      email: isTestMode,
      password: isTestMode
    },
    actualValues:{
      email: isTestMode ? "moti@gmail.xom" : "",
      password: isTestMode ? "12345678" : ""
    },
    formState:isTestMode
}




const SignInForm = () => {
  const dispach = useDispatch();


  const [error,setError] = useState();
  const [isLoading,setIsLoading] = useState(false);
  
  const [formValues, dispachFormValues] = useReducer(signInReducer,initialState);

  const SingInHandle = useCallback ( async() => {
    try{
      setIsLoading(true);

      const action = signin(
        formValues.actualValues.email,
        formValues.actualValues.password
      );

      setError(null);
      await dispach(action);

    }catch(error){
      setError(error.message);
      setIsLoading(false);

    }
  },[dispach, formValues]);

  
  useEffect(() => {
    if(error){
      Alert.alert("An error occured",error);
    }
 },[error])
    
 
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
         value={formValues.actualValues.email}
         IconPack={Feather}
       />

        <Input
          inputOption={{autoCapitalize:'none',secureTextEntry:true}}
          error={formValues.values["password"]}
          onInuptChange={inputChangeHandler}
          id="password"
          label="Password"
          iconName="lock" 
          value={formValues.actualValues.password}
          IconPack={Feather}
        />

         {isLoading ? 
            (<ActivityIndicator
               size={'small'}
                color={GlobalStyles.colors.mainColor}
                style={{marginTop:10}}
            />)
             :(
               <SubmitButton 
                 disabeld={!formValues.formState}
                  style={{marginTop:20, width:'100%'}}
                  onPress={SingInHandle}
                  title="Sign In" 
                  color={GlobalStyles.colors.mainColor}
              /> )}
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
