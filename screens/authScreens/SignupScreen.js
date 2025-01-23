import { View ,StyleSheet,Text, ScrollView,Pressable} from 'react-native'
import Input from '../../components/Input';
import { useState } from 'react';
import InputPicker from '../../components/InputPicker';
import HobbiesPicker from '../../components/HobbiesPicker';
import { GlobalStyles } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = () => {
  const navigation = useNavigation()


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
   const [language, setLanguage]=useState("");


   function handleSignup() {
    console.log("Email:", email);
    console.log("Confirm Email:", confirmEmail);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Full Name:", fullName);
    console.log("Gender:", gender);
    console.log("Phone Number:", phoneNumber);
    console.log("Age:", age);
    console.log("Selected Hobbies:", selectedHobbies);
    console.log("Religion:", religion);
    console.log("Language:", language);
  }



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
        <HobbiesPicker selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies} text="Select your hobbies:" array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}/>
        <HobbiesPicker text="Select Languages:" array={["Hebrew","Arabic","English","Russin"]} selectedHobbies={language} setSelectedHobbies={setLanguage}/>
        <Pressable style={({pressed}) =>[styles.button,pressed? styles.clicked:null]} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sing Up</Text>
        </Pressable>
        <Text style={styles.signupText}>
        Already have an account?
        <Pressable onPress={() => {navigation.navigate("SingIn")}}>
          <Text style={styles.loginText}>  Login</Text>
        </Pressable>
      </Text>
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
    button: {
      margin:16,
      marginTop: 24,
      borderRadius:17,
      backgroundColor:GlobalStyles.colors.mainColor,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    clicked:{
      opacity:0.75
    },
    signupText: {
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 20, 
      lineHeight: 24, 
    },
    loginText: {
      color: GlobalStyles.colors.mainColor,
      fontWeight: 'bold',
    },
});

export default SignupScreen
