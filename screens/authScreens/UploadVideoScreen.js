import { Text, StyleSheet, View } from "react-native";
import TakeVideo from "../../components/TakeVideo";
import { useState } from "react";
import Button from "../../components/Button";
import React from "react";
import { Video } from "expo-av";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from "../../components/Header";


const UploadVideoScreen = ({navigation}) => {
    const [videoUri, setVideoUri] = React.useState(null);
    const [takeVideo, setTakeVideo] = useState(true);
    function takeAgain(){
      setTakeVideo(false);
      setVideoUri(null);
    }
    if (videoUri && takeVideo) {
      return (
        <>
        <View style={{marginTop:32,justifyContent:'center',alignItems:'center'}}>
             <Header title="Video Preview" onBackPress={()=>{navigation.goBack();}}/>
        </View>
        

      <View style={styles.root}>
          <Video
              source={{ uri: videoUri }}
              style={styles.video}
              useNativeControls
              resizeMode="cover"
              shouldPlay={true}
            />
            <Button buttonStyle={{backgroundColor:"white"}} text={<MaterialCommunityIcons name="camera-retake" size={50} color="black" />} handleClick={takeAgain}/>
      </View>
         <View style={styles.bottomButtonContainer}>
             <Button text="Sign Up"/>
         </View>
        </>
      );
    }
  
    return (
      <View style = {{flex:1}} >
        {
            takeVideo ? (
               <>
                <View style={{marginTop:32}}>
                     <Header title="Record a video" onBackPress={()=>{navigation.goBack();}}/>
                </View> 
             
                 <View style={styles.root}>
                   <Text style={styles.text}>We'd like you to record a video introducing yourself so others can get to know you better</Text>
                     <Button buttonStyle={{backgroundColor:"white"}} text={ <SimpleLineIcons name="camrecorder" size={50} color="black" />} handleClick={() => setTakeVideo(false)} />
                 </View>
               </>
            ) : (
              <TakeVideo
                setTakeVideo={setTakeVideo}
                style={{ flex: 1 }}
                videoUri={videoUri}
                setVideoUri={setVideoUri}
             
              />
            )
          }
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    video: {
      width: "100%",
      height: 300,
    },
    videoPreview:{
      flex:1
    },
    text: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20, 
        textAlign:'center'
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        
      }
  });

export default UploadVideoScreen
