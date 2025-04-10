import { getFirestore, doc, getDoc, query, startAt, endAt,getDocs, collection, orderBy } from "firebase/firestore";
import { getFirebaseApp } from "../firebase";
import { child, get, getDatabase, ref, remove } from "firebase/database";

export const getUserData = async (userId) => {
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const userRef = doc(db, "users", userId);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
            throw new Error("User not found");
        }

        return snapshot.data();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export const getUserChats = async (userId) => {
    try {
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));
      const userChatsRef = child(dbRef, `userChats/${userId}`);
      const snapshot = await get(userChatsRef);
  
      if (!snapshot.exists()) {
        return null; 
      }
  
      return snapshot.val();
    } catch (error) {
      console.error("Error fetching user chats:", error);
      return null;
    }
  };


  export const deleteUserChat = async (userId,key) => {
    try {
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));
      const chatsRef = child(dbRef, `userChats/${userId}/${key}`);
  
        await remove(chatsRef);
   
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
  };

  export const deleteUserChatV2 = async (userId, chatKeyToDelete) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userChatsRef = child(dbRef, `userChats/${userId}`);

        const snapshot = await get(userChatsRef);

        if (snapshot.exists()) {
            const userChats = snapshot.val();

            // Iterate over all chat keys to find if any value equals chatKeyToDelete
            for (const chatKey in userChats) {
                if (userChats[chatKey] === chatKeyToDelete) {
                    const chatRefToDelete = child(userChatsRef, chatKey);
                    await remove(chatRefToDelete);  // Delete the chat reference
                }
            }
        } else {
            console.log(`No chats found for user ${userId}`);
        }
    } catch (error) {
        console.error("Error deleting user chat:", error);
        throw error;
    }
};





export const searchUsers = async (textToSearch) => {
    const search = textToSearch.toLowerCase();
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const usersRef = collection(db, "users");

        const queryRef = query(usersRef,orderBy("firstLast"),startAt(search),endAt(search + "\uf9ff"));

        const snapshot = await getDocs(queryRef);

        if (snapshot.empty) {
            return [];
        }

        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return users;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const getAllUsers = async () => {
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const usersRef = collection(db, "users");

        const snapshot = await getDocs(usersRef);

        if (snapshot.empty) {
            return [];
        }

        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return users;
        
    } catch (error) {
        console.error("Error fetching all users:", error);
        return [];
    }
};
