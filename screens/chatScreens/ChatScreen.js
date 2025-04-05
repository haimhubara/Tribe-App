import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, FlatList, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import backgroundImage from '../../assets/images/droplet.jpeg';
import { useSelector } from 'react-redux';
import Bubble from '../../components/chat/Bubble';
import { createChat, sendImageMessage, sendTextMessage } from '../../util/actions/chatAction';
import ReplyTo from '../../components/chat/ReplyTo';

import AwseomeAlert from 'react-native-awesome-alerts'
import { GlobalStyles } from '../../constants/styles';
import {openCamera, pickImageHandle } from '../../util/actions/imageAction';
import { uploadImageToCloudinary } from '../../components/Cloudinary';

const ChatScreen = ({ navigation, route }) => {
  const storedUsers = useSelector(state => state.users.storedUsers);
  const flatList = useRef(null);
  const userData = useSelector(state => state.auth.userData);
  const [chatId, setChatId] = useState(route?.params?.chatId);
  const [messageText, setMessageText] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const [errorBannerText, setErrorBannerText] = useState('');
  const [tempImageUri, setTempImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 

  const [replyingTo, setReplayingTo] = useState();
  const chatData = route?.params?.chatUsers;
  const emptyArray = [];
 
  const chatMessages = useSelector(state => {
    if (!chatId) return emptyArray;
    const chatMessagesData = state.messages.messagesData[chatId];
    if (!chatMessagesData) return emptyArray;

    const messageList = emptyArray;
    for (const key in chatMessagesData) {
      const message = chatMessagesData[key];
      messageList.push({
        key,
        ...message
      });
    }
    return messageList;
  });

  const getChatTitleFromName = () => {
    const otherUserId = route?.params?.selectedUserId;
    const otherUser = storedUsers[otherUserId];
    return otherUser && `${otherUser.firstName} ${otherUser.lastName}`;
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: getChatTitleFromName() ? getChatTitleFromName() : ""
    });

    setChatUsers(chatData);
  }, [chatUsers]);

  const sendMessage = useCallback(async () => {
    try {
      let id = chatId;
      if (!chatId) {
        id = await createChat(userData.userId, route?.params?.chatUsers);
        setChatId(id);
      }

      if (messageText !== "") {
        await sendTextMessage(id, userData.userId, messageText, replyingTo && replyingTo.key);
      }

      setMessageText("");
      setReplayingTo(null);
    } catch (error) {
      console.log("Error sending message:", error);
      setErrorBannerText("Message failed to send");
      setTimeout(() => {
        setErrorBannerText("");
      }, 5000);
    }
  }, [messageText, chatId]);

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

  const pickImage = useCallback( async () => {
      try {
          const tempUri = await pickImageHandle();
          if(!tempUri){
            return;
          }

          setTempImageUri(tempUri);
      } catch (error) {
        
      }
  },[tempImageUri]);

  const takePhoto = useCallback( async () => {
    try {
        const tempUri = await openCamera();
        if(!tempUri){
          return;
        }

        setTempImageUri(tempUri);
    } catch (error) {
      
    }
},[tempImageUri]);


  const uploadImage = useCallback(async () => {
    setIsLoading(true);
      try {

        let id = chatId;
        if (!chatId) {
          id = await createChat(userData.userId, route?.params?.chatUsers);
          setChatId(id);
        }

        const uploadUrl = await uploadImageToCloudinary(tempImageUri);
        setIsLoading(false);

        await sendImageMessage(id,userData.userId, uploadUrl, replyingTo && replyingTo.key);

        setReplayingTo(null);
        setTempImageUri("");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
  },[setIsLoading, tempImageUri, chatId]);

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ImageBackground style={styles.backgroundImage} source={backgroundImage}>

          {!chatId && <Bubble text="This is a new chat. Say hi!" type="system" />}

          {errorBannerText !== "" && <Bubble text={errorBannerText} type="error" />}
          
          <ScrollView
            ref={flatList}
            onContentSizeChange={() => {
              setTimeout(() => flatList.current?.scrollToEnd({ animated: false }), 100);
            }}
            onLayout={() => flatList.current.scrollToEnd({ animated: false })}
          >
            {chatMessages.map((message, index) => {
              const isOwnMessage = message.sentBy === userData.userId;
              const messageType = isOwnMessage ? "myMessage" : "theirMessage";

              return <Bubble imageUrl={message.imageUrl} replyingTo={message.replyTo && chatMessages.find(i => i.key === message.replyTo)} setReply={()=>setReplayingTo(message)} key={index} text={message.text} type={messageType} date={message.sendAt} />;
            })}
          </ScrollView>
          {
            replyingTo && 
           <ReplyTo
             text={replyingTo.text}
             user={storedUsers[replyingTo.sentBy] === undefined ? userData : storedUsers[replyingTo.sentBy]}
             onCancel={() => setReplayingTo(null)}

             />
          }
        </ImageBackground>

        <View style={styles.inputContainer}>
          <Pressable onPress={pickImage} style={({ pressed }) => [styles.mediaButton, pressed && { opacity: 0.25 }]}>
            <Feather name="plus" size={24} color="black" />
          </Pressable>

          <TextInput
            style={styles.textBox}
            onChangeText={(text) => setMessageText(text)}
            value={messageText}
            multiline={true}
            maxLength={200}
          />

          {messageText === "" && (
            <Pressable onPress={takePhoto} style={({ pressed }) => [styles.mediaButton, pressed && { opacity: 0.25 }]}>
              <Feather name="camera" size={24} color="black" />
            </Pressable>
          )}
          {messageText !== "" && (
            <Pressable onPress={sendMessage} style={({ pressed }) => [styles.sendButton, pressed && { opacity: 0.25 }]}>
              <Feather name="send" size={20} color="black" />
            </Pressable>
          )}
          {tempImageUri &&
          <AwseomeAlert
            show={true}
            title='Send image'
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText='Cancel'
            confirmText='Send image'
            confirmButtonColor={GlobalStyles.colors.mainColor}
            cancelButtonColor={GlobalStyles.colors.errorColor}
            titleStyle={styles.popupTitleStyle}
            onCancelPressed={() => {
              setTempImageUri("");
            }}
            onConfirmPressed={uploadImage}
            onDismiss={() => {
              setTempImageUri("");
            }}
            customView={(
                 <View> 
                  {
                    isLoading && 
                    <ActivityIndicator
                    size='small' color={GlobalStyles.colors.mainColor}
                    />
                  }
                   {!isLoading && tempImageUri !=="" && 
                   <Image source= {{uri: tempImageUri}} style={{width:200, height:200}}/>}
                 </View>
         
           )}
          />
        }

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#bdc3c7',
    marginHorizontal: 15,
    paddingHorizontal: 12,
    height: 40,
  },
  mediaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  popupTitleStyle:{
    fontFamily:'medium',
    letterSpacing:0.3,
    color:GlobalStyles.colors.textColor
  }
});

export default ChatScreen;
