import { Text, View,StyleSheet } from "react-native"

const ChatScreen = () => {
  return (
      <View style={styles.root}>
          <Text>ChatScreen</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    
  }
});

export default ChatScreen
