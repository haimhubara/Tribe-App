import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useState } from "react";

import Button from "../components/buttons/Button";
import AddNewEventScreen from "./AddNewEventScreen";
import Header from "../components/Header";

const PersonalActivityProfileScreen = ({ navigation, route }) => {
    const [activityName, setActivityName] = useState("Morning Run");
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState("Central Park");
    const [description, setDescription] = useState("A great way to start the day!");
    const [date, setDate] = useState(new Date());
    const [activityImage, setActivityImage] = useState(require("../assets/icon.png"));
    const [isEditing, setIsEditing] = useState(false);
    const [ages, setAges]=useState([18,22]);
    const [gender, setGender]=useState('Any');
    const [languages, setLanguage]=useState("Hebrew, English");
    const [categories, setCategories]=useState("Sport, Music");
    const [maxPartitions, setMaxPartitions]=useState(5);

    const { myPage } = route.params || { myPage: 1 }; 


    function handleEditClick() {
        setIsEditing(true);
    }

    function handleBackClick() {
        setIsEditing(false);
    }

    function backArrowHandle() {
        navigation.goBack();
    }
    function getAges(){
        if(ages[0]==ages[1]){
            return ages[0];
        }
        return ages[0]+'-'+ages[1];
    }

    if (isEditing) {
        return (
            <AddNewEventScreen
                activityName={activityName}
                time={time}
                location={location}
                description={description}
                date={date}
                ages={ages}
                gender={gender}
                languages={languages}
                categories={categories}
                maxPartitions={maxPartitions}
                activityImage={activityImage}
                onClose={handleBackClick}
            />
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.root}>
                <Header title="Activity-Name #temporery" onBackPress={backArrowHandle} />
                <Image source={activityImage} style={styles.image} />
                
                {myPage && ( 
                    <View style={styles.buttons}>
                        <Button text="Edit Activity" handleClick={handleEditClick} />
                    </View>
                )}


                <View style={styles.card}>
                    <Text style={styles.label}>Activity Name:</Text>
                    <Text style={styles.value}>{activityName}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{date.toDateString()}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Time:</Text>
                    <Text style={styles.value}>{time.toLocaleTimeString()}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>{location}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{description}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Ages:</Text>
                    <Text style={styles.value}>{getAges()}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={styles.value}>{gender}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Languages:</Text>
                    <Text style={styles.value}>{languages}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Categories:</Text>
                    <Text style={styles.value}>{categories}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Max Partitions:</Text>
                    <Text style={styles.value}>{maxPartitions}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    root: {
        width: "90%",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 15,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttons: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    value: {
        fontSize: 18,
        color: "#333",
        paddingVertical: 5,
    },
});

export default PersonalActivityProfileScreen;
