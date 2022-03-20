import React from 'react';
import {View, Image, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';
import Button from '../components/buttonLarge'

export default function Login(){
    return(
        <View style={globalStyles.container}>
            <Image style={globalStyles.img} source={hireup}/>
            <View style={globalStyles.container2}>
                <Text style={globalStyles.label}> Email</Text>
                <Input placeholder='Jhon@mail.com'/>
                <Text style={globalStyles.label}>Password</Text>
                <Input placeholder='Your password' secureTextEntry={true}/>
                <View style={globalStyles.margin}></View>
                <Button text='Login'/>
                <View><Text style={globalStyles.loginSignup}>Don't have an account? Sign Up</Text></View>
            </View>
        </View>
    )
}
