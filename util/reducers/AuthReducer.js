export const  signUpreducer = (state, action) => {
    const { inputStatus, inputId, inputValue } = action;
  
    const updatedValues = {
      ...state.values,
      [inputId]: inputStatus
    };
  
    const uptatedActualValue = {
      ...state.actualValues,
      [inputId]:inputValue
    };
  
    let updatedFormStatus = true;
  
    for (const key in updatedValues) {
      if (updatedValues[key] !== undefined) {
        updatedFormStatus = false;
        break;
      }
    }
  
  
    return {
      actualValues:uptatedActualValue,
      values: updatedValues,
      formStatus: updatedFormStatus
    };
  };



  export const signInReducer = (state,action) => {
    const stateOfValue = action.stateOfValue
    const inputId = action.inputId;
    const inputValue = action.inputValue;
  
    const updatevalues = {
      ...state.values,
      [inputId]:stateOfValue
    };
  
    const updateActualValues = {
      ...state.actualValues,
      [inputId]:inputValue
    }
  
    let updateFormState = true;
    for(const key in updatevalues ){
      if(updatevalues[key] !== undefined){
        updateFormState=false;
        break;
      }
    }
  
  
    return{
      actualValues:updateActualValues,
      values:updatevalues,
      formState:updateFormState
  
    }
    
  }