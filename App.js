import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProfileScreen, ChatListScreen, SearchScreen, AddNewEventScreen } from './screens';
import { useState, useCallback, useEffect } from 'react';



import FriendsScreen from './screens/proflieScreens/FriendsScreen';
import FriendProfileScreen from './screens/proflieScreens/ForeignProfileScreen';
import { SafeAreaProvider,  } from 'react-native-safe-area-context';
import ChatScreen from './screens/chatScreens/ChatScreen';
import AuthScreen from './screens/AuthScreen';
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';



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



function App() {

  const [appIsLoaded, setAppIsLoaded] = useState(false);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);
  
 

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          "black": require("./assets/fonts/Roboto-Black.ttf"),
          "blackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
          "bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "boldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
          "italic": require("./assets/fonts/Roboto-Italic.ttf"),
          "light": require("./assets/fonts/Roboto-Light.ttf"),
          "lightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
          "medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "mediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
          "regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "thin": require("./assets/fonts/Roboto-Thin.ttf"),
          "thinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  if (!appIsLoaded) {
    return null; // Show nothing while loading
  }

  return (
    // this line inside SafeAreaProvider onLayout={onLayout}
    <SafeAreaProvider onLayout={onLayout}>
      <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator 
          screenOptions={{
            cardStyle: {
              flex: 1
            }
         }}>
            {false && <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }}/>} 
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