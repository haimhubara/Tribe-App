import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, Pressable, Platform } from 'react-native';
import IconButton from './buttons/IconButton';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '../constants/styles';
import Map from './Location/Map';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync, Accuracy, reverseGeocodeAsync, geocodeAsync } from 'expo-location';

import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator } from 'react-native-paper';
import Input from './Input';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from "@expo/vector-icons/Ionicons";

const LocationPicker = ({ inputChangeHandler,initialLocation  }) => {
  
  const [location, setLocation] = useState(initialLocation ||null);
  const [isPickingOnMap, setIsPickingOnMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to enable location permissions to use this feature.');
      }
    };
    requestPermissions();
  }, []);

  const getLocationHandler = async () => {
    try {
      setIsLoading(true);
      const locationResult = await getCurrentPositionAsync({ accuracy: Accuracy.Lowest });
      const { latitude, longitude } = locationResult.coords;
      
      const addressData = await reverseGeocodeAsync({ latitude, longitude });

      const address = addressData.length > 0 ? addressData[0].formattedAddress || addressData[0].name : "Unknown address";

      setLocation({ latitude, longitude, address });
      setIsLoading(false);
      setTimeout(() => setIsPickingOnMap(false), 300);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Could not fetch location. Make sure GPS is enabled.");
    }
  };

  const confirmHandle = () => {
    if (!location) {
      Alert.alert("Please select location", "Please select a location before confirming.");
      return;
    }
    inputChangeHandler("location",location);
    setModalVisible(false);
  };

  const onBackPress = () => {
    setModalVisible(false);
  }

  const getLocationHandlerIOS = async() => {
    try {
      setIsLoading(true);
      const locationResult = await getCurrentPositionAsync({ accuracy: Accuracy.Lowest });
      const { latitude, longitude } = locationResult.coords;
      
      const addressData = await reverseGeocodeAsync({ latitude, longitude });
      let address = "Unknown address";
     
      for(let item of addressData ){
          address = `${item.name} ${item.streetNumber}  ${item.city}, ${item.country }  `
      }
      if(addressData.length<0){
        address = "Unknown address";
        return;
      }

     

      setLocation({ latitude, longitude, address });
      setIsLoading(false);
      setTimeout(() => setIsPickingOnMap(false), 300);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Could not fetch location. Make sure GPS is enabled.");
    }
  };
 


  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Input
          label="Address"
          IconPack={Entypo}
          iconName="location-pin"
          value={location ? location.address : 'Select Location'}
          inputOption={{ editable: false,multiline:true }}
          
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        {!isPickingOnMap && 
        <Pressable onPress={onBackPress} style={styles.iconContainer}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </Pressable>
        }
        {isPickingOnMap ? (
          <View style={styles.container}>
            <Map setIsPickingOnMap={setIsPickingOnMap} setLocation={setLocation} location={location} />
          </View>
        ) : (
          <View style={styles.container}>
             
            <View style={styles.mapPreview}>
              {isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : location ? (
                <>
                
                  <MapView
                    key={location?.latitude}
                    style={styles.map}
                    region={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  >
                    <Marker coordinate={location} title="Your Location" />
                  </MapView>

                  {/* Address Display */}
                  {location.address && (
                    <View style={styles.addressContainer}>
                      <Text style={styles.addressText}>{location.address}</Text>
                    </View>
                  )}
                </>
                
                
              ) : (
                <Text style={styles.noLocationText}>No location selected</Text>
              )}
            </View>
            <View style={styles.actions}>
              <IconButton
                iconName="map-pin"
                IconPack={Feather}
                information="Current Location"
                onPress={ Platform.OS === "android" ? getLocationHandler : getLocationHandlerIOS }
                containerStyle={{ backgroundColor: GlobalStyles.colors.mainColorDark }}
                iconColor="white"
                informationStyle={{ color: 'white' }}
              />
              <IconButton
                iconName="map"
                IconPack={Feather}
                information="Pick on Map"
                onPress={() => setIsPickingOnMap(true)}
                containerStyle={{ backgroundColor: GlobalStyles.colors.mainColorDark }}
                iconColor="white"
                informationStyle={{ color: 'white' }}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              <IconButton
                iconName="checkcircleo"
                IconPack={AntDesign}
                information="Confirm"
                onPress={confirmHandle}
                containerStyle={{ backgroundColor: GlobalStyles.colors.primary, width: '40%' }}
                iconColor="white"
                informationStyle={{ color: 'white' }}
              />
            </View>
          </View>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  mapPreview: {
    marginVertical: '2%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.mainColor,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: '2%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  noLocationText: {
    color: 'white',
  },
  iconButtonContainer: {
    backgroundColor: GlobalStyles.colors.mainColorDark,
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  confirmButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  confirmButton: {
    backgroundColor: GlobalStyles.colors.primary,
    width: '40%',
  },
  addressContainer: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
    zIndex: 2,
},
addressText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
},
iconContainer: {
  width: 40,
  alignItems: "flex-start",
  marginLeft:8,
  marginTop: Platform.OS === "ios" ? 34 :4
},
});

export default LocationPicker;