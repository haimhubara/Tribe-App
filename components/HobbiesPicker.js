import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const HobbiesPicker = ({ selectedHobbies, setSelectedHobbies,array,text,id,onInuptChange,value,error,type }) => {
 
  const handleHobbyChange = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(item => item !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const reducerHobbyChange = (hobby) => {
    if (value.includes(hobby)) {
      onInuptChange(id, [...new Set(value.filter(item => item !== hobby))]);
    }
    else{

      onInuptChange(id, [...new Set([...value, hobby])])
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{type === "mustField" ? `${text}*` : text}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {!value && array.map(hobby => (
          <TouchableOpacity
            key={hobby}
            style={[
              styles.hobbyButton,
              selectedHobbies.includes(hobby) && styles.selectedHobby,
            ]}
            onPress={() => handleHobbyChange(hobby)}
          >
            <Text style={[
              styles.hobbyText,
              (selectedHobbies?.includes(hobby) || value?.includes(hobby)) && styles.selectedHobbyText
            ]}>
              {hobby}
            </Text>

          </TouchableOpacity>
        ))}
        {value && !selectedHobbies && array.map(hobby => (
          <TouchableOpacity
            key={hobby}
            style={[
              styles.hobbyButton,
              value.includes(hobby) && styles.selectedHobby,
            ]}
            onPress={() => reducerHobbyChange(hobby)}
          >
            <Text style={styles.hobbyText}>{hobby}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      { error && 
        <View style={styles.errorContainer}>
             <Text style={styles.errorText}>{error}</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginVertical:8,
    fontFamily:'bold',
    letterSpacing:0.3,
    color:GlobalStyles.colors.textColor,
  },
  scrollView: {
    flexDirection: 'row',  // Items will be placed horizontally
    flexWrap: 'wrap',      // Allow items to wrap to the next line when necessary
    width: '100%',
    justifyContent: 'center',
  },
  hobbyButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    minWidth: 100,
    flexShrink: 1, 
  },
  selectedHobby: {
    backgroundColor: GlobalStyles.colors.mainColor,  // Highlight selected hobbies
  },
  hobbyText: {
    color:GlobalStyles.colors.textColor,
    fontFamily:"regular",
    letterSpacing:0.3,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
  },
  selectedHobbyText: {
    color: 'white',
    fontFamily: 'regular',
    letterSpacing: 0.3,
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

export default HobbiesPicker;
