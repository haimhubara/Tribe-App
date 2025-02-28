import { validateEmail,validateString,validatePassword,validatephoneNumber, validateConfirmPassword,validateDate  } from "../ValidationConstrains"

export const validateInput = (inputId, inputValue, passwordValue = '') => {
  if (inputId === 'firstName' || inputId === 'lastName' || inputId === 'userName' || inputId ==='religion' || inputId==="gender") {
    return validateString(inputId, inputValue);
  }
  else if (inputId === 'email') {
    return validateEmail(inputId, inputValue);
  }
  else if (inputId === 'password') {
    return validatePassword(inputId, inputValue);
  }
  else if (inputId === 'confirmPassword') {
    return validateConfirmPassword(inputId, inputValue, passwordValue);
  }
  else if (inputId === "phoneNumber") {
    return validatephoneNumber(inputId, inputValue);
  }
  else if (inputId === "date") {
    return validateDate(inputId, inputValue);
  }
 
};
