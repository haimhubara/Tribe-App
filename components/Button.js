import { View, Pressable, Text, StyleSheet } from "react-native"
import { GlobalStyles } from "../constants/styles";

const Button = ({text,handleClick,buttonStyle}) => {
  return (
    <View>
        <Pressable style={({pressed}) =>[styles.button,buttonStyle,pressed? styles.clicked:null]} onPress={handleClick}>
            <Text style={styles.buttonText}>{text}</Text>
         </Pressable>
    </View>
   
  )
}

const styles = StyleSheet.create({
     button: {
        margin:16,
        marginTop: 24,
        borderRadius:17,
        backgroundColor:GlobalStyles.colors.mainColor,
        paddingVertical: 12,
        paddingHorizontal: 24,
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
});

export default Button
