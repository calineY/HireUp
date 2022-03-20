import React from 'react';
import {Text, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/input';

export default function Home(){
    return(
        <SafeAreaView style={globalStyles.safeView}>
            <View style={globalStyles.header}>
                <Input placeholder='Search'/>
            </View>
            <View style={globalStyles.screenContainer}>
                <Text style={globalStyles.label}>Choose your marketplace</Text>
            </View>
        </SafeAreaView> 
       
    )
}
