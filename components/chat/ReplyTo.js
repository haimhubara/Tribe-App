import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import AntDesign from '@expo/vector-icons/AntDesign';

const ReplyTo = ({text, user, onCancel}) => {

    const name = `${user.firstName} ${user.lastName} `;

  return (
   <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.name}>{name}</Text>
            <Text numberOfLines={1} >{text}</Text>
        </View>

        <TouchableOpacity onPress={onCancel}>
            <AntDesign name="closecircleo" size={24} color={GlobalStyles.colors.blue} />
        </TouchableOpacity>

   </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F5F5F5',
        padding:8,
        flexDirection:'row',
        alignItems:'center',
        borderColor:GlobalStyles.colors.blue,
        borderLeftWidth:4
    },
    textContainer:{
        flex:1,
        marginRight:5
    },
    name:{
        color:GlobalStyles.colors.blue,
        fontFamily:'medium',
        letterSpacing:0.3

    }
});

export default ReplyTo
