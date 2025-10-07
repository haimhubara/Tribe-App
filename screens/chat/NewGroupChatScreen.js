import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable, FlatList } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAllUsers } from '../../util/actions/userAction';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import ActiveChats from './components/ActiveChat';
import { createChat, sendStartMessage } from '../../util/actions/chatAction';


const NewGroupChatScreen = ({navigation}) => {
  const [chatName , setChatName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const isGroupChatDisabeld = selectedUsers.length === 0 || chatName === '';


   useEffect(() => {
      const fetchUsers = async () => {
        try {
          setIsLoading(true);
          
          const allUsersFetched = await getAllUsers();
          const usersArray = Object.values(allUsersFetched).filter(user => user.userId !== userData.userId);
          setAllUsers(usersArray);
    
        
          if (usersArray.length === 0) {
            console.log("No users found.");
          }
        
      
         
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching users:", error);
          setIsLoading(false);
        }
      };
    
      fetchUsers();
    }, []);


    const addUserToChat = (userId) => {
        const newSelectedUsers = selectedUsers.includes(userId) 
        ? selectedUsers.filter(id => id !== userId) : selectedUsers.concat(userId);

        setSelectedUsers(newSelectedUsers);

    }

    const createNewChat = async () => {
      try {
        let chataData = [];
        chataData.push(userData.userId);
        const chatId = await createChat(userData.userId,chataData,chatName,true);
        await sendStartMessage(chatId,userData.userId,`hi and wellcome to ${chatName} activity`);

      } catch (error) {
        console.log(error)
      }

       
    }

    return (
      <View>
           <View style={styles.root}>
               <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginTop:8}}>
                    <Ionicons name="arrow-back" size={32} color="black" />
               </TouchableOpacity>
                 <Text  style={styles.text}>New Group</Text>
                 <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                      <Pressable onPress={isGroupChatDisabeld ? ()=>{}  : 
                      ()=>{ navigation.navigate("Chats Screen",{
                           screen: "Chats",
                           params: {
                               selectedUsers,
                               chatName,
                               isGroupChat:true
   
                            }
                        })}} 
                           style={({pressed})=>!isGroupChatDisabeld&&pressed && styles.pressed}>
                           <Text style={{color: !isGroupChatDisabeld?GlobalStyles.colors.blue:GlobalStyles.lightGrey, fontSize:17 ,textAlign:'center'}}>Create</Text>
                       </Pressable>
                 </View>
             
             </View>
   
             <View style={styles.chatNameContainer}>
               <View style={styles.inputContainer}>
                   <TextInput
                   placeholder='Enter a name for your chat'
                   style={styles.textBox}
                   autoCorrect={false}
                   onChangeText={(text)=>setChatName(text)}
                   value={chatName}
                
                   />
   
               </View>
   
             </View>
           <View style={{marginTop:20}}>
               {isLoading && 
                   <View style={styles.loadingContainer}>
                       <ActivityIndicator size={'large'} color={GlobalStyles.colors.mainColor}/>
                   </View>
              }
   
   
             {!isLoading && allUsers.length > 0 && (
               <FlatList 
                   data={allUsers}
                   keyExtractor={(item) => item.userId} 
                   renderItem={({ item }) => 
                       <ActiveChats 
                           startChatHandle={() => addUserToChat(item.userId)}
                           imageSource={item.images['firstImage']}
                           title={`${item.firstName} ${item.lastName}`}
                           type='checkBox'
                           isChecked={selectedUsers.includes(item.userId)}
                       
                        />}
               />
               )} 
   
           </View>
   
        
      </View>
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
         root:{
           margin:15,
           flexDirection:'row',
           justifyContent:'space-between',
           alignItems:'flex-start',
           marginTop:32
         },
         chatNameContainer:{
           paddingVertical:10
         },
         inputContainer:{
           width:'100%',
           paddingHorizontal:10,
           paddingVertical:15,
           backgroundColor:'#E0E0E0',
           flexDirection:'row',
           borderRadius:2
         },
         textBox:{
           color:GlobalStyles.colors.textColor,
           width:'100%',
           letterSpacing:0.3,
           fontFamily:'regular'
         },
         pressed:{
           opacity:0.75
          },
          loadingContainer: {
           flex: 1, 
           justifyContent: "center",
           alignItems: "center",
         },
   });
   
   export default NewGroupChatScreen