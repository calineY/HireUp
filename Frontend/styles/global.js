import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        // justifyContent:'center',
    },
    containerList: {
        paddingBottom:20,
        paddingHorizontal:10
    },
    img:{
        top:-200,
    },
    container2:{
        top:-200  
    },
    container3:{
        
        top:-200,
        height:500,
        
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
        color:'#5a5a5a',
        fontSize:20
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
    bio:{
        backgroundColor:'#fff',
        width:360,
        borderRadius: 30,
        marginBottom:10,
        alignSelf:'center',
        padding:10,
        textAlignVertical:'center',
    },
    loginSignup:{
        marginStart:'auto',
        marginEnd:'auto',
        padding:10,
        color:'#33C47E',
    },
    margin:{
        marginBottom:20,
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
        borderRadius: 30,
		padding: 20,
        marginTop:12,
        marginBottom:12,
        alignSelf:'center',
        flexDirection:'row',
        elevation:2,
    },
    buttonSmall:{
        width:180,
        height:40,
		borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',
        elevation:2,
        margin:5,
    }
  });