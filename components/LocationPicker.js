import { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, TextInput, Modal, TouchableOpacity, Text } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from './Input';

export default function LocationPicker() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg('Oops, this will not work on Snack in an Android Emulator. Try it on your device!');
        return;
      }
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        getAddressFromCoordinates(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        setErrorMsg('Failed to retrieve location');
      }
    }

    getCurrentLocation();
  }, []);

  const handleMapPress = async (e) => {
    const newLocation = e.nativeEvent.coordinate;
    setSelectedLocation(newLocation);
    getAddressFromCoordinates(newLocation.latitude, newLocation.longitude);
  };

  const searchLocation = async (address) => {
    try {
      const geocodedLocation = await Location.geocodeAsync(address);
      if (geocodedLocation.length > 0) {
        const { latitude, longitude } = geocodedLocation[0];
        setSelectedLocation({ latitude, longitude });

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        getAddressFromCoordinates(latitude, longitude);
        setErrorMsg(''); // Clear the error message if valid
      } else {
        setErrorMsg('Address not found. Please enter a valid address.');
        setAddress(''); // Clear the address field if invalid
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      setErrorMsg('There was an error while searching for the address. Please try again.');
      setAddress(''); // Clear the address field if error occurs
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const reverseGeocodedLocation = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (reverseGeocodedLocation.length > 0) {
        const { street, city, region, country, streetNumber } = reverseGeocodedLocation[0];

        // Create a full address with street number if available
        const formattedAddress = `${street || ''} ${streetNumber || ''}, ${city || ''}, ${region || ''}, ${country || ''}`;

        setAddress(formattedAddress); // Update the address with street number
      }
    } catch (error) {
      console.error('Error reverse geocoding location:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Clicking Output opens the modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Input
          inputOption={{ editable: false, multiline: true }}
          id="address"
          label="Select Address"
          iconName="location-outline"
          value={address}
          IconPack={Ionicons}
        />
      </TouchableOpacity>

      {/* Modal for map and search box */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {/* Close button */}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color="grey" style={styles.searchIcon} />
            <TextInput
              style={{ flex: 1, marginRight: 10 }}
              placeholder="Enter address"
              onChangeText={(text) => setAddress(text)}
              onSubmitEditing={() => { searchLocation(address) }}
              returnKeyType="search"
              value={address} // Bind the value of TextInput to the address state
            />
          </View>

          {/* Display error message if any */}
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          {location && region && (
            <MapView style={styles.map} region={region} onPress={handleMapPress}>
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              />
              {selectedLocation && <Marker coordinate={selectedLocation} />}
            </MapView>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  map: {
    width: '100%',
    height: 400,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 20,
  },
  searchIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});
