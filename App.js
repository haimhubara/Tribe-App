import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProfileScreen, ChatScreen, SearchScreen, AddNewEventScreen } from './screens';
import SignupScreen from './screens/authScreens/SignupScreen';
import SinginScreen from './screens/authScreens/SinginScreen';
import UploadPhotosScreen from './screens/authScreens/UploadPhotosScreen';
import FriendsScreen from './screens/FriendsScreen';
import FriendProfileScreen from './screens/FriendProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'Profile') {
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
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="New" component={AddNewEventScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator >
        {false&& <Stack.Screen name="SingIn" component={SinginScreen}  options={{ headerShown: false }}  />}
        {false && <Stack.Screen name="SignUp" component={SignupScreen}  options={{ headerShown: false }}  />}
        {false && <Stack.Screen name="UploadPhotos" component={UploadPhotosScreen}  options={{ headerShown: false }}  />}
        {true && <Stack.Screen name="WellcomeWindow" component={WellcomeWindow} options={{ headerShown: false }} />}
        {true && <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{ headerShown: false }} />}
        {true && <Stack.Screen name="FriendProfile" component={FriendProfileScreen} options={{ headerShown: false }} />}
      </Stack.Navigator>
    </NavigationContainer>
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
