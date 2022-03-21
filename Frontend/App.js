
import Login from './screens/login'
import Signup from './screens/signup'
import Home from './screens/home'
import Freelancers from './screens/freelancers'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './components/Navbar';

const LoginStack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <LoginStack.Navigator screenOptions={{headerShown:false}}>
        <LoginStack.Screen name='Login' component={Login}/>
        <LoginStack.Screen name='Register' component={Signup}/>
        <LoginStack.Screen name='inside'component={MyTabs}/>
     </LoginStack.Navigator>
     </NavigationContainer>
  );
}
