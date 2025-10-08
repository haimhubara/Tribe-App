import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { FriendRequestComponent } from "./components";
import { Header, PageContainer } from "../../components";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import SubmitButton from "../../components/buttons/SubmitButton";
import { GlobalStyles } from "../../constants/styles";
import { addUsersToChat } from "../../util/actions/chatAction";
import { fetchUsersDetails, fetchActivityRequests, approveActivityRequests } from "../../util/actions/activityAction";

const RequestsList = ({ navigation, route }) => {
  const activityId = route.params?.activityId;
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [activityData, setActivityData] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const userData = useSelector(state => state.auth.userData);

  const getChats = createSelector(
    state => state.chats.chatsData, 
    chatsData => Object.values(chatsData).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  );
  const storedChats = useSelector(getChats);

  const isGroupChatDisabled = selectedUsers.length === 0;

  useEffect(() => {
    const loadActivityRequests = async () => {
      if (!activityId) {
        console.error("No activity ID provided.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const { activityData, requests } = await fetchActivityRequests(activityId);
        setActivityData(activityData || {});
        const users = await fetchUsersDetails(requests || []);
        setUsersData(users);
      } catch (error) {
        console.error("Error loading activity requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivityRequests();
  }, [activityId]);

  const addUserToSelectedArray = (userId) => {
    const newSelectedUsers = selectedUsers.includes(userId) 
      ? selectedUsers.filter(id => id !== userId) 
      : selectedUsers.concat(userId);
    setSelectedUsers(newSelectedUsers);
  };

  const backArrowHandle = () => {
    navigation.goBack();
  };

  const handleApproveRequests = async () => {
    if (!selectedUsers.length) return;

    try {
      setButtonLoading(true);
      const usersAdded = await approveActivityRequests(
        activityId, 
        selectedUsers, 
        usersData, 
        storedChats, 
        userData, 
        addUsersToChat
      );

      setUsersData(usersData.filter(user => !selectedUsers.includes(user.userId)));
      setSelectedUsers([]);
    } catch (error) {
      console.error("Failed to approve requests:", error);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
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
          renderItem={({ item }) => (
            <FriendRequestComponent
              userId={item.userId}
              imageSource={item.images?.firstImage}
              title={`${item.firstName} ${item.lastName}`}
              isChecked={selectedUsers.includes(item.userId)}
              onSelectPress={addUserToSelectedArray}
            />
          )}
        />
      ) : (
        <View style={styles.notFound}>
          <Ionicons name="people" size={55} color="grey" />
          <Text style={styles.notFoundText}>No Requests Yet</Text>
        </View>
      )}

      <PageContainer>
        {buttonLoading && (
          <ActivityIndicator size="small" color={GlobalStyles.colors.mainColor} />
        )}
        <SubmitButton
          title="Approve"
          onPress={handleApproveRequests}
          color={GlobalStyles.colors.primary}
          disabeld={isGroupChatDisabled || isLoading}
          style={{ marginBottom:15, marginTop:10 }}
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
