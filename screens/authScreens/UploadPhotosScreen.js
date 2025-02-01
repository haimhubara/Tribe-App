import { View, StyleSheet, ScrollView, Text } from "react-native"
import SelectImages from "../../components/SelectImages";
import { useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";


const UploadPhotosScreen = ({navigation,route}) => {
    
    function handleNext() {
      navigation.navigate("UploadVideo")
    }

   const [pickedImage1, setPickedImage1] = useState(null);
   const [pickedImage2, setPickedImage2] = useState(null);
   const [pickedImage3, setPickedImage3] = useState(null);
   const [pickedImage4, setPickedImage4] = useState(null);
   const [pickedImage5, setPickedImage5] = useState(null);
   const [pickedImage6, setPickedImage6] = useState(null);

   function backArrowHandle(){
    navigation.goBack();

   }

  return (
    <ScrollView >
         <View style={styles.root}>
          <Header title="Select images" onBackPress={backArrowHandle}/>
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
          <Button text="Next" handleClick={handleNext}/>
        </View>
      
    </View>

    </ScrollView>
   
  )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop:32,      
    },
    imageContainer: {
      flex:1,     
    },
});

export default UploadPhotosScreen
