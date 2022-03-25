import React from 'react'
import { globalStyles } from '../styles/global';
import { TouchableOpacity, Text, View } from 'react-native';

export default function Button({text,onPress,color}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[globalStyles.buttonSmall,{backgroundColor: color}]}>
                <Text style={globalStyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}