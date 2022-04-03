
import { View, Text,StyleSheet,Image,ActivityIndicator, Platform } from 'react-native'
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
import { userContext } from '../context/userContext';
import axios from 'axios';
import { myprofileStyles } from '../styles/myprofileStyles';
import Review from '../components/review';
import fetchURL from '../fetchURL';
import Dropdown from '../components/dropdown';
import Input from '../components/input';
import LargeInput from '../components/largeInput';
import * as ImagePicker from 'expo-image-picker';


const MyProfile = ({navigation}) => {
  const { authUser, setAuthUser } = useContext(userContext);

  const [visible, setVisible] = useState(false);
  const token=authUser.access_token;

  // image picker
  const pickImage = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (data.cancelled) {
      return;
    }
    let selectedImage = {
      uri: data.uri,
      type: `test/${data.uri.split('.')[1]}`,
      name: `test.${data.uri.split('.')[1]}`,
    };
    handleUpload(selectedImage);
  };

  // Upload to Cloudinary
  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'HireUp');
    data.append('cloud_name', 'direappfj');
    fetch('https://api.cloudinary.com/v1_1/direappfj/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        editPicture(data.url);
        console.log(data.url)
      });
  };


  //Toggling the visibility state of the bottom sheet
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  

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

  const user_id=authUser.user.id;
  const getWorkProfile = async () => {
      const url = `${fetchURL}/api/user/getprofile?user_id=${user_id}`;
      try {
        const response = await axios.get(url,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataFetched =response.data;
        setWorkProfile(dataFetched)
        console.log(dataFetched);
        if (dataFetched.job[0]){
          setCategory(dataFetched.job[0].category_id);
          setTitle(dataFetched.job[0].title);
          setRate(dataFetched.job[0].rate_per_hour);
          setBio(dataFetched.job[0].bio);
        }
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

    const editWorkProfile = async () => {
      const url = `${fetchURL}/api/user/editjob`;
      const body={category_id,title,rate_per_hour,bio};
      try {
        const response = await axios.post(url,body,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataFetched =response.data;
        getWorkProfile();
        toggleBottomNavigationView();
        console.log(dataFetched)
      } catch (error) {
        console.warn(error);
      }
    };

    const addWorkProfile = async () => {
      const url = `${fetchURL}/api/user/job`;
      const body={category_id,title,rate_per_hour,bio};
      try {
        const response = await axios.post(url,body,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataFetched =response.data;
        // getWorkProfile();
        toggleBottomNavigationView();
        console.log(dataFetched)
      } catch (error) {
        console.warn(error);
      }
    };

    const toggleAvailablity = async () => {
      const url = `${fetchURL}/api/user/available`;
      const id=workProfile.job[0].id
      const body={id};
      try {
        const response = await axios.post(url,body,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataFetched =response.data;
      
        console.log(dataFetched)
      } catch (error) {
        console.warn(error);
      }
    };

    //api to edit profile picture
    const editPicture = async (dataURL) => {
      const url = `${fetchURL}/api/user/picture?image=${dataURL}`;
      try {
        const response = await axios.get(url,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        getWorkProfile();
        
      } catch (error) {
        console.warn(error);
      }
    };

    const [reviews,setReviews]=useState();
    const [workProfile,setWorkProfile]=useState();
    
    const [category_id, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [rate_per_hour, setRate] = useState('');
    const [bio, setBio] = useState('');
    

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
          <View  style={myprofileStyles.imageView}  >
            <Image style={myprofileStyles.image} source={{uri:`${workProfile.user.picture_url}`}}/>
          </View>
        </View>
        <SmallButton text="test" color="black" onPress={pickImage}/>
        <View style={{ flex:0.6 }}>
            <Text style={myprofileStyles.name}>
                {workProfile.user.name}
            </Text>
            {/* handeling if user has no work profile */}
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
        <SmallButton text="Go public" color="#33C47E" onPress={toggleAvailablity}/>
        :<SmallButton text="Hide profile" color="#F24E1E" onPress={toggleAvailablity}/>}
        <SmallButton text="Edit Profile" color="#7C9BC9"  onPress={toggleBottomNavigationView}/>
    </View>
    :<View style={{flexDirection:"row", justifyContent:'center',margin:15}}>
        <SmallButton text="Add work profile" color="#33C47E" onPress={toggleBottomNavigationView}/>
    </View>}
    {workProfile && workProfile.job[0] ?
    <View>
      <Text style={{ fontSize: 19, fontWeight:'bold' }}>Bio</Text>
      <Text style={globalStyles.bio}>{workProfile && workProfile.job[0].bio} </Text>
    </View>
    :<Text style={myprofileStyles.noProfile}>No work profile</Text>}
    
    {reviews && !reviews.reviews.length ==0 ?
    <View>
      <View style={{padding:20}}></View>
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
       <View style={{padding:40}}></View>
      <View style={{flexDirection:'row'}}>
        <Text style={{ fontSize: 19, fontWeight:'bold',flex:1}}>Reviews</Text>
      </View>
      <Text style={{alignSelf:'center',marginTop:40}}>No reviews</Text>
    </View>}
 </View>
 {workProfile.job[0]?
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
                  <Text style={globalStyles.modalSubTitle}>Category</Text>
                  <View style={{alignItems:'center'}}>
                    <Dropdown selectedCategory={setCategory}/>
                  </View>
                  <Text style={globalStyles.modalSubTitle}>Title</Text>
                  <View style={{alignItems:'center'}}>
                    <Input color='#f1f1f1' placeholder={workProfile.job[0].title} value={title} setValue={setTitle}/>
                  </View>
                  <Text style={globalStyles.modalSubTitle}>Rate per hour</Text>
                  <View style={{alignItems:'center'}}>
                    <Input color='#f1f1f1' placeholder={workProfile.job[0].rate_per_hour} value={rate_per_hour} setValue={setRate}/>
                  </View>
                  <Text style={globalStyles.modalSubTitle}>Bio</Text>
                  <View style={{alignItems:'center'}}>
                    <LargeInput color='#f1f1f1' placeholder={workProfile.job[0].bio} value={bio} setValue={setBio}/>
                  </View>
                  <View style={{alignItems:'center',marginTop:20}}>
                    <SmallButton color="#7C9BC9" text="Save" onPress={editWorkProfile}/>
                  </View>
              </View>
          </BottomSheet>
          :<BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        ><View style={styles.bottomNavigationView}>
        <Text style={globalStyles.modalTitle}>Add work profile</Text>
        <Text style={globalStyles.modalSubTitle}>Category</Text>
        <View style={{alignItems:'center'}}>
          <Dropdown selectedCategory={setCategory}/>
        </View>
        <Text style={globalStyles.modalSubTitle}>Title</Text>
        <View style={{alignItems:'center'}}>
          <Input color='#f1f1f1' placeholder='' value={title} setValue={setTitle}/>
        </View>
        <Text style={globalStyles.modalSubTitle}>Rate per hour</Text>
        <View style={{alignItems:'center'}}>
          <Input color='#f1f1f1' placeholder='' value={rate_per_hour} setValue={setRate}/>
        </View>
        <Text style={globalStyles.modalSubTitle}>Bio</Text>
        <View style={{alignItems:'center'}}>
          <LargeInput color='#f1f1f1' placeholder='' value={bio} setValue={setBio}/>
        </View>
        <View style={{alignItems:'center',marginTop:20}}>
          <SmallButton color="#33C47E" text="Post" onPress={addWorkProfile}/>
        </View>
    </View></BottomSheet>
 }
 </ScrollView>
 </View>:<View style={globalStyles.loadingView}><ActivityIndicator size="large" color="green"/></View>}
 </View>
  )
}


export default MyProfile

const styles = StyleSheet.create({
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: 560,
      padding:10,
      borderTopEndRadius:20,
      borderTopStartRadius:20
    },
  });