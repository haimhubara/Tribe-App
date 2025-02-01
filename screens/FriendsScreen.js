import { View,Text,StyleSheet, TextInput, FlatList, Platform ,ScrollView } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import FriendComponent from "../components/FriendComponent";
import Header from "../components/Header";

const FriendsScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [friendsList,setfriendsList] = useState([
      {id:1,firstName:'gal',lastName:'lifshitz',imageSouce:null},
      {id:2,firstName:'haim',lastName:'hubara',imageSouce:null},
      {id:3,firstName:'matan',lastName:'yakir',imageSouce:null},
      {id:4,firstName:'guy',lastName:'avramov',imageSouce:null},
      {id:5,firstName:'naor',lastName:'zecharia',imageSouce:null},
      {id:6,firstName:'dani',lastName:'reznik',imageSouce:null}
    ]);

    function backArrowHandle(){
      navigation.goBack();
    }

  return (
    <View style={styles.root}>
      <Header title="Friends" onBackPress={backArrowHandle}/>
      
      <View style={[styles.searchContainer, Platform.OS === 'ios' && styles.inputIOS]}>
          <Ionicons name="search" size={16} color="grey" />
          <TextInput placeholder="Search"
          onChangeText={(data)=>{setSearch(data)}}
          value={search}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off" 
          />
      </View>
      {
        <FlatList 
        data={friendsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData)=>{return (<FriendComponent user={itemData.item} />)}  
    } />
      }
      {
        !isLoading && !noResultsFound && !friendsList &&
        (
            <View style={styles.notFound}>
                <Ionicons name="people" size={55} color="grey" />
                <Text style={styles.notFoundText} >Not friends found</Text>
            </View>
        )
      }
    </View>
  )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop:32
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


export default FriendsScreen
