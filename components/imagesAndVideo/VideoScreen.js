import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Button, StyleSheet, Text, useWindowDimensions, View ,Platform} from 'react-native';



export default function VideoScreen({videoSource, style, play}) {

   const { width, height } = useWindowDimensions();
   


  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
    play && player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  

  return (
    <View style={[styles.contentContainer, { width:width*0.9, height:width*0.9},style]}>
      { videoSource !== "" ?
      <>
        <VideoView
            style={styles.video} 
            player={player}
            allowsFullscreen
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
  controlsContainer: {
    padding: 10,
  },

});
