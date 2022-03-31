import React, { useContext } from 'react';
import { View, Text,FlatList, TouchableOpacity,Image  } from 'react-native'
import { globalStyles } from '../styles/global';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { userContext } from '../context/userContext';
import fetchURL from '../fetchURL';




const freelancer = ({name,rate,latitude,longitude,title,picture,navigation,item,item_id}) => {

    const { authUser, setAuthUser } = useContext(userContext);
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
  return (
    <View>
      {item_id!=authUser.user.id?
      <TouchableOpacity onPress={()=> navigation.navigate("Freelancer Profile",item)}>
                  <View style={globalStyles.freelancer}>
                    <View style={{ flex:0.3 , marginTop: 10 }}>
                        <Image style={{width:73,height:73,borderRadius:100,marginBottom:5}} source={{uri:`${fetchURL}/${picture}`}}/>
                    </View>
                    <View style={{ flex:0.7 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold"}}>{name}</Text>
                          <View style={{flexDirection:'row',marginTop:2}}>
                            <View style={{flexDirection:"row"}}>
                                <FontAwesome name="dollar" size={22} color="orange" />
                                <Text style={{marginLeft:3}}>{rate}/hour</Text>
                            </View>
                            <View style={{flexDirection:"row",marginLeft:5}}>
                            <Ionicons name="md-location-sharp" size={23} color="red" />
                                <Text>{calculateDistance(latitude,longitude)} km</Text>
                            </View>
                          </View>
                          <Text style={{ fontSize: 17}}>{title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                :<TouchableOpacity onPress={()=> navigation.navigate("My Profile")}>
                  <View style={globalStyles.freelancer}>
                  <View style={{ flex:0.3 , marginTop: 10 }}>
                      <Image style={{width:73,height:73,borderRadius:100,marginBottom:5}} source={{uri:`${fetchURL}/${picture}`}}/>
                  </View>
                  <View style={{ flex:0.7 }}>
                      <Text style={{ fontSize: 22, fontWeight: "bold"}}>{name}</Text>
                        <View style={{flexDirection:'row',marginTop:2}}>
                          <View style={{flexDirection:"row"}}>
                              <FontAwesome name="dollar" size={22} color="orange" />
                              <Text style={{marginLeft:3}}>{rate}/hour</Text>
                          </View>
                        </View>
                        <Text style={{ fontSize: 17}}>{title}</Text>
                  </View>
                </View>
              </TouchableOpacity>}
    </View>
  )
}

export default freelancer