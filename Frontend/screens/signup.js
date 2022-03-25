import React from 'react';
import {ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';
import Button from '../components/buttonLarge'
import { useState } from 'react';
import PhoneInput from "react-native-phone-number-input";


import MapView, { Marker } from 'react-native-maps';



export default function Signup({navigation}){
    const [pin, setPin] = useState({
        latitude: 33.890536626710244,
        longitude: 35.489303601542964,
      });
      const [region, setRegion] = useState({
        latitude: 33.890536626710244,
        longitude: 35.489303601542964,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    return(
        <View style={globalStyles.container}>

            <Image style={globalStyles.img} source={hireup}/>
            <View style={globalStyles.container3}>
            <ScrollView >
                <Text style={globalStyles.label}> Full Name</Text>
                <Input placeholder='Jhon Doe'/>
                <Text style={globalStyles.label}> Email</Text>
                <Input placeholder='Jhon@mail.com'/>
                <Text style={globalStyles.label}>Password</Text>
                <Input placeholder='Your password' secureTextEntry={true}/>
                <Text style={globalStyles.label}>Confirm Password</Text>
                <Input placeholder='Confirm password' secureTextEntry={true}/>

                <Text style={globalStyles.label}>Phone Number</Text>
                <View style={{alignItems:'center'}}>
                  <PhoneInput />
                </View>
                <Text style={globalStyles.label}>Location</Text>
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
                        onDragStart={(e) => {
                            console.log("Drag start", e.nativeEvent.coordinate);
                          }}
                        onDragEnd={(e) => {
                          console.log("Drag end", e.nativeEvent.coordinate),
                          setPin({
                              latitude: e.nativeEvent.coordinate.latitude,
                              longitude: e.nativeEvent.coordinate.longitude,
                            });
                            setRegion({
                              latitude: e.nativeEvent.coordinate.latitude,
                              longitude: e.nativeEvent.coordinate.longitude,
                            });
                        }}
                        />
                </MapView>

            </View>
                <Button text='SIGN UP'/>
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