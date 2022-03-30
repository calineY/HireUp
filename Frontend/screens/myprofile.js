
import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import SmallButton from '../components/button'
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useState,useEffect } from 'react';
import { BottomSheet } from 'react-native-btr';
import Header from '../components/header'
import { useContext } from 'react';
import { userContext } from '../userContext';
import axios from 'axios';
import { myprofileStyles } from '../styles/myprofileStyles';
import Review from '../components/review';
import fetchURL from '../fetchURL';




const MyProfile = () => {
  const { authUser, setAuthUser } = useContext(userContext);
  const [visible, setVisible] = useState(false);
  const token=authUser.access_token;
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

function calculateRating(reviews){
  let sum =0;
  let ratings=0;
  reviews.forEach(element => {
    ratings+=element.rating;
    sum++;
  });
  return ratings/sum+'/5'+'('+sum+')';
}

  const user_id=authUser.user.id;
  const getWorkProfile = async () => {
      const url = `${fetchURL}/api/user/getprofile?user_id=${user_id}`;
      try {
        const response = await axios.get(url,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataFetched =response.data;
        setWorkProfile(dataFetched);
        console.log(dataFetched);
      } catch (error) {
        console.warn(error);
      }
    };
    const getReviews = async () => {
      const url = `${fetchURL}/api/user/reviews?user_id=${user_id}`;
      try {
        const response = await axios.get(url,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataFetched =response.data;
        setReviews(dataFetched);
        console.log(dataFetched)
      } catch (error) {
        console.warn(error);
      }
    };
    const [reviews,setReviews]=useState();
    const [workProfile,setWorkProfile]=useState();

    useEffect(() => {
      getWorkProfile();
      getReviews();
  },[] );
  return (<View>
    {workProfile && reviews?
<View style={myprofileStyles.mainView}>
  <View>
    <Header title='My profile'/>
  </View>
  <ScrollView>
  <View style={myprofileStyles.innerView}>
    <View style={myprofileStyles.headerView}>
        <View style={{flex:0.4}}>
          <View  style={myprofileStyles.imageView}>
            <Image style={myprofileStyles.image} source={{uri:`${fetchURL}/${authUser.user.picture_url}`}}/>
          </View>
        </View>
        <View style={{ flex:0.6 }}>
            <Text style={myprofileStyles.name}>
                {authUser.user.name}
            </Text>
            {/* if user has no work profile */}
            {workProfile && workProfile.job[0] ?
            <View>
              <Text style={{ fontSize: 22 }}>
                {workProfile.job[0].title}
              </Text>
              <View style={{flexDirection:"row", flex:0.33}}>
                <FontAwesome name="dollar" size={24} color="orange" />
                <Text style={{marginLeft:3}}>{workProfile && workProfile.job[0].rate_per_hour}/hour</Text>
              </View>
            </View>
            :<View><Text>No position entered</Text></View>}
        </View>
    </View>
    
    {workProfile && workProfile.job[0] ?
    <View style={{flexDirection:"row", justifyContent:'center',margin:15}}>
        {workProfile.job[0].available===0?
        <SmallButton text="Go public" color="#33C47E"/>
        :<SmallButton text="Hide profile" color="#F24E1E"/>}
        <SmallButton text="Edit Profile" color="#7C9BC9"  onPress={toggleBottomNavigationView}/>
    </View>
    :<View style={{flexDirection:"row", justifyContent:'center',margin:15}}>
        <SmallButton text="Add work profile" color="#33C47E"/>
    </View>}
    {workProfile && workProfile.job[0] ?
    <View>
      <Text style={{ fontSize: 19, fontWeight:'bold' }}>Bio</Text>
      <Text style={globalStyles.bio}>{workProfile && workProfile.job[0].bio} </Text>
    </View>
    :<Text style={myprofileStyles.noProfile}>No work profile</Text>}
    
    {reviews && !reviews.reviews.length ==0 ?
    <View>
      <View style={{flexDirection:'row'}}>
        <Text style={{ fontSize: 19, fontWeight:'bold',flex:1}}>Reviews</Text>
        <View style={{flexDirection:'row'}}>
        <Fontisto name="star" size={22} color="#33C47E" />
            <Text style={{marginLeft:3}}>{calculateRating(reviews.reviews)}</Text>
        </View>
    </View>
    {reviews.reviews.map((item)=>
        <View key={item.id}>
          <Review name={item.name} rating={item.rating} review={item.review}/>
        </View>)}
    </View>
    :<View>
      <View style={{flexDirection:'row'}}>
        <Text style={{ fontSize: 19, fontWeight:'bold',flex:1}}>Reviews</Text>
      </View>
      <Text style={{alignSelf:'center',marginTop:40}}>No reviews</Text>
    </View>}
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
 </View>:<Text style={{alignSelf:'center',marginVertical:300}}>Loading...</Text>}
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