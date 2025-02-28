import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { GlobalStyles } from '../constants/styles'


const Input = ({label,iconName,IconPack,iconSize,error,id,onInuptChange,inputOption}) => {

    const onChangeText = text => {
        {onInuptChange && onInuptChange(id,text)}
    }

  return (
    <View style={styles.root}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
           {IconPack && <IconPack style={styles.icon} name={iconName} size={iconSize || 24} />}
            <TextInput style={styles.input} onChangeText={onChangeText} {...inputOption} />
        </View>
       { error && <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>

        </View>
       }
    </View>
  )
}



const styles = StyleSheet.create({
    root:{
        width:'100%'
    },
    inputContainer:{
        width:'100%',
        backgroundColor:'white',
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center'
    },
    icon:{
        marginRight:10,
        color:GlobalStyles.colors.textColor
    },
    label:{
        marginVertical:8,
        fontFamily:'bold',
        letterSpacing:0.3,
        color:GlobalStyles.colors.textColor,
    },
    input:{
        color:GlobalStyles.colors.textColor,
        flex:1,
        fontFamily:"regular",
        letterSpacing:0.3,
        
    },
    errorContainer:{
        marginVertical:5
    },
    errorText:{
        color:'red',
        fontSize:13,
        fontFamily:'regular',
        letterSpacing:0.3,
    }
});

export default Input
