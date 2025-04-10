import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import FriendRequestComponent from "../components/FriendRequestComponent";
import Header from "../components/Header";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../util/firebaseConfig.json"; // קובץ ההגדרות של Firebase
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import SubmitButton from "../components/buttons/SubmitButton";
import { GlobalStyles } from "../constants/styles";
import PageContainer from "../components/PageContainer";
import { addUsersToChat } from "../util/actions/chatAction";
import { getUserData } from "../util/actions/userAction";

// אתחול Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const RequestsList = ({ navigation, route }) => {
  const activityId = route.params?.activityId;
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [activityRequests, setActivityRequests] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [activityData, setActivityData] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  
  const getChats = createSelector(
    state => state.chats.chatsData, 
    chatsData => Object.values(chatsData).sort((a,b)=>{
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }) 
  );

  const storedChats = useSelector(getChats);

  const isGroupChatDisabeld = selectedUsers.length === 0;

  useEffect(() => {
    const fetchActivityRequests = async () => {
      if (!activityId) {
        console.error("No activity ID provided.");
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "activities", activityId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setActivityData(data);
          
          //console.log("Activity Data:", data);

          setActivityRequests(data.activityRequests || []);
          await fetchUsersDetails(data.activityRequests || []);
        } else {
          console.error("Activity not found.");
        }
      } catch (error) {
        console.error("Error fetching activity data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityRequests();
  }, [activityId]);

  const addUserToSelectedArray = (userId) => {
    const newSelectedUsers = selectedUsers.includes(userId) 
    ? selectedUsers.filter(id => id !== userId) : selectedUsers.concat(userId);

    setSelectedUsers(newSelectedUsers);
  
  }


  
  


  const fetchUsersDetails = async (userIds) => {
    if (!userIds.length) {
      setUsersData([]);
      return;
    }


    try {
      const users = [];

      for (const userId of userIds) {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          users.push({ id: userId, ...userSnap.data() });
        } else {
          console.warn(`User with ID ${userId} not found.`);
        }
      }

      setUsersData(users);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  function backArrowHandle() {
    navigation.goBack();
  }

  const ApproveRequest = async () => {
      try {
        setButtonLoading(true);
        const docRef = doc(db, "activities", activityId);
        const docSnap = await getDoc(docRef);
  
        if (!docSnap.exists()) {
          console.error("Activity not found");
          return;
        }
       
        const activityData = docSnap.data();
        if (!activityData.activityRequests) {
          await updateDoc(docRef, { activityRequests: [] });
        }
        const usersToAdd = [];
        for (const userId of selectedUsers){
          const currentUser = await getUserData(userId);
          usersToAdd.push(currentUser);
         
          await updateDoc(docRef, {
            activityParticipants: arrayUnion(userId),
          });
    
          await updateDoc(docRef, {
            activityRequests: arrayRemove(userId),
          });
    
          await updateDoc(doc(db, "users", userId), {
            activities: arrayUnion(activityId),
          });
        }

       const currentchat = storedChats && storedChats.find(chat => chat.key === activityData.chatId);
      
       await addUsersToChat(userData, usersToAdd, currentchat);

       setUsersData([]);
       setSelectedUsers([]);
       setButtonLoading(false);

      } catch (e) {
        console.error("Error updating document:", e);
      }
    };

  return (
    < >
      <View style={styles.root}>
        <Header title="Requests List" onBackPress={backArrowHandle} />
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : usersData.length > 0 ? (
        <FlatList 
             data={usersData}
             keyExtractor={(item) => item.userId} 
             renderItem={({ item }) => 
             <FriendRequestComponent 
                onPress={() => addUserToSelectedArray(item.userId)}
                imageSource={item.images['firstImage']}
                title={`${item.firstName} ${item.lastName}`}
                isChecked={selectedUsers.includes(item.userId)}
                       
            />}
         />
      ) : (
        <View style={styles.notFound}>
          <Ionicons name="people" size={55} color="grey" />
          <Text style={styles.notFoundText}>No Requests Yet</Text>
        </View>
      )}
      <PageContainer>
        {
          buttonLoading && 
          <View >
              <ActivityIndicator
              size={'small'}
              color={GlobalStyles.colors.mainColor}
              />
          </View>
        }
        <SubmitButton
          title="Approve"
          onPress={ApproveRequest}
          color={GlobalStyles.colors.primary}
          disabeld={isGroupChatDisabeld || isLoading}
          style={{marginBottom:15,marginTop:10}}
        
        />
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 32,
    flexDirection:'row'
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 16,
    color: "grey",
  },
});

export default RequestsList;
