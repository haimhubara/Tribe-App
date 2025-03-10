import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Platform, TextInput, TouchableOpacity, RefreshControl, Modal, Pressable } from 'react-native';
import ActivityComponent from '../components/ActivityComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Sidebar from '../components/Sidebar';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "../util/firebaseConfig.json";

const SearchScreen = ({ navigation, route }) => {
    const [search, setSearch] = useState('');
    const [activities, setActivities] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [filters, setFilters] = useState({});


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const handleActivityPress = (activityData,id) => {
        navigation.navigate('PersonalActivityProfileScreen', { activity: activityData, myPage: 1 , id:id});
    };

    const isoToDateString = (isoString) => {
        if (!isoString) return null; // אם אין ערך, החזר null
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return null; // אם התאריך לא תקף, החזר null
        return date.toISOString().split('T')[0]; // מחזיר YYYY-MM-DD
    };
    
    const isoToTimeString = (isoString) => {
        if (!isoString) return null;
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return null;
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // מחזיר בפורמט 24 שעות
    };
    

    // const fetchActivities = useCallback(async () => {
    //     setRefreshing(true);
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "activities"));
    //         const fetchedActivities = querySnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));
    //         setActivities(fetchedActivities);
    //     } catch (error) {
    //         console.error("Error fetching activities:", error);
    //     }
    //     setRefreshing(false);
    // }, [db]);

    const fetchActivities = useCallback(async (filters = {}) => {
        setRefreshing(true);
        try {
            const querySnapshot = await getDocs(collection(db, "activities"));
            let fetchedActivities = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            // סינון לפי תאריך התחלה וסיום
            if (filters.dateStart || filters.dateEnd) {
                fetchedActivities = fetchedActivities.filter(activity => {
                    const activityDate = new Date(activity.date);
                    return (!filters.dateStart || activityDate >= new Date(filters.dateStart)) &&
                        (!filters.dateEnd || activityDate <= new Date(filters.dateEnd));
                });
            }

            if (filters.timeStart || filters.timeEnd) {
                fetchedActivities = fetchedActivities.filter(activity => {
                    if (!activity.time) return false; // אם אין זמן, הפעילות לא תיכלל
                    
                    const activityTime = new Date(activity.time);
                    if (isNaN(activityTime.getTime())) return false; // אם הזמן אינו תקף, דלג על הפעילות
            
                    return (!filters.timeStart || new Date(filters.timeStart) <= activityTime) &&
                           (!filters.timeEnd || new Date(filters.timeEnd) >= activityTime);
                });
            }
            
    

            if (filters.selectedGender && filters.selectedGender !== "Any") {
                fetchedActivities = fetchedActivities.filter(activity => activity.gender === filters.selectedGender);
            }

            if(filters.selectedNumPartitions>1){
                fetchedActivities = fetchedActivities.filter(activity => activity.selectedNumPartitions >= filters.selectedNumPartitions);
            }
    

            if (Array.isArray(filters.selectedCategories) && filters.selectedCategories.length > 0) {
                fetchedActivities = fetchedActivities.filter(activity =>
                    filters.selectedCategories.some(category => activity.categories.includes(category))
                );
            }
    
            // ✅ תיקון: בדיקה אם selectedLanguages מוגדר לפני גישה ל-length
            if (Array.isArray(filters.selectedLanguages) && filters.selectedLanguages.length > 0) {
                fetchedActivities = fetchedActivities.filter(activity =>
                    filters.selectedLanguages.some(language => activity.languages.includes(language))
                );
            }
    
            setActivities(fetchedActivities);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
        setRefreshing(false);
    }, [db]);
    
    

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    const onRefresh = useCallback(() => {
        fetchActivities();
    }, [fetchActivities]);

    const applyFilters = (filters) => {
        setFilters(filters); // שמירת הפילטרים
        fetchActivities(filters); // קריאה לפונקציה שמביאה את הנתונים עם הפילטרים
    };
    

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <View style={styles.headerContainer}>
            <Sidebar applyFilters={applyFilters} />
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={16} color="grey" style={styles.searchIcon} />
                    <TextInput 
                        placeholder="Search"
                        style={{ flex: 1, marginRight: 10 }}
                        onChangeText={setSearch}
                        value={search}
                        autoCorrect={false}
                        autoCapitalize="none"
                        autoComplete="off"
                    />
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchActivities(filters)} />}

            >
                {activities
                    .sort((a, b) => a.distance - b.distance)
                    .map((activity, index) => (
                        <TouchableOpacity key={index} onPress={() => handleActivityPress(activity, activity.id)}>
                            <ActivityComponent
                                id={activity.id}
                                name={activity.name}
                                description={activity.description}
                                participants={activity.selectedNumPartitions}
                                distance={activity.distance}
                                date={isoToDateString(activity.date)}
                                time={isoToTimeString(activity.time)}
                            />
                        </TouchableOpacity>
                    ))}
            </ScrollView>


            {/* Modal של ה-Sidebar */}
            <Modal visible={sidebarVisible} animationType="slide" transparent>
                <Pressable style={styles.modalOverlay} onPress={() => setSidebarVisible(false)} />
                <View style={styles.sidebarContainer}>
                    <Sidebar closeSidebar={() => setSidebarVisible(false)} />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    menuButton: {
        padding: 10,
        marginRight: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ededed',
        padding: 2,
        borderRadius: 8,
        borderWidth: 0.1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        flex: 1,
        height: 40,
    },
    searchIcon: {
        marginLeft: 8,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sidebarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '75%',
        height: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
});

export default SearchScreen;
