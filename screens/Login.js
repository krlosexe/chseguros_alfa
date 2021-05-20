import React, { Component, useState, useEffect } from "react";
import {ActivityIndicator, StyleSheet, ScrollView, View, Text, SafeAreaView, Image, Button, Alert, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, ImageBackground } from "react-native";
// import * as Font from 'expo-font';
//import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

import RequestPermission from '../permission';

function LoginScreen(props) {


  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );



  const [data, setData] = useState({ email: '1036686527', password: '1036686527' });
  const [Loading, setLoading] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(true)

  useEffect(() => {
    const _loadAssetAsync = async () => {
      await Font.loadAsync({
        'poppins-regular': require('./../assets/Fonts/Poppins-Regular.ttf'),
        'poppins-semibold': require('./../assets/Fonts/Poppins-SemiBold.ttf'),
      })
      setFontsLoaded(true)
    }
    _loadAssetAsync()
  }, [])

  useEffect(() => {
    if (Platform.OS === 'android') {
      RequestPermission().then(_ => {
        console.log('requested!');
      });
    }
  }, [])



 


  function onChangeDataHandler(e, name) {
    const { text } = e.nativeEvent;
    setData({
      ...data,
      [name]: text
    })
  }



  function onPressLogin() {
    setLoading(true);
    axios.post('https://app.chseguros.com.co/api/authApp', data).then(res => {
      //console.log(res.data);
      var ncompleto = res.data.nombre;
      var email = res.data.email;
      var client_id = res.data.client_id;
      var use_id = res.data.user_id;
      var vinculado = res.data.vinculado;
      var documento = res.data.number_document;
      var foto = res.data.photo;
    _storeData(ncompleto, email, `${client_id}`, `${use_id}`, `${vinculado}`, `${documento}`, `${foto}`)
   
    }).catch(error => {
  Alert.alert('Error al iniciar sesión', 'Usuario o contraseña invalida');
  setLoading(false);
    })
  }

  const _storeData = async (ncompleto, email, client_id, user_id, vinculado, documento, foto) => {
    try {
      setLoading(false);
      await AsyncStorage.setItem('ncompleto', ncompleto);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('client_id', client_id);
      await AsyncStorage.setItem('user_id', user_id);
      await AsyncStorage.setItem('vinculado', vinculado);
      await AsyncStorage.setItem('documento', documento);
     // await AsyncStorage.setItem('foto', foto);
      props.navigation.navigate('HomeScreen');
    } catch (error) {
      console.warn('Error al escribir en storage')
    }
  };




  if (!fontsLoaded) return  <SafeAreaView style={{ flex: 1 }}>
                              <Text>Cargando</Text>
                            </SafeAreaView>

  return <SafeAreaView style={{ flex: 1, backgroundColor: '#2e2f55' }}>
    <StatusBar backgroundColor="#2e2f55" barStyle="light-content" />
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.containerlogin}>
        <View style={styles.logocontenedor}>
          <Image source={require('./../assets/Img/logo.png')} style={styles.logo} />
          <Text style={styles.textodescripcion}>Obtén los beneficios de ser cliente</Text>
        </View>
        <View style={styles.infocontenedor}>
          <View style={styles.inputFondo}>
            <Icon name="person" width={20} height={20} fill="#7E8CBA" />
            <TextInput placeholder="Usuario" style={styles.input} placeholderTextColor="#8E9AC3" name="email" value={data.email} keyboardType="email-address" returnKeyType="next" onChange={(evt) => onChangeDataHandler(evt, 'email')} />
          </View>
          <View style={styles.inputFondo}>
            <Icon name="unlock" width={20} height={20} fill="#7E8CBA" />
            <TextInput secureTextEntry={true} placeholder="Ingresa contraseña" style={styles.input} placeholderTextColor="#8E9AC3" name="password" value={data.password} onChange={(evt) => onChangeDataHandler(evt, 'password')} />
          </View>
          <TouchableOpacity style={{
            marginTop: 20,
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#FCAB00',
            marginLeft: 40,
            marginRight: 40,
          }} onPress={() => onPressLogin()}>
            {/* <Button title="Iniciar Sesión" type="button" style={styles.boton} color="white" onPress={() => onPressLogin()} /> */}
            <Text style={{ fontSize: 20, lineHeight: 25, textAlign: "center" }}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
    {Loading===true &&
      <View style={{
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.8)", position: "absolute", width: "100%", height: "100%"
      }}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ textAlign: "center", top: 10, color: "#fff" }}>Cargando</Text>
      </View>
    }
  </SafeAreaView>

}

const styles = StyleSheet.create({

  statusBar: {},

  container: { backgroundColor: '#f5f5ff', flex: 1, },
  containerlogin: { backgroundColor: '#2e2f55', flex: 1, flexDirection: 'column', },

  logocontenedor: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden"
  },
  logo: {
    height: 220,
    width: 220,
    resizeMode: 'contain',
    marginTop: -200
  },

  textodescripcion: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: -80
  },


  infocontenedor: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
    padding: 20,
    // marginBottom:50
  },


  inputFondo: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    marginHorizontal: 40,
    marginLeft: 40,
    marginRight: 40,
  },

  input: {
    marginLeft: 10,
    fontSize: 16,
    color: '#14132A',
    width: 200
  },

  botoncontenedor: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#FCAB00',
    marginLeft: 40,
    marginRight: 40,
  },

  boton: {
    // color: 'white',
    // padding: 8,
    // textAlign: 'center',
    // color: '#4ad295',
    // fontSize: 15,
    // backgroundColor: "red"
  },
});

export default LoginScreen;