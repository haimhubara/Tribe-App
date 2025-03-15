import { View, StyleSheet} from "react-native";
import HobbiesPicker from "../HobbiesPicker";
import Button from "../buttons/Button";
import SwapImages from "../swapImages/SwapImages";
import Output from "../Output";
import PageContainer from "../PageContainer";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';


const EditProfile = ({saveClickHandle,isEdit}) => {

  const [selectedHobbies, setSelectedHobbies] = useState(['Reading', 'Traveling', 'Cooking']);
  const [languages, setLanguages] = useState(["Hebrew","English"]);

  const onInuptChange = (id,text) => {
      
  }


  return (
    <View style={styles.root}>
         <SwapImages/>
         <View style={styles.buttons}>
            <Button text="Save" handleClick={saveClickHandle} />
         </View>
         <PageContainer>
            
         <Output 
          label="First name"  
          inputOption={{editable:isEdit}} 
          iconName="user-o"
          IconPack={FontAwesome}
        />
         <Output
            label="Last name"
            iconName="user-o" 
            IconPack={FontAwesome}
            inputOption={{editable:isEdit}} 
        />
         <Output
            label="Email"
            iconName="mail"
            IconPack={Feather}
            inputOption={{editable:!isEdit}} 
         />
         <Output 
            label="Username"
            iconName="user-o" 
            IconPack={FontAwesome}
            inputOption={{editable:!isEdit}} 
          />
         <Output
            label="Phone number"
            iconName="phone" 
            IconPack={Feather}
            inputOption={{editable:isEdit}} 
            
          />
           <Output
            label="Facebook"
            iconName="facebook"
            IconPack={Feather}
            inputOption={{editable:isEdit}} 
         />
         <Output 
            label="TikTok"
            iconName="logo-tiktok"
            IconPack={Ionicons}
            inputOption={{editable:isEdit}} 
          />
         <Output
            label="Instagram "
            iconName="instagram"
            IconPack={FontAwesome}
            editable={isEdit}
            inputOption={{editable:isEdit}} 
            
          />
          <Output 
           label="Age"  
           iconName="user-circle" 
           IconPack={FontAwesome}
           inputOption={{editable:!isEdit}} 
         />
          <HobbiesPicker 
            selectedHobbies={selectedHobbies}
            setSelectedHobbies={setSelectedHobbies}
            text="Select your hobbies" 
            array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}
          />
          <HobbiesPicker
            selectedHobbies={languages}
            setSelectedHobbies={setLanguages}
            text="Select Languages" 
            array={["Hebrew","Arabic","English","Russin"]}
           />
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

export default EditProfile
