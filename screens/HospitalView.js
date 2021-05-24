import React, { useState, useEffect } from "react";
import { View, Text, Linking, SafeAreaView, Image, ScrollView, Button, TouchableOpacity, StatusBar } from "react-native";
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



  function goToScreen(screen, data) {
    navigation.navigate(screen, { randomCode: Math.random(), data })
  }




  console.log("?", props)

  const followCall = async () => {
    console.log("calling")
    await Linking.openURL(`tel: ${props.route.params.data.phone}`)
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
            <Text style={styles.dayWrapper2}>{props.route.params.data.name}</Text>
            <Text style={styles.nameWrapper}>{props.route.params.data.address}</Text>
          </View>
        </View>
        <View style={{
          backgroundColor: "white",
          height: 20, width: "100%", marginTop: -30, borderBottomLeftRadius: 40, borderBottomRightRadius: 40
        }}></View>
        <View style={{ alignItems: "center", alignContent: "center" }}>
          <View style={{ overflow: "hidden", marginTop: 40, borderRadius: 15, alignItems: "center", alignContent: "center", width: "90%", backgroundColor: "white" }}>
            <View style={{ flexDirection: "row", marginLeft: 0, marginTop: 10, alignItems: "flex-start", width: "100%" }}>
              <View style={{ flexDirection: "column", marginLeft: 20, marginTop: 10, alignItems: "flex-start", width: "80%" }}>
                <Text style={{ textAlign: "left", fontSize: 14, color: "#000", fontWeight: "bold" }}>Teléfono:</Text>
                <Text style={{ textAlign: "left", color: "#787878", fontSize: 10 }}>{props.route.params.data.phone}</Text>
              </View>
              <TouchableOpacity style={styles.fallow} onPress={() => followCall()} >
                <Icon name='phone-call-outline' width={25} height={25} fill="#5681FF" />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 40, marginTop: 10, marginBottom: 15, alignItems: "flex-start", width: "100%" }}>
              <Text style={{ textAlign: "left", fontSize: 14, color: "#000", fontWeight: "bold" }}>Paso a seguir:</Text>
              <Text style={{ textAlign: "left", color: "#787878", fontSize: 10 }}>1 - Dirijase al centro</Text>
              <Text style={{ textAlign: "left", color: "#787878", fontSize: 10 }}>2 - Llevar el carnet y documento de la empresa</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: "#5681FF", width: "100%", height: 36 }}>
              <Text style={{ lineHeight: 36, textAlign: "center", fontSize: 14, color: "#fff", fontWeight: "bold" }}>Descargar Orden</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <Footer />
    </View>
  )
}

export default HospitalesList;