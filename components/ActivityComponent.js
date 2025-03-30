import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const ActivityComponent = ({ imageUrl, name, description, participants, distance, date, id, time, location }) => {
    const [secureImageUrl, setSecureImageUrl] = useState(null);
    const defaultImage = require("../assets/icon.png");
    if(location!=null){
        console.log(location.address);
    }
    
    useEffect(() => {
        if (imageUrl) {
            const updatedUrl = imageUrl.startsWith("http://") ? imageUrl.replace("http://", "https://") : imageUrl;
            setSecureImageUrl(updatedUrl);
        }
    }, [imageUrl]);

    return (
        <View style={styles.activityCard}>
            {secureImageUrl ? (
                <Image source={{ uri: secureImageUrl }} style={styles.activityImage} resizeMode="cover" />
            ) : (
                <Image source={defaultImage} style={styles.activityImage} resizeMode="cover" />
            )}
            <View style={styles.detailsWrapper}>
                <Text style={styles.activityTitle}>{name || "Activity Name"}</Text>
                <Text style={styles.activityTime}>{date || "NN-NN-NNNN"}</Text>
                <Text style={styles.activityTime}>{time || "00:00 - 00:00"}</Text>
                <Text style={styles.activityLocation}>{location!=null ? location.address : "@Unknown Location"}</Text>
            </View>
            <View style={styles.participantsWrapper}>
                <Icon name="users" size={20} color="#fff" style={styles.participantsIcon} />
                <Text style={styles.participantsCount}>{participants || 0}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    activityCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        overflow: Platform.OS === "ios" ? "visible" : "hidden",
        elevation: 10,
        flexDirection: "column",
        width: "90%",
        alignSelf: "center",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    activityImage: {
        width: "100%",
        height: 150,
        flex: 1,
        resizeMode: "cover", // שינוי כאן
    },
    detailsWrapper: {
        padding: 10,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    activityTime: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    activityLocation: {
        fontSize: 14,
        color: "#888",
        marginTop: 5,
    },
    participantsWrapper: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#4285F4",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    participantsIcon: {
        marginRight: 5,
    },
    participantsCount: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default ActivityComponent;