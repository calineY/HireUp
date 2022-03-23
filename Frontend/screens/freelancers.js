import { View, Text,FlatList, TouchableOpacity  } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/input';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';


export default function Freelancers({navigation}){
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

    return(
        <SafeAreaView style={globalStyles.safeView}>
            <View style={globalStyles.header}>
                <Input placeholder='Search'/>
            </View>
            <FlatList
                data={freelancers}
                key={(item) => item.id}
                style={globalStyles.containerList}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={()=> navigation.navigate("FreelancerProfile")}>
                  <View style={globalStyles.freelancer}>
                      <View style={{ flex:0.3 , marginTop: 10 }}>
                          <FontAwesome5
                              style={{ marginRight: 10 }}
                              name="user-circle"
                              size={65}
                              color="black"
                          />
                      </View>
                      <View style={{ flex:0.7 , marginTop: 10 }}>
                              <Text
                              style={{ fontSize: 22, fontWeight: "bold", }}
                              >
                              {item.name}
                              </Text>
                              <Text>{item.job}</Text>
                              <Fontisto name="star" size={22} color="#33C47E" />
                              <View style={{marginTop:3,marginStart:3}}>
                                  <FontAwesome name="dollar" size={24} color="orange" />
                              </View>
                          </View>
                      <View style={{flex:0.2, marginTop:15}}>
                          <Text>{item.distance}</Text>
                      </View>
                  </View>
                </TouchableOpacity>
        )}
      />
      
        </SafeAreaView> 
    )
}