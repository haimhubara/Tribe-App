import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Button, StyleSheet, Text, useWindowDimensions, View ,Platform} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { GlobalStyles } from '../../constants/styles';



export default function VideoScreen({videoSource, style, play}) {

   const { width, height } = useWindowDimensions();
   


  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
    play && player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  

  return (
    <View style={[styles.contentContainer, { width:width*0.9, height:width*0.9},style]}>
      { videoSource && videoSource !== "" ?
      <>
        <VideoView
            style={styles.video} 
            player={player}
             fullscreenOptions={{ allowsFullscreen: true }}
            allowsPictureInPicture
            VideoContentFit='cover'
            contentFit="cover" 
        />
      {Platform.OS === 'ios' && !play &&
        <View style={styles.controlsContainer}>
            <Button
              title={isPlaying ? 'Pause' : 'Play'}
              onPress={() => {
                if (isPlaying) {
                  player.pause();
                } else {
                  player.play();
                }
              }}
            />
          </View>
        }
      </>
        :
        <View style={styles.textContainer}> 
           <Feather name="video" size={40} color={GlobalStyles.colors.mainColorDark} />
           <Text style={styles.text}>Add Video</Text>
        </View>
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
  controlsContainer: {
    padding: 10,
  },
  text:{
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'regular',
    fontSize:20,letterSpacing:0.3,
    color:GlobalStyles.colors.mainColorDark
  },
  textContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1, 
    borderColor:GlobalStyles.colors.lightGrey,borderRadius:4,
    backgroundColor:GlobalStyles.colors.nearlyWhite
  }

});
