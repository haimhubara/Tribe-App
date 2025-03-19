import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'

const Bubble = ({text, type}) => {

    const bubbleStyle = {...styles.container}
    const textStyle = {... styles.text}

    switch(type){
        case  "system":
            textStyle.color = "#65644A";
            bubbleStyle.backgroundColor = GlobalStyles.colors.beige;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.marginTop = 10;
            break;


        default:
            break;

    }

  return (
    <View style={styles.wrappreStyle}>
        <View style={bubbleStyle}>
            <Text style={textStyle}>{text}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrappreStyle:{
        flexDirection:"row",
        justifyContent:'center'
    },
    text:{
        fontFamily:'regular',
        letterSpacing:0.3
        
    },
    container:{
        backgroundColor:'white',
        borderRadius:6,
        padding:5,
        marginBottom:10,
        borderColor:"#E2DACC",
        borderWidth:1
    }

});

export default Bubble
