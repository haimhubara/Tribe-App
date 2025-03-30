import { validate } from 'validate.js';
import moment from 'moment';

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

export const validateConfirmPassword = (inputId, inputValue, passwordValue) => {
  const constraints = {
    [inputId]: {
      equality: {
        attribute: "password",
        message: 'does not match password'
      }
    }
  };

  const validationResult = validate(
    { [inputId]: inputValue, password: passwordValue }, 
    constraints
  );

  return validationResult ? validationResult[inputId] : undefined;
};




export const validatephoneNumber = (inputId, inputValue) => {
  const constraints = {
    presence: { allowEmpty: false }, 
  };

  if (inputValue !== "") {
    constraints.length = {
      minimum: 10,
      message: "must be at least 10 digits",
    };
    constraints.format = {
      pattern: "^[0-9]+$",
      message: "Value can only contain digits",
    };
  }

  const validationResult = validate(
    { [inputId]: inputValue },
    { [inputId]: constraints }
  );

  return validationResult && validationResult[inputId];
};



export const validateDate = (inputId, inputValue) => {
  validate.extend(validate.validators.datetime, {
    parse: function (value) {
      return +moment.utc(value, "YYYY-MM-DD");
    },
    format: function (value) {
      return moment.utc(value).format("YYYY-MM-DD");
    },
  });

  const cleanDate = moment.utc(inputValue).format("YYYY-MM-DD");
  
  const constraints = {
    [inputId]: {
      datetime: {
        dateOnly: true,
        latest: moment.utc().subtract(10, "years").toDate(),
        message: "^You need to be at least 10 years old",
        strict: true,
        format: "YYYY-MM-DD", 
      },
      presence: { allowEmpty: false, message: "^This field is required" },
    },
  };

  const result = validate({ [inputId]: cleanDate }, constraints);

  return result ? result[inputId]?.[0] : undefined;
};


export const validateHobbies = (inputId, inputValue) => {
  if (inputValue.length >= 3) {
    return undefined;
  } else {
    return "Please select at least 3 hobbies"; 
  }
};

export const validateLanguages = (inputId, inputValue) => {
  if (inputValue.length >= 1) {
    return undefined;
  } else {
    return "Please select at least 1 languages"; 
  }
};


export const validateGenderAndReligion = (inputId, inputValue) => {
  if (inputValue !== "Select "+inputValue) {
    return undefined;
  } else {
    return "Please select "+inputValue; 
  }
};



export const validateLink = (inputId, inputValue) => {
  const socialPattern = /^(https?:\/\/)?(www\.)?(instagram\.com|facebook\.com|tiktok\.com)\/[A-Za-z0-9_.]+\/?$/;
  
  if (inputValue === "") {
    return undefined;
  }
  
  if (!socialPattern.test(inputValue)) {
    return "Please enter a valid link";
  }

  return undefined;
};


export const validateImage = (inputId, inputValue) => {
  return inputValue && typeof inputValue === 'string' && inputValue.trim() !== ''
    ? undefined
    : 'Image is required';
};


export const validateLocation = (inputId, inputValue) => {
  const constraints = {
    presence: { allowEmpty: false },
  };
  return validate({ [inputId]: inputValue }, { [inputId]: constraints });
}
