import { getFirebaseApp } from "../firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { authenticate, logout } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "./userAction";



let timer;

export const  signUp = (signUpFormValue,uploadImagesFormValues,videoUri) => {
    return async dispach => {

    const app = getFirebaseApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    try{
        const result = await createUserWithEmailAndPassword(auth,signUpFormValue['email'],signUpFormValue['password']);
        const { uid, stsTokenManager } = result.user;
        const { accessToken, expirationTime } = stsTokenManager;
        const expiryDate = new Date(expirationTime)
        const timeNow =  new Date();
        const millisecondUntilExpiry = expiryDate - timeNow;
        const userData = await createUser(firestore,signUpFormValue, uid);
        dispach(authenticate({token:accessToken,userData}));
        saveDataToStorage(accessToken,uid,expiryDate);

        timer = setTimeout(() => {
            dispach(userLogout());
        },millisecondUntilExpiry);

    }catch(error){
        const errorCode = error.code;
        //console.error(errorCode);
        let message = "Something went wrong.";
    
        if(errorCode === "auth/email-already-in-use"){
            message="This email is already in use";
        }
        throw new Error(message);
    }
 
    for(const key in uploadImagesFormValues){
        if(uploadImagesFormValues[key] !== null && key !=='imagesContainer'){
            // console.log(key, ": "+uploadImagesFormValues[key]);
            // console.log();

        }
    }
    // console.log('videoUri: ',videoUri);

    }

    
}
   


export const  signin = (email,password) => {
    return async dispach => {

        const app = getFirebaseApp();
        const auth = getAuth(app);
        //const firestore = getFirestore(app);
    
        try{
            const result = await signInWithEmailAndPassword(auth,email,password);
            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;
            const expiryDate = new Date(expirationTime);
            const timeNow =  new Date();
            const millisecondUntilExpiry = expiryDate - timeNow;
            const userData = await getUserData(uid);
            dispach(authenticate({token:accessToken,userData}));
            saveDataToStorage(accessToken,uid,expiryDate);
            
            timer = setTimeout(() => {
                dispach(userLogout());
            },millisecondUntilExpiry);

    
        }catch(error){
            const errorCode = error.code;
            console.log(errorCode);
            let message = "Something went wrong.";

            if (errorCode=== "auth/email-already-in-use") {
                message = "This email is already in use";
            } else if (errorCode === "auth/invalid-credential") {
                message = "The credentials provided are invalid.";
            } else if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
                message = "The email or password was incorrect.";
            }
            throw new Error(message);
        }
    
        }
    
   
}

export const userLogout = () => {
    return async dispach => {
        AsyncStorage.clear();
        clearTimeout(timer);
        dispach(logout())
    }
}

const createUser = async(firestore,signUpFormValue,userId) => {
    const userData = {
        userId:userId,
        firstName: signUpFormValue['firstName'],
        lastName: signUpFormValue['lastName'],
        email: signUpFormValue['email'],
        userName: signUpFormValue['userName'],
        phoneNumber: signUpFormValue['phoneNumber'],
        gender: signUpFormValue['gender'],
        religion: signUpFormValue['religion'],
        date: signUpFormValue['date'],
        hobbies: signUpFormValue['hobbies'],
        languages: signUpFormValue['languages'],
        facebook: signUpFormValue['facebook'],
        instagram: signUpFormValue['instagram'],
        tiktok: signUpFormValue['tiktok'],
    }
    const userRef = doc(collection(firestore, "users"), userId);
    await setDoc(userRef, userData);
    return userData;
}


const saveDataToStorage = (token,userId, expiryDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token,
        userId,
        expiryDate:expiryDate.toISOString()
    }));
}
