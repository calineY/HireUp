import React, { useContext } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, FlatList,Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { homeStyles } from '../styles/homeStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { userContext } from '../context/userContext';
import fetchURL from '../fetchURL';
import { categoriesContext } from '../context/categoriesContext';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function Home({ navigation }) {
	const { authUser, setAuthUser } = useContext(userContext);

	
    //saving categories to fill dropdown menu in my profile screen
	const { categoriesArray, setCategoriesArray } = useContext(categoriesContext);
	const token = authUser.access_token;

	useEffect(() => {
		getCategories();

		//optional location update
		(async () => {
			if (Platform.OS === 'android' && !Constants.isDevice) {
			  setErrorMsg(
				'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
			  );
			  return;
			}
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
			  setErrorMsg('Permission to access location was denied');
			  
			}else{
			  try{
				let location=await Location.getCurrentPositionAsync({}).then((value)=>{
				setAuthUser((oldState)=>{const newUser = oldState.user
					newUser.latitude = value.coords.latitude
					newUser.longitude=value.coords.longitude; 
					const newState={...oldState,user:newUser}
					return newState})
			  });
			  updateLocation();
			  }catch(err){
				console.log("Location not updated.")
			}
			}
		  })();
	}, []);
	 
	const getCategories = async () => {
		const url = `${fetchURL}/api/user/getcategories`;
		try {
			const response = await axios.get(url, {
				headers: { Authorization: `Bearer ${token}` }
			});
			const dataFetched = response.data;
			setCategoriesArray(dataFetched);
			setCategories(dataFetched);
		} catch (error) {
			console.log(error);
		}
	};

	const updateLocation = async () => {
		const url = `${fetchURL}/api/user/profile`;
		const body={name:authUser.user.name, latitude:authUser.user.latitude,longitude:authUser.user.longitude}
		try {
			const response = await axios.post(url, body,{
				headers: { Authorization: `Bearer ${token}` }
			});
			const dataFetched = response.data;
			console.log(dataFetched)
		} catch (error) {
			console.log(error);
		}
	};

	const [ categories, setCategories ] = useState();

	return (
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
					<TouchableOpacity
						style={homeStyles.touchableOpacity}
						onPress={() => navigation.navigate('Freelancers', item)}
					>
						<View style={homeStyles.view}>
							<LinearGradient
								colors={[ 'rgba(0,0,0,0)', 'rgba(0,0,0,0.7)' ]}
								style={homeStyles.linearGradient}
							>
								<Image style={homeStyles.image} source={{ uri: `${fetchURL}/${item.picture_url}` }} />
							</LinearGradient>
							<Text style={homeStyles.text}>{item.name}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
