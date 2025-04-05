import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import ShowCoupleStuf from "../ShowCoupleStuf";
import SwapImages from "../swapImages/SwapImages";

const { height } = Dimensions.get("window");

const ProfileComponent = ({ handleEditProfileClick, handleLogout }) => {
  const userData = useSelector((state) => state.auth.userData);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "";
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    return Math.floor(ageDifMs / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <SwapImages
          isEdit={false}
          imagess={userData.images}
          imageStyle={styles.image}
          editStyle={{ display: "none" }}
        />
      </View>

      <Text style={styles.name}>
        {userData.firstName} {userData.lastName}, {calculateAge(userData.date)}
      </Text>

      <Text style={styles.subtitle}>{userData.email}</Text>

      <View style={styles.infoSection}>
        <ShowCoupleStuf text="🎨 Hobbies" array={userData.hobbies} />
        <ShowCoupleStuf text="🌍 Languages" array={userData.languages} />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfileClick}>
          <FontAwesome name="paint-brush" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="zap" size={20} color="#fff" />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  content: {
    alignItems: "center",
    paddingBottom: 60,
  },
  imageContainer: {
    width: "100%",
    height: height * 0.6,
  
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    fontSize: 32,
    fontWeight: "900",
    color: "#2D0C57",
    marginTop: 24,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#5E5E5E",
    marginBottom: 24,
  },
  infoSection: {
    width: "90%",
    backgroundColor: "#e8f0ff",
    padding: 20,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    width: "85%",
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#00BFA6",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    gap: 10,
    flex: 1,
    justifyContent: "center",
    shadowColor: "#00BFA6",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#F50057",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    gap: 10,
    flex: 1,
    justifyContent: "center",
    shadowColor: "#F50057",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});

export default ProfileComponent;
