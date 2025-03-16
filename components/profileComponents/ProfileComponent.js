import {View, StyleSheet,Text} from "react-native";
import ShowCoupleStuf from "../ShowCoupleStuf";
import Button from "../buttons/Button";
import SwapImages from "../swapImages/SwapImages";
import Output from "../Output";
import PageContainer from "../PageContainer";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from "react-redux";


const ProfileComponent = ({handleEditProfileClick,handleLogout}) => {

  const calculateAge = (dayOfBirth) => {
    const birthDate = new Date(dayOfBirth);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate; 
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(ageInYears).toLocaleString();
  };
  

  const userData = useSelector(state => state.auth.userData);
 



  return (
    <View style={styles.root}>
       <Text  style={styles.header}>Profile</Text>
        <SwapImages isEdit={false} imagess={userData.images} editStyle={{display:'none'}}/>
         <View style={styles.buttons}>
           <Button  buttonStyle={{marginHorizontal:10}} text="Edit profile" handleClick={handleEditProfileClick} />
        </View>
        <PageContainer>

         <Output 
          label="First name"  
          inputOption={{editable:false}} 
          iconName="user-o"
          IconPack={FontAwesome}
          value={userData.firstName}
        />
         <Output
            label="Last name"
            iconName="user-o" 
            IconPack={FontAwesome}
            inputOption={{editable:false}} 
            value={userData.lastName}
        />
         <Output
            label="Email"
            iconName="mail"
            IconPack={Feather}
            inputOption={{editable:false}} 
            value={userData.email}
         />
         <Output 
            label="Username"
            iconName="user-o" 
            IconPack={FontAwesome}
            inputOption={{editable:false}} 
            value={userData.userName}
          />
         <Output
            label="Phone number"
            iconName="phone" 
            IconPack={Feather}
            inputOption={{editable:false}} 
            value={userData.phoneNumber}
            
          />
         <Output 
           label="Age"  
           iconName="user-circle" 
           IconPack={FontAwesome}
           inputOption={{editable:false}} 
           value={userData.date ? calculateAge(userData.date) : "Loading..."}
         />
         <ShowCoupleStuf text="My Hobbies" array={userData.hobbies}/>
         <ShowCoupleStuf text="My languages" array={userData.languages}/>
         <Button text="Logout" handleClick={handleLogout} />
         </PageContainer>
     </View>
    
  )
}
const styles = StyleSheet.create({
    root:{
        flex:1
    },
    buttons:{
      flexDirection:"row",
      justifyContent:'center',
      gap:10,
      marginBottom:10
  
    },
     header:{
      textAlign:'center',
      fontSize:32,
      fontWeight:'bold',
    },
})

export default ProfileComponent
