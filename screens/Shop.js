import React, { Component } from "react";
import { 
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground
  
} from "react-native";
// import * as Font from 'expo-font';
// import BurgerMenu from './../src/components/BurgerMenu'
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import LottieView from 'lottie-react-native';
import { Card, ListItem, Button} from 'react-native-elements'
// import { WebView } from 'react-native-webview';
class Shop extends React.Component {
  static navigationOptions = { 
    title: '',
       headerShown: false,

  };

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: true
    }

  }

  componentDidMount() {
    this._loadAssetAsync()
  }

  async _loadAssetAsync() {
    await Font.loadAsync({
      'poppins-regular': require('./../assets/Fonts/Poppins-Regular.ttf'),
      'poppins-semibold': require('./../assets/Fonts/Poppins-SemiBold.ttf'),
    });

    this.setState({ fontsLoaded:true })
  }

  MainView() {
  const {navigate} = this.props.navigation;
  return (
      <View style={styles.container}>  
       <StatusBar backgroundColor="#fff"
      barStyle="dark-content"/> 



        <View style={styles.headerWrapper}>
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
                  loop
                />
                 <View>
              <Image source={require('./../assets/logo-dark.png')} style={styles.logod} />
            </View>
            <View>

             <TouchableOpacity onPress={() => {navigate('Profile')}}>
              <Image source={require('./../assets/Img/Avatar.png')} style={styles.avatar} />
            </TouchableOpacity>
            </View>
          </View>




          <View style={styles.greatingWrapperPolizas}>
            <Text style={ styles.dayWrapper }>Compra en linea</Text>
            <Text style={ styles.dateWrapper }>Elige el seguro que necesitas</Text>
          </View>


          <View style={styles.menuWrapperPoliza}>
          </View>
        </View>



      <ScrollView style={[styles.scrollView,{ marginTop:-20}]}>
      <Text style={{fontSize:20, marginTop:5, fontWeight:'600', color:'#14132A', marginLeft:20}}>Movilidad</Text>
       <View style={{flexDirection: 'row',  width:'100%', marginLeft:10}}>
       <ScrollView style={styles.scrollView2} horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => {navigate('Cotizar')}}>
          <View style={{margin:10}}>
          <ImageBackground source={require('./../assets/Img/auto.jpg')} style={{width:140, height:80}} imageStyle={{borderRadius:10}}>
          <View style={styles.overlay} />
          <Text style={{fontSize:15, textAlign:'center', marginTop:5, fontWeight:'700', color:'white', marginTop:30}}>Automóvil</Text>
          </ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigate('Soat')}}>
          <View style={{margin:10}}>
          <ImageBackground source={require('./../assets/Img/soat.jpg')} style={{width:140, height:80}} imageStyle={{borderRadius:10}}>
          <View style={styles.overlay} />
          <Text style={{fontSize:15, textAlign:'center', marginTop:5, fontWeight:'700', color:'white', marginTop:30}}>SOAT</Text>
          </ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigate('Cotizar')}}>
          <View style={{margin:10}}>
          <ImageBackground source={require('./../assets/Img/bici.jpg')} style={{width:140, height:80}} imageStyle={{borderRadius:10}}>
          <View style={styles.overlay} />
          <Text style={{fontSize:15, textAlign:'center', marginTop:5, fontWeight:'700', color:'white', marginTop:30}}>Bicicleta</Text>
          </ImageBackground>
          </View>
        </TouchableOpacity>
        </ScrollView>    
       </View>      
      <Text style={{fontSize:20, marginTop:5, fontWeight:'600', color:'#14132A', marginLeft:20}}>Salud</Text>
       <View style={{flexDirection: 'row',  width:'100%', marginLeft:10}}>
       <ScrollView style={styles.scrollView2} horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => {navigate('Cotizar')}}>
          <View style={{margin:10}}>
          <ImageBackground source={require('./../assets/Img/family.jpg')} style={{width:140, height:80}} imageStyle={{borderRadius:10}}>
          <View style={styles.overlay} />
          <Text style={{fontSize:15, textAlign:'center', marginTop:5, fontWeight:'700', color:'white', marginTop:30}}>Póliza de Salud</Text>
          </ImageBackground>
          </View>
        </TouchableOpacity>

        </ScrollView>   
       </View>      
       <Text style={{fontSize:20, marginTop:5, fontWeight:'600', color:'#14132A', marginLeft:20}}>Hogar</Text>
       <View style={{flexDirection: 'row',  width:'100%', marginLeft:10}}>
       <ScrollView style={styles.scrollView2} horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => {navigate('Cotizar')}}>
          <View style={{margin:10}}>
          <ImageBackground source={require('./../assets/Img/hogar.jpg')} style={{width:140, height:80}} imageStyle={{borderRadius:10}}>
          <View style={styles.overlay} />
          <Text style={{fontSize:15, textAlign:'center', marginTop:5, fontWeight:'700', color:'white', marginTop:30}}>Hogar</Text>
          </ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigate('Arrendamiento')}}>
          <View style={{margin:10}}>
          <ImageBackground source={require('./../assets/Img/arrendamiento.jpg')} style={{width:140, height:80}} imageStyle={{borderRadius:10}}>
          <View style={styles.overlay} />
          <Text style={{fontSize:15, textAlign:'center', marginTop:5, fontWeight:'700', color:'white', marginTop:30}}>Arrendamiento</Text>
          </ImageBackground>
          </View>
        </TouchableOpacity>
        </ScrollView>   
       </View>     


       <View style={{height:20,}}></View>

    </ScrollView> 
     <View style={styles.bottomNavigation}>
     <TouchableOpacity onPress={() => {navigate('HomeScreen')}}>
            <View  style={styles.bottomMenuItem}>
              <Icon name="grid" width={30} height={30} fill="#14132A" />
            </View>
            <Text style={styles.menuu}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.bottomMenuItem, styles.bottomMenuItemActive]}>
            <View style={styles.bottomMenuItem}>
              <Icon name="shopping-cart" width={30} height={30} fill="#14132A" />
            </View>
            <Text style={styles.menuu}>Comprar</Text> 
      </TouchableOpacity>               
        </View>
      </View>
    )
  }
  

  render() {

    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        { ! this.state.fontsLoaded ? <Text>Cargando</Text> : this.MainView() }
        </SafeAreaView>
    );
  }
}

export default Shop;