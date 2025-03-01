import {View, StyleSheet} from "react-native";
import ShowCoupleStuf from "../ShowCoupleStuf";
import Button from "../buttons/Button";
import SwapImages from "../swapImages/SwapImages";
import Output from "../Output";
import PageContainer from "../PageContainer";
import { useState } from "react";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';


const ProfileComponent = ({handleEditProfileClick,handleFriendsClick,handleLogout}) => {

  const [selectedHobbies, setSelectedHobbies] = useState(['Reading', 'Traveling', 'Cooking']);
  const [languages, setLanguages] = useState(["Hebrew","English"]);
  return (
    <View style={styles.root}>
        <SwapImages editStyle={{display:'none'}}/>
         <View style={styles.buttons}>
           <Button  buttonStyle={{marginHorizontal:10}} text="Edit profile" handleClick={handleEditProfileClick} />
           <Button  buttonStyle={{marginHorizontal:10}} text="Friends" handleClick={handleFriendsClick}/>
        </View>
        <PageContainer>

         <Output 
          label="First name"  
          inputOption={{editable:false}} 
          iconName="user-o"
          IconPack={FontAwesome}
        />
         <Output
            label="Last name"
            iconName="user-o" 
            IconPack={FontAwesome}
            inputOption={{editable:false}} 
        />
         <Output
            label="Email"
            iconName="mail"
            IconPack={Feather}
            inputOption={{editable:false}} 
         />
         <Output 
            label="Username"
            iconName="user-o" 
            IconPack={FontAwesome}
            inputOption={{editable:false}} 
          />
         <Output
            label="Phone number"
            iconName="phone" 
            IconPack={Feather}
            inputOption={{editable:false}} 
            
          />
         <Output 
           label="Age"  
           iconName="user-circle" 
           IconPack={FontAwesome}
           inputOption={{editable:false}} 
         />
         <ShowCoupleStuf text="My Hobbies" array={selectedHobbies}/>
         <ShowCoupleStuf text="My languages" array={languages}/>
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
      marginVertical:20
  
    },
})

export default ProfileComponent
