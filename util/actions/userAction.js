import { getFirestore, doc, getDoc, query, startAt, endAt,getDocs, collection, orderBy } from "firebase/firestore";
import { getFirebaseApp } from "../firebase";

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
