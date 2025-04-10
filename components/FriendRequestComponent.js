import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ImageToShow from './imagesAndVideo/ImageToShow'
import { useNavigation } from '@react-navigation/native'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import firebaseConfig from "../util/firebaseConfig.json";
import { addUsersToChat } from '../util/actions/chatAction'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

const FriendRequestComponent = ({ user, activityId }) => {
  const navigation = useNavigation();
  const [isFriend, setIsFriend] = useState(false);
  const [isRequestApproved, setIsRequestApproved] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const getChats = createSelector(
    state => state.chats.chatsData, 
    chatsData => Object.values(chatsData).sort((a,b)=>{
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }) 
  );

  const storedChats = useSelector(getChats);

 

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const myID = user.userId;

  function openForeignProfileHandle() {
    navigation.navigate("ForeignProfileScreen", {
      userId: user.userId
    });
  }

  function handleApproveRequest() {
    setIsFriend(true);
    setIsRequestApproved(true);
    ApproveRequest();
  }

  const ApproveRequest = async () => {
    try {
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

      await updateDoc(docRef, {
        activityParticipants: arrayUnion(myID),
      });

      await updateDoc(docRef, {
        activityRequests: arrayRemove(myID),
      });

      await updateDoc(doc(db, "users", myID), {
        activities: arrayUnion(activityId),
      });

     activityData.activityParticipants
     const currentchat = storedChats && storedChats.find(chat => chat.key === activityData.chatId);
     const userToAddData = [];
     userToAddData.push(user);
     await addUsersToChat(userData, userToAddData, currentchat);
     //activity owner.userID 

    } catch (e) {
      console.error("Error updating document:", e);
    }
  };

  return (
    <Pressable onPress={openForeignProfileHandle}>
      {({ pressed }) => (
        <View style={[styles.root, pressed && styles.pressed]}>
          <ImageToShow
            imageUrl={user.imageSouce ? user.imageSouce : user.images['firstImage']}
            imageStyle={styles.imageStyle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.firstName} numberOfLines={1}>{user.firstName}</Text>
            <Text style={styles.lastName} numberOfLines={1}>{user.lastName}</Text>
          </View>

          {!isRequestApproved ? (
            <TouchableOpacity
              style={styles.approveButton}
              onPress={handleApproveRequest}
            >
              <Text style={styles.approveButtonText}>Approve</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.approvedButton}>
              <Text style={styles.approvedButtonText}>APPROVED</Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    backgroundColor: '#e2e2e2',
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  firstName: {
    fontSize: 17,
    fontWeight: '600',
    color: GlobalStyles.colors.textColor,
    letterSpacing: 0.3,
  },
  lastName: {
    fontSize: 15,
    fontWeight: '400',
    color: '#666',
    marginTop: 2,
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.nearWhite,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  approvedButton: {
    backgroundColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    opacity: 0.9,
  },
  approvedButtonText: {
    color: '#444',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});

export default FriendRequestComponent;
