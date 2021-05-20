import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, ScrollView, Button, TouchableOpacity, StatusBar } from "react-native";
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import Header from '../components/header.js';
import Footer from '../components/footer.js';
import BotonDouble from '../components/BotonDouble.js';



function HospitalesList(props) {
  const [location, setlocation] = useState(null);
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [HospilaesList, setHospilaesList] = useState([]);
  const [Filter, setFilter] = useState(1);
  const { navigation } = props




  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }
  useEffect(() => {
    Geolocation.getCurrentPosition(info => setlocation(info));
    getHospitales();
  }, [randomCode]);
  useEffect(() => {
    console.log("effect: ", location)
    if (location === null) { console.log("not coords get") }
    else {
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
    }
  }, [location]);


  async function getHospitales() {
    //  https://app.chseguros.com.co/api/get-coordenadas/10/36
    //  https://app.chseguros.com.co/api/get-coordenadas/6.1524306/-75.6230735
    await axios.get(`https://app.chseguros.com.co/api/get-coordenadas/${Latitude}/${Longitude}`).then(function (response) {
      setHospilaesList(response.data)
    })
      .catch(function (error) { console.log(error) })
      .then(function () { });
  }



  console.log("HospilaesList: ", HospilaesList);
  function getFilter(e) {
    setFilter(e);
  }



  function goToScreen(screen,data) {
    navigation.navigate(screen, { randomCode: Math.random(),data })
  }
  







  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff"
        barStyle="dark-content" />
      <ScrollView>
        <View style={styles.headerWrapper}>
         

        <Header
        //foto={foto}
        return="Siniestros" props={props} />

          <View style={styles.greatingWrapper}>
            <Text style={styles.dayWrapper2}>Centros de atención ({HospilaesList.length})</Text>
            <Text style={styles.nameWrapper}>Elige un centro de atención medico cercano</Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>



          <BotonDouble F={Filter} value={1} line1='Ordenar' line2='mas cercanos' icon='pin' img={'./../assets/Img/segu.png'} color='#0af0817d' function={getFilter} />
         
         
         
          <BotonDouble F={Filter} value={2} line1='Ordenar' line2='alfabeticamente' icon='bar-chart-2-outline' img={'./../assets/Img/segu.png'} color='#0af0817d' function={getFilter} />

          {/* <BotonDouble F={Filter} value={3} line1='Otros' line2='' icon='question-mark-outline' img={'./../assets/Img/segu.png'} color='#0af0817d' function={getFilter} />
     */}

        </View>


        <View style={{ alignContent: "center", alignItems: "center" }}>
          {
            Filter !== 0 &&
            HospilaesList.length > 0 &&
            HospilaesList.map((i, key) => {
              return (
                <TouchableOpacity key={key} onPress={()=> goToScreen('HospitalView',i)}
                //onPress={() => { navigate() }}
                  style={{ marginBottom: 15, paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row", backgroundColor: "white", width: "90%", borderRadius: 15 }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 14, color: "black", lineHeight: 20, fontWeight: "700" }}>{i.name}</Text>
                    <Text style={{ fontSize: 10, color: "#787878", fontWeight: "400", }}>{i.address}</Text>
                    <Text style={{ fontSize: 10, color: "#787878", fontWeight: "400", }}>Distancia: {i.distance} KM</Text>
                  </View>
                  <View style={{ position: "absolute", right: 10, top: 20 }}>
                    <Icon name='arrow-right' fill='#849DF7' height={30} width={30} />
                  </View>
                </TouchableOpacity>
              )
            })
          }
          {
            HospilaesList.length == 0 &&
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 14, color: "black", lineHeight: 20, fontWeight: "700" }}>vacio</Text>
            </View>
          }
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <Footer />
    </View>
  )
}

export default HospitalesList;