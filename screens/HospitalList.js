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
import _ from 'lodash';


function HospitalesList(props) {
  console.log('screen hospitales list')
  const { navigation } = props
  const [location, setlocation] = useState(null);
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [Load, setLoad] = useState(true);




  const [HospitalesList, setHospitalesList] = useState(null);
  const [HospitalesOrderName, setHospitalesOrderName] = useState(null);
  const [HospitalesOrderDistance, setHospitalesOrderDistance] = useState(null);
  const [HospitalesPrint, setHospitalesPrint] = useState(null);
  const [Filter, setFilter] = useState(1);
  const [data, setdata] = useState(null)


  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }



  useEffect(() => {
    Geolocation.getCurrentPosition(info => setlocation(info));
    getHospitales();
    setdata(props.route.params.data)
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
    await axios.get(`https://app.chseguros.com.co/api/get-coordenadas/${Latitude}/${Longitude}`).then(function (response) {
      setHospitalesList(response.data)
    })
      .catch(function (error) { console.log(error) })
      .then(function () { });
  }




  useEffect(() => {
    if (HospitalesList !== null) {
      setHospitalesPrint(HospitalesList);
      setHospitalesOrderDistance(_.orderBy(HospitalesList, ['distance'], ['ASC']));
      setHospitalesOrderName(_.orderBy(HospitalesList, ['name'], ['ASC']));
      setLoad(false);
    }

  }, [HospitalesList])

  function getFilter(e) {
    setFilter(e);
    setLoad(true);
    if (Filter === 1) { setHospitalesPrint(HospitalesOrderDistance); }
    if (Filter === 2) { setHospitalesPrint(HospitalesOrderName); }
    setLoad(false);
  }

  function goToScreen(data,send) {
    let screen = "HospitalView";
    let back = "HospitalList";
    navigation.navigate(screen, { randomCode: Math.random(), data, back,send })
  }


  function getHospital(i) {
    let hospital = i.id;
    data.hospital_id = hospital;
    console.log("ultima data: ", data);
    goToScreen(i,data)
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
            {!Load && HospitalesPrint !== null &&
              <Text style={styles.dayWrapper2}>Centros de atención ({HospitalesPrint.length})</Text>}

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
          {/* <BotonDouble F={Filter} value={3} line1='Otros' line2='' icon='question-mark-outline' img={'./../assets/Img/segu.png'} color='#0af0817d' function={getFilter} />*/}
        </View>
        <View style={{ alignContent: "center", alignItems: "center" }}>
          {
            HospitalesPrint !== null && !Load &&
            HospitalesPrint.map((i, key) => {
              return (
                <TouchableOpacity key={key} onPress={() => getHospital(i)}
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
            HospitalesPrint == null && !Load &&
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