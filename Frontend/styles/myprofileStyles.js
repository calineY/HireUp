import { StyleSheet} from 'react-native';

export const myprofileStyles = StyleSheet.create({
    mainView:{
        marginBottom:70
    },
    innerView:{
        alignContent:"center",
        flex:1,
         padding:30
    },
    headerView:{
        flexDirection:"row"
    },
    imageView:{
        width:100,
        height:100,
        borderRadius:100,
        marginBottom:5,
        elevation:4
    },
    image:{
        width:100,
        height:99,
        borderRadius:100,
        marginBottom:5
    },
    name:{
        fontSize: 28, fontWeight: "bold" 
    },
    noProfile:{
        backgroundColor:'#fff',
        width:360,
        borderRadius: 20,
        marginBottom:10,
        alignSelf:'center',
        padding:90,
        textAlign:'center'
    }
});