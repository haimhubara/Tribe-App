import { validateEmail,validateString,validatePassword,validatephoneNumber, validateConfirmPassword,validateDate,validateHobbies,validateLanguages,validateGenderAndReligion, validateLink,validateImage,validateLocation, validateChatName } from "../ValidationConstrains"

export const validateInput = (inputId, inputValue, passwordValue = '') => {
  if (inputId === 'firstName' || inputId === 'lastName' || inputId === 'userName') {
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
  else if (inputId === "hobbies") {
    return validateHobbies(inputId, inputValue);
  }
  else if (inputId === "languages") {
    return validateLanguages(inputId, inputValue);
  }
  else if (inputId === "gender" || inputId === 'religion') {
    return validateGenderAndReligion(inputId, inputValue);
  }
  else if (inputId === "facebook" || inputId === 'tiktok' || inputId ==='instagram') {
    return validateLink(inputId, inputValue);
  }
  else if (inputId === "firstImage" || inputId === 'secondImage' || inputId ==='thirdImage'|| inputId === 'fourthImage' || inputId ==='fiveImage' || inputId ==='sixImage') {
    return validateImage(inputId ,inputValue);
  }
  else if (inputId === "location") {
    return validateLocation(inputId, inputValue);
  }
  else if (inputId === 'chatName') {
    return validateChatName(inputId, inputValue);
  }


};
