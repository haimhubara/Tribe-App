import { View, StyleSheet, Text} from "react-native";
import Button from "../buttons/Button";
import SwapImages from "../swapImages/SwapImages";
import Output from "../Output";
import PageContainer from "../PageContainer";
import { useState } from "react";
import ShowCoupleStuf from "../ShowCoupleStuf";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Header from "../Header";
import IconButton from "../buttons/IconButton";
import { GlobalStyles } from "../../constants/styles";


import defaultImage from "../../assets/images/camera.png"




const ForeignProfile = ({AddFreindHandle,startChatHandle,backArrowHandle,isFriend,facebookHandle,tikTokHandle,InstagramHandle}) => {


  const [selectedHobbies, setSelectedHobbies] = useState(['Reading', 'Traveling', 'Cooking']);
  const [languages, setLanguages] = useState(["Hebrew","English"]);

  const [images, setImage] =  useState({
    "firstImage":defaultImage,
    "secondImage":defaultImage,
    "thirdImage":defaultImage,
    "fourthImage":defaultImage,
    "fiveImage":defaultImage,
    "sixImage":defaultImage,

  })


  return (
    <View style={styles.root}>
          <Header title="Foreign Profile" onBackPress={backArrowHandle}/>
          <SwapImages imagess={Object.values(images)}  editStyle={{display:'none'}}/>
         <View style={styles.buttons}>
            <Button text="Send Message" handleClick={startChatHandle} />
            {isFriend && <Button text="Add Friend" handleClick={AddFreindHandle} />}
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

           {/* <Output
            label="Facebook"
            iconName="facebook"
            IconPack={Feather}
            inputOption={{editable:false}} 
         />
         <Output 
            label="TikTok"
            iconName="logo-tiktok"
            IconPack={Ionicons}
            inputOption={{editable:false}} 
          />
         <Output
            label="Instagram "
            iconName="instagram"
            IconPack={FontAwesome}
            inputOption={{editable:false}} 
            
          /> */}
        <ShowCoupleStuf text="My Hobbies" array={selectedHobbies}/>
        <ShowCoupleStuf text="My languages" array={languages}/>
        <Text style={styles.label}>Social Links</Text>
        <View style={styles.iconButtons}>
              <IconButton  iconName="facebook" IconPack={Feather} onPress={facebookHandle}/>
              <IconButton  iconName="logo-tiktok" IconPack={Ionicons} onPress={tikTokHandle}/>
              <IconButton  iconName="instagram" IconPack={FontAwesome} onPress={InstagramHandle}/>
        </View>
        </PageContainer>
         
      </View>
    
  )
}
const styles = StyleSheet.create({
    root:{
        flex:1,
        marginTop:32,
        marginBottom:20
    },
    buttons:{
      flexDirection:"row",
      justifyContent:'center',
      gap:10,
      marginVertical:20
  
    },
    iconButtons:{
      flexDirection:"row",
      justifyContent:'flex-start',
      marginHorizontal:30,
      gap:15,
  
    },
     label:{
         marginVertical:8,
        fontFamily:'bold',
        letterSpacing:0.3,
        color:GlobalStyles.colors.textColor,
   },
})

export default ForeignProfile
