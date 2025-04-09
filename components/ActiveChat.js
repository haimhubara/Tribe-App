import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import ImageToShow from './imagesAndVideo/ImageToShow';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import defaultImage from "../assets/images/userImage.jpeg"

const ActiveChats = ({title ,lastMessage, imageSource, startChatHandle,updatedAt, type, isChecked }) => {
  const navigation = useNavigation();

  const date = new Date(updatedAt);
  const formattedDate = date.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });


  return (
    <Pressable onPress={startChatHandle} accessibilityRole="button">
      {({ pressed }) => (
        <View style={[styles.root, pressed && styles.clicked]}>
          <ImageToShow
              imageUrl={imageSource? imageSource : defaultImage} 
             imageStyle={[styles.image, { overflow: 'hidden' }]}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>{title}</Text>
            <Text style={styles.message} numberOfLines={1}></Text>
            <View>
                <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            {
              type ==="checkBox" && 
              <View style={[styles.iconContainer,isChecked && styles.checkedStyle]}>
                  <Ionicons name="checkmark" size={18} color="white" />
              </View>
            }
            {
              type !== "checkBox" && type !== 'link' && type !== 'blank' && 
              <Text style={styles.time} numberOfLines={1}>{formattedDate}</Text>
            }
            {
              type === "link" &&
              <View >
                  <Ionicons name="chevron-forward-outline" size={18} color={GlobalStyles.colors.gery} />
             </View>
            }
            
          </View>
        </View>
      )}
     
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingVertical:7,
    borderBottomColor:GlobalStyles.colors.lightGrey,
    borderBottomWidth:0.2,
    alignItems:'center',
    minHeight:50
   
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

export default ActiveChats;
