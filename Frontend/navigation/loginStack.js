import { View, Text } from 'react-native'
import React from 'react'
import Login from '../screens/login'
import Signup from '../screens/signup'
import {createStackNavigator} from '@react-navigation/stack';

const LoginStack = () => {
    const LoginStack=createStackNavigator();
  return (
    <LoginStack.Navigator screenOptions={{headerShown:false}}>
            <LoginStack.Screen name='Login' component={Login}/>
            <LoginStack.Screen name='Register' component={Signup}/>
    </LoginStack.Navigator>
  )
}

export default LoginStack