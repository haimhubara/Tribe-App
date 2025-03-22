import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import PageContainer from './PageContainer'

const Bubble = ({text, type}) => {

    const bubbleStyle = {...styles.container}
    const textStyle = {... styles.text}
    const wrappreStyle = {... styles.wrappreStyle}

    switch(type){
        case  "system":
            textStyle.color = "#65644A";
            bubbleStyle.backgroundColor = GlobalStyles.colors.beige;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.marginTop = 10;
            break;

        case "error":
            bubbleStyle.backgroundColor = GlobalStyles.colors.errorColor
            textStyle.color = "white";
            bubbleStyle.marginTop = 10;
            break;

            case "myMessage":
            wrappreStyle.justifyContent = 'flex-start';
            bubbleStyle.marginTop = 10;
            bubbleStyle.backgroundColor = "#E7FED6";
            bubbleStyle.maxWidth = "90%";
            break;

            case "theirMessage":
            wrappreStyle.justifyContent = 'flex-end';
            bubbleStyle.maxWidth = "90%";
            
            bubbleStyle.marginTop = 10;
            break;


        default:
            break;

    }

  return (
    <PageContainer>
    <View style={wrappreStyle}>
        <View style={bubbleStyle}>
            <Text style={textStyle}>{text}</Text>
        </View>
    </View>
    </PageContainer>
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
