import { View, Text,FlatList, TouchableOpacity,Image  } from 'react-native'
import React, { useContext } from 'react';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState,useEffect } from 'react';
import { userContext } from '../context/userContext';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Freelancer from '../components/freelancer';
import fetchURL from '../fetchURL';



export default function Freelancers({route,navigation}){
  const { authUser, setAuthUser } = useContext(userContext)
  const token=authUser.access_token;

  useEffect(() => {
      getFreelancers();
  }, []);

  const body={category_id:route.params.id};

    const getFreelancers = async () => {
        const url = `${fetchURL}/api/user/getfreelancers`;
        try {
          const response = await axios.post(url,body,
          {
            headers: { Authorization: `Bearer ${token}` },
          });
          const dataFetched =response.data;
            setFreelancers(dataFetched);
        } catch (error) {
          console.warn(error);
        }
      };
    const [freelancers,setFreelancers]=useState();

    return(
        <SafeAreaView style={globalStyles.safeView}>
            <FlatList
                data={freelancers && freelancers.freelancers}
                key={(item) => item.id}
                style={globalStyles.containerList}
                renderItem={({ item }) => (
                <Freelancer name={item.name} rate={item.rate_per_hour} latitude={item.latitude} longitude={item.longitude} title={item.title} picture={item.picture_url} navigation={navigation} item={item} item_id={item.id}/>
        )}
      />
      
        </SafeAreaView> 
    )
}