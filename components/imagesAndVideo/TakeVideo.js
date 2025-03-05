import { Camera, CameraView } from 'expo-camera';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Button from '../buttons/Button';
import { GlobalStyles } from "../../constants/styles";
import * as MediaLibrary from 'expo-media-library';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

const TakeVideo = ({videoUri,setVideoUri,setTakeVideo,onBackPress}) => {
    const [permission, setPermission] = useState(null);
    const [type, setType] = useState("back");
    const [flashMode, setFlashMode] = useState("on");
    const cameraRef = useRef();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [captureImage, setCaptureImage] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mode, setMode] = useState("video");
    const videoRef = useRef(null);
    const navigation = useNavigation();

   
    

    const { width } = useWindowDimensions();
    const height = Math.round((width * 16) / 9);
    const buttonStyle = {margin:0, paddingHorizontal:0,  paddingVertical: 4,  paddingHorizontal:6, marginTop:0,backgroundColor:'black'}

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: micStatus } = await Camera.requestMicrophonePermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
            
            setPermission(
                cameraStatus === 'granted' &&
                micStatus === 'granted' &&
                mediaStatus === 'granted'
            );
        })();
    }, []);

    useEffect(()=>{
        navigation.setOptions({
            tabBarStyle: { display: 'none' }, 
          });
    },[])

    function btnGivePermissionHandle() {
        Camera.requestCameraPermissionsAsync().then(({ status }) => {
            setPermission(status === 'granted');
        });
    }
   

    function toggleCameraType() {
        setType(current => (current === 'back' ? 'front' : 'back'));
    }

    async function capturePhotoHandle() {
       try{
            if (cameraRef.current) {
                let photo = await cameraRef.current.takePictureAsync();
                console.log(photo.uri); 
                setPreviewVisible(true); 
                setCaptureImage(photo);

                const asset = await MediaLibrary.createAssetAsync(photo.uri);
                await MediaLibrary.createAlbumAsync("Tribe app",asset,false);
            }
       }catch(err){
        console.warn(err);
       }
    }
    
    async function RecordHandle() {
        try {
            setIsRecording(true);
            if (cameraRef.current) {
                let video = await cameraRef.current.recordAsync();
                setVideoUri(video.uri);
                setPreviewVisible(true); 
                setIsRecording(false);
                setTakeVideo(false);
                
            }
        } catch (err) {
            console.warn(err);
        }
    }

    function stopRecordHandle() {
        cameraRef.current.stopRecording();
        setIsRecording(false);
    }
    async function saveVideo() {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert("Media Library permission is required to save videos.");
                return;
            }
    
            if (videoUri) {
                const asset = await MediaLibrary.createAssetAsync(videoUri);
                await MediaLibrary.createAlbumAsync("Tribe app", asset, false);
                setPreviewVisible(false);
                setTakeVideo(true);
            }
        } catch (err) {
            console.warn("Error saving video:", err);
        }
    }

    function discardVideo() {
        setPreviewVisible(false);
        setVideoUri(null);
        setTakeVideo(true);
    }
   

    async function updateProgress() {
        if (videoRef.current) {
            const status = await videoRef.current.getStatusAsync();
            if (status.isLoaded) {
                setPosition(status.positionMillis);
                setDuration(status.durationMillis || 1);
            }
        }
    }

    

    if (permission === null) {
        return <View />;
    }

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need permissions to access the camera</Text>
                <Button text="Give Permission" handleClick={btnGivePermissionHandle} />
            </View>
        );
    }

    if (videoUri) {
        return (
            <View style={styles.container}>
                <Video
                    ref={videoRef}
                    source={{ uri: videoUri }}
                    style={{ width: width, height: height }}
                    useNativeControls
                    resizeMode="contain"
                    shouldPlay
                    onPlaybackStatusUpdate={updateProgress}
                />
                <View style={styles.buttonsContainer}>
                    <Button buttonStyle={{backgroundColor:GlobalStyles.colors.nearWhite}} textStyle={{color:'black'}}  text="❌ Discard" handleClick={discardVideo} />
                    <Button buttonStyle={{backgroundColor:GlobalStyles.colors.nearWhite}} textStyle={{color:'black'}}  text="✅ Save" handleClick={saveVideo} />
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>  
            <CameraView
                mode={mode}
                style={{height:height,width:width,flex: 1 }}
                ratio="16:9"
                flash={flashMode}
                facing={type}
                ref={cameraRef}
                autoFocus="on"
            >
            {!isRecording && onBackPress &&
             <TouchableOpacity
                style={{position: 'absolute', top: 10, left: 10, backgroundColor: 'transparent', padding: 10,}}
                onPress={onBackPress} 
            >    
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            }
            </CameraView>
            <View style={styles.buttonsContainer}>
                <Button buttonStyle={buttonStyle} text={<MaterialCommunityIcons name="camera-flip" size={40} color="white" />} handleClick={toggleCameraType} />
                {mode === "picture" ? (
                    <Button buttonStyle={buttonStyle} text={<MaterialIcons name="photo-camera" size={40} color="white" />} handleClick={capturePhotoHandle} />
                ) : isRecording ? (
                    <Button buttonStyle={buttonStyle} text={<MaterialCommunityIcons name="stop-circle-outline" size={40} color="red" />} handleClick={stopRecordHandle} />
                ) : (
                    <Button buttonStyle={buttonStyle} text={<MaterialCommunityIcons name="record-circle-outline" size={40} color="white" />} handleClick={RecordHandle} />
                )}
              
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'black',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
        padding: 10,
    },
   
});

export default TakeVideo;
