import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const formatDateFromISO = (isoString) => {
    if (!isoString) return { date: "", day: "" };

    const dateObj = new Date(isoString);

    const day = dateObj.toLocaleDateString("en-GB", { weekday: "short" }); // e.g. "Wed"
    const dd = String(dateObj.getDate()+1).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");

    const date = `${dd}.${mm}`; // e.g. "30.02"

    return { date, day };
};

const ActivityComponent = ({ imageUrl, name, description, date, location, participants }) => {
    const [secureImageUrl, setSecureImageUrl] = useState(null);
    const defaultImage = require("../assets/icon.png");

    useEffect(() => {
        if (imageUrl) {
            //console.log(typeof imageUrl);
            if(!(typeof imageUrl==="string")){
                imageUrl = String(imageUrl.uri);

            }
            //const updatedUrl = imageUrl.startsWith("http://") ? imageUrl.replace("http://", "https://") : imageUrl;
            let updatedUrl = null;
            //console.log(typeof imageUrl);

            if (imageUrl.startsWith("http://")) {
              updatedUrl = imageUrl.replace("http://", "https://");
            } else if (imageUrl) {
              updatedUrl = imageUrl;
            } else {
              updatedUrl = null;
            }
            

            setSecureImageUrl(updatedUrl);
        }
    }, [imageUrl]);

    const { date: formattedDate, day: formattedDay } = formatDateFromISO(date);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={secureImageUrl ? { uri: secureImageUrl } : defaultImage}
                    style={styles.image}
                />
                <View style={styles.infoWrapper}>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateText}>{formattedDate}</Text>
                        <Text style={styles.dayText}>{formattedDay}</Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.title} numberOfLines={1}>{name}</Text>
                        <Text style={styles.description} numberOfLines={1}>{description}</Text>
                        {location?.address && (
                            <View style={styles.metaItem}>
                                <FontAwesome name="map-marker" size={14} color="#888" />
                                <Text style={styles.metaText} numberOfLines={1}>
                                    {location.address}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.participantsWrapper}>
                    <FontAwesome name="users" size={14} color="#888" />
                    <Text style={styles.participantsCount}>{participants || 0}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: "center",
    },
    card: {
        width: "90%",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        overflow: Platform.OS === "ios" ? "visible" : "hidden",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.35,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    image: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    infoWrapper: {
        flexDirection: "row",
        padding: 10,
    },
    dateBox: {
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    dayText: {
        fontSize: 14,
        color: "#555",
    },
    textBox: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 6,
    },
    metaText: {
        fontSize: 13,
        color: "#444",
        flexShrink: 1,
    },
    participantsWrapper: {
        position: "absolute",
        bottom: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    participantsCount: {
        fontSize: 13,
        color: "#444",
    },
});

export default ActivityComponent;
