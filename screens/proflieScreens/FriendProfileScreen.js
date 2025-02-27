import { Text, View, StyleSheet, ScrollView, Linking } from "react-native";
import Input from "../../components/Input";
import { GlobalStyles } from "../../constants/styles";
import { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import ShowCoupleStuf from "../../components/ShowCoupleStuf";
import Button from "../../components/Button";
import Header from "../../components/Header";
import SwapImages from "../../components/swapImages/SwapImages";

   



const FriendProfileScreen = ({navigation, route}) => {
  const { isFriend } = !route.params;

  useEffect(() => {
    setLinks({
      "Facebook": "https://www.facebook.com",
      "Instagram": "https://www.instagram.com",
      "Twitter": "https://www.twitter.com"
    });
  }, []);
  


    const [email,setEmail] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [username, setUsername] = useState('');
    const [selectedHobbies, setSelectedHobbies] = useState(['Reading', 'Traveling', 'Cooking']);
    const [languages, setLanguages] = useState(["Hebrew","English"]);
    

    

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
    
    function AddFreindHandle(){

    }
    function startChatHandle(){

    }
    function backArrowHandle(){
      navigation.goBack();
    }

    return (
        <ScrollView>
         <View style={styles.root}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Header title="Profile" onBackPress={backArrowHandle}/>
              <SwapImages editStyle={{display:'none'}}/>
                <View style={styles.buttons}>
                    {isFriend && <Button buttonStyle={{marginHorizontal:1}}  text={<Ionicons name="person-remove-outline" size={24} color="black" />} handleClick={AddFreindHandle} />}
                    {!isFriend && <Button buttonStyle={{marginHorizontal:1}}  text={<Ionicons name="person-add-outline" size={24} color="black" />} handleClick={AddFreindHandle} />}
                  <Button text={<Ionicons buttonStyle={{marginHorizontal:1}}  name="chatbox-ellipses-outline" size={24} color="black" />} handleClick={startChatHandle}/>
                </View>

            </View>
            <Input setField={setEmail} field={email} LabelText="Email" placeholderText="" inputStyle={inputStyle} editable={false} />
            <Input setField={setUsername} field={username} LabelText="Username" placeholderText="" inputStyle={inputStyle} editable={false}/>
             <Input setField={setFirstName} field={FirstName} LabelText="First name" placeholderText=""  inputStyle={inputStyle} editable={false}/>
             <Input setField={setLastName} field={LastName} LabelText="Last name" placeholderText=""  inputStyle={inputStyle} editable={false}/>
             <Input setField={setPhoneNumber} field={phoneNumber} LabelText="Phone number" placeholderText=""  inputStyle={inputStyle} editable={false}/>
             <Input setField={setAge} field={age} LabelText="Age" placeholderText=""  inputStyle={inputStyle} editable={false}/>
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
         </View>
      </ScrollView>

      );
    }
    
    const styles = StyleSheet.create({
      root: {
        flex: 1,
        marginTop:32,
      },
      inputRoot: {
        padding: 10,
        backgroundColor: '#f5f5f5', 
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
        justifyContent:'center'
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
      }
    
     
});

export default FriendProfileScreen
