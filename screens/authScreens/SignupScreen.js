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
   const [religion, setReligion] = useState('');



  return (
  <ScrollView>
     <View style={styles.root}>
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
        <InputPicker text="Religion" selectedValue={religion} onValueChange={setReligion}
          options={[
            { label: 'Christianity', value: 'Christianity' },
            { label: 'Islam', value: 'Islam' },
            { label: 'Judaism', value: 'Judaism' },
          ]}
        />
        <Input setField={setPhoneNumber} field={phoneNumber} text="Phone number"/>
        <Input setField={setAge} field={age} text="Age"/>
        <HobbiesPicker selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies} />

     </View>
   </ScrollView>
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
