import React from 'react';
import {Text, View, Image,ImageBackground , TouchableOpacity,FlatList} from 'react-native';
import { globalStyles } from '../styles/global';
import {homeStyles} from '../styles/homeStyles'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState,useEffect } from 'react';
import axios from 'axios';



export default function Home({navigation}){
    const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuMjMxOjgwMDBcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDg1MDY1NjYsImV4cCI6MTY0OTExMTM2NiwibmJmIjoxNjQ4NTA2NTY2LCJqdGkiOiJiSlluZXJZd0VJM3RFczF5Iiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.cvKYw08i_Rpzmb9dHwNqDFdUDUBG1rPT9mF_VltZy40";
    useEffect(() => {
        getCategories();
      }, []);
    const getCategories = async () => {
        const url = "http://192.168.1.231:8000/api/user/getcategories";
        try {
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const dataFetched =response.data;
            setCategories(dataFetched);
        } catch (error) {
          console.warn(error);
        }
      };
      
    const [categories,setCategories]=useState();
     
    return(
        <View style={globalStyles.safeView}>
            <View style={globalStyles.screenContainer}>
                <Text style={globalStyles.label}>Choose your marketplace</Text>
            </View>
            <FlatList
                data={categories && categories.categories}
                key={(item) => item.id}
                numColumns={2}
                style={globalStyles.containerList}
                renderItem={({ item }) => (
                <TouchableOpacity style={homeStyles.touchableOpacity} onPress={()=> navigation.navigate("Freelancers",item)}>
                    <View style={homeStyles.view}>
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={homeStyles.linearGradient}>
                            <Image style={homeStyles.image} source={{uri:`http://192.168.1.231:8000/${item.picture_url}`}}/>
                        </LinearGradient>
                        <Text style={homeStyles.text}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
            />
        </View> 
       
       )
    }
    