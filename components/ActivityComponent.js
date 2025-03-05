import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // התקן את הספריה אם לא מותקנת

const ActivityComponent = ({ activityImage, name, description, participants, distance }) => {
    const [image, setImage] = useState(require("../assets/icon.png"));

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={activityImage || image} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.activityName}>{name || "Activity Name"}</Text>
                <Text style={styles.activityDescription}>{description || "Activity Description"}</Text>
            </View>
            <View style={styles.participantsContainer}>
                <View style={styles.participantsRow}>
                    <Icon name="users" size={24} color="#333" />
                    <Text style={styles.participantsNumber}>{participants || 0}</Text>
                </View>
                <View style={styles.distanceContainer}>
                    <Icon name="map-marker" size={20} color="#333" />
                    <Text style={styles.distanceText}>{distance || "0 km"}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginVertical: 10,
        flexDirection: "row",
        overflow: "hidden",
        alignItems: 'center',
        alignSelf: 'center'
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 15,
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    activityName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    activityDescription: {
        fontSize: 14,
        color: "#555",
        marginTop: 10,
    },
    participantsContainer: {
        alignItems: 'center',
        marginRight: 10,
    },
    participantsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    participantsNumber: {
        fontSize: 16,
        color: "#333",
        marginLeft: 5,
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    distanceText: {
        fontSize: 14,
        color: "#333",
        marginLeft: 5,
    },
});

export default ActivityComponent;