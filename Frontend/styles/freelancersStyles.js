import { StyleSheet} from 'react-native';

export const freelancersStyles = StyleSheet.create({
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 300,
        padding:10,
        borderTopEndRadius:20,
        borderTopStartRadius:20
      },
      filtercontainer:{
        flexDirection:"row",
        alignSelf:'center'
      },
      filterinput:{
        flex:0.8,
        alignItems:'center'
      },
      filterbuttons:{
        flexDirection:"row",
        alignItems:'center',
        marginTop:40,
        alignSelf:'center'
      },
      search_filter:{
        flexDirection:"row",
        alignSelf:'center',
        marginBottom:10
      },
      search:{
        flex:0.85
      },
      filter:{
        backgroundColor:'#fff',
        height:50,
        width:50,
        alignItems:'center',
        justifyContent:"center",
        borderRadius:30,
        elevation:2
      }
});