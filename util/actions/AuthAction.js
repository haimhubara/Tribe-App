export const  signUp = (firstName,lastName,email,password,confirmPassword,userName,phoneNumber,gender,religion,date,hobbies,languages,facebook,tiktok,instagram) => {
    console.log(firstName +" "+lastName+" "+ email+ " " +password+ " "+
        confirmPassword+ " "+userName + " "+phoneNumber+ 
        " "+gender+ " "+religion+ " "+date + 
        " "+ hobbies + " "+languages+ " "+ facebook+ " "+ tiktok+ " "+ instagram
    
    );
 
}

export const  signin = (email,password) => {
    console.log(email+ " " +password);
}