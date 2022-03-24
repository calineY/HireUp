import React from 'react';
import {Text, View, Image,ImageBackground , TouchableOpacity,FlatList} from 'react-native';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/input';
import Button from '../components/buttonLarge'
import design from '../assets/design.jpg'
import technology from '../assets/technology.jpg'
import education from '../assets/education.jpg'
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';



export default function Home({navigation}){
    const [categories,setCategories]=useState([
        {
            id: 1,
            name: 'Design',
            image:design
          },
          {
            id: 2,
            name: 'Technology',
            image:technology
          },
          {
            id: 3,
            name: 'Education',
            image:education
          },
        ]);
    return(
        <SafeAreaView style={globalStyles.safeView}>
            <View style={globalStyles.screenContainer}>
                <Text style={globalStyles.label}>Choose your marketplace</Text>
            </View>
            <View style={{marginTop: 20}}/>
            <FlatList
                data={categories}
                key={(item) => item.id}
                numColumns={2}
                style={globalStyles.containerList}
                renderItem={({ item }) => (
                <TouchableOpacity style={{flex:1, alignItems:'flex-start',marginBottom:20}} onPress={()=> navigation.navigate("Freelancers")}>
                    <View  style={{marginHorizontal:15,justifyContent: 'flex-end', alignItems: 'center'}}>
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={{borderRadius:20}}>
                            <Image style={{width:170,height:170,borderRadius:20, zIndex:-1}} source={item.image}/>
                        </LinearGradient>
                        <Text style={{position:'absolute', fontSize:18, color:'white',paddingBottom:10}}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
            />
        </SafeAreaView> 
       
       )
    }
    