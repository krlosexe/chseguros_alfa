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
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import CardSimple from '../components/CardSimple.js';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage'

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
  }

  async _retrieveData() {
    try {
      const ncompleto = await AsyncStorage.getItem('ncompleto');
      const client_id = await AsyncStorage.getItem('client_id');
      const user_id = await AsyncStorage.getItem('user_id');
      const documento = await AsyncStorage.getItem('documento');
      const foto = await AsyncStorage.getItem('foto');
      if (ncompleto !== null) {
        this.setState({ ncompleto: ncompleto })
        this.setState({ client_id: client_id })
        this.setState({ user_id: user_id })
        this.setState({ documento: documento })
        this.setState({ foto: foto })
      }
    } catch (error) {
    }
  }

  async _loadAssetAsync() {
    await Font.loadAsync({
      'poppins-regular': require('./../assets/Fonts/Poppins-Regular.ttf'),
      'poppins-semibold': require('./../assets/Fonts/Poppins-SemiBold.ttf'),
    })
    this.setState({ fontsLoaded: true })
  }


  onPressPoliza() {
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



  MainView() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff"
          barStyle="dark-content" />
        <View style={styles.headerWrapper}>
          <Header foto={this.setState.foto} return="HomeScreen" props={this.props} />
          <View style={styles.greatingWrapperPolizas}>
            <Text style={styles.dayWrapper}>Tipo de Accidente</Text>
            <Text style={styles.dateWrapper}>Elige una categoria </Text>
          </View>
          <View style={styles.menuWrapperPoliza}>
          </View>
        </View>
        <ScrollView style={styles.scrollView1}>
          <View style={{ alignContent: "center", alignItems: "center" }}>
            <CardSimple text="Herida Abierta" go="HospitalList" props={this.props} branch= "148" id_client={this.state.client_id} /> 
            <CardSimple text="Fractura" go="HospitalList" props={this.props} />
            <CardSimple text="Trauma Craneoencefalico" go="HospitalList" props={this.props} />
            <CardSimple text="Urgencia general por accidente" go="HospitalList" props={this.props} />
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