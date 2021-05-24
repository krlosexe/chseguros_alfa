import React, { Component } from "react";
import { View, Text, SafeAreaView, Image, Button, TextInput, TouchableOpacity, StatusBar, Linking, Alert, ScrollView } from "react-native";
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';


import Header from '../components/header.js';
import Footer from '../components/footer.js';

import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage'

const Card = function ({ image, title, title1, title2, date, date1, color, progress }) {
  return (
    <View style={styles.cardWrapper1}>
      <View style={[styles.cardBody2]}>
        <View>
          <Text style={styles.cardTextTitle}>{title1}</Text>
          <Text style={styles.cardTextDate2}>{date}</Text>
          <Icon name="arrow-right" width={30} height={30} fill="white" style={styles.detalles2} />
        </View>
      </View>
    </View>
  )
}


class Shock extends React.Component {
  static navigationOptions = {
    title: '',
    headerShown: false,
  };

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: true,
      placa: '',
      marca: '',
      name_insurers: '',
      phone: '',
      referencia1: '',
      referencia2: '',
      referencia3: '',
      clase: '',
      opacity: 1,
      opacity1: 1,
      client_id: props.route.params.id_client,
      branch: props.route.params.branch,
      data: []
    }
    this.onPressVehicle = this.onPressVehicle.bind(this)
    var nplaca = ''
  }



  componentDidMount() {
    this._loadAssetAsync()
    this.getPolicies()
  }

  onPress = () => {
    alert('fawfaw')
  }

  async _loadAssetAsync() {
    await Font.loadAsync({
      'poppins-regular': require('./../assets/Fonts/Poppins-Regular.ttf'),
      'poppins-semibold': require('./../assets/Fonts/Poppins-SemiBold.ttf'),
    });
    this.setState({ fontsLoaded: true })
  }



  getPolicies = () => {
    console.log('https://app.chseguros.com.co/api/policies/by/branch/' + this.state.branch + "/" + this.state.client_id)
    axios.get('https://app.chseguros.com.co/api/policies/by/branch/' + this.state.branch + "/" + this.state.client_id)
      .then(res => {
        console.log(res.data, "DATA");
        this.setState({ data: res.data })
      })
      .catch(function (error) {
        Alert.alert('Sin resultados', 'Este vehículo no se encuentra asegurado')
      })
  }

  onPlacaChange = placa => {
    this.setState({ placa: placa })
    nplaca = placa
  };

  onPressVehicle() {
    axios.get('https://app.chseguros.com.co/api/policie/vehicule/' + this.state.placa, {})
      .then(res => {
        this.setState({ marca: res.data.marca })
        this.setState({ referencia1: res.data.referencia1 })
        this.setState({ referencia2: res.data.referencia2 })
        this.setState({ placa: res.data.placa })
        this.setState({ referencia3: res.data.referencia3 })
        this.setState({ phone: res.data.phone })
        this.setState({ clase: res.data.clase })
        this.setState({ name_insurers: res.data.name_insurers })
        this.setState({ opacity: 1 })
        this.setState({ opacity1: 0 })
      })
      .catch(function (error) {
        Alert.alert('Sin resultados', 'Este vehículo no se encuentra asegurado')
      })
  }

  MainView() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fff"
          barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.headerWrapper}>

          <Header foto={this.setState.foto} return="Siniestros" props={this.props} />
            



            <View style={styles.greatingWrapperPolizas}>
              <Text style={styles.dayWrapper3}>Selecciona tu placa para continuar</Text>
            </View>
            <View style={styles.menuWrapperPago}>
              <View style={styles.header_SearchWrapper}>
                <Icon name="search" width={20} height={20} fill="#7E8CBA" />
                <TextInput name="placa" placeholder="Placa del vehículo" style={styles.header_SearchInput} placeholderTextColor="#8E9AC3" value={this.state.placa} onChangeText={this.onPlacaChange} />
              </View>
            </View>
          </View>



          <TouchableOpacity onPress={() => { navigate('ReportSinister', { branch: "AUTOMOBIL", id_client: this.state.client_id }) }}>
                 <Text>sdsdsd</Text>
                </TouchableOpacity>













          <ScrollView style={styles.scrollView1}>
            {this.state.data.length > 0 &&
              this.state.data.map((item, key) => {
                return <TouchableOpacity onPress={() => { navigate('ReportSinister', { branch: "AUTOMOBIL", id_client: this.state.client_id }) }}>
                  <Card
                    title1={item.placa}
                    progress="100%"
                    date={item.name} />
                </TouchableOpacity>
              })

            }
          </ScrollView>
        </View>

        <Footer />
      </SafeAreaView>
    )
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        { !this.state.fontsLoaded ? <Text>Cargando</Text> : this.MainView()}
      </SafeAreaView>
    );
  }
}

export default Shock;