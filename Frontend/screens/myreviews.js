import { View, Text,Linking } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SmallButton from '../components/button'
import { globalStyles } from '../styles/global';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import Header from '../components/header';
import { MaterialIcons } from '@expo/vector-icons';


const MyReviews = () => {
  const [freelancers,setFreelancers]=useState([
    {
        
        name: "John Doe",
        picture_url: "user.png",
        id: 1,
        from_user_id: 2,
        to_user_id: 3,
        rating: 5,
        review: "Very professional",
        created_at: "2022-03-13T19:54:49.000000Z",
        updated_at: "2022-03-13T19:54:49.000000Z"
      },
      {
        name: "Karim Khalifeh",
        picture_url: "user.png",
        id: 2,
        from_user_id: 2,
        to_user_id: 3,
        rating: 4,
        review: "Friendly",
        created_at: "2022-03-13T19:54:49.000000Z",
        updated_at: "2022-03-13T19:54:49.000000Z"
      },
      {
        name: "Jane Doe",
        picture_url: "user.png",
        id: 3,
        from_user_id: 2,
        to_user_id: 3,
        rating: 4,
        review: "Great",
        created_at: "2022-03-13T19:54:49.000000Z",
        updated_at: "2022-03-13T19:54:49.000000Z"
      },

    ]);
  return (
    <View>
      <Header title='My reviews'/>
            <FlatList
                data={freelancers}
                key={(item) => item.id}
                style={{width:360,alignSelf:'center',paddingTop:15}}
                renderItem={({ item }) => (
                <View>
                  <View style={{backgroundColor:'#fff',
        width:360,
        borderRadius: 30,
        marginBottom:10,
        alignSelf:'center',
        padding:20,
        textAlignVertical:'center',}}>
            <View>
                    <View style={{flexDirection:'row',marginBottom:3 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", flex:0.6}}>To {item.name}</Text>
                          <View style={{flexDirection:"row", flex:0.4}}>
                            <Fontisto name="star" size={22} color="#33C47E" />
                            <Text style={{marginLeft:3}}>{item.rating}/5</Text>
                          </View>
                          <View><MaterialIcons name="delete-outline" size={36} color="red" /></View>
                          </View>
                          <View style={{marginTop:3,marginStart:3,flexDirection:"row"}}>
                          <Text>{item.review}
                          </Text>
                          </View>
                  </View>
                </View>
                </View>
        )}
      />
    </View>
  )
}

export default MyReviews