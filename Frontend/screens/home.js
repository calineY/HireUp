import React, { useContext } from 'react';
import {Text, View, Image,ImageBackground , TouchableOpacity,FlatList} from 'react-native';
import { globalStyles } from '../styles/global';
import {homeStyles} from '../styles/homeStyles'
import { LinearGradient } from 'expo-linear-gradient';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { userContext } from '../context/userContext';
import fetchURL from '../fetchURL';
import { categoriesContext } from '../context/categoriesContext';




export default function Home({navigation}){
    const { authUser, setAuthUser } = useContext(userContext);
    const { categoriesArray, setCategoriesArray } = useContext(categoriesContext);

    const token=authUser.access_token;
    useEffect(() => {
        getCategories();
      }, []);
    const getCategories = async () => {
        const url = `${fetchURL}/api/user/getcategories`;
        try {
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const dataFetched =response.data;
          setCategoriesArray(dataFetched);
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
                            <Image style={homeStyles.image} source={{uri:`${fetchURL}/${item.picture_url}`}}/>
                        </LinearGradient>
                        <Text style={homeStyles.text}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
            />
        </View> 
       
       )
    }
    