import { View, StyleSheet, ScrollView, Text } from "react-native"
import SelectImages from "../../components/imagesAndVideo/SelectImages";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import Header from "../../components/Header";
import { GlobalStyles } from "../../constants/styles";


const UploadPhotosForm = ({onBackPress, secondNext, setSecondNext}) => {
    
  

   const [pickedImage1, setPickedImage1] = useState(null);
   const [pickedImage2, setPickedImage2] = useState(null);
   const [pickedImage3, setPickedImage3] = useState(null);
   const [pickedImage4, setPickedImage4] = useState(null);
   const [pickedImage5, setPickedImage5] = useState(null);
   const [pickedImage6, setPickedImage6] = useState(null);

  

  return (
    <ScrollView >
         <View style={styles.root}>
          <Header style={{paddingHorizontal:0}} title="Select images" onBackPress={onBackPress}/>
           <View style={styles.imageContainer}>
          
        
            <SelectImages
            pickedImage1={pickedImage1} setPickedImage1={setPickedImage1}
            pickedImage2={pickedImage2} setPickedImage2={setPickedImage2}
            pickedImage3={pickedImage3} setPickedImage3={setPickedImage3}
            pickedImage4={pickedImage4} setPickedImage4={setPickedImage4}
            pickedImage5={pickedImage5} setPickedImage5={setPickedImage5}
            pickedImage6={pickedImage6} setPickedImage6={setPickedImage6}
            />

          </View>

        <View style={styles.button}>
            <SubmitButton onPress={()=>{setSecondNext(prevState =>!prevState)}} title="Next" color={GlobalStyles.colors.mainColor}/>
        </View>
      
    </View>

    </ScrollView>
   
  )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
            
    },
    imageContainer: {
      flex:1,     
    },
    button:{
        marginBottom:10
    }
});

export default UploadPhotosForm
