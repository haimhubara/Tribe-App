import { getDoc, getFirestore, doc } from "firebase/firestore";
import { getFirebaseApp } from "../firebase";

export const getActivityData = async (activityId) => {
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const activityRef = doc(db, "activities", activityId);
        const snapshot = await getDoc(activityRef);

        if (!snapshot.exists()) {
            throw new Error("Activity not found");
        }

        return { id: snapshot.id, ...snapshot.data() }; 
    } catch (error) {
        console.error("Error fetching activity data:", error);
        return null;
    }
};
