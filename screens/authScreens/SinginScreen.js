import { View,StyleSheet,Text, Pressable } from 'react-native'
import Input from '../../components/Input';
import { useState } from 'react';
import { GlobalStyles } from '../../constants/styles';

const SinginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleLogin(){
    console.log(email+"   "+password);
    setEmail("");
    setPassword("");
  }
  return (
    <View style={styles.root}>
        <Text  style={styles.text}>Sign in:</Text>
        <Input setField={setEmail} field = {email} text="Enter email"/>
        <Input setField = {setPassword} field = {password} text="Enter password"/>
        <Pressable style={({pressed}) =>[styles.button,pressed? styles.clicked:null]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
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
    marginTop: 24,
    backgroundColor:GlobalStyles.colors.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clicked:{
    opacity:0.75
  }
});


export default SinginScreen
