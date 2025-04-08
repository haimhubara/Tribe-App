import { getDatabase, ref, push, set, child, update } from "firebase/database";
import { getFirebaseApp } from "../firebase";
import { deleteUserChat, getUserChats } from "./userAction";
import { Alert } from "react-native";

export const createChat = async (loggedInUserId, chatData, chatName,isGroupChat) => {

    const covertChatData = {
        users:chatData
    }


    const newChatData = {
        ...covertChatData,
        createdBy: loggedInUserId,
        updatedBy: loggedInUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    if(chatName){
        newChatData.chatName = chatName;
    }

    if(isGroupChat){
        newChatData.isGroupChat = isGroupChat;
    }

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const newChat = await push(child(dbRef, 'chats/'),newChatData );

    const chatUsers = newChatData.users;
    for (let i = 0; i < chatUsers.length; i++) {
        const userId = chatUsers[i];
        await push(child(dbRef, `userChats/${userId}`),newChat.key);
    }
    return newChat.key;

};


export const sendTextMessage = async(chatId,senderId,messageText, replyTo) => {
    await sendMessage(chatId,senderId, messageText, null,replyTo,null);
}

export const sendImageMessage = async(chatId,senderId,imageUrl, replyTo) => {
    await sendMessage(chatId,senderId, 'Image', imageUrl,replyTo,null);
}

export const sendInfoMessage = async(chatId,senderId,messageText,) => {
    await sendMessage(chatId,senderId, messageText, null,null,"info");
}


const sendMessage = async (chatId, senderId, messageText, imageUrl, replyTo, type) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const messagesRef = child(dbRef,`messages/${chatId}`);

    const messageData = {
        sentBy:senderId,
        sendAt: new Date().toISOString(),
        text:messageText

    };
    if(replyTo){
        messageData.replyTo = replyTo;
    }

    if(imageUrl){
        messageData.imageUrl = imageUrl
    }
    if(type){
        messageData.type = type;
    }

    await push(messagesRef,messageData);

    const chatRef = child(dbRef,`chats/${chatId}`);
    await update(chatRef,{
        updatedBy:senderId,
        updatedAt:  new Date().toISOString(),
        latestMessageText:messageText

    })
}

export const updateChatData = async(chatId, userId, chatData) => {
    try {
            const app = getFirebaseApp();
            const dbRef = ref(getDatabase(app));
            const chatRef = child(dbRef,`chats/${chatId}`);

            await update(chatRef, {
                ...chatData,
                updatedAt: new Date().toISOString(),
                updatedBy:userId

            })

    } catch (error) {
        console.log(error);
    }
}

export const removeUserFromChat = async(userLoggedInData,userToRemoveData, chatData) => {
     const userToRemoveId = userToRemoveData.userId;
     const newUsers = chatData.users.filter(uid => uid !== userToRemoveId );
     
    //  if(newUsers.length > 1){

        await updateChatData(chatData.key, userLoggedInData.userId, {users: newUsers} );
    
        const userChats = await getUserChats(userToRemoveId);
    
        for(const key in userChats){
            const currentChatId = userChats[key];
    
            if(currentChatId === chatData.key){
                await deleteUserChat(userToRemoveId,key);
                break;
            }
        }
        const messageText = userLoggedInData.userId === userToRemoveData.userId 
        ? `${userLoggedInData.firstName} leave the chat` 
        : `${userLoggedInData.firstName} removed ${userToRemoveData.firstName} from the chat`
    
        await sendInfoMessage(chatData.key,userLoggedInData.userId,messageText);

    //  }else{
    //     Alert.alert("can't delete or leave group under 2 pepole","i don't handle it yet");
    //  }
    
}


export const addUsersToChat = async (userLoggedInData, usersToAddData, chatData) => {
    const existingUsers = Object.values(chatData.users);
    const newUsers = [];
    let userAddadName = "";

    for (const userToAdd of usersToAddData) {
        const userToAddId = userToAdd.userId;
        if (existingUsers.includes(userToAddId)) {
            continue;
        }

        newUsers.push(userToAddId);
        await addUserChat(userToAddId, chatData.key);

        userAddadName =`${userToAdd.firstName} ${userToAdd.lastName}`
    }

    if(newUsers.length === 0){
        return;
    }
    await updateChatData(chatData.key,userLoggedInData.userId,{users:existingUsers.concat(newUsers)});

    const moreUsers = newUsers.length > 1 ? `and ${newUsers.length -1} others ` :''
    const messageText = `${userLoggedInData.firstName} ${userLoggedInData.lastName} added ${moreUsers}to the activity`
    await sendInfoMessage(chatData.key,userLoggedInData.userId,messageText);



}



  export const addUserChat = async (userId,chatId) => {
    try {
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));
      const chatsRef = child(dbRef, `userChats/${userId}`);
  
        await push(chatsRef,chatId);
   
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
  };
