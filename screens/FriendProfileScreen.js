import { Text, View, StyleSheet, ScrollView} from "react-native";
import Input from "../components/Input";
import { GlobalStyles } from "../constants/styles";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageToShow from "../components/ImageToShow";
import ShowCoupleStuf from "../components/ShowCoupleStuf";
import Button from "../components/Button";

   



const FriendProfileScreen = ({navigation, route}) => {
  const { isFriend } = !route.params;


    const [email,setEmail] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [username, setUsername] = useState('');
    const [selectedHobbies, setSelectedHobbies] = useState(['Reading', 'Traveling', 'Cooking']);
    const [languages, setLanguages] = useState(["Hebrew","English"]);

    const inputStyle = {backgroundColor:GlobalStyles.colors.nearWhite}
    const imageStyle = {flex:1,marginTop:32,width:150,height:150,borderRadius:75,alignItems: 'center',  justifyContent:'center' ,backgroundColor:GlobalStyles.colors.nearWhite}
    const imageRootStyle = { justifyContent:'center',alignItems:'center'}
    
    function AddFreindHandle(){

    }
    function startChatHandle(){

    }
    function backArrowHandle(){
      navigation.navigate("FriendsScreen");
    }
    
    return (
        <ScrollView>
         <View style={styles.root}>
            <View style={styles.titleContainer}>
                  <Ionicons name="arrow-back" size={32} color="black" onPress={backArrowHandle} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Profile</Text>
                </View>
           </View>
            <ImageToShow imageUrl={null} imageStyle={imageStyle} rootStyle={imageRootStyle}/>
            <View style={styles.buttons}>
                {isFriend && <Button text={<Ionicons name="person-remove-outline" size={24} color="black" />} handleClick={AddFreindHandle} />}
                {!isFriend && <Button text={<Ionicons name="person-add-outline" size={24} color="black" />} handleClick={AddFreindHandle} />}
               <Button text={<Ionicons name="chatbox-ellipses-outline" size={24} color="black" />} handleClick={startChatHandle}/>
            </View>
            <Input setField={setEmail} field={email} LabelText="Email" placeholderText="" inputStyle={inputStyle} editable={false} />
            <Input setField={setUsername} field={username} LabelText="Username" placeholderText="" inputStyle={inputStyle} editable={false}/>
             <Input setField={setFirstName} field={FirstName} LabelText="First name" placeholderText=""  inputStyle={inputStyle} editable={false}/>
             <Input setField={setLastName} field={LastName} LabelText="Last name" placeholderText=""  inputStyle={inputStyle} editable={false}/>
             <Input setField={setPhoneNumber} field={phoneNumber} LabelText="Phone number" placeholderText=""  inputStyle={inputStyle} editable={false}/>
             <Input setField={setAge} field={age} LabelText="Age" placeholderText=""  inputStyle={inputStyle} editable={false}/>
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
      },
      title: {
        textAlign:'center',
        justifyContent:'center',
        marginRight:30,
        fontSize:28,
        fontWeight:'bold',
      },
      titleContainer:{
        flexDirection:'row',
        alignItems: 'center', 
      },
      textContainer:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
      }
     
});

export default FriendProfileScreen
