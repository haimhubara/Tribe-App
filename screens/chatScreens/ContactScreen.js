import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import PageContainer from '../../components/PageContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '../../constants/styles';
import { getUserChats } from '../../util/actions/userAction';
import ActiveChats from '../../components/ActiveChat';
import SubmitButton from '../../components/buttons/SubmitButton';
import { ActivityIndicator } from 'react-native-paper';
import { removeUserFromChat } from '../../util/actions/chatAction';

const ContactScreen = ({route,navigation}) => {
    const storedUsers = useSelector(state => state.users.storedUsers);
    const userData = useSelector(state => state.auth.userData);
    const otherUserId = route?.params?.uid;
    const otherUser = storedUsers[otherUserId];
    const[isLoading, setIsLoading] = useState(false);

    
    
  
    const myChats = useSelector(state => state.chats.chatsData);
    
    const [commonsChats, setCommonCahts] = useState([]);

    const chatId = route.params.chatId; 

    const chatData = chatId && myChats[chatId];
    

  


    useEffect(()=>{
        const fetchUserChats = async() => {
            setIsLoading(true);
             const otherUserChats = await getUserChats(otherUserId);
             setIsLoading(false);
             setCommonCahts(
                Object.values(otherUserChats).filter(cid => myChats[cid] && myChats[cid].isGroupChat)
             )
        }
        fetchUserChats();
    },[])

    const removeFromChat = useCallback( async ()=>{
            try {
                setIsLoading(true)
                

                await removeUserFromChat(userData,otherUser, chatData);
               

                navigation.goBack();
            } catch (error) {
                    console.log(error);
            }finally{
                setIsLoading(false);
            }
    },[navigation,chatData]);
    
  return (
         <ScrollView style={{flex:1}}>
            <View style={styles.root}>
                <TouchableOpacity onPress={()=>navigation.navigate('Chats')} style={{marginTop:8}}>
                    <Ionicons name="arrow-back" size={32} color="black" />
                </TouchableOpacity>
                <Text  style={styles.text}>Contact Info</Text>
                <Text></Text>
          </View>
    
            <PageContainer>
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={{uri:otherUser.images['firstImage']}}/>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{`${otherUser.firstName} ${otherUser.lastName}`}</Text>
                </View>
                {
                    commonsChats.length > 0 &&
                    <>
                        <Text style={styles.heading}>{commonsChats.length} {commonsChats.length === 1 ? 'Group' : 'Groups'}  in Common</Text>
                        {
                            commonsChats.map(cid => {
                                const chatData = myChats[cid];
                                if (!chatData) {
                                    navigation.popToTop();
                                  
                                }
                                return <ActiveChats
                                key={cid}
                                title={chatData.chatName}
                                lastMessage={chatData.latestMessageText}
                                imageSource={chatData.chatImage}
                                type="link"
                                startChatHandle={()=>{
                                    navigation.navigate("Chats Screen", {
                                        screen: "Chat",
                                        params: {  chatId:cid,  fromScreen: "ContactScreen" },
                                      });
                                }}
                             
                                
                                />
                            })
                        }
                    </>
                }

                {
                    chatData && chatData.isGroupChat &&
                    (
                        isLoading?
                        <ActivityIndicator
                        size={'small'} color={GlobalStyles.colors.mainColor}
                        />
                        :
                        <SubmitButton
                            title="Remove from chat"
                            color={GlobalStyles.colors.errorColor}
                            onPress={removeFromChat}
                        
                        />
                    )
                   
                }
            </PageContainer>

        </ScrollView>
  )
}

const styles = StyleSheet.create({
    topContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:20
    },
    image:{
        width:100,
        height:100,
        borderRadius:50
    },
    text: {
        fontSize: 32,
        textAlign: "center",
        justifyContent:'center',
        marginRight:20,
        fontFamily:'bold',
        letterSpacing:0.3,
        color:GlobalStyles.colors.textColor,
    },
    root:{
        margin:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        marginTop:32
     },
     nameContainer:{
        justifyContent:'center',
        alignItems:'center'
     },
     name:{
        color:GlobalStyles.colors.textColor,
        letterSpacing:0.3,
        fontSize:32,
        fontFamily:'medium'
     },
     heading:{
        marginTop:30,
        fontFamily:'bold',
        letterSpacing:0.3,
        color:GlobalStyles.colors.textColor,
        marginVertical:8
     }
});

export default ContactScreen
