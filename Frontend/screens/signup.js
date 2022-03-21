import React from 'react';
import {ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';
import Button from '../components/buttonLarge'


export default function Signup({navigation}){
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
                <Text style={globalStyles.label}>Location</Text>
                <View style={globalStyles.map}></View>
                <Button text='SIGN UP'/>
                <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                <View><Text style={globalStyles.loginSignup}>Already have an account? Login</Text></View>
         
                </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}
