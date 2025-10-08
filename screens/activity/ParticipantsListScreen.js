import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { ParticipantComponent } from "./components";
import { fetchActivityParticipants, fetchUsersDetails } from "../../util/actions/activityAction";

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
    const fetchData = async () => {
      if (!activityId) {
        console.error("No activity ID provided.");
        setIsLoading(false);
        return;
      }

      try {
        const participantsIds = await fetchActivityParticipants(activityId);
        setActivityParticipants(participantsIds || []);

        const users = await fetchUsersDetails(participantsIds);
        setUsersData(users);
      } catch (error) {
        console.error("Error fetching participants data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activityId, refreshKey]);

  const backArrowHandle = () => {
    navigation.goBack();
  };

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
              onUserRemoved={onUserRemoved}
            />
          )}
          extraData={refreshKey}
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
