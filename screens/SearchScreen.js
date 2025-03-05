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
        { name: "Yoga in the Park", description: "Relaxing yoga class in nature", participants: 15, distance: "0 km" },
        { name: "Bike Tour", description: "Bike tour along the coast", participants: 20, distance: "10 km" },
        { name: "Cooking Workshop", description: "Healthy and tasty cooking workshop", participants: 12, distance: "0 km" },
        { name: "Movie Night", description: "Outdoor movie night", participants: 30, distance: "0 km" },
        { name: "Basketball Game", description: "Group basketball game in the park", participants: 18, distance: "0 km" },
        { name: "Painting Workshop", description: "Painting workshop for beginners and advanced", participants: 10, distance: "0 km" },
        { name: "Sunset Hike", description: "Hiking to watch the sunset", participants: 25, distance: "5 km" },
        { name: "Soccer Game", description: "Friendly soccer game in the park", participants: 22, distance: "0 km" },
        { name: "Photography Workshop", description: "Outdoor photography workshop", participants: 8, distance: "0 km" },
        { name: "Karaoke Night", description: "Karaoke night with friends", participants: 16, distance: "0 km" },
        { name: "Tennis Game", description: "Doubles tennis game in the park", participants: 4, distance: "0 km" },
        { name: "Gardening Workshop", description: "Home gardening workshop and plant growing tips", participants: 14, distance: "0 km" },
        { name: "Sunrise Hike", description: "Hiking to watch the sunrise", participants: 28, distance: "5 km" },
        { name: "Volleyball Game", description: "Beach volleyball game", participants: 12, distance: "0 km" },
        { name: "Dance Workshop", description: "Salsa dance workshop", participants: 10, distance: "0 km" },
        { name: "Board Games Night", description: "Board games night with friends", participants: 18, distance: "0 km" },
        { name: "Frisbee Game", description: "Frisbee game in the park", participants: 16, distance: "0 km" },
        { name: "Writing Workshop", description: "Creative writing workshop", participants: 8, distance: "0 km" },
        { name: "Mountain Bike Tour", description: "Challenging mountain bike tour", participants: 20, distance: "20 km" },
        { name: "Sing-Along Night", description: "Sing-along night with guitar", participants: 25, distance: "0 km" },
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