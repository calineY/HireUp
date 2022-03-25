import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const FreelancerProfile = () => {
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
 </View>
  )
}

export default FreelancerProfile