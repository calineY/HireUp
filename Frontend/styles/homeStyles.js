import { StyleSheet} from 'react-native';

export const homeStyles = StyleSheet.create({
    touchableOpacity:{
        flex:1,
        marginBottom:20
    },
    view:{
        justifyContent: 'flex-end', 
        alignItems: 'center'
    },
    linearGradient:{
        borderRadius:20
    },
    image:{
        width:170,
        height:170,
        borderRadius:20,
        zIndex:-1
    },
    text:{
        position:'absolute',
        fontSize:18, 
        color:'white',
        paddingBottom:10
    }
});