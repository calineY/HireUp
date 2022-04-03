import { View, TextInput, StyleSheet, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/global';

const Input = ({value,setValue, placeholder,secureTextEntry,color='#fff',keyboardType="default"}) => {
  return (
	<View style={[globalStyles.inputcontainer,{backgroundColor: color}]}>
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry= {secureTextEntry}
            keyboardType={keyboardType} />
	</View>
  )
}



export default Input;