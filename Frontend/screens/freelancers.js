import { View, Text,FlatList, TouchableOpacity,Image,Alert  } from 'react-native'
import React, { useContext } from 'react';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState,useEffect } from 'react';
import { userContext } from '../context/userContext';
import axios from 'axios';
import Freelancer from '../components/freelancer';
import fetchURL from '../fetchURL';
import Search from '../components/search';




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
            setFreelancers(dataFetched.freelancers);
            setFilteredFreelancers(dataFetched.freelancers);
        } catch (error) {
          console.warn(error);
        }
      };
    const [freelancers,setFreelancers]=useState([]);
    const [filteredFreelancers,setFilteredFreelancers]=useState();



    const searchList = (val)=>{
      if(val && freelancers){
      var new_freelancers = freelancers.filter(function (el){
        return el.name.toLowerCase().includes(val.toLowerCase())||el.title.toLowerCase().includes(val.toLowerCase());
      });
      setFilteredFreelancers(new_freelancers);
      
      }else{
        setFilteredFreelancers(freelancers);
      }
      
    }

    return(
        <SafeAreaView style={globalStyles.safeView}>
            <Search placeholder='Search' setValue={(val)=>searchList(val)}/>
            <FlatList
                data={filteredFreelancers}
                key={(item) => item.id}
                style={globalStyles.containerList}
                renderItem={({ item }) => (
                <Freelancer name={item.name} rate={item.rate_per_hour} latitude={item.latitude} longitude={item.longitude} title={item.title} picture={item.picture_url} navigation={navigation} item={item} item_id={item.user_id}/>
        )}
      />
      
        </SafeAreaView> 
    )
}