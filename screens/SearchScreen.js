import { View,Text,StyleSheet } from "react-native"


const SearchScreen = () => {
  return (
    <View style={styles.root}>
        <Text>SearchScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },

});

export default SearchScreen
