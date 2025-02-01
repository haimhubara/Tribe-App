import { View ,StyleSheet,Text, ScrollView,Pressable} from 'react-native'
import Input from '../../components/Input';
import { useState, useEffect } from 'react';
import InputPicker from '../../components/InputPicker';
import HobbiesPicker from '../../components/HobbiesPicker';
import { GlobalStyles } from '../../constants/styles';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import SocialLinks from '../../components/SocialLinks';

const SignupScreen = ({route,navigation}) => {

   const [email,setEmail] = useState('');
   const [confirmEmail,setConfirmEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [username, setUsername] = useState('');
   const [FirstName, setFirstName] = useState('');
   const [LastName, setLastName] = useState('');
   const [gender, setGender] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [religion, setReligion] = useState('');
   const [selectedHobbies, setSelectedHobbies] = useState([]);
   const [languages, setLanguages] = useState([]);
   const [date,setDate] = useState(new Date());
   const [linkValues, setLinkValues] = useState({})


   


   

   function handleNext() {
    console.log(linkValues);
    navigation.navigate("UploadPhotos");
  }
 
  return (
  <ScrollView sytle = {styles.scroll}>
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
        <DatePicker date={date} setDate={setDate} title="Select day of birth"/>
        

        <HobbiesPicker selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies} text="Select your hobbies:" array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}/>
        <HobbiesPicker text="Select Languages:" array={["Hebrew","Arabic","English","Russin"]} selectedHobbies={languages} setSelectedHobbies={setLanguages}/>
        <SocialLinks setLinkValues={setLinkValues} linkValues={linkValues}  availableLinks={ ["Facebook", "Instagram", "Twitter"]} />
        <Button text="Next"handleClick={handleNext}/>
      
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
    scroll:{
      flex:1
    }
});

export default SignupScreen
