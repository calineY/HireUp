import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import Freelancers from '../screens/freelancers'
import FreelancerProfile from '../screens/freelancerProfile'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeStack = () => {
    const HomeStack=createStackNavigator();

  return (
    <HomeStack.Navigator screenOptions={{headerShown:true, headerTintColor: '#fff', headerStyle: {
      backgroundColor: '#33C47E', 
    },
  }}>
        <HomeStack.Screen name='Home' component={Home}/>
        <HomeStack.Screen name='Freelancers' component={Freelancers}/>
        <HomeStack.Screen name='Freelancer Profile' component={FreelancerProfile}/>
    </HomeStack.Navigator>
  )
}

export default HomeStack