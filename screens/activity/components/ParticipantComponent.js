import { View, Text, Pressable, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';
import ImageToShow from '../../../components/imagesAndVideo/ImageToShow';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { removeUserFromChat } from '../../../util/actions/chatAction';
import { getActivityData } from '../../../util/actions/activityAction';
import { getFirebaseApp } from '../../../util/firebase';

const app = getFirebaseApp()
const db = getFirestore(app);

const ParticipantComponent = ({ user, myPage, activityId, onUserRemoved }) => {
    const navigation = useNavigation();
    const userData = useSelector(state => state.auth.userData);
    const userChats = useSelector(state => state.chats.chatsData);

    function openFriendProfileHandle() {
        if (userData.userId !== user.userId) {
            navigation.navigate("ForeignProfileScreen", {
                userId: user.userId
            });
        }
    }
  
    // ✅ פופאפ אישור
    const confirmRemove = (userID) => {
        Alert.alert(
            "Remove Participant",
            "Are you sure you want to remove this participant?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes, Remove",
                    style: "destructive",
                    onPress: () => onRemove(userID)
                }
            ]
        );
    };

    const onRemove = async (userID) => {
        try {
            const docRef = doc(db, "activities", activityId);
            await updateDoc(docRef, {
                activityParticipants: arrayRemove(userID),
            });
            await updateDoc(doc(db, "users", userID), {
                activities: arrayRemove(activityId),
            });

            if (onUserRemoved) {
                onUserRemoved(userID); // עדכון חיצוני אם צריך
            }
            const currentActivity =  await getActivityData(activityId);
            const currentChat = userChats && userChats[currentActivity.chatId];
          
           
            await removeUserFromChat(userData,user, currentChat);
            // remove the user with userID from the chat
        } catch (e) {
            console.error("Error updating document:", e);
        }
    };

    

    return (
        <Pressable onPress={openFriendProfileHandle}>
            {({ pressed }) => (
                <View style={[styles.root, pressed && userData.userId !== user.userId && styles.pressed]}>
                    <ImageToShow 
                        imageUrl={user.imageSouce ? user.imageSouce : user.images['firstImage']} 
                        imageStyle={styles.imageStyle}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.firstName} numberOfLines={1}>{user.firstName}</Text>
                        <Text style={styles.lastName} numberOfLines={1}>{user.lastName}</Text>
                    </View>

                    {myPage === 1 && user.userId !== userData.userId ? (
                        <TouchableOpacity style={styles.removeButton} onPress={() => confirmRemove(user.userId)}>
                            <Ionicons name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.removeButtonPlaceholder} />
                    )}
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingVertical: 12,
        paddingHorizontal: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    pressed: {
        backgroundColor: '#e2e2e2',
    },
    textContainer: {
        flex: 1,
        marginLeft: 14,
    },
    firstName: {
        fontSize: 17,
        fontWeight: '600',
        color: GlobalStyles.colors.textColor,
        letterSpacing: 0.3,
    },
    lastName: {
        fontSize: 15,
        fontWeight: '400',
        color: '#666',
        marginTop: 2,
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: GlobalStyles.colors.nearWhite,
    },
    removeButton: {
        backgroundColor: '#ff4d4d',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
    },
    removeButtonPlaceholder: {
        width: 36,
        height: 36,
        marginLeft: 10,
    },
});

export default ParticipantComponent;
