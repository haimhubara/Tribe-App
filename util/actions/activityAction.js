import { getDoc, getFirestore, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { getFirebaseApp } from "../firebase";
import { removeUserFromChat } from "./chatAction";

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

  const users = [];
  try {
    for (const userId of userIds) {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        users.push({ id: userId, ...userSnap.data() });
      } else {
        console.warn(`User with ID ${userId} not found.`);
      }
    }
  } catch (error) {
    console.error("Error fetching users data:", error);
  }
  return users;
};