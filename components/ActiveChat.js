import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import ImageToShow from './imagesAndVideo/ImageToShow';
import { useNavigation } from '@react-navigation/native';

const ActiveChats = ({ chats }) => {
  const navigation = useNavigation();

  function openFriendProfileHandle() {
    navigation.navigate("Chat");
  }

  return (
    <Pressable onPress={openFriendProfileHandle} accessibilityRole="button">
      {({ pressed }) => (
        <View style={[styles.root, pressed && styles.clicked]}>
          <ImageToShow
            imageUrl={chats.imageSource}
            imageStyle={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>{chats.firstName} {chats.lastName}</Text>
            <Text style={styles.message} numberOfLines={1}></Text>
            <View>
                <Text style={styles.lastMessage} numberOfLines={1}>{chats.lastMessage}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time} numberOfLines={1}>{chats.messageTime}</Text>
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
    borderWidth: 0.1,
    backgroundColor: '#ededed',
    borderColor: 'grey',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    marginLeft: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: 'grey',
  },
  timeContainer: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  time: {
    fontSize: 12,
    color: 'grey',
  },
  clicked: {
    backgroundColor: '#d1d1d1',
  },
  lastMessage:{
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 4,

  }
});

export default ActiveChats;
