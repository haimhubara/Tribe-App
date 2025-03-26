import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import Header from "../components/Header";
//import { GlobalStyles } from "../constants/styles";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc,arrayUnion, arrayRemove, getDocs, collection } from "firebase/firestore";
import firebaseConfig from "../util/firebaseConfig.json";
//import Button from "../components/buttons/Button";
import { useSelector } from "react-redux";
import { Alert } from 'react-native';


const PersonalActivityProfileScreen = ({ navigation, route }) => {
    const activityId = route.params?.id; 

    const [name, setName] = useState("Loading...");
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [activityImage, setActivityImage] = useState(require("../assets/icon.png"));
    const [ages, setAges] = useState("");
    const [gender, setGender] = useState('Any');
    const [languages, setLanguage] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedNumPartitions, setSelectedNumPartitions] = useState();
    const [isJoined, setIsJoined] = useState(false);
    const [userId,setUserId]=useState("");
    const [isPending, setIsPending] = useState(false);
    const [isParticipant, setIsParticipant] = useState(false);///
    

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        if (!activityId) return;

        const fetchActivityData = async () => {
            try {
                const activityRef = doc(db, "activities", activityId);
                const activitySnap = await getDoc(activityRef);

                if (activitySnap.exists()) {
                    const data = activitySnap.data();
                    setName(data.name || "Unnamed Activity");
                    setDate(data.date ? new Date(data.date) : new Date());
                    setTime(data.time ? new Date(data.time) : new Date());
                    setLocation(data.location || "Unknown");
                    setDescription(data.description || "No description available.");
                    setAges(data.ages);
                    setGender(data.gender || "Any");
                    setLanguage(data.languages || []);
                    setCategories(data.categories || []);
                    setSelectedNumPartitions(data.selectedNumPartitions || 0);
                    setUserId(data.userID||"");
                    if (data.imageUrl) {
                        setActivityImage({ uri: data.imageUrl });
                    }
                    setIsPending(data.activityRequests?.includes(myID));
                    setIsParticipant(data.activityParticipants?.includes(myID));///
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching activity data:", error);
            }
        };

        fetchActivityData();
    }, [activityId]); 
   const userData = useSelector(state => state.auth.userData);
    let myPage=0;
    if(userData.userId==userId){
        myPage=1;
    }else{ myPage=0;}
    let myID=userData.userId;

    const handleEditClick = (id) => {
        if (id === "editButton") {
            navigation.navigate('AddNewEventScreen', {
                ifGoBack: true,
                name, location, description,date: new Date().toISOString(),time: new Date().toISOString(),
                ages, gender, languages, categories, activityImage, selectedNumPartitions,myPage,activityId
            });
        } else if (id === "participantsButton") {
            navigation.navigate('ParticipantsListScreen',{activityId , myPage});;
        } else if (id === "joinButton") {
            setIsJoined(!isJoined);
            requestToJoin();

        }else if(id==="requestsButton"){
            navigation.navigate('RequestsList', { activityId, isMyPage: 1 });

        }
    };

    const leaveActivity = async () => {
        try {
            const activityRef = doc(db, "activities", activityId);
            await updateDoc(activityRef, {
                activityParticipants: arrayRemove(myID),
            });
    
            const userRef = doc(db, "users", myID);
            await updateDoc(userRef, {
                activities: arrayRemove(activityId),
            });
    
            setIsParticipant(false);
        } catch (e) {
            console.error("Error leaving activity:", e);
        }
    };
    
    const confirmLeave = () => {
        Alert.alert(
            "Leave Activity",
            "Are you sure you want to leave this activity?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", style: "destructive", onPress: leaveActivity }
            ]
        );
    };
    

    const deleteActivity = async () => {
        try {
          const activityRef = doc(db, "activities", activityId);
          const activitySnap = await getDoc(activityRef);
      
          if (!activitySnap.exists()) {
            console.error("Activity not found");
            return;
          }
      
          const activityData = activitySnap.data();
          const allUserIds = [
            ...(activityData.activityParticipants || []),
            ...(activityData.activityRequests || [])
          ];
      
          
          for (const userId of allUserIds) {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
              activities: arrayRemove(activityId)
            });
          }
      
          
          await deleteDoc(activityRef);
      
          // ניווט חזרה למסך החיפוש או אחר
          Alert.alert("Deleted", "Activity deleted successfully.");
          navigation.navigate("SearchScreen");
      
        } catch (error) {
          console.error("Error deleting activity:", error);
          Alert.alert("Error", "Something went wrong while deleting the activity.");
        }
      };
      
      const confirmDelete = () => {
        Alert.alert(
          "Delete Activity",
          "Are you sure you want to delete this activity?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: deleteActivity }
          ]
        );
      };
      

    const requestToJoin = async () => {
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

            if (!isJoined) {
                await updateDoc(docRef, {
                    activityRequests: arrayUnion(myID),
                });
                setIsPending(true);///
            } else {
                await updateDoc(docRef, {
                    activityRequests: arrayRemove(myID),
                });
                setIsPending(false);///
            }
        } catch (e) {
            console.error("Error updating document:", e);
        }
    };

        


    function getAges() {
      
        return ages[0] === ages[1] ? ages[0] : `${ages[0]}-${ages[1]}`;
    }

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Header title={name} onBackPress={() => navigation.goBack()} />
                <Image source={activityImage} style={styles.image} />
                <View style={styles.invitationContainer}>
                    <Text style={styles.subtitle}>{description}</Text>
                    <View style={styles.infoContainer}>
                        {[ 
                            {
                                icon: "calendar",
                                text: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).toDateString()
                              },
                            { icon: "time", text: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                            { icon: "location", text: location },
                            { icon: "people", text: `Ages: ${getAges()}` },
                            { icon: "man", text: `Gender: ${gender}` },
                            { icon: "chatbubbles", text: `Languages: ${languages.join(", ")}` },
                            { icon: "musical-notes", text: `Categories: ${categories.join(", ")}` },
                            { icon: "people", text: "View Participants", onPress: () => handleEditClick("participantsButton") }
                        ].map(({ icon, text, onPress }, index) => (
                            <View key={index} style={styles.infoRow}>
                                <Ionicons name={icon} style={styles.icon} />
                                <Text
                                    style={[styles.infoText, onPress && styles.clickableText]}
                                    onPress={onPress}
                                >
                                    {text}
                                </Text>
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
                        onPress={() => {
                          if (isParticipant) {
                            confirmLeave(); 
                          } else {
                            handleEditClick("joinButton");
                          }
                        }}
                        style={[
                          styles.joinButton,
                          isParticipant ? styles.participantButton : isPending ? styles.joinedButton : null
                        ]}
                      >
                        <Ionicons
                          name={isParticipant ? "checkmark-circle-outline" : isPending ? "time-outline" : "flame-outline"}
                          style={styles.joinButtonIcon}
                        />
                        <Text style={styles.joinButtonText}>
                          {isParticipant ? "U ARE IN!" : isPending ? "Pending" : "Tribe Us!"}
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
    infoRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
    infoText: {
        fontFamily: 'bold',
        letterSpacing: 0.6,
        color: "#333",
        fontSize: 16,
        marginLeft: 15,
        transform: [{ translateY: -2 }, { translateX: -3 }]
    },
    clickableText: {
        color: "#4A90E2",
        textDecorationLine: "underline"
    },
    editButton: {
        backgroundColor: "#4A90E2",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    editButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    joinButton: {
        marginTop: 20,
        backgroundColor: "#4A90E2",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row', 
    },
    joinButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
    joinButtonIcon: {
        color: 'white',
        fontSize: 20,
    },
    icon: { fontSize: 30, color: "#4A90E2" },
    joinedButton: { backgroundColor: "grey" },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 15,
        gap: 10,
        flexWrap: "wrap" 
    },
    requestsButton: {
        backgroundColor: "#FF5722",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    
    requestsButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#D32F2F",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
      deleteButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
      

});

export default PersonalActivityProfileScreen;
