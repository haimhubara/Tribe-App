import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen';
import ChatScreen from './screens/ChatScreen';
import NewScreen from './screens/NewScreen';
import ProfileScreen from './screens/ProfileScreen';

const homeName='Home';
const chatName='Chat';
const searchName='Search';
const newName='New';
const profileName='Profile';
let x=3;

const Tab=createBottomTabNavigator();

export default function MainContainer(){
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route})=>({
                tabBarIcon: ({focused, color, size})=>{
                    let iconName;
                    let rn=route.name;

                    if(rn===homeName){
                        iconName=focused?'home':'home-outline'
                    }else if(rn===searchName){
                        iconName=focused?'search':'search-outline'
                    }else if(rn===chatName){
                        iconName=focused?'chatbubble-ellipses':'chatbubble-ellipses-outline'
                    }else if(rn === newName){
                        iconName=focused?'create':'create-outline'
                    }else if(rn===profileName){
                        iconName=focused?'person':'person-outline'
                    }


                    return <Ionicons name={iconName} size={size} color={'black'}/>
                },

                headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()} // פעולה לחזור אחורה
            />
          ),

                tabBarLabelStyle: {
                    color: 'black', // צבע שחור לטקסט של הטאב
                },
            })}>
                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={searchName} component={SearchScreen}/>
                <Tab.Screen name={chatName} component={ChatScreen}/>
                <Tab.Screen name={newName} component={NewScreen}/>
                <Tab.Screen name={profileName} component={ProfileScreen}/>

            </Tab.Navigator>
        </NavigationContainer>

    );
}