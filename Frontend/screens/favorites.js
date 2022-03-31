import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { globalStyles } from '../styles/global';
import Freelancer from '../components/freelancer';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
import fetchURL from '../fetchURL';
import axios from 'axios';


const Favorites = ({navigation}) => {
  const { authUser, setAuthUser } = useContext(userContext)
  const token=authUser.access_token;

  useEffect(() => {
      navigation.addListener('focus',()=>{getFavorites()});
  });


  const user_id=authUser.id;

  const getFavorites = async () => {
      const url = `${fetchURL}/api/user/favorites?user_id=${user_id}`;
        try {
          const response = await axios.get(url,
          {
            headers: { Authorization: `Bearer ${token}` },
          });
          const dataFetched =response.data;
            setFavorites(dataFetched);
        } catch (error) {
          console.warn(error);
        }
      };
    const [favorites,setFavorites]=useState();

  return (
    <View>
      {favorites && favorites.favorites[0]?
    <FlatList
        data={favorites && favorites.favorites}
        key={(item) => item.id}
        style={globalStyles.containerList}
        renderItem={({ item }) => (
        <Freelancer name={item.name} rate={item.rate_per_hour} latitude={item.latitude} longitude={item.longitude} title={item.title} picture={item.picture_url} navigation={navigation} item={item} item_id={item.id}/>
)}
/>
:<View style={{justifyContent:'center',alignItems:'center',paddingTop:100}}><Text>No favorites</Text></View>}
</View> 

    
  )
}

export default Favorites