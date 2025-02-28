import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../constants/styles";

const Header = ({ title, onBackPress,style }) => {
  return (
      <View style={[styles.headerContainer,style]}>
      
        <Pressable onPress={onBackPress} style={styles.iconContainer}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </Pressable>

     
        <Text style={styles.title}>{title}</Text>

     
        <View style={styles.iconPlaceholder} />
      </View>
  );
};

const styles = StyleSheet.create({
 
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
    
  },
  iconContainer: {
    width: 40,
    alignItems: "flex-start",
  },
  iconPlaceholder: {
    width: 40, 
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    justifyContent:'center',
    fontFamily:'bold',
    letterSpacing:0.3,
    color:GlobalStyles.colors.textColor,
    flex: 1, 
  },
});

export default Header;
