import { View, Text,StyleSheet, Alert, Image, Pressable  } from "react-native";
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';


const ImagePicker = ({pickedImage,setPickedImage,imageSytle,buttonStyle}) => {
    const [cameraPermissionInformation,requestPermision] =  useCameraPermissions();
    
    async function verifyPermissions(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permmisionResponse = await requestPermision();
            return permmisionResponse.granted;
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert( "Permission Denied","Camera permissions are required to use this feature. Please enable them in your device settings.");
            return false;
        }
        return true;
    }
    async function takeImageHandle() {
        const hasPermision = await verifyPermissions();
        if (!hasPermision) {
            return;
        }
    
        const result = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
    
        if (result.canceled) {
            Alert.alert("Error", "Image picking was canceled.");
            return;
        }
    
        // Access the first asset's URI
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
            aspect: [16, 9], 
            quality: 0.5, 
        });
    
        if (result.canceled) {
            Alert.alert("Error", "Image picking was canceled.");
            return;
        }
    
        // Access the first asset's URI
        const imageUri = result.assets && result.assets.length > 0 ? result.assets[0].uri : null;
    
        if (!imageUri) {
            Alert.alert("Error", "No image found.");
            return;
        }
    
        setPickedImage(imageUri);
    }

  return (
    <View style={styles.root}>
        <View style={[styles.imagePreview,imageSytle]}>
            <Image style={styles.image} source={{ uri: pickedImage }} />
        </View>
        <View style={[styles.buttonsContainer,buttonStyle]}>
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

    </View>
  )
}

const styles = StyleSheet.create({
    root:{
        margin:4,
        
    },
    imagePreview:{
        borderWidth:0.25,
        width: 180,
        height:200,
        aspectRatio: 16 / 9,
        marginVertical:8,
        backgroundColor:'white',
        borderRadius:4,
         // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Shadow for Android
        elevation: 5,
    },
    image:{
        width:'100%',
        height:'100%',
        borderRadius:4,
       
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
});
 

export default ImagePicker
