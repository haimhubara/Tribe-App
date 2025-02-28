import { validate } from 'validate.js';

export const validateString = (inputId,inputValue) =>{
    const constraints = {
        presence: {allowEmpty: false},
      };
      if(inputValue !== ''){
          constraints.format= {
            pattern: "[a-z]+",
            flags: "i",
            message: "value can only contain letters"

          }
      }
      const validationResult =  validate({[inputId] : inputValue},{[inputId]: constraints});
      return validationResult && validationResult[inputId];
}


export const validateEmail = (inputId, inputValue) => {
    const constraints = {
      presence: { allowEmpty: false },
    };
  
    if (inputValue !== '') {
      constraints.email = { email: true };
    }
  
    const validationResult = validate({ [inputId]: inputValue }, { [inputId]: constraints });
    return validationResult && validationResult[inputId];
  };

  export const validatePassword = (inputId, inputValue) => {
    const constraints = {
      presence: { allowEmpty: false },
    };
  
    if (inputValue !== '') {
      constraints.length = { 
        minimum: 6,
        message:'must be at least 6 characters'
    };
    }
  
    const validationResult = validate({ [inputId]: inputValue }, { [inputId]: constraints });
    return validationResult && validationResult[inputId];
  };
  