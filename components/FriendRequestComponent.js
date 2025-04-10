import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import ImageToShow from './imagesAndVideo/ImageToShow';
import Ionicons from '@expo/vector-icons/Ionicons';
import defaultImage from "../assets/images/userImage.jpeg"

const FriendRequestComponent = ({title, imageSource, onPress, type, isChecked }) => {
  
 
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      {({ pressed }) => (
        <View style={[styles.root, pressed && styles.clicked]}>
          <ImageToShow
              imageUrl={imageSource? imageSource : defaultImage} 
             imageStyle={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>{title}</Text>
            <Text style={styles.message} numberOfLines={1}></Text>
          </View>
          <View style={styles.timeContainer}>
              <View style={[styles.iconContainer,isChecked && styles.checkedStyle]}>
                  <Ionicons name="checkmark" size={18} color="white" />
              </View>
         
          </View>
        </View>
      )}
     
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      borderRadius:  12,
      marginHorizontal: 16,
      marginVertical: 8,
      paddingVertical: 12,
      paddingHorizontal: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity:0.08,
      shadowRadius: 4,
      elevation:2,  
   
  },
  image: {
    marginLeft:10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.nearWhite,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: 'medium',
    color:GlobalStyles.colors.textColor,
    letterSpacing:0.3,
  },
  message: {
    fontFamily:'regular',
    color: GlobalStyles.colors.gery,
    letterSpacing:0.3
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: GlobalStyles.colors.gery,
    letterSpacing:0.3,
    marginRight:10
  },
  clicked: {
    backgroundColor: "#e6e6e6",
  },
  lastMessage:{
    fontSize: 14,
    color:GlobalStyles.colors.gery,
    fontFamily:'regular',
    fontStyle: 'italic',
    letterSpacing:0.3,
    marginTop: 4,

  },
  iconContainer:{
    marginRight:10,
    borderWidth:1,
    borderRadius:50,
    borderColor:GlobalStyles.colors.lightGrey,
    backgroundColor:'white'
  },
  checkedStyle:{
    backgroundColor:GlobalStyles.colors.primary,
    borderColor:'transparent'
  }
});

export default FriendRequestComponent;
