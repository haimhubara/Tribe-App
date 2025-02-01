import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = ({ title, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
       
         <Ionicons name="arrow-back" size={32} color="black" onPress={onBackPress} />
          <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width:"90%"
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize:32,
    fontWeight: "bold",
  },
});

export default Header;