import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const userData = useSelector(state => state.auth.userData);

  const fetchUserActivities = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setIsInitialLoading(true);

      if (!userData?.userId) {
        console.warn("No user ID found.");
        setActivitiesData([]);
        setIsInitialLoading(false);
        return;
      }

      const userRef = doc(db, "users", userData.userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.warn("User not found in Firestore.");
        setActivitiesData([]);
        setIsInitialLoading(false);
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
    } finally {
      if (!isRefresh) setIsInitialLoading(false);
    }
  }, [userData?.userId]);

  useEffect(() => {
    fetchUserActivities(false);
  }, [fetchUserActivities]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserActivities(true);
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
        <Text style={styles.headerText}>My Activities</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('AddNewEventScreen')}
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {isInitialLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : activitiesData.length > 0 ? (
        <FlatList
          data={activitiesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <Animatable.View 
              key={itemData.item.id}
              animation="fadeInUp"
              duration={500}
              delay={itemData.index * 100}
            >
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
                  location={itemData.item.location}
                />
              </TouchableOpacity>
            </Animatable.View>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.textColor,
  },
  addButton: {
    backgroundColor: GlobalStyles.colors.mainColor,
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActivitiesScreen;
