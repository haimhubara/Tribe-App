import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';
import ImageToShow from '../../../components/imagesAndVideo/ImageToShow';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import defaultImage from "../../../assets/images/userImage.jpeg";

const FriendRequestComponent = ({ title, imageSource, userId, onSelectPress, isChecked }) => {
  const navigation = useNavigation();

  const openProfile = () => {
    navigation.navigate('ForeignProfileScreen', { userId });
  };

  return (
    <Pressable onPress={openProfile} accessibilityRole="button">
      {({ pressed }) => (
        <View style={[styles.root, pressed && styles.clicked]}>
          <ImageToShow
            imageUrl={imageSource ? imageSource : defaultImage}
            imageStyle={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>{title}</Text>
            <Text style={styles.message} numberOfLines={1}></Text>
          </View>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation(); // חשוב כדי למנוע מעבר לפרופיל
              onSelectPress(userId);
            }}
            style={[styles.iconContainer, isChecked && styles.checkedStyle]}
          >
            <Ionicons name="checkmark" size={18} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    marginLeft: 10,
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
    fontWeight: '500',
    color: GlobalStyles.colors.textColor,
    letterSpacing: 0.3,
  },
  message: {
    fontFamily: 'regular',
    color: GlobalStyles.colors.gery,
    letterSpacing: 0.3,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: GlobalStyles.colors.lightGrey,
    backgroundColor: 'white',
    padding: 5,
    marginLeft: 10,
  },
  checkedStyle: {
    backgroundColor: GlobalStyles.colors.primary,
    borderColor: 'transparent',
  },
  clicked: {
    backgroundColor: "#e6e6e6",
  },
});

export default FriendRequestComponent;
