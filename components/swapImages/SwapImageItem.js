import React, { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, Text, Pressable, Modal, Touchable, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { GlobalStyles } from "../../constants/styles";
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../Cloudinary";
import { updateLoggedInUserData } from "../../store/authSlice";
import { updateSignInUserData } from "../../util/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';




const SwapImageItem = ({ imageUri , editStyle ,imageId}) => {
     const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
     const [loading, setLoading] = useState(false);
     const dispach = useDispatch();
     const { width, height } = useWindowDimensions();
     const [modalVisible, setModalVisible] = useState(false);
     const defaultImage = "https://via.placeholder.com/150/FFFFFF?text=No+Image";
     const [isImageUploded, setIsImageUploaded] = useState(false);

     
     const userData = useSelector(state => state.auth.userData);

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

    const editPressHandle = () => {
        setModalVisible(true);
        
    }

   
   
    async function handleNewImageSelection(result) {
        if (result.canceled) {
            Alert.alert("Error", "Image picking was canceled.");
            return;
        }

        const newImageUri = result.assets?.[0]?.uri;
        if (!newImageUri) {
            Alert.alert("Error", "No image found.");
            return;
        }
        try {
            setLoading(true);
            if (imageUri === defaultImage) {
                let images = { ...userData.images }; 
                const imageCloudinaryUrl = await uploadImageToCloudinary(newImageUri);
                images[imageId] = imageCloudinaryUrl;
              
        
                await updateSignInUserData(userData.userId, { images });
                dispach(updateLoggedInUserData({newData:{ images }}));
                setIsImageUploaded(true);
            }else{
                const oldImageUrl = userData.images[imageId];
                const publicId = oldImageUrl.split('/').pop().split('.')[0];
                let images = { ...userData.images }; 
                await deleteImageFromCloudinary(publicId);
                const imageCloudinaryUrl = await uploadImageToCloudinary(newImageUri);
                images[imageId] = imageCloudinaryUrl;
                await updateSignInUserData(userData.userId, { images });
                dispach(updateLoggedInUserData({newData:{ images }}));
                setIsImageUploaded(true);
            }
            setTimeout(()=>{
                setIsImageUploaded(false);
            },3000);
        } catch (error) {
            console.log(error);
       
        }finally {
         setLoading(false);
        }
        setModalVisible(false);
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

        await handleNewImageSelection(result);
    }
    
    async function openGallery() {
        const result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [1, 1]
        });

        await handleNewImageSelection(result);
    }

  
    return (
        <View style={[styles.container, { width }]}>
    
           <Image 
                // source={{ uri: imageUri }}  
                source={typeof imageUri === "string" && imageUri.startsWith("http") ? { uri: imageUri } : imageUri}
                style={[styles.image, { width:width*0.9, height:width*0.9}]} 
                resizeMode="cover"
            />

            {/* <IconButton 
                iconName="pencil"
                IconPack={Icon}
                containerStyle={styles.containerStyle}
                rootStyle={[styles.rootContainer,editStyle]}
                onPress={editPressHandle}
                iconColor='white'
                iconSize={22}
          /> */}
          <TouchableOpacity style={[styles.rootIconContainer,editStyle]} onPress={editPressHandle}>
                <FontAwesome name='pencil' size={18} color={'white'}/>
          </TouchableOpacity>

         <View  style={{ marginTop: 10 }}>
              
            {loading && (
                <ActivityIndicator
                    size={'small'}
                    color={GlobalStyles.colors.mainColor}
                
                />
            )}
            {isImageUploded && <Text>Image Saved!</Text>}
        </View>

        {/* Modal הצגת אפשרויות */}
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible && !loading} 
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Choose an option</Text>
                    <Pressable style={styles.modalButton} onPress={openCamera}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Icon name="camera" size={18} color="white" />
                            <Text style={[styles.modalButtonText, { marginLeft: 5 }]}>Open Camera</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.modalButton} onPress={openGallery}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Icon name="photo" size={18} color="white" />
                            <Text style={[styles.modalButtonText, { marginLeft: 5 }]}>Open Gallery</Text>
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
        marginBottom:10
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
    rootIconContainer: {
        position: 'absolute',
        bottom:-10,
        right:10,
        flexDirection: "row",
        backgroundColor:GlobalStyles.colors.mainColorDark,
        borderRadius:40,
        padding:16
    },
    containerStyle:{
        backgroundColor:GlobalStyles.colors.mainColor,
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
