// import React, { useState } from "react";
// import { View, Text, Image, StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome'; // התקן את הספריה אם לא מותקנת

// const ActivityComponent = ({ activityImage, name, description, participants, distance,date,id,time }) => {
//     const [image, setImage] = useState(require("../assets/icon.png"));

//     return (
//         <View style={styles.container}>
//             <View style={styles.imageContainer}>
//                 <Image source={activityImage || image} style={styles.image} />
//             </View>
//             <View style={styles.textContainer}>
//                 <Text style={styles.activityName}>{name || "Activity Name"}</Text>
//                 <Text style={styles.activityDescription}>{description || "Activity Description"}</Text>
//                 <Text style={styles.activityDescription}>{"Date: "+date || "No Date"}</Text>
//                 <Text style={styles.activityDescription}>{"time: "+time || "No Time"}</Text>
//             </View>
//             <View style={styles.participantsContainer}>
//                 <View style={styles.participantsRow}>
//                     <Icon name="users" size={24} color="#333" />
//                     <Text style={styles.participantsNumber}>{participants || 0}</Text>
//                 </View>
//                 <View style={styles.distanceContainer}>
//                     <Icon name="map-marker" size={20} color="#333" />
//                     <Text style={styles.distanceText}>{distance || "0 km"}</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         width: "90%",
//         backgroundColor: "#fff",
//         borderRadius: 15,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//         marginVertical: 10,
//         flexDirection: "row",
//         overflow: "hidden",
//         alignItems: 'center',
//         alignSelf: 'center'
//     },
//     imageContainer: {
//         width: 100,
//         height: 100,
//         borderRadius: 10,
//         overflow: "hidden",
//         marginRight: 15,
//     },
//     image: {
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//     },
//     textContainer: {
//         flex: 1,
//         justifyContent: "center",
//     },
//     activityName: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: "#333",
//     },
//     activityDescription: {
//         fontSize: 14,
//         color: "#555",
//         marginTop: 10,
//     },
//     participantsContainer: {
//         alignItems: 'center',
//         marginRight: 10,
//     },
//     participantsRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     participantsNumber: {
//         fontSize: 16,
//         color: "#333",
//         marginLeft: 5,
//     },
//     distanceContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 5,
//     },
//     distanceText: {
//         fontSize: 14,
//         color: "#333",
//         marginLeft: 5,
//     },
// });

// export default ActivityComponent;


import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const ActivityComponent = ({ activityImage, name, description, participants, distance,date,id,time,location }) => {
    const [defaultImage] = useState(require("../assets/icon.png"));

    return (
        <View style={styles.activityCard}>
            <Image source={activityImage || defaultImage} style={styles.activityImage} />
            <View style={styles.detailsWrapper}>
                <Text style={styles.activityTitle}>{name || "Activity Name"}</Text>
                <Text style={styles.activityTime}>{date || "NN-NN-NNNN"}</Text>
                <Text style={styles.activityTime}>{time || "00:00 - 00:00"}</Text>
                <Text style={styles.activityLocation}>@ {location || "Unknown Location"}</Text>
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
        resizeMode: "cover",
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