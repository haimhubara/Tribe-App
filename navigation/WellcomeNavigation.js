import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProfileScreen, ChatListScreen, SearchScreen, AddNewEventScreen,PersonalActivityProfileScreen } from '../screens';
import FriendsScreen from '../screens/proflieScreens/FriendsScreen';
import FriendProfileScreen from '../screens/proflieScreens/ForeignProfileScreen';
import ChatScreen from '../screens/chatScreens/ChatScreen';
import ParticipantsListScreen from '../screens/ParticipantsListScreen';
import ActivityComponent from '../components/ActivityComponent';
import RequestsList from '../screens/RequestsList';








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
       <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{ headerShown: false }} />
       <Stack.Screen name="FriendProfile" component={FriendProfileScreen} options={{ headerShown: false }} />
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
      headerTitle: "Chat Screen",
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
          if (route.name === 'Home') {
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
      <Tab.Screen name="Home" component={HomeScreen} />
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
        <Stack.Screen name="FriendProfile" component={FriendProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RequestsList" component={RequestsList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}



const WellcomeNavigation = () => {
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
