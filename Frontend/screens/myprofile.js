
import { View, Text,Linking,StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SmallButton from '../components/button'
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { BottomSheet } from 'react-native-btr';
import Header from '../components/header'



const MyProfile = () => {
    const redirectToWhatsapp = () =>{
        Linking.openURL('whatsapp://send?text=Hello I found you on HireUp!&phone=+96171767010');
    }
    const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
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
          {
            name: "Jane Doe",
            picture_url: "user.png",
            id: 4,
            from_user_id: 2,
            to_user_id: 3,
            rating: 4,
            review: "Great",
            created_at: "2022-03-13T19:54:49.000000Z",
            updated_at: "2022-03-13T19:54:49.000000Z"
          },

        ]);
  return (
    <View style={{marginBottom:70}}>
    <View>
      <Header title='My profile'/>
    </View>
      <ScrollView>
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
                <View style={{flexDirection:"row", flex:0.33}}>
                <FontAwesome name="dollar" size={24} color="orange" />
                <Text style={{marginLeft:3}}>20/hour</Text>
            </View>
            </View>
        </View>
        <View style={{justifyContent:'center',}}>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center',margin:15}}>
            <SmallButton text="Available" color="#33C47E"/>
            <SmallButton text="Edit Profile" color="#7C9BC9"  />
        </View>
        <Text style={{ fontSize: 19, fontWeight:'bold' }}>Bio</Text>
        <Text style={globalStyles.bio}>Lorem ipsum dolor sit amet,  et dolore magna aliqua. Ut enim ad minim veniamlabore et dolore magna aliqua. Ut enim ad minim veniamlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
        <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 19, fontWeight:'bold',flex:1}}>Reviews</Text>
            <View style={{flexDirection:'row'}}>
            <Fontisto name="star" size={22} color="#33C47E" />
                <Text style={{marginLeft:3}}>5/5(2)</Text>
            </View>
        </View>
        {freelancers.map((item)=>
            <View key={item.id}>
            <View style={{backgroundColor:'#fff',width:360,borderRadius: 20,marginBottom:10,alignSelf:'center',padding:15,textAlignVertical:'center',}}>
                <View style={{flexDirection:'row',marginBottom:3 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", flex:0.8 }}>{item.name}</Text>
                    <View style={{flexDirection:"row", flex:0.2}}>
                        <Fontisto name="star" size={22} color="#33C47E" />
                        <Text style={{marginLeft:3}}>{item.rating}/5</Text>
                    </View>
                </View>
                <View style={{marginTop:3,marginStart:3,flexDirection:"row"}}>
                    <Text>{item.review}</Text>
                </View>
            </View>
            </View>)}
 </View>
 <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
            <View style={styles.bottomNavigationView}>
                <Text style={globalStyles.modalTitle}>Edit</Text>
            </View>
        </BottomSheet>
 </ScrollView>
 </View>

  )
}

export default MyProfile

const styles = StyleSheet.create({
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: 350,
      padding:10,
      borderTopEndRadius:20,
      borderTopStartRadius:20
    },
  });