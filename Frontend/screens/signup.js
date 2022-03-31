import React from 'react';
import {ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';
import Button from '../components/buttonLarge'
import { useState } from 'react';
import PhoneInput from "react-native-phone-number-input";
import axios from 'axios';
import fetchURL from '../fetchURL';



import MapView, { Marker } from 'react-native-maps';



export default function Signup({navigation}){
  

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

    const [pin, setPin] = useState({
      latitude: 33.89020967953036,
      longitude: 35.76620947569609,
      });
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
                  <PhoneInput defaultCode='LB' onChangeFormattedText={(text) => {handlePhoneNumber(text); console.log(data.phone_number)}}/>
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
                    <Marker coordinate={pin}
                        draggable={true}
                        onDragEnd={(e) => {
                          console.log("Drag end", e.nativeEvent.coordinate),
                          setPin({
                              latitude: e.nativeEvent.coordinate.latitude,
                              longitude: e.nativeEvent.coordinate.longitude,
                            });
                          handleLocation( e.nativeEvent.coordinate.latitude,
                            e.nativeEvent.coordinate.longitude);
                        }}
                        />
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