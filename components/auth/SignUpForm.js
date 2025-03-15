import React, { useCallback, useReducer, useState } from 'react'
import Input from '../../components/Input'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SubmitButton from '../../components/buttons/SubmitButton'
import { GlobalStyles } from '../../constants/styles';
import InputPicker from '../InputPicker';
import DatePicker from '../DatePicker';
import { StyleSheet, Text } from 'react-native';
import HobbiesPicker from '../HobbiesPicker';
import { validateInput } from '../../util/actions/FormActions';


const SignUpForm = ({setNext,formValues,dispachFormValues, setFormUseStateValue}) => {

  const [date,setDate] = useState(new Date());
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const authNextHandle = () =>{
    setNext(prevState =>!prevState);
    setFormUseStateValue(formValues);
   
  }

  const inputChangeHandler = useCallback((inputId, inputValue) => {
    if (inputId === "password") {
      setPassword(inputValue);
      const confirmResult = validateInput("confirmPassword", confirmPassword, inputValue);
      dispachFormValues({
        type: 'IS VALID FORM',
        payload: { inputStatus: confirmResult, inputId: "confirmPassword", inputValue: confirmPassword }
      });
    }
  
    if (inputId === "confirmPassword") {
      setConfirmPassword(inputValue);
    }
  
    const result = validateInput(inputId, inputValue, password);
    dispachFormValues({
      type: 'IS VALID FORM',
      payload: { inputStatus: result, inputId, inputValue }
    });
  }, [dispachFormValues, password, confirmPassword]);
  

  return (
    <>
        <Text  style={styles.Header}>Sign up</Text>
        <Input 
           inputOption={{autoCapitalize:'none'}}
           label="First Name"
           iconName="user-o"
           IconPack={FontAwesome}
           onInuptChange={inputChangeHandler}
           id="firstName"
           error={formValues.values['firstName']}
           value={formValues.actualValues['firstName']}
        />

        <Input 
          inputOption={{autoCapitalize:'none'}}
          label="Last Name"
          iconName="user-o" 
          IconPack={FontAwesome}
          onInuptChange={inputChangeHandler}
          id="lastName"
          error={formValues.values['lastName']}
          value={formValues.actualValues['lastName']}
         />

        <Input 
          inputOption={{keyboardType:'email-address',autoCapitalize:'none'}}
          label="Email"
          iconName="mail"
          IconPack={Feather}
          onInuptChange={inputChangeHandler}
          id="email"
          error={formValues.values['email']}
          value={formValues.actualValues['email']}
        />
        
        <Input 
          inputOption={{autoCapitalize:'none',secureTextEntry:true}}
          label="Password"
          iconName="lock" 
          IconPack={Feather}
          onInuptChange={inputChangeHandler}
          id="password"
          error={formValues.values['password']}
          value={formValues.actualValues['password']}
        />

        <Input
            inputOption={{autoCapitalize:'none',secureTextEntry:true}} 
            label="Confirm Password"
            iconName="lock"
            IconPack={Feather}
            onInuptChange={inputChangeHandler}
            id="confirmPassword"
            error={formValues.values['confirmPassword']}
            value={formValues.actualValues['confirmPassword']}
           
        />
        <Input
          inputOption={{autoCapitalize:'none'}}
          label="Username" 
          iconName="user-o"
          IconPack={FontAwesome}
          onInuptChange={inputChangeHandler}
          id='userName'
          error={formValues.values['userName']}
          value={formValues.actualValues['userName']}
        />

        <Input 
         inputOption={{ keyboardType:"numeric"}}
         label="Phone Number"
         iconName="phone" 
         IconPack={Feather}
         onInuptChange={inputChangeHandler}
         id="phoneNumber"
         error={formValues.values['phoneNumber']}
         value={formValues.actualValues['phoneNumber']}
        />

        <InputPicker label="Gender" iconName="human-male-female" IconPack={MaterialCommunityIcons}
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
          onInuptChange={inputChangeHandler}
          id="gender"
          error={formValues.values['gender']}
          selectedValue={formValues.actualValues['gender']}
        />
       <InputPicker label="Religion" iconName="globe" IconPack={FontAwesome}
         options={[
          { label: 'Christianity', value: 'Christianity' },
          { label: 'Islam', value: 'Islam' },
          { label: 'Judaism', value: 'Judaism' },
          ]}
          onInuptChange={inputChangeHandler}
          id="religion"
          error={formValues.values['religion']}
          selectedValue={formValues.actualValues['religion']}
        />

        <DatePicker 
          label='Day of birth'
          iconName='date' 
          IconPack={Fontisto}   
          date={formValues.actualValues['date'] || date } 
          setDate={setDate}
          id='date'
          onInputChange={inputChangeHandler} 
          error={formValues.values['date']}
        />


        <Input 
           inputOption={{autoCapitalize:'none'}}
           label="Facebook (optional)"
           iconName="facebook"
           IconPack={Feather}
           onInuptChange={inputChangeHandler}
           id="facebook"
           error={formValues.values['facebook']}
        />
         <Input 
           inputOption={{autoCapitalize:'none'}}
           label="TikTok (optional)"
           iconName="logo-tiktok"
           IconPack={Ionicons}
           onInuptChange={inputChangeHandler}
           id="tiktok"
           error={formValues.values['tiktok']}
        />
        
        <Input 
           inputOption={{autoCapitalize:'none'}}
           label="Instagram (optional)"
           iconName="instagram"
           IconPack={FontAwesome}
           onInuptChange={inputChangeHandler}
           id="instagram"
           error={formValues.values['instagram']}
        />

         <HobbiesPicker
          
           text="Select your hobbies"
           array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}
           id='hobbies'
           onInuptChange={inputChangeHandler}
           value={formValues.actualValues['hobbies']}
           error={formValues.values['hobbies']}
        />
        <HobbiesPicker
         text="Select Languages"
         array={["Hebrew","Arabic","English","Russin"]} 
       
         id='languages'
         onInuptChange={inputChangeHandler}
         value={formValues.actualValues['languages']}
         error={formValues.values['languages']}
        /> 
       

        <SubmitButton 
          disabeld={!formValues.formStatus}
          style={{marginTop:20}}
          onPress={authNextHandle}
          title="Next" 
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

export default SignUpForm
