import { ActivityIndicator, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProfileScreen, ChatListScreen, SearchScreen, AddNewEventScreen,PersonalActivityProfileScreen } from '../screens';
import ForeignProfileScreen from '../screens/proflieScreens/ForeignProfileScreen';
import ChatScreen from '../screens/chatScreens/ChatScreen';
import ParticipantsListScreen from '../screens/ParticipantsListScreen';
import ActivityComponent from '../components/ActivityComponent';
import RequestsList from '../screens/RequestsList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFirebaseApp } from '../util/firebase';
import { child, getDatabase, off, onValue, ref } from 'firebase/database';
import { setChatsData } from '../store/chatSlice';
import { GlobalStyles } from '../constants/styles';
import { useState } from 'react';
import { setStoredUsers } from '../store/userSlice';
import { doc, getFirestore ,getDoc} from 'firebase/firestore';








const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function ProfileStack(){
  return(
    <Stack.Navigator
    screenOptions={{
      cardStyle: {
        flex: 1
      },
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      }),
    }}>
       <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
       <Stack.Screen name="ForeignProfileScreen" component={ForeignProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

}


function HomeStack(){
  return(
    <Stack.Navigator
    screenOptions={{
      cardStyle: {
        flex: 1
      },
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      }),
    }}>
       <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
       <Stack.Screen name="ForeignProfileScreen" component={ForeignProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

}



function ChatStack(){
  return(
    <Stack.Navigator
    screenOptions={{
      cardStyle: {
        flex: 1
      },
      animationEnabled: true,
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      }),
    }}>
      <Stack.Screen name="Chats" component={ChatListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={({ navigation }) => ({
      headerTitle: "",
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 28,fontWeight:'bold' },
      headerLeft: () => (
        <View style={{width:40}}>
          <Ionicons name="arrow-back" size={32}  color="black"  style={{ marginLeft: 15 }} 
            onPress={() => navigation.goBack()} 
          />
        </View>
      ),
    })} 
  />
   
    </Stack.Navigator>
  );
}

function WellcomeWindow() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Chats Screen') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'Profile Screen') {
            iconName = 'person';
          } else if (route.name === 'New') {
            iconName = 'add-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{tabBarLabel:"Home"}}/>
      <Tab.Screen name="Search" component={SearchPage} initialParams={{myPage:0}}/>
      <Tab.Screen name="Chats Screen" component={ChatStack} options={{tabBarLabel:"Chats"}}/>
      <Tab.Screen name="New" component={AddActivityPage} />
      <Tab.Screen name="Profile Screen" component={ProfileStack} options={{tabBarLabel:"Profile"}}/>
     
    </Tab.Navigator>
  );
}
function AddActivityPage(){
  return(
    <Stack.Navigator
    screenOptions={{
      cardStyle: {
        flex: 1
      },
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      }),
    }}>
        <Stack.Screen name="AddNewEventScreen" component={AddNewEventScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Search" component={SearchPage} options={{ headerShown: false }}  />
    </Stack.Navigator>
  );
}

function SearchPage(){
  return(
    <Stack.Navigator
    screenOptions={{
      cardStyle: {
        flex: 1
      },
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      }),
    }}>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="PersonalActivityProfileScreen" component={PersonalActivityProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddNewEventScreen" component={AddNewEventScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ActivityComponent" component={ActivityComponent}  />
        <Stack.Screen name="ParticipantsListScreen" component={ParticipantsListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForeignProfileScreen" component={ForeignProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RequestsList" component={RequestsList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}



const WellcomeNavigation = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);

    useEffect(()=>{
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userChatRef = child(dbRef,`userChats/${userData.userId}`);
        const refs = [userChatRef];

        onValue(userChatRef, (querySnapshot) => {
            const chatIdsData = querySnapshot.val() || {} ;
            const chatIds = Object.values(chatIdsData);

            const chatsData = {};
            let chatsFoundCount = 0;

            for (let i = 0; i < chatIds.length; i++) {
              const chatId = chatIds[i];
              const chatRef = child(dbRef,`chats/${chatId}`);
              refs.push(chatRef);
              
              onValue(chatRef,(chatSnapshot)=>{
                chatsFoundCount++;
                const data = chatSnapshot.val();

                if(data){
                  data.key = chatSnapshot.key;

                  data.users.forEach(userId => {
                    if(storedUsers[userId]) return;
                     const db = getFirestore(app);
                     const userRef = doc(db, `users/${userId}`);
                     getDoc(userRef).then((userSnapshot) => {
                      if (userSnapshot.exists()) {
                        const userSnapshotData = userSnapshot.data();
                        dispatch(setStoredUsers({ newUsers : {userSnapshotData} }))
                      
                      } else {
                        console.log("No such user!");
                      }
                    }).catch((error) => {
                      console.error("Error getting user:", error);
                    });
                  })

                  chatsData[chatSnapshot.key]  = data;
                }

                if(chatsFoundCount >= chatIds.length){
                  dispatch(setChatsData({chatsData}));
                  setIsLoading(false);
                }
              })

              if(chatsFoundCount === 0){
                setIsLoading(false);
              }
            }

        })

        return () => {
          refs.forEach(ref =>  off(ref) );
         
        }
    },[]);


    if(isLoading){
        <View style={{justifyContent:'center', alignItems:'center',flex:1}}>
            <ActivityIndicator size={'large'} color={GlobalStyles.colors.mainColor}/>
        </View>
     
    }



  return (
    <Stack.Navigator 
        screenOptions={{
        cardStyle: {
            flex: 1
        }
       }}>
    
        <Stack.Screen name="WellcomeWindow" component={WellcomeWindow} options={{ headerShown: false }} />
      
    </Stack.Navigator>
   
  )
}

export default WellcomeNavigation
