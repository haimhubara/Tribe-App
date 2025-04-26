import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from "react-native";


export async function pickImageHandle() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "We need permission to access your media library.");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ['images'],
        aspect: [1, 1],
        quality: 1,
    });

    if (result.canceled) {
        Alert.alert("Error", "Image picking was canceled.");
        return;
    }

    const imageUri = result.assets?.[0]?.uri || null;
    if (!imageUri) {
        Alert.alert("Error", "No image found.");
        return;
    }

    return imageUri;
}

export async function openCamera() {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (result.canceled) {
        Alert.alert("Error", "Image picking was canceled.");
        return;
    }

    const imageUri = result.assets?.[0]?.uri || null;
    if (!imageUri) {
        Alert.alert("Error", "No image found.");
        return;
    }

    return imageUri;
}


async function verifyCameraPermissions() {
    if (Platform.OS === "web") return false;

    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
        Alert.alert("Permission Denied", "Camera permissions are required to use this feature. Please enable them in your device settings.");
        return false;
    }

    return true;
}


export async function pickVideoHandle() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "We need permission to access your media library.");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (result.canceled) {
        Alert.alert("Canceled", "Video picking was canceled.");
        return;
    }

    const videoUri = result.assets?.[0]?.uri || null;
    if (!videoUri) {
        Alert.alert("Error", "No video found.");
        return;
    }

    return videoUri;
}




