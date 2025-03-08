import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ImageToShow from './imagesAndVideo/ImageToShow'
import { useNavigation } from '@react-navigation/native'

const FriendRequestComponent = ({ user }) => {
    const navigation = useNavigation();
    const [isFriend, setIsFriend] = useState(false);
    const [isRequestApproved, setIsRequestApproved] = useState(false);

    function openFriendProfileHandle() {
        navigation.navigate("FriendProfile", { isFriend: isFriend });
    }

    function handleApproveRequest() {
        setIsFriend(true);
        setIsRequestApproved(true);
        // כאן אפשר להוסיף לוגיקה לשליחת אישור לשרת או עדכון מסד הנתונים
    }

    return (
        <Pressable onPress={openFriendProfileHandle}>
            {({ pressed }) => (
                <View style={[styles.root, pressed && styles.clicked]}>
                    <ImageToShow 
                        imageUrl={user.imageSouce} 
                        imageStyle={styles.imageStyle} 
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>{user.firstName}</Text>
                        <Text style={styles.text} numberOfLines={1}>{user.lastName}</Text>
                    </View>

                    {!isRequestApproved && (
                        <TouchableOpacity 
                            style={styles.approveButton} 
                            onPress={handleApproveRequest}
                        >
                            <Text style={styles.approveButtonText}>Approve</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </Pressable>
    );
}

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
       padding: 10,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
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
        backgroundColor: '#d1d1d1'
    },
    imageStyle: {
        marginLeft: 10,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: GlobalStyles.colors.nearWhite,
    },
    approveButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    approveButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default FriendRequestComponent;
