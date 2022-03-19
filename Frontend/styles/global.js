import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        display:'flex',
        flex:1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent:'center',
    },
    img:{
        position:'relative',
        top:-300,
    },
    container2:{
        position:'absolute',
        paddingTop:100,
    },
    inputcontainer:{
		width:387,
        height:60,
		backgroundColor: "#FFF",
		borderRadius: 30,
		paddingHorizontal: 15,
		paddingVertical: 20,
	},
    label:{
        marginStart:10,
        marginBottom:5,
        fontWeight:'bold',
        color:'#5a5a5a'
    }
  });