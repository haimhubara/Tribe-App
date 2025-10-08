import { Text, View, ScrollView, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { Header } from "../../components";
import { useSelector } from "react-redux";
import { getActivityData,requestToJoinActivity,leaveActivity as leaveActivityAction,deleteActivity as deleteActivityAction} from "../../util/actions/activityActions";

const formatDateFromISO = (isoString) => {
  if (!isoString) return { date: "", day: "" };
  const dateObj = new Date(isoString);
  const day = dateObj.toLocaleDateString("en-GB", { weekday: "short" });
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = `${dd}.${mm}`;
  return { date, day };
};

const PersonalActivityProfileScreen = ({ navigation, route }) => {
  const activityId = route.params?.id;
  const userData = useSelector(state => state.auth.userData);
  const userChats = useSelector(state => state.chats.chatsData);
  const myID = userData.userId;

  // state variables
  const [activityInfo, setActivityInfo] = useState({
    name: "Loading...",
    time: new Date(),
    date: new Date(),
    location: "",
    description: "",
    activityImage: require("../../assets/icon.png"),
    ages: "",
    gender: "Any",
    languages: [],
    categories: [],
    selectedNumPartitions: 0,
    userId: "",
    isPending: false,
    isParticipant: false,
    chatId: "",
    userToRemoveFromChatIds: [],
    locationObject: null
  });

  const myPage = userData.userId === activityInfo.userId ? 1 : 0;

  // fetch activity data
  useEffect(() => {
    if (!activityId) return;

    const fetchData = async () => {
      const data = await getActivityData(activityId, myID);
      if (!data) return;

      setActivityInfo({
        name: data.name || "Unnamed Activity",
        date: data.date ? new Date(data.date) : new Date(),
        time: data.time ? new Date(data.time) : new Date(),
        location: data.location?.address || "Unknown",
        locationObject: data.location || null,
        description: data.description || "No description available.",
        ages: data.ages,
        gender: data.gender || "Any",
        languages: data.languages || [],
        categories: data.categories || [],
        selectedNumPartitions: data.selectedNumPartitions || 0,
        userId: data.userID || "",
        isPending: data.activityRequests?.includes(myID),
        isParticipant: data.activityParticipants?.includes(myID),
        chatId: data.chatId,
        userToRemoveFromChatIds: data.activityParticipants || [],
        activityImage: data.imageUrl 
          ? (typeof data.imageUrl === "object" && data.imageUrl.uri ? { uri: data.imageUrl.uri } : { uri: data.imageUrl })
          : require("../../assets/icon.png")
      });
    };

    fetchData();
  }, [activityId]);

  // handle join/leave/edit/delete
  const handleEditClick = async (id) => {
    if (id === "editButton") {
      navigation.navigate('AddNewEventScreen', {
        ifGoBack: true,
        name: activityInfo.name,
        locationObject: activityInfo.locationObject,
        description: activityInfo.description,
        date: activityInfo.date?.toISOString(),
        time: activityInfo.time?.toISOString(),
        ages: activityInfo.ages,
        gender: activityInfo.gender,
        languages: activityInfo.languages,
        categories: activityInfo.categories,
        activityImage: activityInfo.activityImage,
        selectedNumPartitions: activityInfo.selectedNumPartitions,
        myPage,
        activityId,
        chatId: activityInfo.chatId
      });
    } else if (id === "participantsButton") {
      navigation.navigate('ParticipantsListScreen', { activityId, myPage });
    } else if (id === "joinButton") {
      const pending = await requestToJoinActivity(activityId, myID, activityInfo.isParticipant);
      setActivityInfo(prev => ({ ...prev, isPending: pending }));
    } else if (id === "requestsButton") {
      navigation.navigate('RequestsList', { activityId, isMyPage: 1 });
    }
  };

  const confirmLeave = () => {
    Alert.alert("Leave Activity", "Are you sure you want to leave this activity?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", style: "destructive", onPress: async () => {
        const success = await leaveActivityAction(activityId, myID, userData, userChats);
        if (success) setActivityInfo(prev => ({ ...prev, isParticipant: false }));
      }}
    ]);
  };

  const confirmDelete = () => {
    Alert.alert("Delete Activity", "Are you sure you want to delete this activity?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
        const success = await deleteActivityAction(activityId, activityInfo.userToRemoveFromChatIds, userChats);
        if (success) {
          Alert.alert("Deleted", "Activity deleted successfully.");
          navigation.navigate("SearchScreen");
        } else {
          Alert.alert("Error", "Something went wrong while deleting the activity.");
        }
      }}
    ]);
  };

  const getAges = () => {
    return activityInfo.ages[0] === activityInfo.ages[1] ? activityInfo.ages[0] : `${activityInfo.ages[0]}-${activityInfo.ages[1]}`;
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title={activityInfo.name} onBackPress={() => navigation.goBack()} />
        <Image source={activityInfo.activityImage} style={styles.image} />
        <View style={styles.invitationContainer}>
          <Text style={styles.subtitle}>{activityInfo.description}</Text>
          <View style={styles.infoContainer}>
            {[
              { icon: "calendar", text: `${formatDateFromISO(activityInfo.date.toISOString()).day}, ${formatDateFromISO(activityInfo.date.toISOString()).date}` },
              { icon: "time", text: activityInfo.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
              { icon: "location", text: activityInfo.location },
              { icon: "people", text: `Ages: ${getAges()}` },
              { icon: "man", text: `Gender: ${activityInfo.gender}` },
              { icon: "chatbubbles", text: `Languages: ${activityInfo.languages.join(", ")}` },
              { icon: "musical-notes", text: `Categories: ${activityInfo.categories.join(", ")}` },
              { icon: "people", text: "View Participants", onPress: () => handleEditClick("participantsButton") }
            ].map(({ icon, text, onPress }, index) => (
              <View key={index} style={styles.infoRow}>
                <Ionicons name={icon} style={styles.icon} />
                <Text style={[styles.infoText, onPress && styles.clickableText]} onPress={onPress}>{text}</Text>
              </View>
            ))}
          </View>

          {myPage !== 0 && (
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => handleEditClick("editButton")} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.requestsButton} onPress={() => handleEditClick("requestsButton")}>
                <Text style={styles.requestsButtonText}>Requests</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          {myPage !== 1 && (
            <TouchableOpacity
              onPress={() => activityInfo.isParticipant ? confirmLeave() : handleEditClick("joinButton")}
              style={[
                styles.joinButton,
                activityInfo.isParticipant ? styles.participantButton : activityInfo.isPending ? styles.joinedButton : null
              ]}
            >
              <Ionicons
                name={activityInfo.isParticipant ? "checkmark-circle-outline" : activityInfo.isPending ? "time-outline" : "flame-outline"}
                style={styles.joinButtonIcon}
              />
              <Text style={styles.joinButtonText}>
                {activityInfo.isParticipant ? "U ARE IN!" : activityInfo.isPending ? "Pending" : "Tribe Us!"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  scrollContainer: { flexGrow: 1, alignItems: "center", paddingVertical: 20 },
  image: { width: "90%", height: 250, borderRadius: 15, marginVertical: 15 },
  invitationContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20, textAlign: "center" },
  infoContainer: { width: "100%", alignItems: "flex-start" },
  infoRow: { flexDirection: "row", alignItems: "center", marginVertical: 6, gap: 10, width: "100%" },
  infoText: { fontSize: 16, color: "#333", marginLeft: 12, flexShrink: 1 },
  clickableText: { color: "#4A90E2", textDecorationLine: "underline" },
  icon: { fontSize: 30, color: "#4A90E2" },
  editButton: { backgroundColor: "#4A90E2", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
  editButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  joinButton: { marginTop: 20, backgroundColor: "#4A90E2", padding: 10, borderRadius: 5, alignItems: "center", flexDirection: "row" },
  joinedButton: { backgroundColor: "grey" },
  joinButtonText: { color: "white", fontSize: 16, marginLeft: 5 },
  joinButtonIcon: { color: "white", fontSize: 20 },
  buttonRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", paddingHorizontal: 20, marginTop: 15, gap: 10, flexWrap: "wrap" },
  requestsButton: { backgroundColor: "#FF5722", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
  requestsButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  deleteButton: { backgroundColor: "#D32F2F", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
  deleteButtonText: { color: "white", fontSize: 16, fontWeight: "bold" }
});

export default PersonalActivityProfileScreen;
