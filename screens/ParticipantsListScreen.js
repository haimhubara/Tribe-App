import { View,Text,StyleSheet, FlatList } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import UserComponent from "../components/UserComponent";
import Header from "../components/Header";
import { useLayoutEffect } from "react";

import defaultImage from "../assets/images/userImage.jpeg"


const ParticipantsListScreen = ({navigation}) => {

  const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [friendsList,setfriendsList] = useState([
      {id:1,firstName:'gal',lastName:'lifshitz',imageSouce:defaultImage},
      {id:2,firstName:'haim',lastName:'hubara',imageSouce:defaultImage},
      {id:3,firstName:'matan',lastName:'yakir',imageSouce:defaultImage},
      {id:4,firstName:'guy',lastName:'avramov',imageSouce:defaultImage},
      {id:5,firstName:'naor',lastName:'zecharia',imageSouce:defaultImage},
      {id:6,firstName:'dani',lastName:'reznik',imageSouce:defaultImage}
      
    ]);

    function backArrowHandle(){
      navigation.goBack();
    }


  return (

    
    <View style={{flex:1}}>
      <View style={styles.root}>
          <Header title="Participants" onBackPress={backArrowHandle}/>
      </View>
      
      {
        <FlatList 
        data={friendsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData)=>{return (<UserComponent user={itemData.item} />)}  
    } />
      }
      {
        !isLoading && !noResultsFound && !friendsList &&
        (
            <View style={styles.notFound}>
                <Ionicons name="people" size={55} color="grey" />
                <Text style={styles.notFoundText} >Still No Participants</Text>
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

export default ParticipantsListScreen
