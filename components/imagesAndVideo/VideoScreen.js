import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';



export default function VideoScreen({videoSource, style, play}) {

   const { width, height } = useWindowDimensions();


  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
    play && player.play();
  });

  return (
    <View style={[styles.contentContainer, { width:width*0.9, height:width*0.9},style]}>
      { videoSource ?
        <VideoView
         style={styles.video} 
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          VideoContentFit='cover'
          contentFit="cover" 
         
        />
        :
        <Text>Add Video</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width:'100%',
    height:'100%',

  },
  video: {
    width:'100%',
    height:'100%',
    borderRadius: 4,  
   
  },

});
