import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Input = ({value,setValue, placeholder,secureTextEntry}) => {
  return (
	<View style={styles.container}>
	  <TextInput
	  value={value}
	  onChangeText={setValue}
	   placeholder={placeholder} style={styles.input} 
	   secureTextEntry= {secureTextEntry} />
	</View>
  )
}

const styles = StyleSheet.create({
	container:{
		width:387,
        height:60,
		backgroundColor: "#FFF",
		borderRadius: 30,
		paddingHorizontal: 15,
		paddingVertical: 20,
        top:-300,
	}
})

export default Input;