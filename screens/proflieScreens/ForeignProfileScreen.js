import { ScrollView} from "react-native";
import ForeignProfile from "../../components/profileComponents/ForeignProfile";

const ForeignProfileScreen = ({navigation, route}) => {
    
    
    function backArrowHandle(){
      navigation.goBack();
    }


    return (
        <ScrollView>
          <ForeignProfile
           backArrowHandle={backArrowHandle}
         />   
      </ScrollView>
      );
    }
  
export default ForeignProfileScreen
