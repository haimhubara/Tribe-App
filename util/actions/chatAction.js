import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "../firebase";

export const createChat = async (loggedInUserId, chatData) => {
    if (!chatData || !Array.isArray(chatData.users) || chatData.users.length === 0) {
        throw new Error("Invalid chatData.users");
    }

    const newChatData = {
        ...chatData,
        createdBy: loggedInUserId,
        updatedBy: loggedInUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const app = getFirebaseApp();
    const db = getFirestore(app);
    const dbRef = collection(db, "chats");

    try {
        const newChat = await addDoc(dbRef, newChatData);

        for (const userId of newChatData.users) {
            await addDoc(collection(db, "userChats", userId, "chats"), {
                chatId: newChat.id,
                // createdAt: new Date().toISOString(),
            });
        }

        return newChat.id;
    } catch (error) {
        console.error("Error creating chat:", error);
        throw error;
    }
};
