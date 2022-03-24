import React from 'react';
import {Text, View, Image,ImageBackground , TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/input';
import Button from '../components/buttonLarge'
import design from '../assets/design.jpg'
import { LinearGradient } from 'expo-linear-gradient';


export default function Home({navigation}){
    return(
        <SafeAreaView style={globalStyles.safeView}>
            <View style={globalStyles.header}>
            </View>
            <View style={globalStyles.screenContainer}>
                <Text style={globalStyles.label}>Choose your marketplace</Text>
            </View>
            {/* <Button text='Go to freelancers' onPress={()=> navigation.navigate("Freelancers")}/>*/}
            <View style={{marginTop: 20}}/>
            <TouchableOpacity style={{flex:1, justifyContent:'flex-start', alignItems:'flex-start'}}>
                <View  style={{marginHorizontal:15,justifyContent: 'flex-end', alignItems: 'center' }}>
                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.25)']} style={{borderRadius:20}}>
                        <Image style={{width:175,height:175,borderRadius:20, zIndex:-1}} source={design}/>
                    </LinearGradient>
                    <Text style={{position:'absolute', fontSize:20, color:'white',paddingBottom:10}}>Design</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView> 
       
       )
    }
    