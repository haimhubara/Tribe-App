import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import SwapImages from "../swapImages/SwapImages";
import { useEffect, useState } from "react";
import ShowCoupleStuf from "../ShowCoupleStuf";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Header from "../Header";
import IconButton from "../buttons/IconButton";
import { GlobalStyles } from "../../constants/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setStoredUsers } from "../../store/userSlice";
import { createSelector } from 'reselect';
import defaultImage from "../../assets/images/camera.png";
import { getUserData } from "../../util/actions/userAction";

const { height } = Dimensions.get("window");

const ForeignProfile = ({ backArrowHandle }) => {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState("");
  const { userId } = route?.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);

  const getChats = createSelector(
    state => state.chats.chatsData,
    chatsData => Object.values(chatsData).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  );

  const userChats = useSelector(getChats);
  const [foreignUser, setForeignUser] = useState({});

  useEffect(() => {
    for (let chat of userChats) {
      if (chat.isGroupChat) continue;
      const otherUserId = chat.users.find(uid => uid !== userData.userId);
      if (otherUserId === userId && chat.key !== chatId) {
        setChatId(chat.key);
        break;
      }
    }
  }, [userId, userChats, chatId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        if (userId) {
          const data = await getUserData(userId);
          setForeignUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const now = new Date();
    return Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 365.25));
  };

  const startChatHandle = () => {
    if (userId) {
      navigation.navigate("Chats Screen", {
        screen: "Chats",
        params: { selectedUserId: userId, chatUsers: [userData.userId, userId], chatId,isGroupChat:false },
      });
      const newUsers = { [foreignUser.userId]: foreignUser };
      dispatch(setStoredUsers({ newUsers }));
    }
  };

  const images = foreignUser.images || {
    firstImage: defaultImage,
    secondImage: defaultImage,
    thirdImage: defaultImage,
    fourthImage: defaultImage,
    fiveImage: defaultImage,
    sixImage: defaultImage,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={{ marginTop: 32 }}>
        <Header onBackPress={backArrowHandle} />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.mainColor} />
        </View>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <SwapImages
              imagess={images}
              isEdit={false}
              imageStyle={styles.image}
              editStyle={{ display: "none" }}
            />
          </View>

          <Text style={styles.name}>
            {foreignUser.firstName} {foreignUser.lastName}, {foreignUser.date ? calculateAge(foreignUser.date) : ""}
          </Text>

          <Text style={styles.subtitle}>{foreignUser.email}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.messageButton} onPress={startChatHandle}>
              <Feather name="message-circle" size={20} color="#fff" />
              <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <ShowCoupleStuf text="🎯 Hobbies" array={foreignUser.hobbies || []} />
            <ShowCoupleStuf text="🌍 Languages" array={foreignUser.languages || []} />

            <Text style={styles.label}>🔗 Social Links</Text>
            <View style={styles.iconButtons}>
              <IconButton iconName="facebook" IconPack={Feather} onPress={() => {}} />
              <IconButton iconName="logo-tiktok" IconPack={Ionicons} onPress={() => {}} />
              <IconButton iconName="instagram" IconPack={FontAwesome} onPress={() => {}} />
            </View>
          </View>
        </>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    width: "85%",
    marginBottom: 30,
  },
  messageButton: {
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
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  infoBox: {
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#2D0C57",
  },
  iconButtons: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 4,
  },
});

export default ForeignProfile;
