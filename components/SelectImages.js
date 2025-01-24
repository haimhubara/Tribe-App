import { View ,StyleSheet,Text} from "react-native";
import ImagePicker from "./ImagePicker";

const SelectImages = ({ pickedImage1, setPickedImage1,pickedImage2, setPickedImage2,pickedImage3, setPickedImage3,pickedImage4, setPickedImage4,pickedImage5, setPickedImage5, pickedImage6, setPickedImage6,}) => {
  return (

    <View style={styles.root}>
        <View>
            <Text style={styles.title}>Choose Images:</Text>
        </View>
        <View style={styles.container}>
        
        <ImagePicker pickedImage={pickedImage1} setPickedImage={setPickedImage1} />
        <ImagePicker pickedImage={pickedImage2} setPickedImage={setPickedImage2} />
        <ImagePicker pickedImage={pickedImage3} setPickedImage={setPickedImage3} />
        <ImagePicker pickedImage={pickedImage4} setPickedImage={setPickedImage4} />
        <ImagePicker pickedImage={pickedImage5} setPickedImage={setPickedImage5} />
        <ImagePicker pickedImage={pickedImage6} setPickedImage={setPickedImage6} />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    root:{
        marginVertical:16,
    },
    container: {
      flex: 1,
     
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,  
        width: '100%',  
        textAlign: 'center', 
      },
  });
export default SelectImages
