import { Text, View, StyleSheet, ScrollView} from "react-native";
import Input from "../components/Input";
import { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import ImageToShow from "../components/ImageToShow";
import ShowCoupleStuf from "../components/ShowCoupleStuf";
import Button from "../components/Button";
import HobbiesPicker from "../components/HobbiesPicker";
import { useLayoutEffect } from 'react';
import DatePicker from "../components/DatePicker";

const ProfileScreen = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [username, setUsername] = useState('');
    const [isEdit,setIsEdit] = useState(false);
    const [selectedHobbies, setSelectedHobbies] = useState(['Reading', 'Traveling', 'Cooking']);
    const [languages, setLanguages] = useState(["Hebrew","English"]);
    const [date,setDate] = useState(new Date());


    const inputStyle = {backgroundColor:GlobalStyles.colors.nearWhite}
    const imageStyle = {flex:1,marginTop:32,width:150,height:150,borderRadius:75,alignItems: 'center',  justifyContent:'center' ,backgroundColor:GlobalStyles.colors.nearWhite}
    const imageRootStyle = { justifyContent:'center',alignItems:'center'}

    function handleLogout(){

    }
    function handleEditProfileClick(){
        setIsEdit(!isEdit);
    }
    function handleFriendsClick(){
      navigation.navigate("FriendsScreen");
    }
    function saveClickHandle(){
      setIsEdit(!isEdit);
    }

    useLayoutEffect(() => {
      if(isEdit){
        navigation.setOptions({
          tabBarStyle: { display: 'none' }, 
        });
    
        return () => {
         
          navigation.setOptions({
            tabBarStyle: { display: 'flex' }, 
          });
        };

      }
     
    }, [navigation,isEdit]);

  return (
    <ScrollView>
      {isEdit ?(<View style={styles.root}>
         <Text  style={styles.text}>Profile</Text>
         <ImageToShow imageUrl={null} imageStyle={imageStyle} rootStyle={imageRootStyle}/>
         <View style={styles.buttons}>
            <Button text="Save" handleClick={saveClickHandle} />
         </View>
         <Input setField={setEmail} field={email} LabelText="Email" placeholderText={email} inputStyle={inputStyle} editable={isEdit} />
         <Input setField={setUsername} field={username} LabelText="Username" placeholderText={username} inputStyle={inputStyle} editable={isEdit}/>
          <Input setField={setFirstName} field={FirstName} LabelText="First name" placeholderText={FirstName}  inputStyle={inputStyle} editable={isEdit}/>
          <Input setField={setLastName} field={LastName} LabelText="Last name" placeholderText={LastName}  inputStyle={inputStyle} editable={isEdit}/>
          <Input setField={setPhoneNumber} field={phoneNumber} LabelText="Phone number" placeholderText={phoneNumber}  inputStyle={inputStyle} editable={isEdit}/>
          <DatePicker date={date} setDate={setDate} title="Select day of birth"/>
          <HobbiesPicker selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies}  text="Select your hobbies:" array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}/>
          <HobbiesPicker selectedHobbies={languages} setSelectedHobbies={setLanguages} text="Select Languages:" array={["Hebrew","Arabic","English","Russin"]}/>
         
      </View>) 
      
      :(<View style={styles.root}>
        <Text  style={styles.text}>Profile</Text>
        <ImageToShow imageUrl={null} imageStyle={imageStyle} rootStyle={imageRootStyle}/>
        <View style={styles.buttons}>
           <Button text="Edit profile" handleClick={handleEditProfileClick} />
           <Button text="Friends" handleClick={handleFriendsClick}/>
        </View>
        <Input setField={setEmail} field={email} LabelText="Email" placeholderText="" inputStyle={inputStyle} editable={isEdit} />
        <Input setField={setUsername} field={username} LabelText="Username" placeholderText="" inputStyle={inputStyle} editable={isEdit}/>
         <Input setField={setFirstName} field={FirstName} LabelText="First name" placeholderText=""  inputStyle={inputStyle} editable={isEdit}/>
         <Input setField={setLastName} field={LastName} LabelText="Last name" placeholderText=""  inputStyle={inputStyle} editable={isEdit}/>
         <Input setField={setPhoneNumber} field={phoneNumber} LabelText="Phone number" placeholderText=""  inputStyle={inputStyle} editable={isEdit}/>
         <Input setField={setAge} field={age} LabelText="Age" placeholderText=""  inputStyle={inputStyle} editable={isEdit}/>
         <ShowCoupleStuf text="My Hobbies:" array={selectedHobbies}/>
         <ShowCoupleStuf text="My languages:" array={languages}/>
         <Button text="Logout" handleClick={handleLogout} />
     </View>)
       }
      
     
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
