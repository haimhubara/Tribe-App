import React from 'react'
import { View,StyleSheet } from 'react-native'

const PageContainer = ({children,style,bool}) => {
  return (
    <View style={[styles.root,bool && style]}>
       {children}
    </View>
  )
}

const styles = StyleSheet.create({
    root:{
        paddingHorizontal:20,
        backgroundColor:'none'
     
    }
})

export default PageContainer
