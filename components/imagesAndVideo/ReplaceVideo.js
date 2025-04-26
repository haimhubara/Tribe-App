import { Camera, CameraView } from 'expo-camera';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Button from '../buttons/Button';
import { GlobalStyles } from "../../constants/styles";
import * as MediaLibrary from 'expo-media-library';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Video } from 'expo-av';
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from '../buttons/IconButton';
import { StatusBar } from 'react-native';
import VideoScreen from './VideoScreen';

const ReplaceVideo = ({videoUri,setVideoUri,setTakeVideo,onBackPress,onSave}) => {
    const [permission, setPermission] = useState(null);
    const [type, setType] = useState("back");
    const [flashMode, setFlashMode] = useState("on");
    const cameraRef = useRef();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [captureImage, setCaptureImage] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mode, setMode] = useState("video");
    const videoRef = useRef(null);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(1);

 
    


    const { width } = useWindowDimensions();
    const height = Math.round((width * 16) / 9);
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
                onSave()
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
                {/* <Video
                    ref={videoRef}
                    source={{ uri: videoUri }}
                    style={{ width: width, height: height }}
                    useNativeControls
                    resizeMode="contain"
                    shouldPlay
                    onPlaybackStatusUpdate={updateProgress}
                /> */}
                <VideoScreen
                    videoSource={videoUri}
                    style={{ width: width, height: height }}
                    play={true}
                />
                <View style={styles.buttonsContainer}>
                    <Button buttonStyle={{backgroundColor:GlobalStyles.colors.nearWhite}} textStyle={{color:'black'}}  text="❌ Discard" handleClick={discardVideo} />
                    <Button buttonStyle={{backgroundColor:GlobalStyles.colors.nearWhite}} textStyle={{color:'black'}}  text="✅ Save" handleClick={saveVideo} />
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1,backgroundColor:'black' }}>  
        {onBackPress && (
            <TouchableOpacity 
                style={{ marginLeft: 10, marginBottom: 5, opacity: isRecording ? 0.5 : 1 }}
                onPress={!isRecording ? onBackPress : null} // הופך ללא לחיץ בזמן ההקלטה
                disabled={isRecording} // מונע לחיצה אם מקליטים
            >    
                <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
        )}
            <CameraView
                mode={mode}
                style={{height:height,width:width,flex: 1 }}
                ratio="16:9"
                flash={flashMode}
                facing={type}
                ref={cameraRef}
                autoFocus="on"
            >
            </CameraView>
            <View style={styles.buttonsContainer}>
                <IconButton
                    iconColor="white"
                    iconName="camera-flip"
                    IconPack={MaterialCommunityIcons}
                    iconSize={40}
                    containerStyle={styles.buttonContainer}
                    onPress={toggleCameraType} 
                />
                {mode === "picture" ? (
                  
                    <IconButton
                    iconColor="white"
                    iconName="photo-camera"
                    IconPack={MaterialIcons}
                    iconSize={40}
                    containerStyle={styles.buttonContainer}
                    onPress={capturePhotoHandle} 
                />
                ) : isRecording ? (
                   
                   <IconButton
                    iconColor="red"
                    iconName= "stop-circle-outline"
                    IconPack={MaterialCommunityIcons}
                    iconSize={40}
                    containerStyle={styles.buttonContainer}
                    onPress={stopRecordHandle} 
                />
                ) : (
                 
                    <IconButton
                    iconColor="white"
                    iconName= "record-circle-outline"
                    IconPack={MaterialCommunityIcons}
                    iconSize={40}
                    containerStyle={styles.buttonContainer}
                    onPress={RecordHandle} 
                />
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
    },
    buttonContainer:{
        paddingVertical:10,
        paddingHorizontal:0,
        backgroundColor:'black',
        
    }
   
});

export default ReplaceVideo;
