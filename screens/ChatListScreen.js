import { View,Text,StyleSheet, TextInput, FlatList, Platform, ActivityIndicator } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import ActiveChats from "../components/ActiveChat";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchUsers } from "../util/actions/userAction";
import { GlobalStyles } from "../constants/styles";

import defaultImage from "../assets/images/userImage.jpeg"


const ChatListScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false);
   
    const [chatsList,setChatList] = useState([
      {id:1,firstName:'gal',lastName:'lifshitz',imageSource:defaultImage,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:2,firstName:'haim',lastName:'hubara',imageSource:defaultImage,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:3,firstName:'matan',lastName:'yakir',imageSource:defaultImage,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:4,firstName:'guy',lastName:'avramov',imageSource:defaultImage,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:5,firstName:'naor',lastName:'zecharia',imageSource:defaultImage,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:6,firstName:'dani',lastName:'reznik',imageSource:defaultImage,messageTime:'yesterday',lastMessage:'Hi how are you'}
      
    ]);

    // useEffect(()=>{
    //   const delaySearch = setTimeout( async()=>{
    //     if(!search || search === ""){
    //       setChatList();
    //       setNoResultsFound(false);
    //       return;
    //     }
    //     setIsLoading(true);
    //     const usersList = await searchUsers(search);
    //     console.log(usersList);
    //     setIsLoading(false);
    //   },500)

    //   return () => clearTimeout(delaySearch)
    // },[search])

   
    
  return (

    
    <SafeAreaView style={{flex:1}}>
      
      <View style={styles.root}>
          <Text  style={styles.text}>Chat List</Text>
      </View>
      
      <View style={[styles.searchContainer, Platform.OS === 'ios' && styles.inputIOS,Platform.OS==='web' &&{padding:10}]}>
          <Ionicons name="search" size={16} color="grey" />
          <TextInput placeholder="Search"
          style={{flex:1}}
          onChangeText={(data)=>{setSearch(data)}}
          value={search}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off" 
          />
      </View>
      {isLoading && 
       <View style={{alignItems:'center',justifyContent:'center'}}>
           <ActivityIndicator size={'large'} color={GlobalStyles.colors.mainColor}/>
       </View>
       }

      { !isLoading &&
        <FlatList 
        data={chatsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ActiveChats chats={item} />}
     />
     }


      {
        !isLoading && noResultsFound &&
        (
            <View style={styles.notFound}>
                <Ionicons name="people" size={55} color="grey" />
                <Text style={styles.notFoundText} >Not chats found</Text>
            </View>
        )
      }
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
      text:{
        textAlign:'center',
        fontSize:32,
        fontWeight:'bold',
      },
      searchContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#ededed',
        padding:2,
        margin:16,
        borderRadius: 8,
        borderWidth:0.1,
       
      },
      notFound:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      notFoundText:{
        flex:1,
        textAlign: 'center',
        justifyContent:'center',
        fontSize:16,
        color:'grey'
      },
      inputIOS:{
        paddingVertical:13
      }

     
});


export default ChatListScreen
