import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import Header from '../components/header'
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
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

        // <TouchableOpacity onPress={()=> navigation.navigate("Freelancer Profile")}>
        //   <View style={globalStyles.freelancer}>
        //     <View style={{ flex:0.3 , marginTop: 10 }}>
        //         <FontAwesome5
        //           style={{ marginRight: 10 }}
        //           name="user-circle"
        //           size={65}
        //           color="black"
        //         />
        //     </View>
        //     <View style={{ flex:0.7 }}>
        //         <Text style={{ fontSize: 22, fontWeight: "bold", }}>{item.name}</Text>
        //           <Text>{item.job}</Text>
        //           <View style={{flexDirection:"row"}}>
        //             <Fontisto name="star" size={22} color="#33C47E" />
        //             <Text style={{marginLeft:3}}>5/5</Text>
        //           </View>
        //           <View style={{marginTop:3,marginStart:3,flexDirection:"row"}}>
        //               <FontAwesome name="dollar" size={24} color="orange" />
        //               <Text style={{marginLeft:3}}>20/hour</Text>
        //           </View>
        //     </View>
        //     <View style={{flex:0.2, marginTop:15}}>
        //         <Text>{item.distance}</Text>
        //     </View>
        //   </View>
        // </TouchableOpacity>
)}
/>
:<View style={{justifyContent:'center',alignItems:'center',paddingTop:100}}><Text>No favorites</Text></View>}
</View> 

    
  )
}

export default Favorites