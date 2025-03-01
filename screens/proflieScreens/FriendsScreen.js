import { View,Text,StyleSheet, FlatList } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import FriendComponent from "../../components/FriendComponent";
import Header from "../../components/Header";
import { useLayoutEffect } from "react";
import Search from "../../components/Search";

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

     useLayoutEffect(() => {
            const parentNav = navigation.getParent();
            if (parentNav) {
              parentNav.setOptions({ tabBarStyle: { display: 'none' } });
            }
          
            return () => {
              if (parentNav) {
                parentNav.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: '#fff' } });
              }
            };
          }, [navigation]);

  return (

    
    <View style={{flex:1}}>
      <View style={styles.root}>
          <Header title="Friends" onBackPress={backArrowHandle}/>
      </View>
      
      <Search 
        search={search}
        setSearch={setSearch}
       />
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
       marginTop:32
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
