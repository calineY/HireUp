import { View, TextInput, StyleSheet, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/global';

const largeInput = ({value,setValue, placeholder,secureTextEntry,color='#fff'}) => {
  return (
	<View style={[globalStyles.largeinputcontainer,{backgroundColor: color}]}>
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry= {secureTextEntry}
            multiline={true} />
	</View>
  )
}



export default largeInput;