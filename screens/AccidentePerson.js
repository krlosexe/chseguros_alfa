import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import CardTriple from '../components/CardTriple.js';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage'

function Movilidad(props) {
  console.log('screen accidente personal')
  const { navigation } = props
  const [Load, setLoad] = useState(false)
  const [foto, setfoto] = useState('')
  const [fontsLoaded, setfontsLoaded] = useState(false)
  const [polizas, setpolizas] = useState([])
  const [bind, setbind] = useState([])
  const [user_id, setuser_id] = useState('')
  const [client_id, setclient_id] = useState('')
  const [ncompleto, setncompleto] = useState('')
  const [documento, setdocumento] = useState('')
  const [asociados, setasociados] = useState(null)

  useEffect(() => {
    setLoad(true)
    console.log("effect")
    _retrieveData();
  }, [])

  useEffect(() => {
    GetAsociados(client_id)
   // noGetAsociados(client_id)
  }, [client_id])

  // this._retrieveData = this._retrieveData.bind(this)
 // this.GetAsociados = this.GetAsociados.bind(this)
  // static navigationOptions = {
  //   title: '',
  //   headerShown: false,
  // };
  //   componentDidMount() {
  //     this._loadAssetAsync()
  //     this._retrieveData()
  //     this.onPressPoliza()
  // this.GetAsociados()

  //   }

  function goToScreenNew(screen) {
    navigation.navigate(screen, { randomCode: Math.random()})
  }


  function goToScreen(screen,data) {
   let back = "AccidentePerson"
    navigation.navigate(screen, { randomCode: Math.random(), data, back })
  }

  async function _retrieveData() {
    try {
      const ncompleto = await AsyncStorage.getItem('ncompleto');
      const client_id = await AsyncStorage.getItem('client_id');
      const user_id = await AsyncStorage.getItem('user_id');
      const documento = await AsyncStorage.getItem('documento');
      const foto = await AsyncStorage.getItem('foto');
      if (ncompleto !== null) {
        setncompleto(ncompleto)
        setclient_id(client_id)
        setuser_id(user_id)
        setdocumento(documento)
        setfoto(foto)
      }
    } catch (error) {
    }
  }


  const noGetAsociados = async () => {
    const { data } = axios.get(`http://app.chseguros.com.co/api/policies/accidentes/personales/${client_id}`).then(res => {
      console.log("no asoc: ", res)
    })
    // axios.get(`http://app.chseguros.com.co/api/policies/accidentes/personales/${client_id}`).then(res => {
    //   asoc = res.data;
    // }).catch(error => {
    //   console.log("error: ", error)
    // })
    console.log("asoc: ", data)
  }

  async function GetAsociados(client_id) {
    let value
    let tester = 405
    console.log(client_id)
    await axios.get(`http://app.chseguros.com.co/api/policies/accidentes/personales/${tester}`).then(function (response) {
      value = response.data
    })
      .catch(function (error) {
        value = error
      })
      .then(function () { });
    setLoad(false);
    setasociados(value);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff"
        barStyle="dark-content" />
      <View style={styles.headerWrapper}>
        <Header foto={foto} return="Siniestros" props={props} /> 
        <View style={styles.greatingWrapperPolizas}>
          <Text style={styles.dayWrapper}>Accidente Personal</Text>
          <Text style={styles.dateWrapper}>¿Con cúal persona está asociado?</Text>
        </View>
        <View style={styles.menuWrapperPoliza}>
        </View>
      </View>
      <ScrollView style={styles.scrollView1}>
        <View style={{ alignContent: "center", alignItems: "center" }}>


          {Load && <Text>cargando...</Text>}
          {Load === false && asociados !== null &&
            asociados.policies_bind.map((i, key)=>{
              return (
                <CardTriple data={i}  to="TypeAccident" go={goToScreen} props={props} />
              )
            })
          }
 {/* // text={i.name_affiliate} ci={i.document_affiliate} poliza={i.id_policies} */}

          {/* <CardTriple text="doug Juan Fernando Rivera" ci="1.122.158.399" poliza="123456789" go="TypeAccident" props={props} branch="148" id_client={client_id} />
          <CardTriple text="Carlos Cardenas" ci="1.122.158.399" poliza="123456789" go="TypeAccident" props={props} />
          <CardTriple text="Hebert Norena" ci="1.122.158.399" poliza="123456789" go="TypeAccident" props={props} /> */}




        </View>
      </ScrollView>
      <TouchableOpacity onPress={()=> goToScreenNew('AddNewPerson')}
      style={{paddingTop:10, backgroundColor: "#849DF7", flexDirection: "row", height: 40, justifyContent: "center" }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", textAlign: "center" }}>No esta asociado con ninguna</Text>
        <Icon name="arrow-right" width={30} height={30} fill="#FFF" top={-5}/>
      </TouchableOpacity>
      <Footer />
    </View>
  )


}
export default Movilidad;