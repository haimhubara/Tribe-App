import { View,Text, Pressable, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ImageToShow from './imagesAndVideo/ImageToShow'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const UserComponent = ({user}) => {
    const navigation = useNavigation();

    const userData = useSelector(state => state.auth.userData);
    
    function openFriendProfileHandle(){

        if(userData.userId !== user.userId){
            navigation.navigate("ForeignProfileScreen",{
                userId:user.userId
            });
        }
        
       
    }
 
    return (
        <Pressable onPress={openFriendProfileHandle}>
            {({ pressed }) => (
                <View style={[styles.root, pressed && userData.userId !== user.userId && styles.clicked]}>
                   <ImageToShow 
                        imageUrl={user.imageSouce? user.imageSouce :user.images['firstImage']} 
                        imageStyle={[styles.image, { overflow: 'hidden' }]}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>{user.firstName}</Text>
                        <Text style={styles.text} numberOfLines={1}>{user.lastName}</Text>
                    </View>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root:{
       flexDirection:'row',
       justifyContent:'flex-start',
       borderWidth:0.1,
       backgroundColor:'#ededed',
       borderColor:'grey',
       marginHorizontal:16,
       marginVertical:8,
       borderRadius:8,
       // Shadow for iOS
       shadowColor: "#000",
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.2,
       shadowRadius: 5,
       // Shadow for Android
       elevation: 5,
    

    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    },
    text:{
        fontSize:16,
        margin:2,
        fontFamily:'bold',
        letterSpacing:0.3,
        color:GlobalStyles.colors.textColor,
    },
    clicked:{
         backgroundColor: '#d1d1d1'
    },
    image:{
        marginLeft: 10, 
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        backgroundColor: GlobalStyles.colors.nearWhite 
    }

});

export default UserComponent
