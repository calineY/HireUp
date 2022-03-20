import React from 'react';
import {ScrollView, View, Image, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';
import Button from '../components/buttonLarge'

export default function Signup(){
    return(
        <View style={globalStyles.container}>
            <Image style={globalStyles.img} source={hireup}/>
            <ScrollView style={globalStyles.container3}>
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
                <View><Text style={globalStyles.loginSignup}>Already have an account? Login</Text></View>
            </ScrollView>
        </View>
    )
}
