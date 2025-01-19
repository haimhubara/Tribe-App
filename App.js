import { StatusBar } from 'expo-status-bar';
import { StyleSheet,} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen, ProfileScreen, ChatScreen, SearchScreen, AddNewEventScreen} from './screens'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
         <StatusBar style="dark" /> 
          <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
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
                }
                else if(route.name ===  'New'){
                  iconName = "add-circle-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                backgroundColor: '#fff',
              },
              headerShown: false 
            })}
                >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="New" component={AddNewEventScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
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
