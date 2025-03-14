import { getFirestore, doc, getDoc } from "firebase/firestore";
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
