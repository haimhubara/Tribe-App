import { ActivityIndicator, View,Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
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
import { getUserData } from '../util/actions/userAction';
import { setChatMessages } from '../store/messagesSlice';
import ActivitiesScreen from '../screens/ActivitiesScreen';











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
      headerTitleStyle: { fontSize: 24,fontFamily:'medium', letterSpacing:0.3 },
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
          <Ionicons
            name="arrow-back"
            size={32}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={{ fontSize: 14, marginLeft: 2,letterSpacing:0.3,fontFamily:'medium', }}>Chats</Text>
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
          } else if (route.name === 'MyActivities') {
            return <Feather name="activity" size={24} color="gray" />
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
      <Tab.Screen name="MyActivities" component={MyActivities}  options={{tabBarLabel:"My Activities"}} />
      <Tab.Screen name="Profile Screen" component={ProfileStack} options={{tabBarLabel:"Profile"}}/>
     
    </Tab.Navigator>
  );
}
function MyActivities(){
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
          <Tab.Screen name="ActivitiesScreen" component={ActivitiesScreen}  options={{tabBarLabel:"My Activities",headerShown: false }} />
          <Stack.Screen name="AddNewEventScreen" component={AddNewEventScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="PersonalActivityProfileScreen" component={PersonalActivityProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ParticipantsListScreen" component={ParticipantsListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForeignProfileScreen" component={ForeignProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RequestsList" component={RequestsList} options={{ headerShown: false }} />
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
    const chatsData = useSelector(state => state.chats.chatsData);

    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);

    useEffect(() => {
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));
      const userChatRef = child(dbRef, `userChats/${userData.userId}`);
    
      const unsubscribeUserChat = onValue(userChatRef, async (querySnapshot) => {
          const chatIdsData = querySnapshot.val() || {};
          const chatIds = Object.values(chatIdsData);
      
          if (chatIds.length === 0) {
              setIsLoading(false);
              return;
          }
      
          const chatsData = {};
          let chatsFoundCount = 0;
          const unsubscribers = [];
  
          for (const chatId of chatIds) {
              const chatRef = child(dbRef, `chats/${chatId}`);
              
              
              const unsubscribeChat = onValue(chatRef, async (chatSnapshot) => {
                  chatsFoundCount++;
                  const data = chatSnapshot.val();
                 
      
                  if (data) {
                      data.key = chatSnapshot.key;
      
                      const missingUsers = data.users.filter(userId =>
                          !storedUsers[userId] && userId !== userData.userId
                      );
      
                      if (missingUsers.length > 0) {
                          const fetchedUsers = await Promise.all(
                              missingUsers.map(userId => getUserData(userId))
                          );
      
                          const newUsers = {};
                          fetchedUsers.forEach(user => {
                              if (user) newUsers[user.userId] = user;
                          });
      
                          dispatch(setStoredUsers({ newUsers }));
                      }
      
                      chatsData[chatSnapshot.key] = data;
                  }
      
                  if (chatsFoundCount >= chatIds.length) {
                      dispatch(setChatsData({ chatsData }));
                      setIsLoading(false);
                  }
              });
  
              unsubscribers.push(unsubscribeChat);
  
              const messagesRef = child(dbRef, `messages/${chatId}`);
              const unsubscribeMessages = onValue(messagesRef, (messagesSnapshot) => {
                  if (messagesSnapshot.exists()) {
                      const messagesData = messagesSnapshot.val();
                      dispatch(setChatMessages({ chatId, messagesData }));
                  }
              });
  
              unsubscribers.push(unsubscribeMessages);
          }
  
          return () => {
              unsubscribeUserChat();
              unsubscribers.forEach(unsub => unsub());
          };
      });
  
      return () => {
          unsubscribeUserChat();
      };
  }, []);
  
  


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
