import { View, Text,FlatList, TouchableOpacity,Image  } from 'react-native'
import React, { useContext } from 'react';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState,useEffect } from 'react';
import { userContext } from '../userContext';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Freelancer from '../components/freelancer';



export default function Freelancers({route,navigation}){
  const { authUser, setAuthUser } = useContext(userContext)
  const token=authUser.access_token;
  const lat1=authUser.user.latitude;
  const lon1=authUser.user.longitude;

  function calculateDistance(lat2,lon2){
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * (Math.PI / 180);  // deg2rad below
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d =Math.floor( R * c); // Distance in km
    return d; 
  }

    useEffect(() => {
        getFreelancers();
    }, []);

  const body={category_id:route.params.id};
    const getFreelancers = async () => {
        const url = "http://192.168.1.231:8000/api/user/getfreelancers";
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
                // <TouchableOpacity onPress={()=> navigation.navigate("Freelancer Profile")}>
                //   <View style={globalStyles.freelancer}>
                //     <View style={{ flex:0.3 , marginTop: 10 }}>
                //         <Image style={{width:73,height:73,borderRadius:100,marginBottom:5}} source={{uri:`http://192.168.1.231:8000/${item.picture_url}`}}/>
                //     </View>
                //     <View style={{ flex:0.7 }}>
                //         <Text style={{ fontSize: 22, fontWeight: "bold"}}>{item.name}</Text>
                //           <View style={{flexDirection:'row',marginTop:2}}>
                //             <View style={{flexDirection:"row"}}>
                //                 <FontAwesome name="dollar" size={22} color="orange" />
                //                 <Text style={{marginLeft:3}}>{item.rate_per_hour}/hour</Text>
                //             </View>
                //             <View style={{flexDirection:"row",marginLeft:5}}>
                //             <Ionicons name="md-location-sharp" size={23} color="red" />
                //                 <Text>{calculateDistance(item.latitude,item.longitude)} km</Text>
                //             </View>
                //           </View>
                //           <Text style={{ fontSize: 17}}>{item.title}</Text>
                //     </View>
                //   </View>
                // </TouchableOpacity>
                <Freelancer name={item.name} rate={item.rate_per_hour} latitude={item.latitude} longitude={item.longitude} title={item.title} picture={item.picture_url}/>
        )}
      />
      
        </SafeAreaView> 
    )
}