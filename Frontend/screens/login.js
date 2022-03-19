import React from 'react';
import {TextInput, View, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';

export default function Login(){
    return(
        <View style={globalStyles.container}>
            <Image style={globalStyles.img} source={hireup}/>
            <Input/>
        </View>
    )
}
