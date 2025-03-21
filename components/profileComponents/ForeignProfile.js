// import { View, StyleSheet, Text} from "react-native";
// import Button from "../buttons/Button";
// import SwapImages from "../swapImages/SwapImages";
// import Input from "../Input";
// import PageContainer from "../PageContainer";
// import { useEffect, useState } from "react";
// import ShowCoupleStuf from "../ShowCoupleStuf";
// import Ionicons from '@expo/vector-icons/Ionicons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import Feather from '@expo/vector-icons/Feather';
// import Header from "../Header";
// import IconButton from "../buttons/IconButton";
// import { GlobalStyles } from "../../constants/styles";
// import { useRoute } from "@react-navigation/native";
// import { ActivityIndicator } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { setStoredUsers } from "../../store/userSlice";
// import { createSelector } from 'reselect';
// import defaultImage from "../../assets/images/camera.png"
// import { getUserData } from "../../util/actions/userAction";




// const ForeignProfile = ({backArrowHandle}) => {

//   const route = useRoute();
//   const [isLoading, setIsLoading] = useState(false);
//   const [chatId, setChatId] = useState('');

//   const getChats = createSelector(
//     state => state.chats.chatsData, 
//     chatsData => Object.values(chatsData).sort((a,b)=>{
//       return new Date(b.updatedAt) - new Date(a.updatedAt);
//     }) 
//   );

//   const { userId } = route?.params || {};

//   const userChats = useSelector(getChats);
//   const [foreignUser,setForeignUser] = useState({});
//   const userData = useSelector(state => state.auth.userData);
//   const storedUsers = useSelector(state => state.users.storedUsers);


//   useEffect(() => {
//     for (let i = 0; i < userChats.length; i++) {
//       const key = userChats[i].key;
//       const users = userChats[i].users;
//       const otherUserId = users.find(uid => uid !== userData.userId);
  
//       if (otherUserId === userId && key !== chatId) { 
//         setChatId(key);
//         break; // ברגע שמצאנו את ה-chat המתאים, אפשר לעצור את הלולאה
//       }
//     }
//   }, [userId, userChats, chatId]); // הוספת chatId כדי למנוע עדכון מיותר
  

 
//   const dispath = useDispatch();
  
 

//   const navigation = useNavigation();


//   const calculateAge = (dayOfBirth) => {
//     const birthDate = new Date(dayOfBirth);
//     const currentDate = new Date();
//     const ageInMilliseconds = currentDate - birthDate; 
//     const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
//     return Math.floor(ageInYears).toLocaleString();
//   };

  
 


//  useEffect(() => {
//      const fetchUser = async () => {
//        try {
//          setIsLoading(true);
//          if(userId){
//           const foreignFetchedUser = await getUserData(userId);
//           setForeignUser(foreignFetchedUser);
//          }
         
//          setIsLoading(false);
//        } catch (error) {
//          console.error("Error fetching users:", error);
//          setIsLoading(false);
//        }
//      };
   
//      fetchUser();
//    }, []);

//    const startChatHandle = () => {
//     if (userId) {
//       navigation.navigate("Chats Screen", {
//         screen: "Chats",
//         params: {
//           selectedUserId:userId,
//           chatUsers:[userData.userId,userId],
//           chatId:chatId
//         }
//       });
//       dispath(setStoredUsers({newUsers: foreignUser}))
      
//     }
//   };

//   const [selectedHobbies, setSelectedHobbies] = useState(['Reading', 'Traveling', 'Cooking']);
//   const [languages, setLanguages] = useState(["Hebrew","English"]);

//   const [images, setImage] =  useState({
//     "firstImage":defaultImage,
//     "secondImage":defaultImage,
//     "thirdImage":defaultImage,
//     "fourthImage":defaultImage,
//     "fiveImage":defaultImage,
//     "sixImage":defaultImage,

//   })

 
//   const facebookHandle = () => {

//   }
//   const tikTokHandle = () => {
    
//   }
//   const InstagramHandle = () => {
    
//   }


//   return (
//     <View style={styles.root}>
//       <Header title="Foreign Profile" onBackPress={backArrowHandle}/>
  
//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size={'large'} color={GlobalStyles.colors.mainColor} />
//         </View>
//       )}
  
//       {!isLoading && (
//         <>
//          <SwapImages 
//             imagess={foreignUser && foreignUser.images ? foreignUser.images : Object.values(images)} 
//             editStyle={{ display: 'none' }} 
//         />

//           <View style={styles.buttons}>
//             <Button text="Send Message" handleClick={startChatHandle} />
//           </View>
//           <PageContainer>
//             <Input
//               label="First name"
//               inputOption={{ editable: false }}
//               iconName="user-o"
//               IconPack={FontAwesome}
//               value={foreignUser ? foreignUser.firstName : ""}
//             />
//             <Input
//               label="Last name"
//               iconName="user-o"
//               IconPack={FontAwesome}
//               inputOption={{ editable: false }}
//               value={foreignUser ? foreignUser.lastName : ""}
//             />
//             <Input
//               label="Email"
//               iconName="mail"
//               IconPack={Feather}
//               inputOption={{ editable: false }}
//               value={foreignUser ? foreignUser.email : ""}
//             />
//             <Input
//               label="Username"
//               iconName="user-o"
//               IconPack={FontAwesome}
//               inputOption={{ editable: false }}
//               value={foreignUser ? foreignUser.userName : ""}
//             />
//             <Input
//               label="Phone number"
//               iconName="phone"
//               IconPack={Feather}
//               inputOption={{ editable: false }}
//               value={foreignUser ? foreignUser.phoneNumber : ""}
//             />
//             <Input
//               label="Age"
//               iconName="user-circle"
//               IconPack={FontAwesome}
//               inputOption={{ editable: false }}
//               value={foreignUser && !isNaN(calculateAge(foreignUser.date)) ? calculateAge(foreignUser.date) : " "}

//             />
//             <ShowCoupleStuf text="My Hobbies" array={foreignUser.hobbies===undefined?selectedHobbies:foreignUser.hobbies} />
//             <ShowCoupleStuf text="My languages" array={foreignUser.languages===undefined?languages:foreignUser.languages} />
//             <Text style={styles.label}>Social Links</Text>
//             <View style={styles.iconButtons}>
//               <IconButton iconName="facebook" IconPack={Feather} onPress={facebookHandle} />
//               <IconButton iconName="logo-tiktok" IconPack={Ionicons} onPress={tikTokHandle} />
//               <IconButton iconName="instagram" IconPack={FontAwesome} onPress={InstagramHandle} />
//             </View>
//           </PageContainer>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     root:{
//         flex:1,
//         marginTop:32,
//         marginBottom:20
//     },
//     buttons:{
//       flexDirection:"row",
//       justifyContent:'center',
//       gap:10,
//       marginVertical:20
  
//     },
//     iconButtons:{
//       flexDirection:"row",
//       justifyContent:'flex-start',
//       marginHorizontal:30,
//       gap:15,
  
//     },
//      label:{
//          marginVertical:8,
//         fontFamily:'bold',
//         letterSpacing:0.3,
//         color:GlobalStyles.colors.textColor,
//    },
//    loadingContainer: {
//     flex: 1, 
//     justifyContent: "center",
//     alignItems: "center", 
//   }
// })

// export default ForeignProfile


import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import Button from "../buttons/Button";
import SwapImages from "../swapImages/SwapImages";
import { useEffect, useState } from "react";
import ShowCoupleStuf from "../ShowCoupleStuf";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Header from "../Header";
import IconButton from "../buttons/IconButton";
import { GlobalStyles } from "../../constants/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setStoredUsers } from "../../store/userSlice";
import { createSelector } from 'reselect';
import defaultImage from "../../assets/images/camera.png";
import { getUserData } from "../../util/actions/userAction";

const { height } = Dimensions.get("window");

const ForeignProfile = ({ backArrowHandle }) => {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState("");
  const { userId } = route?.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);

  const getChats = createSelector(
    state => state.chats.chatsData,
    chatsData => Object.values(chatsData).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  );

  const userChats = useSelector(getChats);
  const [foreignUser, setForeignUser] = useState({});

  useEffect(() => {
    for (let chat of userChats) {
      const otherUserId = chat.users.find(uid => uid !== userData.userId);
      if (otherUserId === userId && chat.key !== chatId) {
        setChatId(chat.key);
        break;
      }
    }
  }, [userId, userChats, chatId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        if (userId) {
          const data = await getUserData(userId);
          setForeignUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const now = new Date();
    return Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 365.25));
  };

  const startChatHandle = () => {
    if (userId) {
      navigation.navigate("Chats Screen", {
        screen: "Chats",
        params: { selectedUserId: userId, chatUsers: [userData.userId, userId], chatId },
      });
      dispatch(setStoredUsers({ newUsers: foreignUser }));
    }
  };

  const images = foreignUser.images || {
    firstImage: defaultImage,
    secondImage: defaultImage,
    thirdImage: defaultImage,
    fourthImage: defaultImage,
    fiveImage: defaultImage,
    sixImage: defaultImage,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="User Profile" onBackPress={backArrowHandle} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.mainColor} />
        </View>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <SwapImages
              imagess={images}
              isEdit={false}
              imageStyle={styles.image}
              editStyle={{ display: "none" }}
            />
          </View>

          <Text style={styles.name}>
            {foreignUser.firstName} {foreignUser.lastName}, {foreignUser.date ? calculateAge(foreignUser.date) : ""}
          </Text>

          <Text style={styles.subtitle}>{foreignUser.email}</Text>

          <View style={styles.buttons}>
            <Button text="Send Message" handleClick={startChatHandle} />
          </View>

          <View style={styles.infoBox}>
            <ShowCoupleStuf text="🎯 Hobbies" array={foreignUser.hobbies || []} />
            <ShowCoupleStuf text="🌍 Languages" array={foreignUser.languages || []} />

            <Text style={styles.label}>🔗 Social Links</Text>
            <View style={styles.iconButtons}>
              <IconButton iconName="facebook" IconPack={Feather} onPress={() => {}} />
              <IconButton iconName="logo-tiktok" IconPack={Ionicons} onPress={() => {}} />
              <IconButton iconName="instagram" IconPack={FontAwesome} onPress={() => {}} />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  content: {
    alignItems: "center",
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: height * 0.6,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  infoBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: GlobalStyles.colors.textColor,
  },
  iconButtons: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 4,
  },
});

export default ForeignProfile;