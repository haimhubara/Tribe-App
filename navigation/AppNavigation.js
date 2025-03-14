import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/AuthScreen';
import WellcomeNavigation from './WellcomeNavigation';
import { useSelector } from 'react-redux';
import StartUpScreen from '../screens/StartUpScreen';



const AppNavigation = () => {
   isAuth = useSelector(state => state.auth.token !== null && state.auth.token !== "");
   const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
 

  return (
     <NavigationContainer>
         {isAuth && <WellcomeNavigation/>}
         {!isAuth && didTryAutoLogin && <AuthScreen />}
         {!isAuth &&  !didTryAutoLogin &&  <StartUpScreen/>}
      
     </NavigationContainer>
  )
}

export default AppNavigation
