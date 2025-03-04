import { View, StyleSheet, ScrollView, Text } from "react-native"
import { useCallback} from "react";
import SubmitButton from "../buttons/SubmitButton";
import Header from "../../components/Header";
import { GlobalStyles } from "../../constants/styles";
import ImagePicker from "../imagesAndVideo/ImagePicker";
import { validateInput } from "../../util/actions/FormActions";



const UploadPhotosForm = ({secondNextHandle ,onBackPress ,dispachPhotosReducer,photosReducer}) => {


  

  

  const takePhotoHandle = useCallback((inputId, inputValue) => {

     const result = validateInput(inputId,inputValue)
      dispachPhotosReducer({type:'INSERT IMAGES',payload:{stateOfValue:result,inputId,inputValue}}); 

  },[dispachPhotosReducer])

 

  return (
    <ScrollView >
         <View style={styles.root}>
          <Header style={{paddingHorizontal:0}} title="Select images" onBackPress={onBackPress}/>
           <View style={styles.imageContainer}>


           {  !photosReducer.formState && photosReducer.actualValues['imagesContainer'].length >= 1  &&
              <View style={styles.errorContainer}>
                   <Text style={styles.errorText}>Select at least 3 images</Text>
             </View>
          }
           
              <View style={styles.container}>
                <ImagePicker id='firstImage' takePhotoHandle={takePhotoHandle} pickedImage={photosReducer.actualValues['firstImage']}  />
                <ImagePicker id='secondImage' takePhotoHandle={takePhotoHandle} pickedImage={photosReducer.actualValues['secondImage']}  />
                <ImagePicker id='thirdImage' takePhotoHandle={takePhotoHandle} pickedImage={photosReducer.actualValues['thirdImage']}  />
                <ImagePicker id='fourthImage' takePhotoHandle={takePhotoHandle} pickedImage={photosReducer.actualValues['fourthImage']} />
                <ImagePicker id='fiveImage' takePhotoHandle={takePhotoHandle}  pickedImage={photosReducer.actualValues['fiveImage']}/>
                <ImagePicker id='sixImage' takePhotoHandle={takePhotoHandle}  pickedImage={photosReducer.actualValues['sixImage']}/> 
            </View>

          </View>
          

           

        <View style={styles.button}>
            <SubmitButton disabeld={!photosReducer.formState} onPress={secondNextHandle} title="Next" color={GlobalStyles.colors.mainColor}/>
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
      marginVertical: 16,    
    },
    button:{
        marginBottom:10
    },
    container: {
       flexDirection: 'row',
       flexWrap: 'wrap',
       gap: 10, 
     },
     errorContainer:{
      marginVertical:5
  },
  errorText:{
      color:'red',
      fontSize:13,
      fontFamily:'regular',
      letterSpacing:0.3,
  }
});

export default UploadPhotosForm
