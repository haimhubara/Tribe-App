import { View ,StyleSheet,Text} from "react-native";
import ImagePicker from "./ImagePicker";
import { GlobalStyles } from "../constants/styles";

const SelectImages = ({ pickedImage1, setPickedImage1,pickedImage2, setPickedImage2,pickedImage3, setPickedImage3,pickedImage4, setPickedImage4,pickedImage5, setPickedImage5, pickedImage6, setPickedImage6,}) => {
  return (

    <View style={styles.root}>
        <View style={styles.container}>
        <ImagePicker pickedImage={pickedImage1} setPickedImage={setPickedImage1} imageSytle={{backgroundColor:GlobalStyles.colors.nearWhite}} />
        <ImagePicker pickedImage={pickedImage2} setPickedImage={setPickedImage2} imageSytle={{backgroundColor:GlobalStyles.colors.nearWhite}}  />
        <ImagePicker pickedImage={pickedImage3} setPickedImage={setPickedImage3} imageSytle={{backgroundColor:GlobalStyles.colors.nearWhite}} />
        <ImagePicker pickedImage={pickedImage4} setPickedImage={setPickedImage4} imageSytle={{backgroundColor:GlobalStyles.colors.nearWhite}} />
        <ImagePicker pickedImage={pickedImage5} setPickedImage={setPickedImage5}  imageSytle={{backgroundColor:GlobalStyles.colors.nearWhite}}/>
        <ImagePicker pickedImage={pickedImage6} setPickedImage={setPickedImage6} imageSytle={{backgroundColor:GlobalStyles.colors.nearWhite}} />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  root: {
    flex:1,
    marginVertical: 16,
    justifyContent:'center',
    alignItems:'center'

  },
  container: {
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, 

  },
 
});
export default SelectImages
