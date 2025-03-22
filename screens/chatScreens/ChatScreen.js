import React, { useCallback, useEffect, useLayoutEffect , useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput,Pressable, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather';

import backgroundImage from '../../assets/images/droplet.jpeg'
import { useSelector } from 'react-redux';
import PageContainer from '../../components/PageContainer';
import Bubble from '../../components/Bubble';
import { createChat, sendTextMessage } from '../../util/actions/chatAction';
import { createSelector } from '@reduxjs/toolkit';



const ChatScreen = ({navigation, route}) => {
  
  const storedUsers = useSelector(state => state.users.storedUsers);
  
  const userData  = useSelector(state => state.auth.userData);
  
  const [chatId, setChatId] = useState(route?.params?.chatId);
  const [messageText, setMessageText, ] = useState('');
  
  const [chatUsers , setChatUsers] = useState([])
  
  const [errorBannerText, setErrorBannerText] = useState('');
  
  
  const chatData = route?.params?.chatUsers
  
  const getMessagesData = (state, chatId) => state.messages.messagesData[chatId] || {};

  const getChatMessages = createSelector(
    [getMessagesData],
    (chatMessagesData) => {
      const messageList = [];
      for (const key in chatMessagesData) {
        const message = chatMessagesData[key];
        messageList.push({
          key,
          ...message
        });
      }
      return messageList;
    }
  );
  const chatMessages = useSelector(state => getChatMessages(state, chatId));
  

   const getChatTitleFromName = () => {
      const otherUserId = route?.params?.selectedUserId
      const otherUser = storedUsers[otherUserId];
      return  otherUser && `${otherUser.firstName} ${otherUser.lastName}`
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
        await sendTextMessage(chatId,userData.userId,messageText);

        setMessageText("");

    } catch (error) {
        console.log("Error sending message:", error);
        setErrorBannerText("Message failed to send");
        setTimeout(()=>{
          setErrorBannerText("");
        },5000);
    }

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

            {
              errorBannerText !=="" && <Bubble text={errorBannerText} type="error"/>
            }

            {
              chatId && 
              <FlatList
              data={chatMessages}
              renderItem={(itemData)=>{
                  const message = itemData.item;
                  const isOwnMessage = message.sentBy === userData.userId;
                  const messageType = isOwnMessage ? "myMessage" : "theirMessage"


                  return <Bubble text={message.text}  type={messageType}/>
              }}
              />
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
