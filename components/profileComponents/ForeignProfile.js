import { View, StyleSheet, Text} from "react-native";
import Button from "../buttons/Button";
import SwapImages from "../swapImages/SwapImages";
import Input from "../Input";
import PageContainer from "../PageContainer";
import { useEffect, useState } from "react";
import ShowCoupleStuf from "../ShowCoupleStuf";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Header from "../Header";
import IconButton from "../buttons/IconButton";
import { GlobalStyles } from "../../constants/styles";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";


import defaultImage from "../../assets/images/camera.png"
import { getUserData } from "../../util/actions/userAction";




const ForeignProfile = ({startChatHandle,backArrowHandle}) => {

  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [foreignUser,setForeignUser] = useState({});
  
  const { userId } = route?.params || {};


  const calculateAge = (dayOfBirth) => {
    const birthDate = new Date(dayOfBirth);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate; 
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(ageInYears).toLocaleString();
  };


 useEffect(() => {
     const fetchUser = async () => {
       try {
         setIsLoading(true);
         if(userId){
          const foreignFetchedUser = await getUserData(userId);
          setForeignUser(foreignFetchedUser);
         }
         
         setIsLoading(false);
       } catch (error) {
         console.error("Error fetching users:", error);
         setIsLoading(false);
       }
     };
   
     fetchUser();
   }, []);

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

 
  const facebookHandle = () => {

  }
  const tikTokHandle = () => {
    
  }
  const InstagramHandle = () => {
    
  }


  return (
    <View style={styles.root}>
      <Header title="Foreign Profile" onBackPress={backArrowHandle}/>
  
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={GlobalStyles.colors.mainColor} />
        </View>
      )}
  
      {!isLoading && (
        <>
         <SwapImages 
            imagess={foreignUser && foreignUser.images ? foreignUser.images : Object.values(images)} 
            editStyle={{ display: 'none' }} 
        />

          <View style={styles.buttons}>
            <Button text="Send Message" handleClick={startChatHandle} />
          </View>
          <PageContainer>
            <Input
              label="First name"
              inputOption={{ editable: false }}
              iconName="user-o"
              IconPack={FontAwesome}
              value={foreignUser ? foreignUser.firstName : ""}
            />
            <Input
              label="Last name"
              iconName="user-o"
              IconPack={FontAwesome}
              inputOption={{ editable: false }}
              value={foreignUser ? foreignUser.lastName : ""}
            />
            <Input
              label="Email"
              iconName="mail"
              IconPack={Feather}
              inputOption={{ editable: false }}
              value={foreignUser ? foreignUser.email : ""}
            />
            <Input
              label="Username"
              iconName="user-o"
              IconPack={FontAwesome}
              inputOption={{ editable: false }}
              value={foreignUser ? foreignUser.userName : ""}
            />
            <Input
              label="Phone number"
              iconName="phone"
              IconPack={Feather}
              inputOption={{ editable: false }}
              value={foreignUser ? foreignUser.phoneNumber : ""}
            />
            <Input
              label="Age"
              iconName="user-circle"
              IconPack={FontAwesome}
              inputOption={{ editable: false }}
              value={foreignUser && !isNaN(calculateAge(foreignUser.date)) ? calculateAge(foreignUser.date) : " "}

            />
            <ShowCoupleStuf text="My Hobbies" array={foreignUser.hobbies===undefined?selectedHobbies:foreignUser.hobbies} />
            <ShowCoupleStuf text="My languages" array={foreignUser.languages===undefined?languages:foreignUser.languages} />
            <Text style={styles.label}>Social Links</Text>
            <View style={styles.iconButtons}>
              <IconButton iconName="facebook" IconPack={Feather} onPress={facebookHandle} />
              <IconButton iconName="logo-tiktok" IconPack={Ionicons} onPress={tikTokHandle} />
              <IconButton iconName="instagram" IconPack={FontAwesome} onPress={InstagramHandle} />
            </View>
          </PageContainer>
        </>
      )}
    </View>
  );
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
   loadingContainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    marginTop:10
  },
})

export default ForeignProfile
