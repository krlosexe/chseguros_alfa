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


  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random()})
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
      console.log("res: ", res)
    })
    // axios.get(`http://app.chseguros.com.co/api/policies/accidentes/personales/${client_id}`).then(res => {
    //   asoc = res.data;
    // }).catch(error => {
    //   console.log("error: ", error)
    // })
    console.log("asoc: ", data)
    // setasociados(asoc)
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




  // {
  // "branch": 7,
  // "business_type": "Nuevo Cliente",
  // "clients": 405,
  // "end_date": "2022-05-01",
  // "expedition_date": "2021-05-05",
  // "file_caratula": "530-1-994000002027-0-20210517203650.pdf",
  // "id_policies": 26980,
  // "id_policies_grouped": null,
  // "insurers": 37,
  // "is_renewable": 1,
  // "number_policies": "994000002027",
  // "policies_bind": [
  //   {
  //     "address": null,
  //     "beneficairy_identification": null,
  //     "beneficairy_name": null,
  //     "beneficairy_onerous": 1,
  //     "birthdate": "2009-09-01",
  //     "company": null,
  //     "cousin": 0,
  //     "date_init": "2021-05-01",
  //     "document_affiliate": "1015190526",
  //     "email": null,
  //     "employee": null,
  //     "expenses": 0,
  //     "file_caratula": null,
  //"gender": "Masculino",
  //"id_policie": 26980,
  //     "id_policies_bind": 305,
  //"insured_object": "0",
  //"internal_observations": null, 
  //"name_affiliate": "DARWIN JOHAN LARREA MUNERA",
  //     "number_affiliate": "1", "number_annexed": "0", "observations": null, "percentage_vat": 0, "phone": null, "plan": null,
  //     "policies_family_burden": [Array], "relationship": "DEPORTISTA", "route_caratula": "img/policies/caratulas/", "total": 0,
  //     "type_membership": null, "type_rate": null, "vat": 0
  //   },
  //   {
  //     "address": "0", "beneficairy_identification": null, "beneficairy_name": null, "beneficairy_onerous": 1, "birthdate": "2005-04-26",
  //     "company": null, "cousin": 0, "date_init": "2021-05-01", "document_affiliate": "1023626210", "email": null, "employee": null, "expenses": 0,
  //     "file_caratula": null, "gender": "Masculino", "id_policie": 26980, "id_policies_bind": 306, "insured_object": "0", "internal_observations": null,
  //     "name_affiliate": "JUAN MANUEL DIAZ LARREA", "number_affiliate": "2", "number_annexed": "0", "observations": null, "percentage_vat": 0,
  //     "phone": null, "plan": null, "policies_family_burden": [Array], "relationship": "DEPORTISTA", "route_caratula": "img/policies/caratulas/",
  //     "total": 0, "type_membership": null, "type_rate": null, "vat": 0
  //   }
  // ],
  // "reception_date": "2021-05-07",
  // "risk": null,
  // "route_caratula": "img/policies/caratulas/530-1-994000002027-0-20210517203650.pdf",
  // "start_date": "2021-05-01",
  // "state_policies": "Vigente",
  // "type_clients": 1,
  // "type_poliza": "Collective"
  // }





  // async _loadAssetAsync() {
  //   await Font.loadAsync({
  //     'poppins-regular': require('./../assets/Fonts/Poppins-Regular.ttf'),
  //     'poppins-semibold': require('./../assets/Fonts/Poppins-SemiBold.ttf'),
  //   })
  //   this.setState({ fontsLoaded: true })
  // }







  function onPressPoliza() {
    /*
    console.log("CLientID22222", this.props.route.params.data_user.documento)
     axios.get('https://app.chseguros.com.co/api/clients/policies/' + this.props.route.params.data_user.documento)
       .then(res => {
         console.warn(res.data);
         this.setState({ 'polizas': res.data.policies }),
       })
       .catch((error) => {
         Alert.alert('Error de consulta', 'No se ha encontrado pólizas')
         console.log(error)
       })
       */
  }

console.log("asociados end: ", asociados)
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


          {Load && <Text>cargando</Text>}
          {Load === false && asociados !== null &&
            asociados.policies_bind.map((i, key)=>{
              return (
                <CardTriple data={i} text={i.name_affiliate} ci={i.document_affiliate} poliza={i.id_policies} back="AccidentePerson" go="TypeAccident" props={props} />
              )
            })
          }


          {/* <CardTriple text="doug Juan Fernando Rivera" ci="1.122.158.399" poliza="123456789" go="TypeAccident" props={props} branch="148" id_client={client_id} />
          <CardTriple text="Carlos Cardenas" ci="1.122.158.399" poliza="123456789" go="TypeAccident" props={props} />
          <CardTriple text="Hebert Norena" ci="1.122.158.399" poliza="123456789" go="TypeAccident" props={props} /> */}




        </View>
      </ScrollView>
      <TouchableOpacity onPress={()=> goToScreen('AddNewPerson')}
      style={{paddingTop:10, backgroundColor: "#849DF7", flexDirection: "row", height: 40, justifyContent: "center" }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", textAlign: "center" }}>No esta asociado con ninguna</Text>
        <Icon name="arrow-right" width={30} height={30} fill="#FFF" top={-5}/>
      </TouchableOpacity>
      <Footer />
    </View>
  )


}
export default Movilidad;