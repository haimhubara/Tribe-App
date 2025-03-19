import { getDatabase, ref, push, set } from "firebase/database";
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
    const db = getDatabase(app);
    const chatsRef = ref(db, "chats");

    try {
        const newChatRef = push(chatsRef);
        await set(newChatRef, { ...newChatData, id: newChatRef.key });

        for (const userId of newChatData.users) {
            const userChatRef = ref(db, `userChats/${userId}/${newChatRef.key}`);
            await set(userChatRef, { chatId: newChatRef.key });
        }

        return newChatRef.key;
    } catch (error) {
        console.error("Error creating chat:", error);
        throw error;
    }
};
