import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/global';


const header = ({title}) => {
  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerTitle}>{title}</Text>
    </View>
  )
}

export default header