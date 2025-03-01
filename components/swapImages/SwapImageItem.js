import React, { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, Text, Pressable, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { GlobalStyles } from "../../constants/styles";
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import IconButton from "../buttons/IconButton";



const SwapImageItem = ({ imageUri , setImageUri, editStyle }) => {
     const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
     const { width, height } = useWindowDimensions();
     const [modalVisible, setModalVisible] = useState(false);

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


    function editPressHandle() {
        setModalVisible(true);
    }

    async function openCamera() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
    
        const result = await launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [1, 1]

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
    
        setImageUri(imageUri); 
        setModalVisible(false); 
    }
    
    async function openGallery() {
        const result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [1, 1]
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
    
        setImageUri(imageUri);  
        setModalVisible(false);  
    }

  
    return (
        <View style={[styles.container, { width }]}>
    
           <Image 
                source={{ uri: imageUri }}  
                style={[styles.image, { width:width*0.9, height:width*0.9}]} 
                resizeMode="cover"
            />

            <IconButton 
                iconName="pencil"
                IconPack={Icon}
                containerStyle={styles.containerStyle}
                rootStyle={[styles.rootContainer,editStyle]}
                onPress={editPressHandle}
                iconColor='white'
                iconSize={22}
          />

         
           
            {/* Modal for Camera/Gallery Selection */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Choose an option</Text>
                        <Pressable  style= {styles.modalButton} onPress={openCamera}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                 <Icon name="camera" size={18} color="white" />
                                 <Text style={[styles.modalButtonText,{marginLeft:5}]}>Open Camera</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={openGallery}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Icon name="photo" size={18} color="white" />
                                <Text style={[styles.modalButtonText,{marginLeft:5}]}>Open Gallery</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 4,  
        borderWidth: 0.2,  
        borderColor: 'black', 
        overflow: 'hidden', 
        shadowColor: 'black',  
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,  
    },
    rootContainer: {
        position: 'absolute',
        bottom: 3,
        left: 23,  
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10, 
    },
    containerStyle:{
        backgroundColor:'#6D7B8D80',
        paddingVertical:8,
        paddingHorizontal:8,
  
    },
    iconText: {
        color: "white",
        fontSize: 14,
        marginLeft: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: GlobalStyles.colors.nearWhite,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        width: '100%',
        padding: 10,
        backgroundColor: GlobalStyles.colors.mainColor,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalCancel: {
        width: '100%',
        padding: 10,
        backgroundColor: GlobalStyles.colors.errorColor,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalCancelText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SwapImageItem;
