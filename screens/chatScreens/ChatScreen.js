import React, { useCallback, useEffect, useLayoutEffect , useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput,Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather';

import backgroundImage from '../../assets/images/droplet.jpeg'
import { useSelector } from 'react-redux';
import PageContainer from '../../components/PageContainer';
import Bubble from '../../components/Bubble';
import { createChat } from '../../util/actions/chatAction';



const ChatScreen = ({navigation, route}) => {
  
  const storedUsers = useSelector(state => state.users.storedUsers);

  const userData  = useSelector(state => state.auth.userData);

  const [chatId, setChatId] = useState(route?.params?.chatId);
  const [messageText, setMessageText, ] = useState('');

  const [chatUsers , setChatUsers] = useState([])
  
  
   const chatData = route?.params?.chatUsers
  //  console.log(chatData);

   const getChatTitleFromName = () => {
      const otherUserId = route?.params?.selectedUserId
      const otherUserData = storedUsers[otherUserId];

      return  otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`
   }

   useEffect(() => {
      navigation.setOptions({
        headerTitle: getChatTitleFromName() ? getChatTitleFromName() : ""

      })




      setChatUsers(chatData);
   },[chatUsers]);
      
   const sendMessage = useCallback(async () => {
    try {
        let id = chatId;
        if (!chatId) {
            id = await createChat(userData.userId, route?.params?.chatUsers);
            setChatId(id);
        }
    } catch (error) {
        console.log("Error sending message:", error);
    }

    setMessageText("");
}, [messageText,chatId]);
  

 





  useLayoutEffect(() => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.setOptions({ tabBarStyle: { display: 'none' } });
    }
  
    return () => {
      if (parentNav) {
        parentNav.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: '#fff' } });
      }
    };
  }, [navigation]);

  return (
   <SafeAreaView 
   edges={['right','left','bottom',]}
   style={styles.root}>

    <KeyboardAvoidingView 
    style={{flex:1}}
    keyboardVerticalOffset={100}
    behavior={Platform.OS==='ios'?'padding':undefined}

    >

        <ImageBackground style={styles.backgroundImage} source={backgroundImage}>

          <PageContainer>

            {
              !chatId && <Bubble text = "This is a new chat. Say hi!" type="system"/>
            }
          </PageContainer>

        </ImageBackground>

       {/* <View style={styles.backgroundImage} >

       </View> */}
       <View style={styles.inputContainer}>

            <Pressable style={({ pressed }) => [styles.mediaButton, pressed && { opacity: 0.25 }]}>
                    <Feather name="plus" size={24} color='black' />
            </Pressable>
                            
            <TextInput
             style={styles.textBox}
             onChangeText={(text)=>setMessageText(text)}
             value={messageText}
             onSubmitEditing={sendMessage}
              />

            { messageText === "" && 
                        <Pressable style={({ pressed }) => [styles.mediaButton, pressed && { opacity: 0.25 }]}>
                            <Feather name="camera" size={24} color='black' />
                    </Pressable>
            }
            {messageText !== "" && 
                <Pressable onPress={sendMessage} style={({ pressed }) => [styles.sendButton, pressed && { opacity: 0.25 }]}>
                     <Feather name="send" size={20} color='black' />
                </Pressable>
            }

       </View>
    </KeyboardAvoidingView>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        flexDirection:'column'
    },
    backgroundImage:{
        flex:1
    },
    inputContainer:{
        flexDirection:'row',
        paddingVertical:8,
        paddingHorizontal:10,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    textBox:{
        flex:1,
        borderWidth:1,
        borderRadius:50,
        borderColor:'#bdc3c7' ,
        marginHorizontal:15,
        paddingHorizontal:12,
        height:40
        
    },
    mediaButton:{
        alignItems:'center',
        justifyContent:'center',
        width:35
    },
    sendButton:{
        alignItems:'center',
        justifyContent:'center',
        width:35,
        height:35,
        borderRadius:17.5,
        borderWidth:1,
        borderColor:'#bdc3c7'
    }
})



export default ChatScreen
