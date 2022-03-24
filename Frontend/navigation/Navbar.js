import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Freelancers from '../screens/freelancers';
import HomeStack from './homeStack';
import Favorites from '../screens/favorites';
import MyProfile from '../screens/myprofile';
import MyReviews from '../screens/myreviews';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Home' backBehavior="order" activeColor="#fff" inactiveColor="rgba(255, 255, 255, 0.6)" barStyle={{backgroundColor:'#33C47E'}} >
      <Tab.Screen options={{tabBarLabel: "Home", tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />)}}  name="HomeStack" component={HomeStack}/>
      <Tab.Screen options={{tabBarLabel: "Favorites", tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-border" size={24} color={color} />)}} name="Favorites" component={Favorites} />
      <Tab.Screen options={{tabBarLabel: "My Reviews", tabBarIcon: ({ color }) => (
            <MaterialIcons name="rate-review" size={24} color={color} />)}} name="My Reviews" component={MyReviews} />
      <Tab.Screen options={{tabBarLabel: "My Profile", tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />)}} name="My Profile" component={MyProfile} />
    </Tab.Navigator>
)
}