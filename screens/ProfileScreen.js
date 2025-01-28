import { Text, View, StyleSheet, ScrollView} from "react-native";
import Input from "../components/Input";
import { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import ImageToShow from "../components/ImageToShow";
import ShowCoupleStuf from "../components/ShowCoupleStuf";
import Button from "../components/Button";

const ProfileScreen = () => {
    const [email,setEmail] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [editable,setEditable] = useState(false);
    const [username, setUsername] = useState('');

    const inputStyle = {backgroundColor:GlobalStyles.colors.nearWhite}
    const imageStyle = {width:150,height:150,borderRadius:75,alignItems: 'center',  justifyContent:'center' ,backgroundColor:GlobalStyles.colors.nearWhite}
    const imageRootStyle = { justifyContent:'center',alignItems:'center'}

    function handleLogout(){

    }
    function handleEditProfileClick(){

    }
    function handleFriendsClick(){

    }
   

  return (
    <ScrollView>
      <View style={styles.root}>
         <Text  style={styles.text}>Profile</Text>
         <ImageToShow imageUrl={null} imageStyle={imageStyle} rootStyle={imageRootStyle}/>
         <View style={styles.buttons}>
            <Button text="Edit profile" handleClick={handleEditProfileClick} />
            <Button text="Friends" handleClick={handleFriendsClick}/>
         </View>
         <Input setField={setEmail} field={email} LabelText="Email" placeholderText="" inputStyle={inputStyle} editable={editable} />
         <Input setField={setUsername} field={username} LabelText="Username" placeholderText="" inputStyle={inputStyle} editable={editable}/>
          <Input setField={setFirstName} field={FirstName} LabelText="First name" placeholderText=""  inputStyle={inputStyle} editable={editable}/>
          <Input setField={setLastName} field={LastName} LabelText="Last name" placeholderText=""  inputStyle={inputStyle} editable={editable}/>
          <Input setField={setPhoneNumber} field={phoneNumber} LabelText="Phone number" placeholderText=""  inputStyle={inputStyle} editable={editable}/>
          <Input setField={setAge} field={age} LabelText="Age" placeholderText=""  inputStyle={inputStyle} editable={editable}/>
          <ShowCoupleStuf text="My Hobbies:" array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}/>
          <ShowCoupleStuf text="My languages:" array={["Hebrew","English"]}/>
          <Button text="Logout" handleClick={handleLogout} />
      </View>
     
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop:32,
  },
  text:{
    textAlign:'center',
    fontSize:32,
    fontWeight:'bold',
  },
  label: {
    fontSize: 16,
    color: '#333', 
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    backgroundColor: '#fff', 
    fontSize: 16,
  },
  buttons:{
    flexDirection:"row",
    justifyContent:'center'
  }
 
});

export default ProfileScreen;
