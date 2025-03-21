import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import Header from "../components/Header";
import ParticipantComponent from "../components/ParticipantComponent";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../util/firebaseConfig.json"; // קובץ ההגדרות של Firebase

// אתחול Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ParticipantsListScreen = ({ navigation, route }) => {
  const myPage = route.params?.myPage; 
  const activityId = route.params?.activityId;
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [activityParticipants, setActivityParticipants] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshList = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const onUserRemoved = (userID) => {
    setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== userID));
    setActivityParticipants((prevParticipants) => prevParticipants.filter((id) => id !== userID));
    refreshList();
  };

  useEffect(() => {
    const fetchActivityParticipants = async () => {
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
          setActivityParticipants(data.activityParticipants || []);
          await fetchUsersDetails(data.activityParticipants || []);
        } else {
          console.error("Activity not found.");
        }
      } catch (error) {
        console.error("Error fetching activity data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityParticipants();
  }, [activityId, refreshKey]); // מאזין לשינוי ומרענן את הנתונים

  const fetchUsersDetails = async (userIds) => {
    if (!userIds.length) {
      console.warn("No users found. Skipping fetch.");
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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.root}>
        <Header title="Participants List" onBackPress={backArrowHandle} />
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : usersData.length > 0 ? (
        <FlatList
          data={usersData} 
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ParticipantComponent 
              user={item} 
              myPage={myPage} 
              activityId={activityId}
              onUserRemoved={onUserRemoved} // מעביר את הפונקציה
            />
          )}
          extraData={refreshKey} // גורם לרענון הרשימה
        />
      ) : (
        <View style={styles.notFound}>
          <Ionicons name="people" size={55} color="grey" />
          <Text style={styles.notFoundText}>No Participants Yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 32,
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

export default ParticipantsListScreen;
