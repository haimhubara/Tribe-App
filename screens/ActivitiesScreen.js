import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { getActivityData } from '../util/actions/activityAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '../constants/styles';
import { useSelector } from 'react-redux';
import ActivityComponent from '../components/ActivityComponent';
import Feather from '@expo/vector-icons/Feather';

const ActivitiesScreen = ({ navigation }) => {
  const [activitiesData, setActivitiesData] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchActivities = async () => {
    setIsLoading(true);
    const activities = [];
    for (let i = 0; i < userData.activities.length; i++) {
      const activityId = userData.activities[i];
      const activityData = await getActivityData(activityId);
      if (activityData) {  
        activities.push(activityData);  
      }
    }
    setActivitiesData(activities);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, [userData.activities]);

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    await fetchActivities();
    setRefreshing(false);
    setIsLoading(false);
  }, [userData.activities]);

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
      </View>
      {isLoading && (  
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.mainColor} />
        </View>
      )}
      {!isLoading && activitiesData.length !== 0 && (
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
                participants={itemData.item.selectedNumPartitions}
                distance={itemData.item.distance}
                date={isoToDateString(itemData.item.date)}
                time={isoToTimeString(itemData.item.time)}
                imageUrl={itemData.item.imageUrl} 
              />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[GlobalStyles.colors.mainColor]} />
          }
        />
      )}
      {!isLoading && activitiesData.length === 0 && (
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
  },
});

export default ActivitiesScreen;
