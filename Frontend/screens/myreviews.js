import { View, Text,Alert} from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SmallButton from '../components/button'
import { globalStyles } from '../styles/global';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Header from '../components/header';
import { MaterialIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
import { useState,useEffect } from 'react';
import fetchURL from '../fetchURL';
import axios from 'axios';




const MyReviews = ({navigation}) => {

  const { authUser, setAuthUser } = useContext(userContext)
  const token=authUser.access_token;

  useEffect(() => {
      navigation.addListener('focus',()=>{getReviews()});
  });

  const [reviews,setReviews]=useState([]);


  const getReviews = async () => {
    const url = `${fetchURL}/api/user/myreviews`;
    try {
      const response = await axios.get(url,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataFetched =response.data;
      setReviews(dataFetched.reviews);
    } catch (error) {
      console.warn(error);
    }
  };

  const deleteReview = async (id) => {
    const url = `${fetchURL}/api/user/deletereview?id=${id}`;
    try {
      const response = await axios.get(url,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      var new_reviews = reviews.filter(function (el){
          return el.id!==id ;
        });
      setReviews(new_reviews);
      Alert.alert("Review deleted");
    } catch (error) {
      console.warn(error);
    }
  };
  
  return (
    <View>
      <Header title='My reviews'/>
      {reviews[0]?
            <FlatList
                data={reviews}
                key={(item) => item.id}
                style={{width:360,alignSelf:'center',paddingTop:15}}
                renderItem={({ item }) => (
                  <View style={{backgroundColor:'#fff',
                      width:360,
                      borderRadius: 20,
                      marginBottom:10,
                      alignSelf:'center',
                      padding:20,
                      textAlignVertical:'center',}}>
                    <View style={{flexDirection:'row',}}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", flex:1}}>To {item.name}</Text>
                          <View><MaterialIcons name="delete-outline" size={36} color="red" onPress={()=>deleteReview(item.id)}/></View>
                    </View>
                    <View style={{flexDirection:"row",top:-7}}>
                      <Fontisto name="star" size={22} color="#33C47E" />
                      <Text style={{marginLeft:3}}>{item.rating}/5</Text>
                    </View>
                    <Text style={{fontSize:18}}>{item.review}</Text>
                </View>
                
        )}
      />
    :<View style={{justifyContent:'center',alignItems:'center',paddingTop:100}}><Text>No reviews</Text></View>}

    </View>
  )
}

export default MyReviews