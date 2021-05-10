import React, {Component, useState, useEffect} from "react";
import { View, Text, SafeAreaView, Image, Button, Alert, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView,ImageBackground } from "react-native";
// import * as Font from 'expo-font';
import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

import RequestPermission from '../permission';

function LoginScreen(props){


	
	const MyStatusBar = ({backgroundColor, ...props}) => (
	  <View style={[styles.statusBar, { backgroundColor }]}>
	    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
	  </View>
	);
	const [ data , setData ] = useState({
		email : '1036686527',
		password : '1036686527'

	})


	const [fontsLoaded , setFontsLoaded] = useState(true)

	 
	useEffect(()=>{

		const _loadAssetAsync = async  ()=> {


			await Font.loadAsync({
		  		'poppins-regular': require('./../assets/Fonts/Poppins-Regular.ttf'),
		  		'poppins-semibold': require('./../assets/Fonts/Poppins-SemiBold.ttf'),
			}) 
			setFontsLoaded(true) }
			_loadAssetAsync()
	},[])




	useEffect(()=>{

        if (Platform.OS === 'android') {
            RequestPermission().then(_ => {
              console.log('requested!');
            });
        }
    },[])



	const _storeData = async (ncompleto, email, client_id, user_id, vinculado, documento, foto ) => {
		
		try {
		  await AsyncStorage.setItem('ncompleto', ncompleto);
		  await AsyncStorage.setItem('email', email);
		  await AsyncStorage.setItem('client_id', client_id);
		  await AsyncStorage.setItem('user_id', user_id);
		  await AsyncStorage.setItem('vinculado', vinculado);	  
		  await AsyncStorage.setItem('documento', documento);
		  await AsyncStorage.setItem('foto', foto);		  
		  props.navigation.navigate('HomeScreen');
		} catch (error) {
			console.warn('Error al escribir en storage')
		}
	 };

	function onChangeDataHandler( e, name ){

	 	const { text } = e.nativeEvent;

		setData({
			...data,
			[name] : text
		})
	}


	function onPressLogin() {
		axios.post('https://app.chseguros.com.co/api/authApp', data ).then(res => {
			console.log(res.data);
			//console.log(res.data.nombre, res.data.apellido, res.data.email)
			var ncompleto = res.data.nombre;
			var email=res.data.email;
			var client_id=res.data.client_id;
			var use_id=res.data.user_id;
			var vinculado=res.data.vinculado;
			//var documento=res.data.user_id;
			var documento= res.data.number_document;
			var foto=res.data.photo;
			_storeData(ncompleto, email, `${client_id}`, `${use_id}`,`${vinculado}`, `${documento}`, `${foto}`)

		  }).catch(error=>{
			Alert.alert ('Error al iniciar sesión','Usuario o contraseña invalida')			
	  	})

	}



if(!fontsLoaded) return <SafeAreaView style={{flex:1}}>
    <Text>Cargando</Text>
</SafeAreaView>

return <SafeAreaView style={{flex:1, backgroundColor: '#2e2f55'}}>
	
  <StatusBar backgroundColor="#fff"
      barStyle="light-content"/>
	<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
	    <View style={styles.containerlogin}>
        <View style={styles.logocontenedor}>
            <Image source={require( './../assets/Img/logo.png')} style={styles.logo} />
            <Text style={styles.textodescripcion}>Obtén los beneficios de ser cliente</Text>
        </View>
        <View style={styles.infocontenedor}>        
		        <View style={styles.inputFondo}>
		            <Icon name="person" width={20} height={20} fill="#7E8CBA" />
		            <TextInput placeholder="Usuario" style={styles.input} placeholderTextColor="#8E9AC3" name="email" value={data.email} keyboardType="email-address" returnKeyType="next" onChange={(evt)=>onChangeDataHandler(evt, 'email')} />

		        </View>
		        <View style={styles.inputFondo}>
		            <Icon name="unlock" width={20} height={20} fill="#7E8CBA" />
		            <TextInput secureTextEntry={true} placeholder="Ingresa contraseña" style={styles.input} placeholderTextColor="#8E9AC3" name="password" value={data.password} onChange={(evt)=>onChangeDataHandler(evt, 'password')} />
		        </View>
		        <TouchableOpacity>
		            <View style={styles.botoncontenedor}>
		                <Button title="Iniciar Sesión" type="button" style={styles.boton} color="white" onPress={()=>onPressLogin()} />
		            </View>
		        </TouchableOpacity>
        </View>
    </View>
	</KeyboardAvoidingView>

</SafeAreaView>

}



export default LoginScreen;