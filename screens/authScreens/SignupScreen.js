import { View ,StyleSheet,Text, ScrollView} from 'react-native'
import Input from '../../components/Input';
import { useState } from 'react';
import InputPicker from '../../components/InputPicker';
import HobbiesPicker from '../../components/HobbiesPicker';


const SignupScreen = () => {
   const [email,setEmail] = useState('');
   const [confirmEmail,setConfirmEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [fullName, setFulName] = useState('');
   const [gender, setGender] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [age, setAge] = useState('');
   const [selectedHobbies, setSelectedHobbies] = useState([]);




   const handleHobbyChange = (itemValue) => {
    setSelectedHobbies((prevState) => {
  
      if (prevState.includes(itemValue)) {
        return prevState.filter(hobby => hobby !== itemValue);
      }
     
      return [...prevState, itemValue];
    });
  };

  return (
   <View style={styles.root}>
    <ScrollView>
      <Text  style={styles.text}>Sign up:</Text>
      <Input setField={setEmail} field={email} text="Email"/>
      <Input setField={setConfirmEmail} field={confirmEmail} text="Confirm email"/>
      <Input setField={setPassword} field={password} text="Password"/>
      <Input setField={setConfirmPassword} field={confirmPassword} text="Confirm password"/>
      <Input setField={setFulName} field={fullName} text="Full name"/>
      <InputPicker text="Gender" selectedValue={gender} onValueChange={setGender}
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
        />
        <Input setField={setPhoneNumber} field={phoneNumber} text="Phone number"/>
        <Input setField={setAge} field={age} text="Age"/>
        <HobbiesPicker selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies} text="Select your hobbies:" array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}/>

      </ScrollView>
   </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop:32
  },
  text:{
    textAlign:'center',
    fontSize:32,
    fontWeight:'bold'
  },
});

export default SignupScreen
