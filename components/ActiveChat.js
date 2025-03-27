import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import ImageToShow from './imagesAndVideo/ImageToShow';
import { useNavigation } from '@react-navigation/native';

const ActiveChats = ({ firstName, lastName, lastMessage, imageSource, startChatHandle,updatedAt }) => {
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
              imageUrl={imageSource? imageSource : null} 
             imageStyle={[styles.image, { overflow: 'hidden' }]}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>{firstName} {lastName}</Text>
            <Text style={styles.message} numberOfLines={1}></Text>
            <View>
                <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time} numberOfLines={1}>{formattedDate}</Text>
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

  }
});

export default ActiveChats;
