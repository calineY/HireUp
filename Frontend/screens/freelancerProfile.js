import { View, Text,Linking,StyleSheet, Easing,ActivityIndicator,Image  } from 'react-native'
import React from 'react'
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SmallButton from '../components/button'
import { globalStyles } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import { useState,useEffect } from 'react';
import { BottomSheet } from 'react-native-btr';
import Rating from 'react-native-rating';
import Input from '../components/input';
import fetchURL from '../fetchURL';
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
import { myprofileStyles } from '../styles/myprofileStyles';



const FreelancerProfile = ({route}) => {
    const { authUser, setAuthUser } = useContext(userContext);
    const token=authUser.access_token;

    const [workProfile,setWorkProfile]=useState();
    const [reviews,setReviews]=useState();

    const [rating,setRating]=useState();
    const [review,setReview]=useState();

    const user_id=route.params.user_id;

    console.log(route)
    useEffect(() => {
        getWorkProfile();
        getReviews();
    },[] );

    //function to get total rating and reviews count
    function calculateRating(reviews){
        let sum =0;
        let ratings=0;
        reviews.forEach(element => {
          ratings+=element.rating;
          sum++;
        });
        let res=ratings/sum;
        return res.toFixed(1)+'/5'+' ('+sum+')';
      }
    
    const getWorkProfile = async () => {
        const url = `${fetchURL}/api/user/getprofile?user_id=${user_id}`;
        try {
          const response = await axios.get(url,
          {
            headers: { Authorization: `Bearer ${token}` },
          });
          const dataFetched =response.data;
          setWorkProfile(dataFetched);
          console.log(dataFetched)
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
        } catch (error) {
          console.warn(error);
        }
    };

    const [error,setError]=useState("");
    const reviewBody={from_user_id:authUser.id,to_user_id:user_id,rating,review}
    const addReview = async () => {
    if(!rating || ! review){
        setError("Please select rating and write a review.");
        return;
    }
    const url = `${fetchURL}/api/user/review`;
    try {
        const response = await axios.post(url,reviewBody,
        {
        headers: { Authorization: `Bearer ${token}` },
        });
        const dataFetched =response.data;
        getReviews();
        toggleBottomNavigationView();
        setRating();
        setReview();
    } catch (error) {
        console.warn(error);
    }
    };
    
    const addFavorite = async () => {
        const url = `${fetchURL}/api/user/favorite`;
        try {
          const response = await axios.post(url,{to_user_id:user_id},
          {
            headers: { Authorization: `Bearer ${token}` },
          });
          getWorkProfile();
        } catch (error) {
          console.warn(error);
        }
      };

      const removeFavorite = async () => {
        const url = `${fetchURL}/api/user/favorites`;
        try {
          const response = await axios.post(url,{user_id},
          {
            headers: { Authorization: `Bearer ${token}` },
          });
          getWorkProfile();
        } catch (error) {
          console.warn(error);
        }
      };

    //stars used for rating
    const images = {
        starFilled: require('../assets/star_filled.png'),
        starUnfilled: require('../assets/star_unfilled.png')
      }

    //link to redirect to whatsapp to chat with freelancer
    const redirectToWhatsapp = (phone) =>{
        Linking.openURL(`whatsapp://send?text=Hello I found you on HireUp!&phone=${phone}`);
    }
    const [visible, setVisible] = useState(false);

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
        setError("");
    };



    const lat1=authUser.user.latitude;
    const lon1=authUser.user.longitude;
  //function to calculate distance between auth user and freelancer
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
      {workProfile?
      <ScrollView>
      <View style={myprofileStyles.innerView}>
    <View style={myprofileStyles.headerView}>
        <View style={{flex:0.4}}>
          <View  style={myprofileStyles.imageView}>
            <Image style={myprofileStyles.image} source={{uri:`${workProfile.user.picture_url}`}}/>
          </View>
        </View>
        <View style={{ flex:0.6 }}>
            <Text style={myprofileStyles.name}>
                {workProfile.user.name}
            </Text>
            <Text style={{ fontSize: 22 }}>
                {workProfile.job[0].title}
              </Text>
            </View>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center', marginTop:15, marginStart:15}}>
            <View style={{flexDirection:"row", flex:0.36}}>
                <FontAwesome name="dollar" size={24} color="orange" />
                <Text style={{marginLeft:3}}>{workProfile && workProfile.job[0].rate_per_hour}/hour</Text>
            </View>
            <View style={{flexDirection:"row", flex:0.3}}>
                <Fontisto name="star" size={22} color="#33C47E" />
                {reviews && !reviews.reviews.length ==0 ?
                <View><Text style={{marginLeft:3}}>{calculateRating(reviews.reviews)}</Text></View>
                :<View><Text style={{marginLeft:3}}>(0)</Text></View>}
                
            </View>
            <View style={{flexDirection:"row", flex:0.33}}>
                <Ionicons name="md-location-sharp" size={24} color="red" />
                <Text>{calculateDistance(route.params.latitude,route.params.longitude)} km</Text>
            </View>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center',margin:15}}>
            {workProfile && workProfile.isFavorite.length==0?
            <SmallButton text="Add to favorites" color="#7C9BC9" onPress={addFavorite}/>
            :<SmallButton text="Remove favorite" color="#F24E1E" onPress={removeFavorite}/>}
            <SmallButton text="Contact" color="#33C47E"  onPress={()=>redirectToWhatsapp(workProfile.user.phone_number)}/>
        </View>
        <Text style={{ fontSize: 19, fontWeight:'bold' }}>Bio</Text>
        <Text style={globalStyles.bio}>{workProfile.job[0].bio} </Text>
        <View style={{padding:20}}></View>
        <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 19, fontWeight:'bold',flex:1,paddingTop:13}}>Reviews</Text>
            <View style={{paddingBottom:10,marginRight:-8}}>
                <SmallButton color="#33C47E" text="Add review" onPress={toggleBottomNavigationView}/>
            </View>
        </View>
        
        {reviews && !reviews.reviews.length ==0 ?
        <View>
        {reviews.reviews.map((item)=>
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
            </View>)}</View>:<View><Text style={{alignSelf:'center',marginTop:40}}>No reviews</Text></View>}
 </View>
 <BottomSheet
    visible={visible}
    //setting the visibility state of the bottom sheet
    onBackButtonPress={toggleBottomNavigationView}
    //Toggling the visibility state on the click of the back button
    onBackdropPress={toggleBottomNavigationView}
    //Toggling the visibility state on the clicking out side of the sheet
    >
    <View style={styles.bottomNavigationView}>
        <Text style={globalStyles.modalTitle}>Add review</Text>
        <Text style={globalStyles.errorMessage}>{error}</Text>
        <Text style={globalStyles.modalSubTitle}>Rate</Text>
        <Rating
        onChange={rated => setRating(rated)}
        selectedStar={images.starFilled}
        unselectedStar={images.starUnfilled}
        config={{easing: Easing.inOut(Easing.ease),duration: 350}}
        stagger={80}
        maxScale={1.4}
        starStyle={{width: 40,height: 40}}
    />
    <Text style={globalStyles.modalSubTitle}>Review</Text>
    <Input color='#f1f1f1' placeholder='Review' value={review} setValue={setReview}/>
    <View style={{alignSelf:'center',paddingVertical:30}}>
        <SmallButton color="#33C47E" text="Add review" onPress={addReview}/>
    </View>
    </View>
</BottomSheet>
 </ScrollView>
 :<View style={globalStyles.loadingView}><ActivityIndicator size="large" color="green"/></View>}</View>)}


export default FreelancerProfile

const styles = StyleSheet.create({
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: 370,
      padding:20,
      borderTopEndRadius:20,
      borderTopStartRadius:20
    },
  });
  