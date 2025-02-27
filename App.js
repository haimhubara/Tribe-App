import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProfileScreen, ChatListScreen, SearchScreen, AddNewEventScreen } from './screens';
import SignupScreen from './screens/authScreens/SignupScreen';
import SinginScreen from './screens/authScreens/SinginScreen';
import UploadPhotosScreen from './screens/authScreens/UploadPhotosScreen';
import FriendsScreen from './screens/proflieScreens/FriendsScreen';
import FriendProfileScreen from './screens/proflieScreens/FriendProfileScreen';
import UploadVideoScreen from './screens/authScreens/UploadVideoScreen';
import { SafeAreaProvider,  } from 'react-native-safe-area-context';
import ChatScreen from './screens/chatScreens/ChatScreen';


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
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Chats Screen" component={ChatStack} options={{tabBarLabel:"Chats"}}/>
      <Tab.Screen name="New" component={AddNewEventScreen} />
      <Tab.Screen name="Profile Screen" component={ProfileStack} options={{tabBarLabel:"Profile"}}/>
     
    </Tab.Navigator>
  );
}

function AuthScreens() {
  return ( 
    <Stack.Navigator
    screenOptions={{
      cardStyle: {
        flex: 1
      }
    }}>
      <Stack.Screen name="SingIn" component={SinginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UploadPhotos" component={UploadPhotosScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UploadVideo" component={UploadVideoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator 
          screenOptions={{
            cardStyle: {
              flex: 1
            }
         }}>
            {false && <Stack.Screen name="AuthScreens" component={AuthScreens} options={{ headerShown: false }}/>} 
            {true && <Stack.Screen name="WellcomeWindow" component={WellcomeWindow} options={{ headerShown: false }} />}
          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;