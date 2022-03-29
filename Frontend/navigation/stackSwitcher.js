import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from '../navigation/loginStack';
import TabNavigation from './navbar';
import { userContext } from '../userContext';



const StackSwitcher = () => {
  const [authUser, setAuthUser] = useState();
  return (
    <userContext.Provider value={{authUser, setAuthUser}}>
    <NavigationContainer>
        {!authUser?<LoginStack/>:<TabNavigation/>}
     </NavigationContainer>
     </userContext.Provider>
  )
}

export default StackSwitcher