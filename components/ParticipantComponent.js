import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import ImageToShow from './imagesAndVideo/ImageToShow';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, arrayRemove } from "firebase/firestore";
import firebaseConfig from "../util/firebaseConfig.json";
import { useState } from 'react';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ParticipantComponent = ({ user, myPage, activityId, onUserRemoved }) => {
    const navigation = useNavigation();
    const userData = useSelector(state => state.auth.userData);

    function openFriendProfileHandle() {
        if (userData.userId !== user.userId) {
            navigation.navigate("ForeignProfileScreen", {
                userId: user.userId
            });
        }
    }

    const onRemove = async (userID) => {
        try {
            const docRef = doc(db, "activities", activityId);
            await updateDoc(docRef, {
                activityParticipants: arrayRemove(userID),
            });

            onUserRemoved(userID);
        } catch (e) {
            console.error("Error updating document:", e);
        }
    };

    return (
        <Pressable onPress={openFriendProfileHandle}>
            {({ pressed }) => (
                <View style={[styles.root, pressed && userData.userId !== user.userId && styles.clicked]}>
                    <ImageToShow 
                        imageUrl={user.imageSouce ? user.imageSouce : user.images['firstImage']} 
                        imageStyle={[styles.image, { overflow: 'hidden' }]}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>{user.firstName}</Text>
                        <Text style={styles.text} numberOfLines={1}>{user.lastName}</Text>
                    </View>
                    {myPage === 1 && user.userId !== userData.userId && ( // מונע הסרת עצמך
                        <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(user.userId)}>
                            <Ionicons name="close-circle" size={26} color="red" />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.1,
        backgroundColor: '#ededed',
        borderColor: 'grey',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        paddingRight: 10,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    text: {
        fontSize: 16,
        margin: 2,
        fontFamily: 'bold',
        letterSpacing: 0.3,
        color: GlobalStyles.colors.textColor,
    },
    clicked: {
        backgroundColor: '#d1d1d1',
    },
    image: {
        marginLeft: 10,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: GlobalStyles.colors.nearWhite,
    },
    removeButton: {
        padding: 5,
    },
});

export default ParticipantComponent;
