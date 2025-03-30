import React, { useCallback, useState, useEffect } from 'react';
import { Alert, TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../buttons/IconButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '../../constants/styles';
import { geocodeAsync, reverseGeocodeAsync } from 'expo-location';
import Search from '../Search';

const Map = ({ setIsPickingOnMap, setLocation }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [address, setAddress] = useState('');
     const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const region = {
        latitude: 32.0853,
        longitude: 34.7818,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = async (event) => {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat, lng });

        // Fetch the address for the selected location
        const addressData = await reverseGeocodeAsync({ latitude: lat, longitude: lng });
        if (addressData.length > 0) {
            setAddress(addressData[0].formattedAddress || addressData[0].name);
        }
    };

    const savePickedLocation = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("No location picked!", "You have to pick a location by tapping on the map.");
            return;
        }
        setLocation({
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
            address, // Save the address as well
        });
        setIsPickingOnMap(false);
    }, [selectedLocation, address]);


    const searchLocation = async (searchTerm) => {
        try {
            setIsLoading(true);
            const geocodedLocation = await geocodeAsync(searchTerm);
            const { latitude, longitude } = geocodedLocation[0];
            const addressData = await reverseGeocodeAsync({ latitude, longitude });
            const addressResult = addressData.length > 0 ? addressData[0].formattedAddress || addressData[0].name : "Unknown address";
            console.log(addressData);
            setAddress(addressResult);
            
       
            setSelectedLocation({ lat: latitude, lng: longitude });
            setLocation({ latitude, longitude, address });
    
            setIsLoading(false);
          
           
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    
    const selectLocationHandlerIOS = async (event) => {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat, lng });
    
        // Fetch the address for the selected location
        const addressData = await reverseGeocodeAsync({ latitude: lat, longitude: lng });
    
        if (!addressData || addressData.length === 0) {
            setAddress("Unknown address");
            return;
        }
    
        const item = addressData[0]; 
    
        const name = item.name || "";
        const city = item.city || "";
        const country = item.country || "";
    
        const address = [name, city, country].filter(Boolean).join(", "); // מסיר ערכים ריקים
    
        setAddress(address || "Unknown address");
    };

    const searchLocationIOS = async (searchTerm) => {
        try {
            setIsLoading(true);
            const geocodedLocation = await geocodeAsync(searchTerm);
    
            if (!geocodedLocation || geocodedLocation.length === 0) {
                setAddress("Location not found");
                setIsLoading(false);
                return;
            }
    
            const { latitude, longitude } = geocodedLocation[0];
            const addressData = await reverseGeocodeAsync({ latitude, longitude });
    
            if (!addressData || addressData.length === 0) {
                setAddress("Unknown address");
                setIsLoading(false);
                return;
            }
    
            const item = addressData[0]; 
            
            // אם city לא קיים, נשתמש בשדות חלופיים כמו subregion או district
            const name = item.name || "";
            const city = item.city || item.subregion || item.district || "";
            const country = item.country || "";
    
            const address = [name, city, country].filter(Boolean).join(", ");
    
            setAddress(address || "Unknown address");
            setSelectedLocation({ lat: latitude, lng: longitude });
            setLocation({ latitude, longitude, address });
    
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    

    
    return (
        <View style={styles.container}>
            <View style={Platform.OS==="ios"?{marginTop:30} :{}}>
                <TouchableOpacity
                    onPress={() => setIsPickingOnMap(false)}
                    style={styles.backButton}
                >
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>

             <Search search={search} setSearch={setSearch} onSubmitHandle={Platform.OS === "android" ? searchLocation : searchLocationIOS}   />
           
           
            <MapView
                region={selectedLocation ? {
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                } : region}
                style={styles.map}
                onPress={Platform.OS==="android" ? selectLocationHandler : selectLocationHandlerIOS }
            >
                {selectedLocation && (
                    <Marker
                        title="Picked Location"
                        coordinate={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lng
                        }}
                    />
                )}
            </MapView>

            {address && (
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>{address}</Text>
                </View>
            )}

            <View style={{ alignItems: 'center',}}>
                <IconButton
                    information="Save"
                    iconName="save"
                    IconPack={AntDesign}
                    onPress={savePickedLocation}
                    containerStyle={{
                        backgroundColor: GlobalStyles.colors.mainColorDark,
                        width: '30%',
                        position: 'absolute',
                        bottom: Platform.OS === "android" ? 110 : 120, 
                        left: "0%",  
                        transform: [{ translateX: '-50%' }], 
                        zIndex: 9999,  
                    }}
                    iconColor="white"
                    informationStyle={{ color: 'white' }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    backButton: {
       margin:10
    },
    addressContainer: {
        position: 'absolute',
        bottom:  Platform.OS === "android" ? 60 : 70,
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
});

export default Map;
