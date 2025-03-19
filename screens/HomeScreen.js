import { useEffect,useState } from "react";
import { Text, View, StyleSheet , FlatList} from "react-native"
import Header from "../components/Header";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAllUsers } from "../util/actions/userAction";
import { GlobalStyles } from "../constants/styles";
import { ActivityIndicator } from "react-native";
import UserComponent from "../components/UserComponent";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notUsersFound, setNotUsersFound] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const userData = useSelector(state => state.auth.userData);




  const backArrowHandle = () => {

  }


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        
        const allUsersFetched = await getAllUsers();
        const usersArray = Object.values(allUsersFetched).filter(user => user.userId !== userData.userId);
  
        setAllUsers(usersArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <View style={styles.root}>
       <Header title="Participants" onBackPress={backArrowHandle}/>


       {
        !isLoading && notUsersFound &&
        (
            <View style={styles.notFound}>
                <Ionicons name="people" size={55} color="grey" />
                <Text style={styles.notFoundText} >No users found</Text>
            </View>
        )
      }

      {isLoading && 
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} color={GlobalStyles.colors.mainColor}/>
            </View>
      }


    {!isLoading && allUsers.length > 0 && (
      <FlatList 
        data={allUsers}
        keyExtractor={(item) => item.userId} 
        renderItem={({ item }) => <UserComponent user={item} />}
      />
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 32,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
    marginTop: 10, 
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
});


export default HomeScreen
