import { View, Text } from 'react-native'
import React from 'react'
import { Fontisto } from '@expo/vector-icons'; 


const review = ({name,rating,review}) => {
  return (
    <View>
      <View style={{backgroundColor:'#fff',width:360,borderRadius: 20,marginBottom:10,alignSelf:'center',padding:15,textAlignVertical:'center',}}>
            <View style={{flexDirection:'row',marginBottom:3 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", flex:0.8 }}>{name}</Text>
              <View style={{flexDirection:"row", flex:0.2}}>
                  <Fontisto name="star" size={22} color="#33C47E" />
                  <Text style={{marginLeft:3}}>{rating}/5</Text>
              </View>
            </View>
              <View style={{marginTop:3,marginStart:3,flexDirection:"row"}}>
                  <Text>{review}</Text>
              </View>
          </View>
    </View>
  )
}

export default review