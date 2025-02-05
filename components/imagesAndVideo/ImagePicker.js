import { View, Text, StyleSheet, Alert, Image, Pressable, Modal } from "react-native";
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";

const ImagePicker = ({ pickedImage, setPickedImage, imageSytle, buttonStyle, imageRootStyle }) => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [modalVisible, setModalVisible] = React.useState(false);

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Permission Denied", "Camera permissions are required to use this feature. Please enable them in your device settings.");
            return false;
        }
        return true;
    }

    async function takeImageHandle() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const result = await launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
        });

        if (result.canceled) {
            Alert.alert("Error", "Image picking was canceled.");
            return;
        }

        const imageUri = result.assets && result.assets.length > 0 ? result.assets[0].uri : null;
        if (!imageUri) {
            Alert.alert("Error", "No image found.");
            return;
        }

        setPickedImage(imageUri);
    }

    async function pickImageHandle() {
        const result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
        });

        if (result.canceled) {
            Alert.alert("Error", "Image picking was canceled.");
            return;
        }

        const imageUri = result.assets && result.assets.length > 0 ? result.assets[0].uri : null;
        if (!imageUri) {
            Alert.alert("Error", "No image found.");
            return;
        }

        setPickedImage(imageUri);
    }

    return (
        <View style={[styles.root, imageRootStyle]}>
            {pickedImage ? (
                <Pressable onPress={() => setModalVisible(true)}>
                    <View style={[styles.imagePreview, imageSytle]}>
                        <Image style={styles.image} source={{ uri: pickedImage }} />
                    </View>
                </Pressable>
            ) : (
                <View style={[styles.imagePreview, imageSytle]}>
                </View>
            )}

            <View style={[styles.buttonsContainer, buttonStyle]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.icon,
                        { opacity: pressed ? 0.6 : 1 },
                    ]}
                    onPress={takeImageHandle}
                >
                    <Ionicons name="camera" size={30} color="black" />
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.icon,
                        { opacity: pressed ? 0.6 : 1 },
                    ]}
                    onPress={pickImageHandle}
                >
                    <Ionicons name="images" size={26} color="black" />
                </Pressable>
            </View>

            {/* Modal for preview */}
            {pickedImage && (
               <Modal visible={modalVisible} transparent={true} animationType="fade">
               <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
                 <View style={styles.modalHeader}>
                   <Ionicons name="arrow-back" size={32} color="black" onPress={() => setModalVisible(false)} />
                   <Text style={styles.modalTitle}>Image Preview</Text>
                 </View>
                 <Image style={styles.fullScreenImage} source={{ uri: pickedImage }} />
               </Pressable>
             </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {},
    imagePreview: {
        borderWidth: 0.1,
        width: 180,
        height: 200,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        resizeMode: "cover",
    },
    placeholderText: {
        color: 'gray',
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    icon: {
        marginHorizontal: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 16, 
        marginTop:32
      },
      modalTitle: {
        backgroundColor: "white",
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1, 
    },
    fullScreenImage: {
        width: "90%",
        height: "70%",
        resizeMode: "contain",
        borderRadius: 10,
    },
});

export default ImagePicker;
