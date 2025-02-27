import { View,Text,StyleSheet, TextInput, FlatList, Platform } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import ActiveChats from "../components/ActiveChat";
import { SafeAreaView } from "react-native-safe-area-context";


const ChatListScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false);
   
    const [chatsList,setChatList] = useState([
      {id:1,firstName:'gal',lastName:'lifshitz',imageSouce:null,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:2,firstName:'haim',lastName:'hubara',imageSouce:null,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:3,firstName:'matan',lastName:'yakir',imageSouce:null,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:4,firstName:'guy',lastName:'avramov',imageSouce:null,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:5,firstName:'naor',lastName:'zecharia',imageSouce:null,messageTime:'yesterday',lastMessage:'Hi how are you'},
      {id:6,firstName:'dani',lastName:'reznik',imageSouce:null,messageTime:'yesterday',lastMessage:'Hi how are you'}
      
    ]);

   
    
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
      {
        <FlatList 
        data={chatsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData)=>{return (<ActiveChats chats={itemData.item} />)}  
    } />
      }
      {
        !isLoading && !noResultsFound && !chatsList &&
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
         // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Shadow for Android
        elevation: 5, 
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
