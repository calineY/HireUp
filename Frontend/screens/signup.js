import React, { useEffect } from 'react';
import {ScrollView, View, Image, Text, TouchableOpacity, StyleSheet,Platform,Alert} from 'react-native';
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
import MapView from 'react-native-maps';
import { signupStyles } from '../styles/signupStyle';


export default function Signup({navigation}){
  const [errorMsg, setErrorMsg] = useState(null);

  //getting user geolocation after permission
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
        
      }else{
        try{
          let location=await Location.getCurrentPositionAsync({}).then((value)=>{
          setLatitude( value.coords.latitude);
          setLongitude(value.coords.longitude);
        });
        }catch{
        Alert.alert("Turn on location to be able to register.")
        navigation.navigate("Login");
      }
      }
    })();
  }, []);

 
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [password_confirmation,setPasswordConfirmation]=useState("");
  const [phone_number,setPhoneNumber]=useState("");
  const [latitude,setLatitude]=useState();
  const [longitude,setLongitude]=useState();


  const registerFetch = async () => {
    //validation
    if (!name || !email || !password || !password_confirmation || !phone_number) {
			setErrorMsg('Please fill all fields.');
			return;
		}
    if (!latitude || !longitude ) {
			setErrorMsg('Please turn on location access to register.');
			return;
		}
		if (
			!email
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			setErrorMsg('Invalid email.');
			return;
		}
		if (password.length < 6) {
			setErrorMsg('Password should be minimum 6 characters.');
			return;
		}
    if(password!=password_confirmation){
      setErrorMsg("Password and password confirmation don't match.");
			return;
    }
    if (phone_number.length < 10) {
			setErrorMsg('Phone number is too short.');
			return;
		}
    //api call after validation
    const url = `${fetchURL}/api/auth/register`;
    const data={
      name,
      email,
      password,
      password_confirmation,
      phone_number,
      latitude,
      longitude
    }
    try {
      const response = await axios.post(url, data);
      navigation.navigate('Login');
    } catch (error) {
      console.warn(error);
    }
  };


    return(
    <View style={globalStyles.container}>

      <Image style={globalStyles.img} source={hireup}/>
      <Text style={globalStyles.errorLoginSignup}>{errorMsg}</Text>
      <View style={globalStyles.container3}>
      <ScrollView >
          <Text style={globalStyles.inputLabel}> Full Name</Text>
          <Input placeholder='Jhon Doe' value={name} setValue={setName}/>
          <Text style={globalStyles.inputLabel}> Email</Text>
          <Input placeholder='Jhon@mail.com' value={email} setValue={setEmail}/>
          <Text style={globalStyles.inputLabel}>Password</Text>
          <Input placeholder='Your password' secureTextEntry={true} value={password} setValue={setPassword}/>
          <Text style={globalStyles.inputLabel}>Confirm Password</Text>
          <Input placeholder='Confirm password' secureTextEntry={true} value={password_confirmation} setValue={setPasswordConfirmation}/>
          <Text style={globalStyles.inputLabel}>Phone Number</Text>
          <View style={{alignItems:'center'}}>
            <PhoneInput defaultCode='LB' onChangeFormattedText={(text) => {setPhoneNumber(text);}}/>
          </View>
          <Text style={globalStyles.inputLabel}>Location</Text>
          <View style={signupStyles.container}>             
          <MapView  style={signupStyles.map} initialRegion={{
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