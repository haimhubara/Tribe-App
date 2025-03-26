import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../util/firebaseConfig.json';

import { getActivityData } from '../util/actions/activityAction';
import ActivityComponent from '../components/ActivityComponent';
import { GlobalStyles } from '../constants/styles';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ActivitiesScreen = ({ navigation }) => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const userData = useSelector(state => state.auth.userData);

  const fetchUserActivities = useCallback(async () => {
    try {
      if (!userData?.userId) {
        console.log(userData);
        console.warn("No user ID found.");
        return;
      }

      const userRef = doc(db, "users", userData.userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.warn("User not found in Firestore.");
        setActivitiesData([]);
        return;
      }

      const updatedUserData = userSnap.data();
      const activityIds = Array.isArray(updatedUserData.activities) ? updatedUserData.activities : [];

      const fetchedActivities = [];

      for (let activityId of activityIds) {
        try {
          const activityData = await getActivityData(activityId);
          if (activityData) {
            fetchedActivities.push(activityData);
          }
        } catch (err) {
          console.error("Error fetching activity:", activityId, err);
        }
      }

      setActivitiesData(fetchedActivities);
    } catch (error) {
      console.error("Error fetching user activities:", error);
    }
  }, [userData.userId]);

  useEffect(() => {
    fetchUserActivities();
  }, [fetchUserActivities]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserActivities();
    setRefreshing(false);
  }, [fetchUserActivities]);

  const isoToDateString = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().split('T')[0];
  };

  const isoToTimeString = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.text}>My Activities</Text>
        <TouchableOpacity 
          style={styles.floatingButton} 
          onPress={() => navigation.navigate('AddNewEventScreen')}
        >
          <Feather name="plus" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {activitiesData.length > 0 ? (
        <FlatList
          data={activitiesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <TouchableOpacity onPress={() => {
              navigation.navigate('PersonalActivityProfileScreen', { id: itemData.item.id });
            }}>
              <ActivityComponent
                id={itemData.item.id}
                name={itemData.item.name}
                description={itemData.item.description}
                participants={itemData.item.activityParticipants?.length || 1}
                distance={itemData.item.distance}
                date={isoToDateString(itemData.item.date)}
                time={isoToTimeString(itemData.item.time)}
                imageUrl={itemData.item.imageUrl}
              />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[GlobalStyles.colors.mainColor]}
            />
          }
        />
      ) : (
        <View style={styles.notFound}>
          <Feather name="activity" size={55} color="grey" />
          <Text style={styles.notFoundText}>You don't participate in activities yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    marginBottom: 20,
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'bold',
    letterSpacing: 0.3,
    color: GlobalStyles.colors.textColor,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
  },
  floatingButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: GlobalStyles.colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default ActivitiesScreen;
