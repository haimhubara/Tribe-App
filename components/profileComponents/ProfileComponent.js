// import {View, StyleSheet,Text} from "react-native";
// import ShowCoupleStuf from "../ShowCoupleStuf";
// import Button from "../buttons/Button";
// import SwapImages from "../swapImages/SwapImages";
// import Output from "../Output";
// import PageContainer from "../PageContainer";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import Feather from '@expo/vector-icons/Feather';
// import { useSelector } from "react-redux";


// const ProfileComponent = ({handleEditProfileClick,handleLogout}) => {

//   const calculateAge = (dayOfBirth) => {
//     const birthDate = new Date(dayOfBirth);
//     const currentDate = new Date();
//     const ageInMilliseconds = currentDate - birthDate; 
//     const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
//     return Math.floor(ageInYears).toLocaleString();
//   };
  

//   const userData = useSelector(state => state.auth.userData);
 



//   return (
//     <View style={styles.root}>
//        <Text  style={styles.header}>Profile</Text>
//         <SwapImages isEdit={false} imagess={userData.images} editStyle={{display:'none'}}/>
//          <View style={styles.buttons}>
//            <Button  buttonStyle={{marginHorizontal:10}} text="Edit profile" handleClick={handleEditProfileClick} />
//         </View>
//         <PageContainer>

//          <Output 
//           label="First name"  
//           inputOption={{editable:false}} 
//           iconName="user-o"
//           IconPack={FontAwesome}
//           value={userData.firstName}
//         />
//          <Output
//             label="Last name"
//             iconName="user-o" 
//             IconPack={FontAwesome}
//             inputOption={{editable:false}} 
//             value={userData.lastName}
//         />
//          <Output
//             label="Email"
//             iconName="mail"
//             IconPack={Feather}
//             inputOption={{editable:false}} 
//             value={userData.email}
//          />
//          <Output 
//             label="Username"
//             iconName="user-o" 
//             IconPack={FontAwesome}
//             inputOption={{editable:false}} 
//             value={userData.userName}
//           />
//          <Output
//             label="Phone number"
//             iconName="phone" 
//             IconPack={Feather}
//             inputOption={{editable:false}} 
//             value={userData.phoneNumber}
            
//           />
//          <Output 
//            label="Age"  
//            iconName="user-circle" 
//            IconPack={FontAwesome}
//            inputOption={{editable:false}} 
//            value={userData.date ? calculateAge(userData.date) : "Loading..."}
//          />
//          <ShowCoupleStuf text="My Hobbies" array={userData.hobbies}/>
//          <ShowCoupleStuf text="My languages" array={userData.languages}/>
//          <Button text="Logout" handleClick={handleLogout} />
//          </PageContainer>
//      </View>
    
//   )
// }
// const styles = StyleSheet.create({
//     root:{
//         flex:1
//     },
//     buttons:{
//       flexDirection:"row",
//       justifyContent:'center',
//       gap:10,
//       marginBottom:10
  
//     },
//      header:{
//       textAlign:'center',
//       fontSize:32,
//       fontWeight:'bold',
//     },
// })

// export default ProfileComponent

//////////////////////////////////////////previus version

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import ShowCoupleStuf from "../ShowCoupleStuf";
import SwapImages from "../swapImages/SwapImages";

// קבלת גובה המסך
const { height } = Dimensions.get("window");

const ProfileComponent = ({ handleEditProfileClick, handleLogout }) => {
  const userData = useSelector((state) => state.auth.userData);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "";
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    return Math.floor(ageDifMs / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* תמונות בפרופורציה מלאה כמו טינדר */}
      <View style={styles.imageContainer}>
        <SwapImages
          isEdit={false}
          imagess={userData.images}
          imageStyle={styles.image}
        />
      </View>

      {/* שם וגיל */}
      <Text style={styles.name}>
        {userData.firstName} {userData.lastName}, {calculateAge(userData.date)}
      </Text>

      {/* תיאור קצר */}
      <Text style={styles.subtitle}>{userData.email}</Text>

      {/* תחביבים ושפות */}
      <View style={styles.infoSection}>
        <ShowCoupleStuf text="🎯 Hobbies" array={userData.hobbies} />
        <ShowCoupleStuf text="🌍 Languages" array={userData.languages} />
      </View>

      {/* כפתורים */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfileClick}
        >
          <FontAwesome name="edit" size={18} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={18} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    width: "100%",
    height: height * 0.6, // 60% מגובה המסך
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
  infoSection: {
    width: "90%",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: "80%",
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF4D4D",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ProfileComponent

