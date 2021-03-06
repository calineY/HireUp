import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
    },
    containerList: {
        paddingBottom:20,
        paddingHorizontal:10
    },
    img:{
        top:-200,
    },
    container2:{
        top:-208  
    },
    container3:{
        top:-200,
        height:475,
    },
    searchinput:{
        width:295,
        height:50,
		borderRadius: 30,
		paddingHorizontal: 15,
		paddingVertical: 10,
        elevation:2, 
    },
    inputcontainer:{
		
        height:50,
		borderRadius: 30,
		paddingHorizontal: 15,
		paddingVertical: 10,
        elevation:2,
	},
    largeinputcontainer:{
		width:360,
        height:100,
		borderRadius: 30,
		paddingHorizontal: 15,
		paddingVertical: 10,
        elevation:2,
	},
    label:{
        marginTop:10,
        fontWeight:'bold',
        color:'black',
        fontSize:20,
        marginBottom:20,
    },
    inputLabel:{
        marginTop:10,
        fontWeight:'bold',
        color:'black',
        fontSize:20,
        
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
        fontWeight:'bold',
        color:'#fff',
        textTransform:'uppercase',
    },
    bio:{
        backgroundColor:'#fff',
        width:360,
        borderRadius: 20,
        marginBottom:10,
        alignSelf:'center',
        padding:15,
        textAlignVertical:'center',
    },
    loginSignup:{
        marginStart:'auto',
        marginEnd:'auto',
        padding:10,
        color:'#33C47E',
    },
    margin:{
        height:60
    },
    screenContainer:{
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
    },
    header:{
        backgroundColor:'#33C47E',
        padding:45,
       
    },
    safeView:{
        backgroundColor:'#f1f1f1',
        flex:1,
    },
    freelancer:{
        backgroundColor:'#fff',
        width:360,
        borderRadius: 20,
		padding: 20,
        marginTop:12,
        marginBottom:12,
        alignSelf:'center',
        flexDirection:'row',
        elevation:2,
        alignItems:'center'
    },
    buttonSmall:{
        width:180,
        height:40,
		borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',
        elevation:2,
        margin:5,
    },
    headerTitle:{
        color:'rgba(255,255,255,0.99)',
         fontSize:19.5,fontWeight:'bold',
         position:'absolute',
         paddingTop:48,
         paddingStart:15
    },
    modalTitle:{
       fontSize:17,
       fontWeight:'bold',
       padding:10,
    },
    modalSubTitle:{
        fontSize:14,
        fontWeight:'bold',
        padding:10,
        color:'#5a5a5a'
     },
    loadingView:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        alignContent:'center',
        padding:200
    },
    errorLoginSignup:{
        top:-200,
        color:"red"
    },
    errorMessage:{
        alignSelf:"center",
        color:"red",
    }
  });