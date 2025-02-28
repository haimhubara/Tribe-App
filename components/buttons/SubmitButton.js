import React from 'react'
import { Pressable, View, Text,StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const SubmitButton = ({disabeld,color,title,onPress,style}) => {

    
  return (
    <Pressable onPress={disabeld ? ()=>{}  : onPress} style={({pressed})=>[styles.button,style,{backgroundColor:disabeld?GlobalStyles.colors.lightGrey:color}, !disabeld&&pressed && styles.pressed]}>
        <Text style={{color:disabeld ? GlobalStyles.colors.gery : 'white'}}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    pressed:{
     opacity:0.75
    },
    button:{
       paddingHorizontal:30,
       paddingVertical:10,
       borderRadius:30,
       justifyContent:'center',
       alignItems:'center'
    }
})
export default SubmitButton
