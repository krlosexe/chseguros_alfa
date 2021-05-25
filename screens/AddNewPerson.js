import React, { useState, useEffect } from "react";
import { View, Picker, TextInput, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import CardTriple from '../components/CardTriple.js';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';


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
  const [selectedValue, setSelectedValue] = useState("cedula");
  const [FormTexto, setFormTexto] = useState({ 'nombre': "Juan camilo mendoza", 'documentoType': 'pasaporte', 'documentoNro': '18868371', 'lugar': '' })

  function onChangeText(text, key) {
    setFormTexto({
      ...FormTexto,
      [key]: text
    })
  }

  console.log("ddd")
  useEffect(() => {
    _retrieveData();
  }, [])

  function goToScreen(screen) {
    let back = "AddNewPerson";
    navigation.navigate(screen, { randomCode: Math.random(), back })
  }

  async function _retrieveData() {
    try {
      const ncompleto = await AsyncStorage.getItem('ncompleto');
      const client_id = await AsyncStorage.getItem('client_id');
      const user_id = await AsyncStorage.getItem('user_id');
      const documento = await AsyncStorage.getItem('documento');
      const foto = await AsyncStorage.getItem('foto');
      if (ncompleto !== null) {
        setclient_id(client_id)
        setuser_id(user_id)
        setdocumento(documento)
        setfoto(foto)
      }
    } catch (error) {
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff"
        barStyle="dark-content" />
      <View style={styles.headerWrapper}>
        <Header foto={foto} return="AccidentePerson" props={props} />
        <View style={styles.greatingWrapperPolizas}>
          <Text style={styles.dayWrapper}>Accidente Personal</Text>
          <Text style={styles.dateWrapper}>* Ingrese los datos</Text>
        </View>
        <View style={styles.menuWrapperPoliza}>
        </View>
      </View>

      <ScrollView style={styles.scrollView1}>
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <Text style={{ width: "90%", textAlign: "left", marginBottom: 8, marginTop: 20, fontSize: 14, fontWeight: "700", color: "#000" }}>* Nombre Completo</Text>
          <TextInput onChangeText={text => onChangeText(text, 'nombre')} style={{ width: "90%", backgroundColor: "white", borderRadius: 5 }} value={FormTexto.nombre} placeholder="" />
    
          <Text style={{ width: "90%", textAlign: "left", marginBottom: 8, marginTop: 20, fontSize: 14, fontWeight: "700", color: "#000" }}>* Tipo de Documento</Text>
          <View style={{ width: "90%", backgroundColor: "white", borderRadius: 5 }} >
            <Picker
              selectedValue={selectedValue}
              style={{
                width: "90%", backgroundColor: "red", borderRadius: 5,
                height: 50,
              }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="cedula ciudadania" value="cedula ciudadania" />
              <Picker.Item label="cedula extranjeria" value="cedula extranjeria" />
              <Picker.Item label="pasaporte" value="pasaporte" />
            </Picker>
          {/* <TextInput onChangeText={text => onChangeText(text, 'documentoType')} style={{ width: "90%", backgroundColor: "white", borderRadius: 5 }} value={FormTexto.documentoType} placeholder="" /> */}
          </View>

          <Text style={{ width: "90%", textAlign: "left", marginBottom: 8, marginTop: 20, fontSize: 14, fontWeight: "700", color: "#000" }}>* Número de Documento</Text>
          <TextInput onChangeText={text => onChangeText(text, 'documentoNro')} style={{ width: "90%", backgroundColor: "white", borderRadius: 5 }} value={FormTexto.documentoNro} placeholder="" />
          <Text style={{ width: "90%", textAlign: "left", marginBottom: 8, marginTop: 20, fontSize: 14, fontWeight: "700", color: "#000" }}>* Lugar del Accidente</Text>
          <TextInput onChangeText={text => onChangeText(text, 'lugar')} style={{ width: "90%", backgroundColor: "white", borderRadius: 5 }} value={FormTexto.lugar} placeholder="" />
        </View>


        <View style={{height:30}}></View>
      </ScrollView>
      <TouchableOpacity onPress={() => goToScreen('TypeAccident')}
        style={{ paddingTop: 10, backgroundColor: "#5681FF", justifyContent: "space-between", flexDirection: "row", height: 40, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", textAlign: "center" }}>Siguiente</Text>
        <Icon name="arrow-right" width={30} height={30} fill="#FFF" top={-5} />
      </TouchableOpacity>
      <Footer />
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     alignItems: "center"
//   }
// });


export default Movilidad;
// http://app.chseguros.com.co/api/policies/accidentes/personales/405
// Accidente personalbarcon cual persona está asociado?