import { Text, StyleSheet, View } from "react-native";
import TakeVideo from "../imagesAndVideo/TakeVideo";
import { useState } from "react";
import Button from "../buttons/Button";
import SubmitButton from "../buttons/SubmitButton";
import React from "react";
import { Video } from "expo-av";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from "../Header";
import { GlobalStyles } from "../../constants/styles";


const VideoForm = ({setSecondNext}) => {
    const [videoUri, setVideoUri] = React.useState(null);
    const [takeVideo, setTakeVideo] = useState(true);
   
    function takeAgain(){
      setTakeVideo(false);
      setVideoUri(null);
    }
    if (videoUri && takeVideo) {
      return (
        <>
        <View style={{justifyContent:'center',alignItems:'center'}}>
             <Header title="Video Preview" onBackPress={()=>{setSecondNext(prevState =>!prevState)}}/>
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
             <SubmitButton onPress={()=>{console.log("hi")}} color={GlobalStyles.colors.mainColor} title="Sign Up"/>
         </View>
        </>
      );
    }
  
    return (
      <View style = {{flex:1}} >
        {
            takeVideo ? (
               <>
                <View >
                     <Header  title="Record a video" onBackPress={()=>{setSecondNext(prevState =>!prevState)}}/>
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
      justifyContent: "space-between",
      
      padding: 20,
    
    },
    video: {
      width: "100%",
      height: 300,
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 20,
    },
    text: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 30,
      lineHeight: 30,
      fontFamily:'bold',
      letterSpacing:0.3,
      color:GlobalStyles.colors.textColor,
    },
    bottomButtonContainer: {
      width: "100%",
      alignItems: "center",
      padding: 10,
    },
    iconButton: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 50,
      elevation: 5, 
    },
  });
  

export default VideoForm
