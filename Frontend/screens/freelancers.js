import { View, Text,FlatList, TouchableOpacity,Image,Alert  } from 'react-native'
import React, { useContext } from 'react';
import { globalStyles } from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState,useEffect } from 'react';
import { userContext } from '../context/userContext';
import axios from 'axios';
import Freelancer from '../components/freelancer';
import fetchURL from '../fetchURL';
import Search from '../components/search';




export default function Freelancers({route,navigation}){
  const { authUser, setAuthUser } = useContext(userContext)
  const token=authUser.access_token;

  useEffect(() => {
      getFreelancers();
  }, []);

  const body={category_id:route.params.id};

    const getFreelancers = async () => {
        const url = `${fetchURL}/api/user/getfreelancers`;
        try {
          const response = await axios.post(url,body,
          {
            headers: { Authorization: `Bearer ${token}` },
          });
          const dataFetched =response.data;
            setFreelancers(dataFetched.freelancers);
            setFilteredFreelancers(dataFetched.freelancers);
        } catch (error) {
          console.warn(error);
        }
      };
    const [freelancers,setFreelancers]=useState([]);
    const [filteredFreelancers,setFilteredFreelancers]=useState();



    const searchList = (val)=>{
      if(val && freelancers){
      var new_freelancers = freelancers.filter(function (el){
        return el.name.toLowerCase().includes(val.toLowerCase())||el.title.toLowerCase().includes(val.toLowerCase());
      });
      setFilteredFreelancers(new_freelancers);
      
      }else{
        setFilteredFreelancers(freelancers);
      }
      
    }

    return(
        <SafeAreaView style={globalStyles.safeView}>
          <View style={{flexDirection:"row",alignSelf:'center',marginBottom:10}}>
            <View style={{flex:0.85}}>
            <Search placeholder='Search' setValue={(val)=>searchList(val)}/>
            </View>
            <TouchableOpacity onPress={toggleBottomNavigationView}>
            <View style={{backgroundColor:'#fff',height:50,width:50,alignItems:'center',justifyContent:"center",borderRadius:30,elevation:2}}>
              <AntDesign name="filter" size={37} color="grey"/>
            </View>
            </TouchableOpacity>
          </View>
            <FlatList
                data={filteredFreelancers}
                key={(item) => item.id}
                style={globalStyles.containerList}
                renderItem={({ item }) => (
                <Freelancer name={item.name} rate={item.rate_per_hour} latitude={item.latitude} longitude={item.longitude} title={item.title} picture={item.picture_url} navigation={navigation} item={item} item_id={item.user_id}/>
        )}
      />
      <BottomSheet
            visible={visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleBottomNavigationView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
          >
            <View style={styles.bottomNavigationView}>
                <Text style={globalStyles.modalTitle}>Filter</Text>
                <View style={{flexDirection:"row",alignSelf:'center'}}>
                  <View style={{flex:0.8,alignItems:'center'}}>
                    <Text style={globalStyles.modalSubTitle}>Max. rate ($/hour)</Text>
                    <Input color='#f1f1f1' placeholder='' keyboardType="numeric" width={130} setValue={(value)=>setMaxRate(value)}/>
                  </View>
                  <View style={{flex:0.8,alignItems:'center'}}>
                    <Text style={globalStyles.modalSubTitle}>Max. distance (km)</Text>
                    <Input color='#f1f1f1' placeholder='' keyboardType="numeric" width={130} setValue={(value)=>setMaxDistance(value)}/>
                  </View>
                </View>
      
                <View style={{flexDirection:"row",alignItems:'center',marginTop:40,alignSelf:'center'}}>
                  <SmallButton color="#7C9BC9" text="Reset"  onPress={()=>{setFilteredFreelancers(freelancers);toggleBottomNavigationView()}}/>
                  <SmallButton color="#33C47E" text="Apply" onPress={()=>{filter(max_rate,max_distance);toggleBottomNavigationView()}}/>
                </View>
              </View>
          </BottomSheet>
        </SafeAreaView> 
    )
}