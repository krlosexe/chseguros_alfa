import React from "react";

import { 
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  StatusBar
} from "react-native";
// import * as Font from 'expo-font';
// import BurgerMenu from './../src/components/BurgerMenu'
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage'

const Card = function({image, title, date, color, progress}) {
  return (
    <View style={styles.cardWrapper1} >
      <View style={[styles.cardBody1]}>
        <View style={styles.cardLogoBackground}>
          <Image source={ image } style={styles.cardLogo} onPress={() => navigate('Profile', {name: 'Jane'})} />
        </View> 
        <View>
          <Text style={styles.cardTextTitle}>{title}</Text>
          <Text style={styles.cardTextDate2}>{date}</Text>
        </View>
      </View>
    </View>
  )
}


class HomeScreen extends React.Component {


  static navigationOptions = { 
    title: '',
    headerShown: false,
  };

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      ncompleto  : '',
      user_id:'',
      client_id:'',
      documento: '',
      vinculado: '',
      foto: '',
    }

    this._retrieveData = this._retrieveData.bind(this)
  }


  componentDidMount() {
    //this._loadAssetAsync()
    this._retrieveData()

  }
    onPress = () => {
    alert ('fawfaw') 
  }
/*
  async _loadAssetAsync() {
    await Font.loadAsync({
      'poppins-regular': require('./../assets/Fonts/Poppins-Regular.ttf'),
      'poppins-semibold': require('./../assets/Fonts/Poppins-SemiBold.ttf'),
    });

    this.setState({ fontsLoaded:true })
  }
*/

  async  _retrieveData(){
  try {
    const ncompleto = await AsyncStorage.getItem('ncompleto');
    const user_id = await AsyncStorage.getItem('user_id');
    const documento = await AsyncStorage.getItem('documento');
    const client_id = await AsyncStorage.getItem('client_id');
    const vinculado = await AsyncStorage.getItem('vinculado');
    const foto = await AsyncStorage.getItem('foto');

    if (ncompleto !== null) {
      //console.warn(ncompleto);
      console.log(documento)
      this.setState({ ncompleto: ncompleto })
      this.setState({ user_id: user_id })
      this.setState({ documento: documento })
      this.setState({ client_id: client_id })
      this.setState({ vinculado: vinculado })
      this.setState({ foto: foto })

    }
  } catch (error) {
    // Error retrieving data
  }
};


  MainView() {
    const {navigate} = this.props.navigation;
  return (   
      <View style={styles.container}>   
      <StatusBar backgroundColor="#fff"
      barStyle="dark-content"/>    
      <ScrollView style={styles.scrollView}>
      <View style={ styles.headerWrapper }>
          <View style={styles.navigation}>
            <LottieView
                  source={require('./../assets/Img/campana.json')}
                  style={{
                  width: 50,
                  height: 50,
                  marginHorizontal:-7,
                  marginTop:-2
                }}
                  autoPlay
                  loo
                />

             <View>
              <Image source={require('./../assets/logo-dark.png')} style={styles.logod} />
              <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png', }}
      />
            </View>
            <View>
            <TouchableOpacity onPress={() => {navigate('Profile')}}>
             {this.state.foto == null &&
                <Image source={require('./../Avatar.png')} style={styles.avatar} />
             }

              {this.state.foto != null &&
               <Image style={{...styles.avatar, borderRadius : 20}} source={{ uri: `https://app.chseguros.com.co/img/usuarios/profile/${this.state.foto}`}} />
             }
              
            </TouchableOpacity>
            </View>
          </View>
          <View style={ styles.greatingWrapper }>
            <Text style={ styles.dayWrapper2 }>Hola, {this.state.ncompleto} </Text>
            <Text style={ styles.nameWrapper }>Aprovecha los beneficios de ser nuestro cliente</Text>
            <View style={{flexDirection:'row', marginTop:20}}>
            
            <View style={{borderWidth:1, borderColor:'#5681ff99', width:'47%', borderRadius:15, margin:5,height:60}}>
            <TouchableOpacity onPress={() => {navigate('Pays')}}>
              <Image style={{ width: 40, height: 40, position:'absolute', marginTop:8,left:10, borderRadius:10}} resizeMode="cover" source={require('./../assets/Img/pay.png')} /> 
              <Text style={{textAlign:'center', left:15, marginTop:12, fontWeight:'700'}}>Pagos</Text>
              <Text style={{textAlign:'center', left:15}}>En linea</Text>
            </TouchableOpacity>
            </View>
            <View style={{borderWidth:1, borderColor:'#0af0817d', width:'47%', borderRadius:15, margin:5,height:60}}>
            <TouchableOpacity onPress={() => {navigate('Shop')}}>
              <Image style={{ width: 40, height: 40, position:'absolute', marginTop:8,left:10, borderRadius:10}} resizeMode="cover" source={require('./../assets/Img/segu.png')} /> 
              <Text style={{textAlign:'center', left:15, marginTop:12, fontWeight:'700'}}>Comprar</Text>
              <Text style={{textAlign:'center', left:15}}>En linea</Text>
              </TouchableOpacity>
            </View>
    
            </View>
          </View>
        <View style={ styles.menuWrapperPoliza }>
        </View>
          
        </View>
     
      <TouchableOpacity onPress={() => {navigate('Movilidad')}}>
        <Card
          image={require('./../assets/Img/carro1.png')}
          title="Movilidad"
          progress="100%"
          date="Me choqué | Me varé | Conductor elegido" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {navigate('Salud', {'data_user':this.state})}}>
        <Card
          image={require('./../assets/Img/mujer.png')}
          title="Salud"
          progress="100%"
          date="Póliza | Plan complementario | Directorio" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {navigate('Hogar')}}>
        <Card
          image={require('./../assets/Img/viviendas.png')}
          title="Hogar"
          progress="100%"
          date="Plomeria | Electricidad | Cerrajería | Vidrios" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {navigate('Vida')}}>
        <Card
          image={require('./../assets/Img/family.png')}
          title="Vida"
          progress="100%"
          date="Reclamaciones | Solicitudes" />
      </TouchableOpacity>
      </ScrollView> 
      <View style={{position: 'absolute',alignSelf: 'center',backgroundColor: 'white',width: 70,height: 70,borderRadius: 35,bottom: 35,zIndex: 10}}>
      <TouchableOpacity onPress={() => {navigate('Siniestros', {'data_user':this.state} )}} style={[styles.button, styles.actionBtn]}>
                <View>
                    <Image style={{ width: 30, height: 30,marginTop:-5}} resizeMode="cover" source={require('./../assets/Img/sirena.png')} />
                </View>
      </TouchableOpacity>   
        </View>     
        <View style={styles.bottomNavigation}>
        <TouchableOpacity>
                <View  style={styles.bottomMenuItem}>
                  <Icon name="grid" width={30} height={30} fill="#14132A" />
                </View>
                <Text style={styles.menuu}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {navigate('Insurance', {'data_user':this.state} )}}>
                <View style={styles.bottomMenuItem}>
                  <Icon name="shield" width={30} height={30} fill="#14132A" />
                </View>
                <Text style={styles.menuu}>Mis seguros</Text>
          </TouchableOpacity>  
          </View>
      </View>
    )
  }

  render() {

    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        {  this.state.fontsLoaded ? <Text>Cargando</Text> : this.MainView() }
        </SafeAreaView>
    );
  }

}

export default HomeScreen;