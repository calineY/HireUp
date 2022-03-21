import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Freelancers from '../screens/freelancers';
import Home from '../screens/home';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Home' barStyle={{backgroundColor:'#33C47E'}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Freelancers" component={Freelancers} />
      
    </Tab.Navigator>
  );
}