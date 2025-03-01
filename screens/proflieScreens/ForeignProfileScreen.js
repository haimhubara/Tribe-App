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

    return (
        <ScrollView>
          <ForeignProfile
           AddFreindHandle={AddFreindHandle}
           startChatHandle={startChatHandle}
           backArrowHandle={backArrowHandle}
           isFriend={isFriend}
         />   
      </ScrollView>
      );
    }
  
export default ForeignProfileScreen
