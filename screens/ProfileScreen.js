import { Text, View, StyleSheet, ScrollView, Linking} from "react-native";
import Input from "../components/Input";
import { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import ShowCoupleStuf from "../components/ShowCoupleStuf";
import Button from "../components/Button";
import HobbiesPicker from "../components/HobbiesPicker";
import DatePicker from "../components/DatePicker";
import SwapImages from "../components/swapImages/SwapImages";
import { SafeAreaView } from "react-native-safe-area-context";


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
   

    
    const [imagesEditing, setImagesEditing] = useState(true);
   
    
   
    
    const inputStyle = {backgroundColor:GlobalStyles.colors.nearWhite}
    

    const [links, setLinks] = useState({
      "Facebook": "https://www.facebook.com",
      "Instagram": "https://www.instagram.com",
      "Twitter": "https://www.twitter.com"
    });

    const openLink = (url) => {
      let validUrl = url.startsWith("http") ? url : `https://${url}`;
      Linking.openURL(validUrl).catch(err => console.error("Couldn't load page", err));
    };

    function handleLogout(){

    }
   
    
    const handleLinkChange = (linkName, value) => {
      setLinks(prevLinks => ({
        ...prevLinks,
        [linkName]: value
      }));
    };
    function handleEditProfileClick(){
        setIsEdit(!isEdit);
    }
    function handleFriendsClick(){
      navigation.navigate("FriendsScreen");
    }
    function saveClickHandle(){
      setIsEdit(!isEdit);
    }
    function saveImagesHandle(){
      setImagesEditing(!imagesEditing)
    }

    


    


  return (
    <SafeAreaView >
    <ScrollView >
      {isEdit === true &&(<View style={styles.root}>
         <Text  style={styles.text}>Profile</Text>
         {/* <ImagePicker   pickedImage={pickedImage} setPickedImage={setPickedImage} imageSytle={[imageStyle,{margin:0}]} imageRootStyle={imageRootStyle}/> */}
         <SwapImages/>
         <View style={styles.buttons}>
            <Button text="Save" handleClick={saveClickHandle} />
         </View>
         <Input setField={setEmail} field={email} LabelText="Email" placeholderText={email} inputStyle={inputStyle} editable={false} />
         <Input setField={setUsername} field={username} LabelText="Username" placeholderText={username} inputStyle={inputStyle} editable={false}/>
          <Input setField={setFirstName} field={FirstName} LabelText="First name" placeholderText={FirstName}  inputStyle={inputStyle} editable={isEdit}/>
          <Input setField={setLastName} field={LastName} LabelText="Last name" placeholderText={LastName}  inputStyle={inputStyle} editable={isEdit}/>
          <Input setField={setPhoneNumber} field={phoneNumber} LabelText="Phone number" placeholderText={phoneNumber}  inputStyle={inputStyle} editable={isEdit}/>
          <DatePicker date={date} setDate={setDate} title="Select day of birth"/>
          <>
          {Object.entries(links).map(([linkName, linkValue], index) => (
            <View key={index}>
              <Input
                setField={(value) => handleLinkChange(linkName, value)} 
                field={linkValue}
                LabelText={linkName} 
                placeholderText={linkValue} 
                inputStyle={inputStyle} 
                editable={isEdit}
              />
            </View>
          ))}
        </>
          <HobbiesPicker selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies}  text="Select your hobbies:" array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}/>
          <HobbiesPicker selectedHobbies={languages} setSelectedHobbies={setLanguages} text="Select Languages:" array={["Hebrew","Arabic","English","Russin"]}/>
         
      </View>) 
    }
      
      { isEdit!== true && <View style={styles.root}>
        <Text  style={styles.text}>Profile</Text>
        {/* <ImageToShow imageUrl={pickedImage} imageStyle={imageStyle} rootStyle={imageRootStyle}/> */}
        <SwapImages editStyle={{display:'none'}}/>
        <View style={styles.buttons}>
           <Button  buttonStyle={{marginHorizontal:10}} text="Edit profile" handleClick={handleEditProfileClick} />
           <Button  buttonStyle={{marginHorizontal:10}} text="Friends" handleClick={handleFriendsClick}/>
        </View>
        <Input setField={setEmail} field={email} LabelText="Email" placeholderText="" inputStyle={inputStyle} editable={isEdit} />
        <Input setField={setUsername} field={username} LabelText="Username" placeholderText="" inputStyle={inputStyle} editable={isEdit}/>
         <Input setField={setFirstName} field={FirstName} LabelText="First name" placeholderText=""  inputStyle={inputStyle} editable={isEdit}/>
         <Input setField={setLastName} field={LastName} LabelText="Last name" placeholderText=""  inputStyle={inputStyle} editable={isEdit}/>
         <Input setField={setPhoneNumber} field={phoneNumber} LabelText="Phone number" placeholderText=""  inputStyle={inputStyle} editable={isEdit}/>
         <Input setField={setAge} field={age} LabelText="Age" placeholderText=""  inputStyle={inputStyle} editable={isEdit}/>
          <>
           {Object.entries(links).map(([linkName, linkValue], index) => (
             <View key={index}  style={styles.inputRoot}>
                <Text style={styles.label}>{linkName}:</Text>
                   <Text 
                     style={[styles.input,styles.link]} 
                     onPress={() => openLink(linkValue)}
                     >
                     {linkValue}
                  </Text>
              </View>
               ))}
           </>
         <ShowCoupleStuf text="My Hobbies:" array={selectedHobbies}/>
         <ShowCoupleStuf text="My languages:" array={languages}/>
         <Button text="Logout" handleClick={handleLogout} />
     </View>
      }
      
     
  </ScrollView>
 </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
   
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
    backgroundColor: GlobalStyles.colors.nearWhite, 
    fontSize: 16,
  },
  buttons:{
    flexDirection:"row",
    justifyContent:'center',
  },
  inputRoot: {
    padding: 10,
    backgroundColor: '#f5f5f5', 
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    backgroundColor: GlobalStyles.colors.nearWhite, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    height: 50,
    textAlignVertical: 'center', 
    textAlign: 'left', 
  },
  iconContainer: {
    marginTop:6,
    alignItems: 'center', 
    justifyContent:'center'
  },
  headerContainer: {
    width:'90%',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize:32,
    fontWeight: "bold",
    padding: 10,
  },
 
});

export default ProfileScreen;
