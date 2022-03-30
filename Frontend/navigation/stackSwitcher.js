import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from '../navigation/loginStack';
import TabNavigation from './navbar';
import { userContext } from '../context/userContext';
import { categoriesContext } from '../context/categoriesContext';



const StackSwitcher = () => {
  const [authUser, setAuthUser] = useState();
  const [categoriesArray, setCategoriesArray] = useState();

  return (
    <userContext.Provider value={{authUser, setAuthUser}}>
      <categoriesContext.Provider value={{categoriesArray, setCategoriesArray}}>
        <NavigationContainer>
            {!authUser?<LoginStack/>:<TabNavigation/>}
        </NavigationContainer>
      </categoriesContext.Provider>
     </userContext.Provider>
  )
}

export default StackSwitcher