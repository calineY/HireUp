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



const FreelancerProfile = () => {
    const redirectToWhatsapp = () =>{
        Linking.openURL('whatsapp://send?text=Hello I found you on HireUp!&phone=+96171767010');
    }
    const [freelancers,setFreelancers]=useState([
        {
            id: 1,
            name: 'Charbel Daoud',
            job:'Interior designer',
            distance:'17km'
          },
          {
            id: 2,
            name: 'Karim Khalifeh',
            job:'Graphic designer',
            distance:'17km'
          },
          {
            id: 3,
            name: 'Joe Rizk',
            job:'Interior designer',
            distance:'17km'
          },
          {
            id: 4,
            name: 'Laurena Fayad',
            job:'UI/UX',
            distance:'17km'
          },
          {
            id: 5,
            name: 'Jane Doe',
            job:'UI/UX',
            distance:'17km'
          },
          {
            id: 6,
            name: 'Gaya Foulti',
            job:'Graphic designer',
            distance:'17km'
          },
          {
            id: 7,
            name: 'Julien Script',
            job:'Interior designer',
            distance:'17km'
          },
        ]);
  return (
      <View style={{alignContent:"center",flex:1, padding:30}}>
        <View style={{flexDirection:"row"}}>
            <View style={{flex:0.4}}>
                <FontAwesome5 name="user-circle" size={100} color="black"/>
            </View>
            <View style={{ flex:0.6 }}>
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                    John Doe
                </Text>
                <Text style={{ fontSize: 22 }}>
                    Interior designer
                </Text>
            </View>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center', marginTop:15, marginStart:15}}>
            <View style={{flexDirection:"row", flex:0.33}}>
                <FontAwesome name="dollar" size={24} color="orange" />
                <Text style={{marginLeft:3}}>20/hour</Text>
            </View>
            <View style={{flexDirection:"row", flex:0.33}}>
                <Fontisto name="star" size={22} color="#33C47E" />
                <Text style={{marginLeft:3}}>5/5(2)</Text>
            </View>
            <View style={{flexDirection:"row", flex:0.33}}>
                <Ionicons name="md-location-sharp" size={24} color="red" />
                <Text>12 km</Text>
            </View>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center',margin:15}}>
            <SmallButton text="Add to favorites" color="#7C9BC9"/>
            <SmallButton text="Contact" color="#33C47E"  onPress={redirectToWhatsapp}/>
        </View>
        <Text style={{ fontSize: 19, fontWeight:'bold' }}>Bio</Text>
        <Text style={globalStyles.bio}>Lorem ipsum dolor sit amet,  et dolore magna aliqua. Ut enim ad minim veniamlabore et dolore magna aliqua. Ut enim ad minim veniamlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
        <Text style={{ fontSize: 19, fontWeight:'bold' }}>Reviews</Text>
        
        <FlatList
                data={freelancers}
                key={(item) => item.id}
                style={{width:360}}
                renderItem={({ item }) => (
                <View>
                  <View style={{backgroundColor:'#fff',
        width:360,
      
        borderRadius: 30,
        marginBottom:10,
        alignSelf:'center',
        padding:10,
        textAlignVertical:'center',}}>
                    <View style={{ flex:0.7 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", }}>{item.name}</Text>
                          <View style={{flexDirection:"row"}}>
                            <Fontisto name="star" size={22} color="#33C47E" />
                            <Text style={{marginLeft:3}}>5/5</Text>
                          </View>
                          <View style={{marginTop:3,marginStart:3,flexDirection:"row"}}>
                          <Text>Lorem ipsum dolor sit amet,  et dolore magna aliqua. Ut enim ad minim veniamlabore e
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

export default FreelancerProfile