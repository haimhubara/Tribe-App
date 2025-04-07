import { View,Text,StyleSheet, TextInput, FlatList, Platform, ActivityIndicator, TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import ActiveChats from "../components/ActiveChat";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchUsers } from "../util/actions/userAction";
import { GlobalStyles } from "../constants/styles";

import defaultImage from "../assets/images/userImage.jpeg"
import { useSelector } from "react-redux";
import { createSelector } from 'reselect';
import { useFocusEffect } from "@react-navigation/native";
import PageContainer from "../components/PageContainer";


const ChatListScreen = ({navigation, route}) => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(true);

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);
    


    

    
    const { selectedUserId } = route?.params || {};

    const { selecterUsers } = route?.params || {};
    const { chatName } = route?.params || {};





   
    const getChats = createSelector(
      state => state.chats.chatsData, 
      chatsData => Object.values(chatsData).sort((a,b)=>{
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }) 
    );

    const userChats = useSelector(getChats);


    
   
     
    useEffect(()=>{

      if(!selectedUserId && !selecterUsers){
        return;
      }

      const chatUsers = [selectedUserId,userData.userId];
      // console.log(chatUsers);

      // const navigationProps = {
      //   newChatData : { users: chatUsers}
      // }


      navigation.navigate("Chat",{
        selectedUserId,
        chatUsers,
        chatId:route?.params?.chatId,
        isGroupChat: selecterUsers !== undefined,
        chatName
      });

    },[route?.params])

   
  
    
  return (

    
    <SafeAreaView style={{flex:1}}>
      
      <View style={styles.root}>
          <Text  style={styles.text}>Chats</Text>
      </View>
      <PageContainer>

        <View>
            <TouchableOpacity onPress={()=>{navigation.navigate("New Group Chat")}}>
                <Text style={{color:GlobalStyles.colors.blue, fontSize:17}}>New Group</Text>
            </TouchableOpacity>
        </View>

      <View style={[styles.searchContainer, Platform.OS === 'ios' && styles.inputIOS,Platform.OS==='web' &&{padding:10}]}>
          <Ionicons name="search" size={16} color="grey" />
          <TextInput placeholder="Search"
          style={{flex:1}}
          onChangeText={(data)=>{setSearch(data)}}
          value={search}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off" 
          />
      </View>
      </PageContainer>
      {isLoading && 
       <View style={{alignItems:'center',justifyContent:'center'}}>
           <ActivityIndicator size={'large'} color={GlobalStyles.colors.mainColor}/>
       </View>
       }

      { !isLoading && userChats.length !== 0 &&
        <FlatList 
        data={userChats}
        keyExtractor={(item) => item.key}

        renderItem={(itemData) => {
          const chatData = itemData.item;

          const chatId = chatData.key;
          const otherUserId = chatData.users.find(uid => uid !== userData.userId)
          const otherUser = storedUsers[otherUserId];
          if(!otherUser){
            return;
          }
       
          return <ActiveChats 
            imageSource={otherUser.images['firstImage']}
             firstName={otherUser.firstName}
             lastName={otherUser.lastName}
             lastMessage={chatData.latestMessageText || "New chat"}
             updatedAt={chatData.updatedAt}
              startChatHandle={()=> {
                navigation.navigate("Chats Screen",{
                  screen: "Chat",
                  params: { chatId:chatId,
                    selectedUserId:otherUserId,
                    chatUsers:[otherUserId,userChats.userId]
                  }
                })
              }}
              
          />
         
        }}
     />
     }


      {
        !isLoading &&  userChats.length === 0 &&
        (
            <View style={styles.notFound}>
                <Ionicons name="people" size={55} color="grey" />
                <Text style={styles.notFoundText} >Not chats found</Text>
            </View>
        )
      }
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    textAlign: "center",
    justifyContent:'center',
    fontFamily:'bold',
    letterSpacing:0.3,
    color:GlobalStyles.colors.textColor,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    padding: 2,
    marginVertical: 16,
    borderRadius: 8,
    borderWidth: 0.1,
    marginBottom: 20,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  notFoundText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
  },
  inputIOS: {
    paddingVertical: 13,
  },
});


export default ChatListScreen
