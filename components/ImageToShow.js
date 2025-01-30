import { View,Image, StyleSheet } from "react-native"

const ImageToShow = ({imageUrl,imageStyle, rootStyle}) => {
  return (
    <View style={[styles.root,rootStyle]}>
        <View style={[styles.imagePreview,imageStyle]}>
            <Image style={styles.image} source={{ uri:imageUrl}} />
       </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  root: { 
  },
  imagePreview:{
    borderWidth:0.1,
    borderColor:"#000",
    width: "100%",
    height:200,
    marginVertical:8,
    backgroundColor:'white',
    borderRadius:4,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 5,
   
},
image:{
    width:'100%',
    height:'100%',
    borderRadius:4
},
});

export default ImageToShow
