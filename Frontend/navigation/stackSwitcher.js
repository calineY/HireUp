import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
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