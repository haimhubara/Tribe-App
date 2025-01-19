import { Text, View, StyleSheet } from "react-native"

const ProfileScreen = () => {
  return (
   <View style={styles.root}>
          <Text>ProfileScreen</Text>
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

export default ProfileScreen
