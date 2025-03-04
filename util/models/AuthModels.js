export const initialState = {
    actualValues:{
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",
      userName:"",
      phoneNumber:"",
      gender: "",
      religion: "",
      date: "",
      hobbies:[],
      languages:[],
      facebook:"",
      tiktok:"",
      instagram:""
    },
    values:{
      firstName:false,
      lastName:false,
      email:false,
      password:false,
      confirmPassword:false,
      userName:false,
      phoneNumber:false,
      gender: false,
      religion: false,
      date: false,
      hobbies:false,
      languages:false,
      facebook:undefined,
      tiktok:undefined,
      instagram:undefined
      
    },
    formStatus:false 
  }


  export  const imagesInitialState = {
    actualValues:{
      firstImage:null,
      secondImage:null,
      thirdImage:null,
      fourthImage:null,
      fiveImage:null,
      sixImage:null,
      imagesContainer:[]
    },
    values:{
      firstImage:false,
      secondImage:false,
      thirdImage:false,
      fourthImage:false,
      fiveImage:false,
      sixImage:false, 
      imagesContainer:false
    },
    formStatus:false 
}
  
  