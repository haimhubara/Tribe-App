import { View,Text,StyleSheet, TextInput, FlatList, Platform, ActivityIndicator, TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import ActiveChats from "../components/ActiveChat";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchUsers } from "../util/actions/userAction";
import { GlobalStyles } from "../constants/styles";
import PageContainer from "../components/PageContainer";

import defaultImage from "../assets/images/userImage.jpeg"
import { useSelector } from "react-redux";
import { createSelector } from 'reselect';



const ChatListScreen = ({navigation, route}) => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(true);

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);
    


    

    
    const { selectedUserId } = route?.params || {};
    const { selectedUsers } = route?.params || {};
    const { chatName } = route?.params || {};



   
    const getChats = createSelector(
      state => state.chats.chatsData, 
      chatsData => Object.values(chatsData).sort((a,b)=>{
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }) 
    );

    const userChats = useSelector(getChats);
    const HaveChats = userChats && userChats.find(chat => chat.users.includes(userData.userId));
  
   
   

    

     
    useEffect(()=>{

      if(!selectedUserId && !selectedUsers){
        return;
      }

      let chatUsers = [];
      if(selectedUsers){
        chatUsers = [ ...selectedUsers,userData.userId];
      }
      if(selectedUserId){
        chatUsers = [ selectedUserId,userData.userId];
      }


      navigation.navigate("Chat",{
        selectedUserId,
        chatUsers,
        chatId:route?.params?.chatId,
        isGroupChat: selectedUsers !== undefined,
        chatName
      });

    },[route?.params])

   
  
    
  return (

    
    <SafeAreaView style={{flex:1}}>
      
      <View style={styles.root}>
          <Text  style={styles.text}>Chats</Text>
      </View>
      <PageContainer>


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

      { !isLoading && HaveChats &&
        <FlatList 
        data={userChats}
        keyExtractor={(item) => item.key}

        renderItem={(itemData) => {
          const chatData = itemData.item;

          const chatId = chatData.key;
          const otherUserId = chatData.users.find(uid => uid !== userData.userId)
          const otherUser = storedUsers[otherUserId];
          const isGroupChat = chatData.isGroupChat;

          let title = "";
          let image ="";
          
          if(isGroupChat){
            title=chatData.chatName;
            image = chatData.chatImage;
          }
          else{
              title =`${otherUser.firstName} ${otherUser.lastName}`
              image=otherUser.images['firstImage'];
          }

          // console.log(chatData.latestMessageText);
          // console.log(chatData.users);
          
          if(!chatData){
            return ;
          }
          else if (!chatData.users.includes(userData.userId)) {
            return;
        }

       
          return <ActiveChats 
            imageSource={image ? image : defaultImage}
            title={title}
             lastMessage={chatData.latestMessageText || "New chat"}
             updatedAt={chatData.updatedAt}
              startChatHandle={()=> {
                navigation.navigate("Chats Screen",{
                  screen: "Chat",
                  params: { chatId:chatId,
                    selectedUserId:otherUserId,
                    chatUsers:chatData.users,
                    chatName:chatData.chatName,
                    isGroupChat : chatData.isGroupChat

                  }
                })
              }}
              
          />
         
        }}
     />
     }


      {
        !isLoading &&  !HaveChats  &&
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
    borderRadius: 8,
    marginVertical:16,
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