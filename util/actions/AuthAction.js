export const  signUp = (signUpFormValue,uploadImagesFormValues,videoUri) => {
 
    for(const key in signUpFormValue){
        if(signUpFormValue[key] !== '' && key!=='email' && key!=='password' && key!=='confirmPassword'){
            console.log(key, ": "+signUpFormValue[key]);

        }
    }
    console.log();
    for(const key in uploadImagesFormValues){
        if(uploadImagesFormValues[key] !== null && key !=='imagesContainer'){
            console.log(key, ": "+uploadImagesFormValues[key]);
            console.log();

        }
    }
    console.log('videoUri: ',videoUri);
}
   


export const  signin = (email,password) => {
    console.log(email+ " " +password);
}