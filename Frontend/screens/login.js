import React from 'react';
import {View, Image, Text,TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';
import Button from '../components/buttonLarge'
import {useState} from 'react';
import axios from 'axios';


export default function Login({navigation}){
    const [data, setData] = useState({
        email: "",
        password: "",
      });
    
      const handleEmail = (value) => {
        setData({
          ...data,
          email: value,
        });
      };
      const handlePassword = (value) => {
        setData({
          ...data,
          password: value,
        });
      };

      const loginFetch = async () => {
        const url = "http://192.168.1.9:8000/api/auth/login";
    
        try {
          const response = await axios.post(url, data);
          const dataFetched = await response.data;
          console.warn(dataFetched);
        } catch (error) {
          console.warn("error");
        }
      };

    return(
       
        <View style={globalStyles.container}>
             
            <Image style={globalStyles.img} source={hireup}/>
            <View style={globalStyles.container2}>
                <Text style={globalStyles.label}> Email</Text>
                <Input placeholder='Jhon@mail.com' value={data.email} setValue={handleEmail}/>
                <Text style={globalStyles.label}>Password</Text>
                <Input placeholder='Your password' secureTextEntry={true} value={data.password} setValue={handlePassword}/>
                <View style={globalStyles.margin}></View>
                <Button text='Login' onPress={loginFetch}/>
                <TouchableOpacity onPress={()=> navigation.navigate("Register")}>
                <View><Text style={globalStyles.loginSignup}>Don't have an account? Sign Up</Text></View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
