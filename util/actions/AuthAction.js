import { getFirebaseApp } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

export const  signUp = async(signUpFormValue,uploadImagesFormValues,videoUri) => {

    const app = getFirebaseApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    try{
        const result = await createUserWithEmailAndPassword(auth,signUpFormValue['email'],signUpFormValue['password']);
        const { uid } = result.user;
        const userData = await createUser(firestore,signUpFormValue, uid);
        console.log(userData);

    }catch(error){
        const errorCode = error.code;
        console.error(errorCode);
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
   


export const  signin = (email,password) => {
    console.log(email+ " " +password);
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
