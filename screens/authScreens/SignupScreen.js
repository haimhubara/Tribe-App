import { View ,StyleSheet,Text, ScrollView,Pressable} from 'react-native'
import Input from '../../components/Input';
import { useState } from 'react';
import InputPicker from '../../components/InputPicker';
import HobbiesPicker from '../../components/HobbiesPicker';
import { GlobalStyles } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import SelectImages from '../../components/SelectImages';
import Button from '../../components/Button';


const SignupScreen = () => {
  const navigation = useNavigation()


   const [email,setEmail] = useState('');
   const [confirmEmail,setConfirmEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [username, setUsername] = useState('');
   const [FirstName, setFirstName] = useState('');
   const [LastName, setLastName] = useState('');
   const [gender, setGender] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [age, setAge] = useState('');
   const [selectedHobbies, setSelectedHobbies] = useState([]);
   const [religion, setReligion] = useState('');
   const [language, setLanguage] = useState("");

   const [pickedImage1, setPickedImage1] = useState(null);
   const [pickedImage2, setPickedImage2] = useState(null);
   const [pickedImage3, setPickedImage3] = useState(null);
   const [pickedImage4, setPickedImage4] = useState(null);
   const [pickedImage5, setPickedImage5] = useState(null);
   const [pickedImage6, setPickedImage6] = useState(null);


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
      <Text  style={styles.text}>Sign up</Text>
      <Input setField={setEmail} field={email} LabelText="Email" placeholderText="Email" />
      <Input setField={setConfirmEmail} field={confirmEmail} LabelText="Confirm email" placeholderText="Confirm email"/>
      <Input setField={setPassword} field={password} LabelText="Password" placeholderText="Password"/>
      <Input setField={setConfirmPassword} field={confirmPassword} LabelText="Confirm password" placeholderText="Confirm password"/>
      <Input setField={setUsername} field={username} LabelText="Username" placeholderText="Enter username"/>
      <Input setField={setFirstName} field={FirstName} LabelText="First name" placeholderText="First name"/>
      <Input setField={setLastName} field={LastName} LabelText="Last name" placeholderText="Last name"/>
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
        <Input setField={setPhoneNumber} field={phoneNumber} LabelText="Phone number" placeholderText="Phone number"/>
        <Input setField={setAge} field={age} LabelText="Age" placeholderText="Age"/>
        <SelectImages
          pickedImage1={pickedImage1} setPickedImage1={setPickedImage1}
          pickedImage2={pickedImage2} setPickedImage2={setPickedImage2}
          pickedImage3={pickedImage3} setPickedImage3={setPickedImage3}
          pickedImage4={pickedImage4} setPickedImage4={setPickedImage4}
          pickedImage5={pickedImage5} setPickedImage5={setPickedImage5}
          pickedImage6={pickedImage6} setPickedImage6={setPickedImage6}
        />

        <HobbiesPicker selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies} text="Select your hobbies:" array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}/>
        <HobbiesPicker text="Select Languages:" array={["Hebrew","Arabic","English","Russin"]} selectedHobbies={language} setSelectedHobbies={setLanguage}/>
        <Button text="Sing Up" handleClick={handleSignup}/>
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
