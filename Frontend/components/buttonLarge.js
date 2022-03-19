import React from 'react'
import { globalStyles } from '../styles/global';
import { TouchableOpacity, Text, View } from 'react-native';

export default function FlatButton({text,onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={globalStyles.buttonLarge}>
                <Text style={globalStyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}