import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { View, TextInput } from 'react-native';

const Search = ({search, setSearch, onSubmitHandle }) => {



  const onSearchSubmit = () => {
    // אם יש handleSearch, מפעילים את הפונקציה
    if (onSubmitHandle) {
      onSubmitHandle(search);
    }
 
  };

    

  return (
    <View style={[styles.searchContainer, Platform.OS === 'ios' && styles.inputIOS,Platform.OS==='web' &&{padding:10}]}>
        <Ionicons name="search" size={16} color="grey" />
        <TextInput placeholder="Search"
        style={{flex:1}}
        onChangeText={(data)=>{setSearch(data)}}
        value={search}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off" 
        onSubmitEditing={onSearchSubmit}
        />
    </View>
  )
}

const styles = StyleSheet.create({

    searchContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#ededed',
        padding:2,
        margin:16,
        borderRadius: 8,
        borderWidth:0.1,
         // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Shadow for Android
        elevation: 5, 
      },
})



export default Search
