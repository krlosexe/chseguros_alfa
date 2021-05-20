import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar

} from "react-native";
// import * as Font from 'expo-font';
// import BurgerMenu from './../src/components/BurgerMenu'
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import CardSimple from '../components/CardSimple.js';




import { WebView } from 'react-native-webview';
// import LottieView from 'lottie-react-native';
// import * as WebBrowser from 'expo-web-browser';
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


class Movilidad extends React.Component {
  static navigationOptions = {
    title: '',
    headerShown: false,

  };

  constructor(props) {
    super(props)


    this.state = {
      foto: '',
      fontsLoaded: false,
      polizas: [],
      bind: [],
      user_id: '',
      client_id: '',
      ncompleto: '',
      documento: '',
    }

    this._retrieveData = this._retrieveData.bind(this)

  }






  componentDidMount() {
    this._loadAssetAsync()
    this._retrieveData()
    this.onPressPoliza()

    // console.warn("CLientID", this.state.client_id)
  }


  async _retrieveData() {
    try {
      const ncompleto = await AsyncStorage.getItem('ncompleto');
      const client_id = await AsyncStorage.getItem('client_id');
      const user_id = await AsyncStorage.getItem('user_id');
      const documento = await AsyncStorage.getItem('documento');
      const foto = await AsyncStorage.getItem('foto');

      if (ncompleto !== null) {
        //console.warn(ncompleto);
        this.setState({ ncompleto: ncompleto })
        this.setState({ client_id: client_id })
        this.setState({ user_id: user_id })
        this.setState({ documento: documento })
        this.setState({ foto: foto })

      }

    } catch (error) {
      // Error retrieving data
    }
  }






  async _loadAssetAsync() {
    await Font.loadAsync({
      'poppins-regular': require('./../assets/Fonts/Poppins-Regular.ttf'),
      'poppins-semibold': require('./../assets/Fonts/Poppins-SemiBold.ttf'),
    })
    this.setState({ fontsLoaded: true })
  }











  
  MainView() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff"
          barStyle="dark-content" />
        <View style={styles.headerWrapper}>
          <Header foto={this.setState.foto} return="HomeScreen" props={this.props} />
          <View style={styles.greatingWrapperPolizas}>
            <Text style={styles.dayWrapper}>Accidente Laboral</Text>
            <Text style={styles.dateWrapper}>¿Con cúal de tus pólizas está asociado?</Text>
          </View>
          <View style={styles.menuWrapperPoliza}>
          </View>
        </View>
        <ScrollView style={styles.scrollView1}>
          <View style={{ alignContent: "center", alignItems: "center" }}>
            <CardSimple text="Automovil" go="Shock" props={this.props} branch= "148" id_client={this.state.client_id} /> 
            <CardSimple text="Accidentes Personales" go="sdsd" props={this.props} />
            <CardSimple text="Empresas" go="sdsd" props={this.props} />
            <CardSimple text="Hogar" go="sdsd" props={this.props} />
          </View>
        </ScrollView>
        <Footer />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        { this.MainView()}
      </SafeAreaView>
    );
  }
}
export default Movilidad;