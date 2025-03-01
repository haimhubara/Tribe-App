import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const IconButton = ({ iconName, IconPack, onPress, iconColor,iconSize,rootStyle ,containerStyle,information }) => {
  return (
     <TouchableOpacity onPress={onPress} style={[styles.root,rootStyle]}>
           <View style={[styles.icnContainer,containerStyle]}>
              {IconPack && <IconPack color={iconColor || GlobalStyles.colors.textColor} style={styles.icon} name={iconName} size={iconSize || 24} />}
               <Text style={styles.buttonInformation}>{information}</Text>
           </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    root:{
        
    },
    icnContainer:{
        backgroundColor: "#FAFAFA",
        paddingHorizontal:25,
        paddingVertical:10,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center'
    },
    icon:{
        paddingHorizontal:5,
    },
    buttonInformation:{
        color:GlobalStyles.colors.textColor,
        fontFamily:"regular",
        letterSpacing:0.3,
    },
});


export default IconButton
