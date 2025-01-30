import { View, StyleSheet, ScrollView, Text } from "react-native"
import SelectImages from "../../components/SelectImages";
import { useState } from "react";
import Button from "../../components/Button";
import Ionicons from '@expo/vector-icons/Ionicons';


const UploadPhotosScreen = ({navigation,route}) => {
    
    function handleSignup() {
   
    }

   const [pickedImage1, setPickedImage1] = useState(null);
   const [pickedImage2, setPickedImage2] = useState(null);
   const [pickedImage3, setPickedImage3] = useState(null);
   const [pickedImage4, setPickedImage4] = useState(null);
   const [pickedImage5, setPickedImage5] = useState(null);
   const [pickedImage6, setPickedImage6] = useState(null);

   function backArrowHandle(){
    navigation.navigate("SignUp");

   }

  return (
    <ScrollView>
         <View style={styles.root}>
        <View style={styles.imageContainer}>
          <View style={styles.titleContainer}>
              <Ionicons name="arrow-back" size={32} color="black" onPress={backArrowHandle} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Select Images</Text>
            </View>
          </View>
        
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
          <Button text="Sing Up" handleClick={handleSignup}/>
        </View>
      
    </View>

    </ScrollView>
   
  )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop:16
      
                  
    },
    imageContainer: {
        padding:20,
        width: '100%',           
       
            
    },
    button: {
     
       
    },
    title: {
      textAlign:'center',
      justifyContent:'center',
      fontSize:28,
      fontWeight:'bold',
    },
    titleContainer:{
      flexDirection:'row',
      alignItems: 'center', 
    },
    textContainer:{
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    }
});

export default UploadPhotosScreen
