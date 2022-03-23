import React from 'react';
import {Text, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/input';
import Button from '../components/buttonLarge'

export default function Home({navigation}){
    return(
        <SafeAreaView style={globalStyles.safeView}>
            <View style={globalStyles.header}>
                <Input placeholder='Search'/>
            </View>
            <View style={globalStyles.screenContainer}>
                <Text style={globalStyles.label}>Choose your marketplace</Text>
            </View>
            <Button text='Go to freelancers' onPress={()=> navigation.navigate("Freelancers")}/>
        </SafeAreaView> 
       
    )
}
