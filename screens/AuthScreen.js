import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import SignUpForm from '../components/auth/SignUpForm'
import SignInForm from '../components/auth/SignInForm'
import { Pressable, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import { View } from 'react-native'
import UploadPhotosForm from '../components/auth/UploadPhotosForm'
import VideoForm from '../components/auth/VideoForm'
import { signUpreducer } from '../util/reducers/AuthReducer'

const initialState = {
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

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [next, setNext] = useState(false)
  const [secondNext, setSecondNext] = useState(false)
  const scrollViewRef = useRef()

  useEffect(() => {
    // Scroll to top whenever the next step changes
    scrollViewRef.current?.scrollTo({ y: 0, animated: true })
  }, [next, secondNext])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
        <PageContainer bool={secondNext} style={{ paddingHorizontal: 0 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : undefined}
            keyboardVerticalOffset={100}
            style={styles.KeyboardAvoidingView}>
            {!next && isSignUp && <SignUpForm signUpreducer={signUpreducer} initialState={initialState} next={next} setNext={setNext} />}
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

            {!secondNext && next && isSignUp && <UploadPhotosForm secondNext={secondNext} setSecondNext={setSecondNext} onBackPress={() => { setNext(prevState => !prevState) }} />}
            {secondNext && <VideoForm setSecondNext={setSecondNext} />}
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
