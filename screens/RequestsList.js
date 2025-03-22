import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import FriendRequestComponent from "../components/FriendRequestComponent";
import Header from "../components/Header";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../util/firebaseConfig.json"; // קובץ ההגדרות של Firebase

// אתחול Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const RequestsList = ({ navigation, route }) => {
  const activityId = route.params?.activityId;
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [activityRequests, setActivityRequests] = useState([]);

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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.root}>
        <Header title="Requests List" onBackPress={backArrowHandle} />
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : usersData.length > 0 ? (
        <FlatList
          data={usersData} // מציגים רק את הרשימה של בקשות הצטרפות
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FriendRequestComponent user={item} activityId={activityId} />}
        />
      ) : (
        <View style={styles.notFound}>
          <Ionicons name="people" size={55} color="grey" />
          <Text style={styles.notFoundText}>No Requests Yet</Text>
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

export default RequestsList;
