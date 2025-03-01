import { ScrollView} from "react-native";
import ForeignProfile from "../../components/profileComponents/ForeignProfile";

const ForeignProfileScreen = ({navigation, route}) => {
  const { isFriend } = !route.params;
    
    function AddFreindHandle(){

    }
    function startChatHandle(){

    }
    function backArrowHandle(){
      navigation.goBack();
    }

    function facebookHandle(){

    }

    function tikTokHandle(){

    }

    function InstagramHandle(){
      
    }

    return (
        <ScrollView>
          <ForeignProfile
           AddFreindHandle={AddFreindHandle}
           startChatHandle={startChatHandle}
           backArrowHandle={backArrowHandle}
           facebookHandle={facebookHandle}
           tikTokHandle={tikTokHandle}
           InstagramHandle={InstagramHandle}
           isFriend={isFriend}
         />   
      </ScrollView>
      );
    }
  
export default ForeignProfileScreen
