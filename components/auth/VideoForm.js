import { Text, StyleSheet, View, Image } from "react-native";
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
import image from "../../assets/images/video.png"


const VideoForm = ({setSecondNext,signUpHandle, videoUri,setVideoUri}) => {
    const [takeVideo, setTakeVideo] = useState(true);
    
    function takeAgain(){
      setTakeVideo(false);
      setVideoUri(null);
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
                   { !videoUri && <Text style={styles.text}>We like you to enter a video so other pepole can get to know you better</Text>}
                   { videoUri && <Text style={[styles.text,{fontSize:20}]}>That's it time to sing up</Text>}
                    { !videoUri && 
                    <Button buttonStyle={{backgroundColor:"white"}} text={ <SimpleLineIcons name="camrecorder" size={50} color="black" />} handleClick={() => setTakeVideo(false)} />}
                    {videoUri &&
                      <Button buttonStyle={{backgroundColor:"white"}} text={<MaterialCommunityIcons name="camera-retake" size={50} color="black" />} handleClick={takeAgain}/>
                    }
                 </View>
                
                <View style={styles.root}>
                {videoUri && 
                <>
                  <Video
                  source={{ uri: videoUri }}
                  style={styles.video}
                  useNativeControls
                  resizeMode="cover"
                  shouldPlay={true}
                  />
                </>
                  }
                   { !videoUri &&  <Image
                      source={image} 
                      style={styles.video}
                    />
                  }
                    <SubmitButton 
                    disabeld={!videoUri}
                    style={{marginTop:20, width:'100%'}}
                    onPress={signUpHandle}
                    title="Sign up" 
                    color={GlobalStyles.colors.mainColor}
                  />
              </View>
              
               </>
            ) : (
              <TakeVideo
                onBackPress={()=>{setTakeVideo(prevState =>!prevState)}}
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
      height: 340,
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
