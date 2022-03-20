import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent:'center',
    },
    containerList: {
        paddingBottom:20,
    },
    img:{
        position:'relative',
        top:-300,
    },
    container2:{
        position:'absolute',
        paddingTop:230,
    },
    container3:{
        position:'absolute',
        top:400,
        height:400,
    },
    inputcontainer:{
		width:360,
        height:50,
		backgroundColor: "#FFF",
		borderRadius: 30,
		paddingHorizontal: 15,
		paddingVertical: 10,
        elevation:2,
	},
    label:{
        marginStart:10,
        marginTop:10,
        marginBottom:5,
        fontWeight:'bold',
        color:'#5a5a5a'
    },
    buttonLarge:{
        width:360,
        height:50,
		backgroundColor: "#33C47E",
		borderRadius: 30,
		paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent:'center',
        elevation:2,
    },
    buttonText:{
        marginStart:10,
        marginBottom:5,
        fontWeight:'bold',
        color:'#fff',
        textTransform:'uppercase',
    },
    map:{
        backgroundColor:'#fff',
        width:360,
        height:50,
        borderRadius: 30,
		paddingHorizontal: 15,
        paddingVertical:100,
        marginBottom:50,
    },
    loginSignup:{
        marginStart:'auto',
        marginEnd:'auto',
        padding:10,
        color:'#33C47E',
    },
    margin:{
        marginBottom:200,
    },
    screenContainer:{
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
    },
    header:{
        backgroundColor:'#33C47E',
        padding:20,
        elevation:5,
    },
    safeView:{
        backgroundColor:'#f1f1f1',
        flex:1,
    },
    freelancer:{
        backgroundColor:'#fff',
        width:360,
        height:50,
        borderRadius: 30,
		paddingHorizontal: 15,
        paddingVertical:100,
        marginTop:20,
        elevation:2,
    },
    freelancer:{
        backgroundColor:'#fff',
        width:360,
        borderRadius: 30,
		padding: 20,
        marginTop:12,
        marginBottom:12,
        alignSelf:'center',
        flexDirection:'row',
        elevation:2,
    }
  });