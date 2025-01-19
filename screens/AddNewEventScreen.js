import { Text,StyleSheet, View } from "react-native"

const AddNewEventScreen = () => {
  return (
        <View style={styles.root}>
            <Text>AddNewEventScreen</Text>
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
export default AddNewEventScreen
