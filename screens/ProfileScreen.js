import { Text, StyleSheet, ScrollView} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileComponent from "../components/profileComponents/ProfileComponent";
import EditProfile from "../components/profileComponents/EditProfile";
import { userLogout } from "../util/actions/AuthAction";
import { useDispatch } from 'react-redux';





const ProfileScreen = ({navigation}) => {
    const [isEdit,setIsEdit] = useState(false);
    const dispach = useDispatch();
    
    
    function handleLogout(){
      dispach(userLogout());
    }

   
   
    
  
    function handleEditProfileClick(){
        setIsEdit(!isEdit);
        const parentNav = navigation.getParent();
        if (parentNav) {
          parentNav.setOptions({ tabBarStyle: { display: 'none' } });
        }
      
       
    }
    function handleFriendsClick(){
      navigation.navigate("FriendsScreen");
    }
    function saveClickHandle() {
      setIsEdit(!isEdit);
      const parentNav = navigation.getParent();
        if (parentNav) {
          parentNav.setOptions({ tabBarStyle: { display:'flex' } });
        }
      
    }
    
  return (
    <SafeAreaView >
    <ScrollView >
      <Text  style={styles.header}>Profile</Text>
      {isEdit === true &&
        <EditProfile
          isEdit={isEdit} 
          saveClickHandle={saveClickHandle}
        />
      }
      
      { isEdit!== true && 
        <ProfileComponent
           handleFriendsClick={handleFriendsClick}
           handleEditProfileClick={handleEditProfileClick}
           handleLogout={handleLogout}
        />
      }
      
     
  </ScrollView>
 </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  header:{
    textAlign:'center',
    fontSize:32,
    fontWeight:'bold',
  },
 
});

export default ProfileScreen;
