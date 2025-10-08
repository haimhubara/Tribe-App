import {  getDoc, getFirestore, doc, updateDoc, arrayRemove, addDoc, collection, arrayUnion, getDocs, query, where  } from "firebase/firestore";
import { getFirebaseApp } from "../firebase";
import { createChat, deleteFromActivity, removeUserFromChat, sendStartMessage, updateChatData } from "./chatAction";
import { uploadImageToCloudinary } from "../cloudinary";
import { deleteUserChatV2 } from "./userAction";

const app = getFirebaseApp();
const db = getFirestore(app);

export const getActivityData = async (activityId) => {
    try {
       
        const activityRef = doc(db, "activities", activityId);
        const snapshot = await getDoc(activityRef);

        if (!snapshot.exists()) {
            throw new Error("Activity not found");
        }

        return { id: snapshot.id, ...snapshot.data() }; 
    } catch (error) {
        console.error("Error fetching activity data:", error);
        return null;
    }
};

export const requestToJoinActivity = async (activityId, userId, isJoined) => {
  try {
    const activityRef = doc(db, "activities", activityId);

    if (!isJoined) {
      await updateDoc(activityRef, { activityRequests: arrayUnion(userId) });
      return true;
    } else {
      await updateDoc(activityRef, { activityRequests: arrayRemove(userId) });
      return false;
    }
  } catch (error) {
    console.error("Error updating join request:", error);
    return null;
  }
};

export const leaveActivity = async (activityId, userId, currentUserData, userChats) => {
  try {
    await updateDoc(doc(db, "activities", activityId), {
      activityParticipants: arrayRemove(userId),
    });
    await updateDoc(doc(db, "users", userId), {
      activities: arrayRemove(activityId),
    });

    const currentChat = userChats && userChats[currentUserData.chatId];
    await removeUserFromChat(currentUserData, currentUserData, currentChat);

    return true;
  } catch (error) {
    console.error("Error leaving activity:", error);
    return false;
  }
};

export const deleteActivity = async (activityId, userToRemoveFromChatIds, userChats) => {
  try {
    const activityRef = doc(db, "activities", activityId);
    const activitySnap = await getDoc(activityRef);

    if (!activitySnap.exists()) return false;

    const data = activitySnap.data();
    const allUserIds = [...(data.activityParticipants || []), ...(data.activityRequests || [])];

    // Remove activity from all users
    const updatePromises = allUserIds.map(userId =>
      updateDoc(doc(db, "users", userId), { activities: arrayRemove(activityId) })
    );
    await Promise.all(updatePromises);

    // Delete activity document
    await deleteDoc(activityRef);

    // Delete activity chat for all participants
    const removeChatPromises = userToRemoveFromChatIds.map(userId =>
      deleteUserChatV2(userId, data.chatId)
    );
    await Promise.all(removeChatPromises);

    const currentChat = userChats && userChats[data.chatId];
    await deleteFromActivity(currentChat);

    return true;
  } catch (error) {
    console.error("Error deleting activity:", error);
    return false;
  }
};

export const fetchActivitiesForUser = async (userId) => {
  try {

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return [];

    const activityIds = userSnap.data().activities || [];
    const activities = [];

    for (const activityId of activityIds) {
      const activity = await getActivityData(activityId);
      if (activity) activities.push(activity);
    }

    return activities;
  } catch (error) {
    console.error("Error fetching activities for user:", error);
    return [];
  }
};

export const fetchActivityParticipants = async (activityId) => {
  if (!activityId) return [];

  try {
    const docRef = doc(db, "activities", activityId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return [];

    const data = docSnap.data();
    return data.activityParticipants || [];
  } catch (error) {
    console.error("Error fetching activity participants:", error);
    return [];
  }
};


export const removeParticipantFromActivity = async (activityId, userToRemove, currentUser, currentChat) => {
  try {
    // Remove from activity
    const activityRef = doc(db, "activities", activityId);
    await updateDoc(activityRef, {
      activityParticipants: arrayRemove(userToRemove.id),
    });

    // Remove from user's activities
    const userRef = doc(db, "users", userToRemove.id);
    await updateDoc(userRef, {
      activities: arrayRemove(activityId),
    });

    // Remove from chat
    if (currentChat) {
      await removeUserFromChat(currentUser, userToRemove, currentChat);
    }

    return true;
  } catch (error) {
    console.error("Error removing participant:", error);
    return false;
  }
};

export const fetchUsersDetails = async (userIds) => {
  if (!userIds?.length) return [];

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("__name__", "in", userIds));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc) => ({
      userId: doc.id,
      ...doc.data(),
    }));

    return users;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
};

export const createActivity = async (activityData, userId) => {
  let { name, description, date, time, selectedNumPartitions, selectedGender, ages, languages, selectedCategories, generatedImage, location } = activityData;

  const imageUrl = await uploadImageToCloudinary(generatedImage);


  const chatMembers = [userId];
  const chatId = await createChat(userId, chatMembers, name, true);
  await sendStartMessage(chatId, userId, `hi and welcome to ${name} activity`);
  await updateChatData(chatId, userId, { chatImage: imageUrl });

  const docRef = await addDoc(collection(db, "activities"), {
    name,
    description,
    date: date.toISOString(),
    time: time.toISOString(),
    selectedNumPartitions,
    gender: selectedGender,
    ages,
    chatId,
    languages,
    categories: selectedCategories,
    imageUrl,
    userID: userId,
    activityRequests: [],
    activityParticipants: [],
    location
  });


  await updateDoc(docRef, {
    activityParticipants: arrayUnion(userId),
  });


  await updateDoc(doc(db, "users", userId), {
    activities: arrayUnion(docRef.id),
  });

  return docRef.id;
};


export const updateActivity = async (activityId, activityData, userId, chatId) => {
  const imageUrl = activityData.imageChanged
    ? await uploadImageToCloudinary(activityData.generatedImage)
    : activityData.generatedImage;

  await updateDoc(doc(db, "activities", activityId), {
    name: activityData.name,
    description: activityData.description,
    date: activityData.date.toISOString(),
    time: activityData.time.toISOString(),
    selectedNumPartitions: activityData.selectedNumPartitions,
    gender: activityData.selectedGender,
    ages: activityData.ages,
    languages: activityData.languages,
    categories: activityData.selectedCategories,
    imageUrl,
    userID: userId,
    location: activityData.location,
  });

  await updateChatData(chatId, userId, {
    chatImage: imageUrl,
    chatName: activityData.name
  });
};

export const fetchActivityRequests = async (activityId) => {
  try {
    const docRef = doc(db, "activities", activityId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { activityData: null, requests: [] };

    const data = docSnap.data();
    return { activityData: data, requests: data.activityRequests || [] };
  } catch (error) {
    console.error("Error fetching activity requests:", error);
    return { activityData: null, requests: [] };
  }
};

export const approveActivityRequests = async (activityId, selectedUsers, usersData, storedChats, currentUser, addUsersToChat) => {
  try {
    const docRef = doc(db, "activities", activityId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("Activity not found");

    const activityData = docSnap.data();
    if (!activityData.activityRequests) {
      await updateDoc(docRef, { activityRequests: [] });
    }

    const usersToAdd = [];

    for (const userId of selectedUsers) {
      const currentUserData = usersData.find((user) => user.userId === userId);
      usersToAdd.push(currentUserData);

      await updateDoc(docRef, { activityParticipants: arrayUnion(userId) });
      await updateDoc(docRef, { activityRequests: arrayRemove(userId) });
      await updateDoc(doc(db, "users", userId), { activities: arrayUnion(activityId) });
    }

    const currentChat = storedChats?.find((chat) => chat.key === activityData.chatId);
    await addUsersToChat(currentUser, usersToAdd, currentChat);

    return usersToAdd;
  } catch (error) {
    console.error("Error approving activity requests:", error);
    throw error;
  }
};