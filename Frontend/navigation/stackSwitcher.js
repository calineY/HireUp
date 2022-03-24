import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/login'
import Signup from '../screens/signup'
import Freelancers from '../screens/freelancers'
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from './navbar';
import LoginStack from '../navigation/loginStack';
import TabNavigation from './navbar';



const StackSwitcher = () => {

  return (
    <NavigationContainer>
        {false?<LoginStack/>:<TabNavigation/>}
     </NavigationContainer>
  )
}

export default StackSwitcher