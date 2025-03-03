import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import Button from "../components/buttons/Button";
import Header from "../components/Header";
import { GlobalStyles } from "../constants/styles";

const PersonalActivityProfileScreen = ({ navigation, route }) => {
    const [activityName, setActivityName] = useState("Morning Run");
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState("Central Park");
    const [description, setDescription] = useState("A great way to start the day!");
    const [date, setDate] = useState(new Date());
    const [activityImage, setActivityImage] = useState(require("../assets/icon.png"));
    const [ages, setAges] = useState([18, 22]);
    const [gender, setGender] = useState('Any');
    const [languages, setLanguage] = useState("Hebrew, English");
    const [categories, setCategories] = useState("Sport, Music");
    const [maxPartitions, setMaxPartitions] = useState(5);
    const myPage = route.params?.myPage ?? 1;

    function handleEditClick() {
        navigation.navigate('New', {
            ifGoBack: true,
            activityName, time, location, description, date,
            ages, gender, languages, categories, maxPartitions, activityImage,
        });
    }

    function getAges() {
        return ages[0] === ages[1] ? ages[0] : `${ages[0]}-${ages[1]}`;
    }

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Header title={activityName} onBackPress={() => navigation.goBack()} />
                <Image source={activityImage} style={styles.image} />
                <View style={styles.invitationContainer}>
                    <Text style={styles.subtitle}>{description}</Text>
                    <View style={styles.infoContainer}>
                        {[
                            { icon: "calendar", text: date.toDateString() },
                            { icon: "time", text: time.toLocaleTimeString() },
                            { icon: "location", text: location },
                            { icon: "people", text: `Ages: ${getAges()}` },
                            { icon: "man", text: `Gender: ${gender}` },
                            { icon: "chatbubbles", text: `Languages: ${languages}` },
                            { icon: "musical-notes", text: `Categories: ${categories}` },
                            { icon: "person-add", text: `Max Participants: ${maxPartitions}` }
                        ].map(({ icon, text }, index) => (
                            <View key={index} style={styles.infoRow}>
                                <Ionicons name={icon} style={styles.icon} />
                                <Text style={styles.infoText}>{text}</Text>
                            </View>
                        ))}
                    </View>
                    {myPage !== 0 && (
                        <Button text="Edit Event" handleClick={handleEditClick} style={styles.editButton} />
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
    title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 10 },
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
    editButton: { marginTop: 20 },
    icon: { fontSize: 30, color: "#4A90E2" }
});

export default PersonalActivityProfileScreen;
