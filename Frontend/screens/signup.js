import React, { useEffect } from 'react';
import {ScrollView, View, Image, Text, TouchableOpacity, StyleSheet,Platform} from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';
import Button from '../components/buttonLarge'
import { useState } from 'react';
import PhoneInput from "react-native-phone-number-input";
import axios from 'axios';
import fetchURL from '../fetchURL';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';



export default function Signup({navigation}){
  const [location, setLocation] = useState({latitude:30,longitude:30});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      await Location.getCurrentPositionAsync({}).then((values)=>{
      handleLocation( values.coords.latitude,values.coords.longitude)
      });
    })();
    
  }, []);

 
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    latitude: "",
    longitude:"",
  });

  const handleName = (value) => {setData({...data,name: value,});
  };
  const handleEmail = (value) => {
    setData({
      ...data,
      email: value,
    });
  };
  const handlePassword = (value) => {
    setData({
      ...data,
      password: value,
    });
  };
  const handlePasswordConfirmation = (value) => {
    setData({
      ...data,
      password_confirmation: value,
    });
  };
  const handlePhoneNumber = (value) => {
    setData({
      ...data,
      phone_number: value,
    });
  };
  const handleLocation = (lat,long) => {
    setData({
      ...data,
      latitude: lat,
      longitude: long,
    });
    console.log(data)
  };


  const registerFetch = async () => {
    const url = `${fetchURL}/api/auth/register`;

    try {
      const response = await axios.post(url, data);
      const dataFetched =response.data;
      navigation.navigate('Login');
    } catch (error) {
      console.warn(error);
    }
  };


    return(
        <View style={globalStyles.container}>

            <Image style={globalStyles.img} source={hireup}/>
            <View style={globalStyles.container3}>
            <ScrollView >
                <Text style={globalStyles.inputLabel}> Full Name</Text>
                <Input placeholder='Jhon Doe' value={data.name} setValue={handleName}/>
                <Text style={globalStyles.inputLabel}> Email</Text>
                <Input placeholder='Jhon@mail.com' value={data.email} setValue={handleEmail}/>
                <Text style={globalStyles.inputLabel}>Password</Text>
                <Input placeholder='Your password' secureTextEntry={true} value={data.password} setValue={handlePassword}/>
                <Text style={globalStyles.inputLabel}>Confirm Password</Text>
                <Input placeholder='Confirm password' secureTextEntry={true} value={data.password_confirmation} setValue={handlePasswordConfirmation}/>

                <Text style={globalStyles.inputLabel}>Phone Number</Text>
                <View style={{alignItems:'center'}}>
                  <PhoneInput defaultCode='LB' onChangeFormattedText={(text) => {handlePhoneNumber(text);}}/>
                </View>
                <Text style={globalStyles.inputLabel}>Location</Text>
                <View style={styles.container}>             
                <MapView  style={styles.map} initialRegion={{
                     latitude: 33.890536626710244,
                     longitude: 35.489303601542964,
                     latitudeDelta: 1.9,
                     longitudeDelta: 1.8,
                    }}
                    showsUserLocation={true}
                    provider="google">
                  
                </MapView>

            </View>
                <Button text='SIGN UP' onPress={registerFetch}/>
                <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                <View><Text style={globalStyles.loginSignup}>Already have an account? Login</Text></View>
                </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius:10,
        elevation:2,
        marginBottom:40,
        width:359,
        marginLeft:'auto',
        marginRight:'auto',
    },
    map: {
      width:330,
      height:320,
    },
  });