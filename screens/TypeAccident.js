import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import CardSimple from '../components/CardSimple.js';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage'





// function goToScreen(screen, data) {
//   let back = props.back
//   navigation.navigate(screen, { randomCode: Math.random(), data, back })
// }

// 



// <CardSimple text="Fractura" go="HospitalList" props={this.props} />
// <CardSimple text="Trauma Craneoencefalico" go="HospitalList" props={this.props} />
// <CardSimple text="Urgencia general por accidente" go="HospitalList" props={this.props} />"}


function Movilidad(props) {
  const { navigation } = props
  const [getData, setgetData] = useState(null);
  const [dataToSend, setdataToSend] = useState(null);
  const [AccidentSelected, setAccidentSelected] = useState(null)
  const [ListTypeAccident, setListTypeAccident] = useState([
    { "title": "Herida Abierta" },
    { "title": "Fractura" },
    { "title": "Trauma Craneoencefalico" },
    { "title": "Urgencia general por accidente" },
  ])

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1; }

  useEffect(() => {
    if (props.route.params.data) {
      console.log("si existe el parametro")
      setgetData(
        {
          "name_affiliate": props.route.params.data.name_affiliate,
          "type_document_affiliate": 0,
          "document_affiliate": props.route.params.data.document_affiliate,
          "id_policie": props.route.params.data.id_policie,
          "place": ""
        }
      )
    }
    else {
      console.log("no existe ese parametro")
      setgetData(
        {
          "name_affiliate": props.route.params.dataNew.nombre,
          "type_document_affiliate": props.route.params.dataNew.documentoType,
          "document_affiliate": props.route.params.dataNew.documentoNro,
          "id_policie": 0,
          "place": props.route.params.dataNew.lugar,
        }
      )
    }
  }, [randomCode])

  function change(e){
    setAccidentSelected(e);
  }



  useEffect(() => {
    if(AccidentSelected!==null){
      getData.typeAccident = AccidentSelected;
      setdataToSend(getData);
    }
  }, [AccidentSelected])


  useEffect(() => {
    if (dataToSend !== null) {
      console.log("dataToSend", dataToSend)
      goToScreen("HospitalList", dataToSend)
    }
  }, [dataToSend])




  function goToScreen(screen, data) {
    let back = "TypeAccident"
    navigation.navigate(screen, { randomCode: Math.random(), data, back })
  }













  // static navigationOptions = {
  //   title: '',
  //   headerShown: false,
  // };

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     foto: '',
  //     fontsLoaded: false,
  //     polizas: [],
  //     bind: [],
  //     user_id: '',
  //     client_id: '',
  //     ncompleto: '',
  //     documento: '',
  //   }
  //   this._retrieveData = this._retrieveData.bind(this)
  // }

  // componentDidMount() {
  //   this._loadAssetAsync()
  //   this._retrieveData()
  //   this.onPressPoliza()
  // }

  // async _retrieveData() {
  //   try {
  //     const ncompleto = await AsyncStorage.getItem('ncompleto');
  //     const client_id = await AsyncStorage.getItem('client_id');
  //     const user_id = await AsyncStorage.getItem('user_id');
  //     const documento = await AsyncStorage.getItem('documento');
  //     const foto = await AsyncStorage.getItem('foto');
  //     if (ncompleto !== null) {
  //       this.setState({ ncompleto: ncompleto })
  //       this.setState({ client_id: client_id })
  //       this.setState({ user_id: user_id })
  //       this.setState({ documento: documento })
  //       this.setState({ foto: foto })
  //     }
  //   } catch (error) {
  //   }
  // }


  //setAccidentSelected(e)




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff"
          barStyle="dark-content" />
        <View style={styles.headerWrapper}>
          {/* <Header foto={this.setState.foto} return="HomeScreen" props={this.props} /> */}
          <View style={styles.greatingWrapperPolizas}>
            <Text style={styles.dayWrapper}>Tipo de Accidente</Text>
            <Text style={styles.dateWrapper}>Elige una categoria </Text>
          </View>
          <View style={styles.menuWrapperPoliza}>
          </View>
        </View>
        <ScrollView style={styles.scrollView1}>
          <View style={{ alignContent: "center", alignItems: "center" }}>

            {ListTypeAccident.map((i, key) => {
              return (
                <TouchableOpacity key={key} style={stylesHere.btn} onPress={() => change(i.title)}>
                  <Text style={stylesHere.text}> {i.title} </Text>
                  <Icon name="arrow-right" width={30} height={30} fill="#849DF7" />
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
        <Footer />
      </View>
    </SafeAreaView>
  );
}



const stylesHere = StyleSheet.create({



  btn: {
    flexDirection: "row",
    height: 50,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 15,
    borderColor: "#ccc",
    borderWidth: 0.3
  },
  text: {
    fontWeight: "bold",
    width: "90%",
    fontSize: 14,
    lineHeight: 25,
    color: "#000000",
    textAlign: "left"
  }

});



export default Movilidad;