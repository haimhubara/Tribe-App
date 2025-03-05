import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TextInput, TouchableOpacity } from 'react-native';
import ActivityComponent from '../components/ActivityComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchScreen = ({ navigation, route }) => {
    const [search, setSearch] = useState('');
    const handleActivityPress = (activityData) => {
        navigation.navigate('PersonalActivityProfileScreen', { activity: activityData, myPage: 1 });
    };

    const activities = [
        { name: "יוגה בפארק", description: "שיעור יוגה מרגיע בטבע", participants: 15, distance: "0 km" },
        { name: "סיור אופניים", description: "סיור אופניים לאורך החוף", participants: 20, distance: "10 km" },
        { name: "סדנת בישול", description: "סדנת בישול בריא וטעים", participants: 12, distance: "0 km" },
        { name: "ערב סרט", description: "ערב סרט תחת כיפת השמיים", participants: 30, distance: "0 km" },
        { name: "משחק כדורסל", description: "משחק כדורסל קבוצתי בפארק", participants: 18, distance: "0 km" },
        { name: "סדנת ציור", description: "סדנת ציור למתחילים ומתקדמים", participants: 10, distance: "0 km" },
        { name: "טיול שקיעה", description: "טיול רגלי לצפייה בשקיעה", participants: 25, distance: "5 km" },
        { name: "משחק כדורגל", description: "משחק כדורגל ידידותי בפארק", participants: 22, distance: "0 km" },
        { name: "סדנת צילום", description: "סדנת צילום בטבע", participants: 8, distance: "0 km" },
        { name: "ערב קריוקי", description: "ערב קריוקי עם חברים", participants: 16, distance: "0 km" },
        { name: "משחק טניס", description: "משחק טניס זוגות בפארק", participants: 4, distance: "0 km" },
        { name: "סדנת גינון", description: "סדנת גינון ביתי וטיפים לגידול צמחים", participants: 14, distance: "0 km" },
        { name: "טיול זריחה", description: "טיול רגלי לצפייה בזריחה", participants: 28, distance: "5 km" },
        { name: "משחק כדורעף", description: "משחק כדורעף חופים", participants: 12, distance: "0 km" },
        { name: "סדנת ריקוד", description: "סדנת ריקוד סלסה", participants: 10, distance: "0 km" },
        { name: "ערב משחקי קופסה", description: "ערב משחקי קופסה עם חברים", participants: 18, distance: "0 km" },
        { name: "משחק פריזבי", description: "משחק פריזבי בפארק", participants: 16, distance: "0 km" },
        { name: "סדנת כתיבה", description: "סדנת כתיבה יוצרת", participants: 8, distance: "0 km" },
        { name: "טיול אופניים בהרים", description: "טיול אופניים אתגרי בהרים", participants: 20, distance: "20 km" },
        { name: "ערב שירה בציבור", description: "ערב שירה בציבור עם גיטרה", participants: 25, distance: "0 km" },
    ];

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.root}>
                    <View style={[styles.searchContainer, Platform.OS === 'ios' && styles.inputIOS, Platform.OS === 'web' && { padding: 10 }]}>
                        <Ionicons name="search" size={16} color="grey" style={styles.searchIcon} />
                        <TextInput placeholder="Search"
                            style={{ flex: 1, marginRight: 10 }}
                            onChangeText={(data) => { setSearch(data) }}
                            value={search}
                            autoCorrect={false}
                            autoCapitalize="none"
                            autoComplete="off"
                        />
                    </View>
                    {activities.map((activity, index) => (
                        <TouchableOpacity key={index} onPress={() => handleActivityPress(activity)}>
                            <ActivityComponent
                                name={activity.name}
                                description={activity.description}
                                participants={activity.participants}
                                distance={activity.distance}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ededed',
        padding: 2,
        margin: 16,
        borderRadius: 8,
        borderWidth: 0.1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        width: '90%',
        height: 40,
    },
    searchIcon: {
        marginLeft: 8,
    }
});

export default SearchScreen;