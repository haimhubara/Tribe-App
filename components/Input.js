import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Input = ({field,setField,text}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{text}:</Text>
      <TextInput 
        placeholder={`${text} `}
        style={styles.input} 
        placeholderTextColor="#888" 
        onChangeText={(data)=>{setField(data)}}
        value={field}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f5f5f5', 
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: '#333', 
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    backgroundColor: '#fff', 
    fontSize: 16,
  },
});

export default Input;
