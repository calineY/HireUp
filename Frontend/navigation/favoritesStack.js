
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Favorites from '../screens/favorites'
import FreelancerProfile from '../screens/freelancerProfile'


const FavoritesStack = () => {
    const FavoritesStack=createStackNavigator();

  return (
    <FavoritesStack.Navigator screenOptions={{headerShown:true, headerTintColor: '#fff', headerStyle: {
      backgroundColor: '#33C47E', 
    },
  }}>
        <FavoritesStack.Screen name='Favorites' component={Favorites}/>
        <FavoritesStack.Screen name='Freelancer Profile' component={FreelancerProfile}/>
    </FavoritesStack.Navigator>
  )
}

export default FavoritesStack