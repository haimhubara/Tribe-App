import { View,StyleSheet,Text, Pressable } from 'react-native'
import Input from '../../components/Input';
import { useState } from 'react';
import { GlobalStyles } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

const SinginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleLogin(){
    console.log(email+'\n');
    console.log(password+'\n');
  }
  return (
    <View style={styles.root}>
        <Text  style={styles.text}>Sign in</Text>
        <Input setField={setEmail} field = {email} LabelText="Enter email" placeholderText="Enter email"/>
        <Input setField = {setPassword} field = {password} LabelText="Enter password" placeholderText="Enter password"/>
      <Button text="Login" handleClick={handleLogin}/>
      <Text style={styles.signupText}>
              Dont have an account?
              <Pressable onPress={() => {navigation.navigate("SignUp")}}>
                <Text style={styles.loginText}> Sign Up</Text>
              </Pressable>
            </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop:32
  },
  text:{
    textAlign:'center',
    fontSize:32,
    fontWeight:'bold'
  },
  button: {
    margin:16,
    marginTop: 24,
    backgroundColor:GlobalStyles.colors.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 17,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clicked:{
    opacity:0.75
  },
  signupText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20, 
    lineHeight: 24, 
  },
  loginText: {
    color: GlobalStyles.colors.mainColor,
    fontWeight: 'bold',
  },
});


export default SinginScreen
