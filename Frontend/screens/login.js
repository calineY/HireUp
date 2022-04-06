import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import hireup from '../assets/hireup.png';
import Input from '../components/input';
import Button from '../components/buttonLarge';
import { useState } from 'react';
import axios from 'axios';
import { userContext } from '../context/userContext';
import fetchURL from '../fetchURL';

export default function Login({ navigation }) {
	const { authUser, setAuthUser } = useContext(userContext);
	const [ error, setError ] = useState('');
	const [ data, setData ] = useState({
		email: '',
		password: ''
	});

	const handleEmail = (value) => {
		setData({
			...data,
			email: value
		});
	};
	const handlePassword = (value) => {
		setData({
			...data,
			password: value
		});
	};

	const loginFetch = async () => {
    //validating email an password
		if (!data.email || !data.password) {
			setError('Please fill all fields.');
			return;
		}
		if (
			!data.email
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			setError('Invalid email.');
			return;
		}
		if (data.password.length < 6) {
			setError('Password should be minimum 6 characters.');
			return;
		}
    //api call after validation
		const url = `${fetchURL}/api/auth/login`;
		try {
			const response = await axios.post(url, data);
			const dataFetched = response.data;
			setAuthUser(dataFetched);
		} catch (error) {
			setError("Account doesn't exist.");
		}
	};

	return (
		<View style={globalStyles.container}>
			<Image style={globalStyles.img} source={hireup} />
			<Text style={globalStyles.errorLoginSignup}>{error}</Text>
			<View style={globalStyles.container2}>
				<Text style={globalStyles.inputLabel}> Email</Text>
				<Input placeholder="Jhon@mail.com" value={data.email} setValue={handleEmail} />
				<Text style={globalStyles.inputLabel}>Password</Text>
				<Input placeholder="Your password" secureTextEntry={true} value={data.password} setValue={handlePassword}/>
				<View style={globalStyles.margin} />
				<Button text="Login" onPress={loginFetch} />
				<TouchableOpacity onPress={() => navigation.navigate('Register')}>
					<Text style={globalStyles.loginSignup}>Don't have an account? Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
