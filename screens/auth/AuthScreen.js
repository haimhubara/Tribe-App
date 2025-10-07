import React, { useState, useRef, useEffect,useReducer, useCallback } from 'react'
import { Pressable, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../../components/PageContainer'
import { SignUpForm, SignInForm, UploadPhotosForm, VideoForm } from "./components"
import { GlobalStyles } from '../../constants/styles'
import { signUpreducer } from '../../util/reducers/AuthReducer'
import { signUp } from '../../util/actions/AuthAction'
import { initialState } from '../../util/models/AuthModels'
import { imagesInitialState } from '../../util/models/AuthModels'
import { uploadImagesReducer } from '../../util/reducers/AuthReducer'
import { useDispatch } from 'react-redux'


const AuthScreen = () => {
  const dispach = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [next, setNext] = useState(false);
  const [secondNext, setSecondNext] = useState(false);
  const scrollViewRef = useRef();
  const [videoUri, setVideoUri] = React.useState(null);
  const [takeVideo, setTakeVideo] = useState(true);

  const [formUseStateValue, setFormUseStateValue] = useState(initialState);

  // const [photosReducerUseStateValue, setPhotosReducerUseStateValue] = useState(imagesInitialState);

  const [photosReducer,dispachPhotosReducer] = useReducer(uploadImagesReducer, imagesInitialState);

  const[formValues, dispachFormValues] = useReducer(signUpreducer,initialState);

  const backToSignUpFormHandle = () => {
    setNext(prevState => !prevState);
     dispachFormValues({
      type: "UPDATE INPUT",
      payload: { formState: true, stateValues: formUseStateValue }
    });
    setFormUseStateValue(initialState); 
  }
  

  const secondNextHandle = () => {
    setSecondNext(prevState =>!prevState);
  }

  
  

  const signUpHandle = useCallback (async() => {
    try{
      setIsLoading(true)
      const action = (signUp(formUseStateValue.actualValues,photosReducer.actualValues,videoUri));
      setError(null);
      await dispach(action);
   
    }catch(error){
      setError(error.message);
      setIsLoading(false);

    }
  },[dispach,formUseStateValue,photosReducer,videoUri])
  
  useEffect(() => {
    if(error){
      Alert.alert("An error occured",error);
    }
 },[error])



  useEffect(() => {
    // Scroll to top whenever the next step changes
    scrollViewRef.current?.scrollTo({ y: 0, animated: true })
  }, [next, secondNext])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: secondNext && !takeVideo ? 'black' : '#F0F0F0' }}>
      <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
        <PageContainer bool={secondNext} style={{ paddingHorizontal: 0 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : undefined}
            keyboardVerticalOffset={100}
            style={styles.KeyboardAvoidingView}>
            {!next && isSignUp && 
            <SignUpForm
               formValues={formValues}
               dispachFormValues={dispachFormValues}
               setFormUseStateValue={setFormUseStateValue}
              setNext={setNext} 
              />
            }
            {!isSignUp && <SignInForm />}

            {!next && 
              <View style={{ marginTop: 8, marginBottom: 10 }}>
                <Text style={styles.signupText}>Already have an account?
                  <Pressable onPress={() => { setIsSignUp(prevState => !prevState) }}>
                    <Text style={styles.loginText}> {`${isSignUp ? 'sign in' : 'sign up'}`}</Text>
                  </Pressable>
                </Text>
              </View>
            }

            { !secondNext && next && isSignUp &&
            <UploadPhotosForm
               onBackPress={backToSignUpFormHandle}
               photosReducer={photosReducer}
               dispachPhotosReducer={dispachPhotosReducer}
               secondNextHandle={secondNextHandle}
              />
            }
            {secondNext &&
             <VideoForm
                setSecondNext={setSecondNext}
                signUpHandle={signUpHandle}
                videoUri={videoUri}
                setVideoUri={setVideoUri}
                isLoading={isLoading}
                takeVideo={takeVideo}
                setTakeVideo={setTakeVideo}
            />
            }
          </KeyboardAvoidingView>
        </PageContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  signupText: {
    textAlign: 'center',
    fontFamily: 'regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.3
  },
  loginText: {
    color: GlobalStyles.colors.mainColor,
    fontWeight: 'bold',
    fontFamily: 'regular',
    letterSpacing: 0.3
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default AuthScreen
