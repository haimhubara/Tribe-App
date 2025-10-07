import { useCallback, useState } from "react";
import { View, StyleSheet,Text, ActivityIndicator} from "react-native";
import SwapImages from "./swapImages/SwapImages";
import { Input, PageContainer,HobbiesPicker, Header } from "../../../components";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from "react-redux";
import { validateInput } from "../../../util/actions/FormActions";
import { useReducer } from "react";
import { signUpreducer } from "../../../util/reducers/AuthReducer";
import SubmitButton from "../../../components/buttons/SubmitButton";
import { GlobalStyles } from "../../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { updateSignInUserData } from "../../../util/actions/AuthAction";
import { useDispatch } from "react-redux";
import { updateLoggedInUserData } from "../../../store/authSlice";





const EditProfile = ({isEdit,setIsEdit}) => {
  const navigation = useNavigation();
  const dispach = useDispatch();
  const [uploadDataSucced, setUploadDataSucced] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  
  const firstName =  userData.firstName || "";
  const lastName =  userData.lastName || "";
  const userName =  userData.userName || "";
  const phoneNumber =  userData.phoneNumber || "";
  const hobbies =  userData.hobbies || [];
  const languages =  userData.languages || [];
  const facebook =  userData.facebook || "";
  const tiktok =  userData.tiktok || "";
  const instagram =  userData.instagram || "";
  
  
  
  const initialState = {
    actualValues:{
      firstName,
      lastName,
      userName,
      phoneNumber,
      hobbies,
      languages,
      facebook,
      tiktok,
      instagram,
    },
    values:{
      firstName:undefined,
      lastName:undefined,
      userName:undefined,
      phoneNumber:undefined,
      hobbies:undefined,
      languages:undefined,
      facebook:undefined,
      tiktok:undefined,
      instagram:undefined
      
    },
    formStatus:false 
  }
  const[formValues, dispachFormValues] = useReducer(signUpreducer,initialState);

   const inputChangeHandler = useCallback((inputId, inputValue) => {

      const result = validateInput(inputId, inputValue);
      dispachFormValues({
        type: 'IS VALID FORM',
        payload: { inputStatus: result, inputId, inputValue }
      });
    }, [dispachFormValues]);

  
    const saveHandler = useCallback(async() => {
      const updatedValues = formValues.actualValues

      try {
        setIsLoading(true);
        await updateSignInUserData(userData.userId,updatedValues);
        dispach(updateLoggedInUserData({newData:updatedValues}));
        setUploadDataSucced(true);
      } catch (error) {
        
      }
      finally {
          setIsLoading(false)
      }
      setTimeout(()=>{
        setUploadDataSucced(false);
      },3000);
    },[formValues,dispach]);

    const onBackPress = () => {
      setIsEdit(!isEdit);
      const parentNav = navigation.getParent();
      if (parentNav) {
        parentNav.setOptions({ tabBarStyle: { display:'flex' } });
      }
    }
    const EqualArray = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      const sortedArr1 = [...arr1].sort();
      const sortedArr2 = [...arr2].sort();
      return sortedArr1.every((val, index) => val === sortedArr2[index]);
    };

    const hasChanges = () => {
      const currentValues = formValues.actualValues;
  
      return (
          currentValues.firstName != firstName ||
          currentValues.lastName != lastName ||
          currentValues.userName != userName ||
          currentValues.phoneNumber != phoneNumber ||
          !EqualArray(currentValues.hobbies,hobbies) ||
          !EqualArray(currentValues.languages,languages) ||
          currentValues.facebook != facebook ||
          currentValues.tiktok != tiktok ||
          currentValues.instagram != instagram
      );
  }


  return (
    <View style={styles.root}>
      <Header title="Edit Profile" onBackPress={onBackPress}/>
        
         <SwapImages  isEdit={isEdit} imagess={userData.images} videoUrl={userData.videoUrl}/>
        
         <PageContainer>
          
          <View style={{marginTop:10}}>

             {uploadDataSucced && <Text>Saved!</Text>}
          </View>

         {isLoading ? 
                  (<ActivityIndicator
                    size={'small'}
                    color={GlobalStyles.colors.mainColor}
                    style={{marginTop:10}}
                  />)
                   :(
                  <View style={{ alignItems: "center" }}>
                    {formValues.formStatus && hasChanges() && 
                    <SubmitButton 
                    disabeld={!formValues.formStatus }
                    style={{marginTop:30,marginBottom:20, width:'40%',}}
                    onPress={saveHandler}
                    title="Save" 
                    color={GlobalStyles.colors.mainColor}
                   /> 
                  }
                   </View>
           
           )}
            
         <Input 
            inputOption={{autoCapitalize:'none'}}
            label="First Name"
            iconName="user-o"
            IconPack={FontAwesome}
            onInuptChange={inputChangeHandler}
            id="firstName"
            error={formValues.values['firstName']}
            initialValue={userData.firstName}
        />
          <Input 
            inputOption={{autoCapitalize:'none'}}
            label="Last Name"
            iconName="user-o" 
            IconPack={FontAwesome}
            onInuptChange={inputChangeHandler}
            id="lastName"
            error={formValues.values['lastName']}
            initialValue={userData.lastName}
         />
        
         <Input
            inputOption={{autoCapitalize:'none'}}
            label="Username" 
            iconName="user-o"
            IconPack={FontAwesome}
            onInuptChange={inputChangeHandler}
            id='userName'
            error={formValues.values['userName']}
            initialValue={userData.userName}
        />
         <Input 
            inputOption={{ keyboardType:"numeric"}}
            label="Phone Number"
            iconName="phone" 
            IconPack={Feather}
            onInuptChange={inputChangeHandler}
            id="phoneNumber"
            error={formValues.values['phoneNumber']}
            initialValue={userData.phoneNumber}
        />
          <Input 
            inputOption={{autoCapitalize:'none'}}
            label="Facebook (optional)"
            iconName="facebook"
            IconPack={Feather}
            onInuptChange={inputChangeHandler}
            id="facebook"
            error={formValues.values['facebook']}
            initialValue={userData.facebook}
        />
         <Input 
           inputOption={{autoCapitalize:'none'}}
           label="TikTok (optional)"
           iconName="logo-tiktok"
           IconPack={Ionicons}
           onInuptChange={inputChangeHandler}
           id="tiktok"
           error={formValues.values['tiktok']}
           initialValue={userData.tiktok}
        />
        
        <Input 
           inputOption={{autoCapitalize:'none'}}
           label="Instagram (optional)"
           iconName="instagram"
           IconPack={FontAwesome}
           onInuptChange={inputChangeHandler}
           id="instagram"
           error={formValues.values['instagram']}
           initialValue={userData.instagram}
        />
         
         <HobbiesPicker
          
            text="Select your hobbies"
            array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}
            id='hobbies'
            onInuptChange={inputChangeHandler}
            value={formValues.actualValues.hobbies}
            error={formValues.values['hobbies']}
       />
       <HobbiesPicker
          text="Select Languages"
          array={["Hebrew","Arabic","English","Russin"]} 
        
          id='languages'
          onInuptChange={inputChangeHandler}
          value={formValues.actualValues.languages}
          error={formValues.values['languages']}
       /> 

        
        </PageContainer>
         
      </View>
    
  )
}
const styles = StyleSheet.create({
    root:{
        flex:1
    },
    buttons:{
      flexDirection:"row",
      justifyContent:'center',
      gap:10,
      marginVertical:20
  
    },
   
   
})

export default EditProfile
