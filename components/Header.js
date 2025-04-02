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
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#4A90E2",
    color: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  
  
});

export default Header;
