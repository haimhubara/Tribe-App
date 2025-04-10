import React, { useCallback, useReducer, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import PageContainer from '../../components/PageContainer';
import { GlobalStyles } from '../../constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import defaultImage from "../../assets/images/userImage.jpeg"
import { pickImageHandle } from '../../util/actions/imageAction';
import { uploadImageToCloudinary } from '../../components/Cloudinary';
import { removeUserFromChat, updateChatData } from '../../util/actions/chatAction';
import Input from '../../components/Input';
import { signInReducer } from '../../util/reducers/AuthReducer';
import SubmitButton from '../../components/buttons/SubmitButton';
import { validateInput } from '../../util/actions/FormActions';
import ActiveChats from '../../components/ActiveChat';


const GroupChatSetting = ({route,navigation}) => {

    const chatId = route.params.chatId; 
    const userData = useSelector(state => state.auth.userData);
    const chatData = useSelector(state => state.chats.chatsData[chatId] || {});
    const storedUsers = useSelector(state =>state.users.storedUsers);
    const [isLoading , setIsLoading] = useState(false);
    const [isLoadingName , setIsLoadingName] = useState(false);
    const [showSucessMessage , setShowSucessMessage] = useState(false);

    const initialState = {
        actualValues: { chatName: chatData.chatName },
        values: { chatName: false },
        formState: false, 
    };
    

    const [formValues, dispachFormValues] = useReducer(signInReducer,initialState);


    const inputChangeHandler =  useCallback((inputId,inputValue) =>{
      const result = validateInput(inputId,inputValue)
      dispachFormValues({stateOfValue:result, inputId, inputValue})
    },[dispachFormValues]);

  
    const saveHandler = useCallback(async()=>{

        const updatedValues = formValues.actualValues;
        try {
            setIsLoadingName(true);
            await updateChatData(chatId,userData.userId,updatedValues);
            setShowSucessMessage(true);

            setTimeout(()=>{
                setShowSucessMessage(false);
            },1500)
        } catch (error) {
            console.log(error); 
        }
        finally{
            setIsLoadingName(false);
        }
    },[formValues]);

    


    const hasChanges = () => {
        return formValues.actualValues.chatName !== chatData.chatName;
    }
    
    const leaveChat = useCallback( async ()=>{
            try {
                setIsLoading(true)

                await removeUserFromChat(userData,userData, chatData);


                navigation.popToTop();
            } catch (error) {
                    console.log(error);
            }finally{
                setIsLoading(false);
            }
    },[navigation,chatData]);



    
    


    const editImage = async() => {
        try {
            const pickedImage = await pickImageHandle();
            setIsLoading(true);
            const imageUrl = await uploadImageToCloudinary(pickedImage);
            await updateChatData(chatId, userData.userId, {chatImage:imageUrl});
            setIsLoading(false);
            
        } catch (error) {
            console.log(error);
        }
      

    }

    if(!chatData.users) return null;

  return (
    <>
        <View style={styles.nameContainer}>
             <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginTop:8}}>
                <Ionicons style={{marginLeft:10}} name="arrow-back" size={32} color="black" />
            </TouchableOpacity>
            <Text style={styles.name}>Chat Settings</Text>
            <Text style={styles.name}></Text>
       </View>
       <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.imageContainer}>
                {
                    isLoading && 
                     <View style={{flex:1, justifyContent:"center",alignItems:'center'}}>
                         <ActivityIndicator size="small" color={GlobalStyles.colors.mainColor}/>
                    </View>
                }
                {
                    !isLoading &&
                    <>
                    <Image style={styles.image} source={chatData.chatImage ? {uri:chatData.chatImage}:defaultImage}/>
                    <TouchableOpacity onPress={editImage} style={styles.editIcon}>
                        <Entypo name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    </>
                }
               
                  
            </View>
            <PageContainer>
                <Input
                    id="chatName"
                    label="Chat Name"
                    inputOption={{autoCapitalize:"none",allwEmpty:false,autoCorrect:false}}
                    initialValue={chatData.chatName}
                    onInuptChange={inputChangeHandler}
                    error={formValues.values['chatName']}
                    
                />
            </PageContainer>
            <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>{chatData.users.length} Participants</Text>
                   {
                    chatData.users.slice(0,4).map(uid => {
                        const currentUser = storedUsers[uid] ? storedUsers[uid] : userData;
                        return <ActiveChats
                            key={uid}
                            title={`${currentUser.firstName} ${currentUser.lastName}`}
                            imageSource={currentUser.images['firstImage']}
                            type={uid !== userData.userId ? "link" :'blank' }
                            startChatHandle={()=> uid !== userData.userId && navigation.navigate("contact",{uid, chatId})}
                        />
                    })
                   }

                   
            </View>
            


            {
                showSucessMessage && <Text>Saved!</Text>
            }
            {   
                isLoadingName ?
                <View style={{marginTop:10}}>
                    <ActivityIndicator
                    size={'small'}
                    color={GlobalStyles.colors.mainColor}
                    />
                </View>:
                hasChanges() &&
                <View style={{marginTop:10}}>
                    <SubmitButton
                        title='Save changes'
                        color={GlobalStyles.colors.mainColor}
                        onPress={saveHandler}
                        disabeld={!formValues.formState}
                    
                    />
                 </View>
            }

            {   chatData.ownerActivity !== userData.userId &&
                <SubmitButton
                    title = "Leave chat"
                    color={GlobalStyles.colors.errorColorDark}
                    onPress={() => leaveChat()}
                    style={{margin:20}}
                />
            }
       </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 32,
    },
    name: {
        color: GlobalStyles.colors.textColor,
        letterSpacing: 0.3,
        fontSize: 32,
        fontFamily: 'medium',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: GlobalStyles.colors.lightGrey,
    },
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: GlobalStyles.colors.lightGrey,
        borderRadius: 50,
        padding: 5,
    },
    sectionContainer:{
        width:'100%',
        marginTop:10,
        paddingHorizontal:16
    },
    heading:{
        marginVertical:8,
        color:GlobalStyles.colors.textColor,
        fontFamily:'bold',
        letterSpacing:0.3
    }   
});


export default GroupChatSetting
