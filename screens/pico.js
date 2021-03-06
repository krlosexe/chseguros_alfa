import React from "react";
import { WebView } from 'react-native-webview';
import {   
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Icon } from 'react-native-eva-icons';
import styles from './../Styles';

function pico(props){

 return (
  <SafeAreaView style={{flex:1, backgroundColor:'white'}}>      
 <StatusBar backgroundColor="#fff"
      barStyle="dark-content"/> 
     <View style={styles.containerPdf}>
              <View style={ styles.headerWrapperCotizar }>
                  <View style={styles.navigationCotizar}>
                      <TouchableOpacity onPress={()=> {props.navigation.navigate('HomeScreen')}}>
                          <Icon name="arrow-ios-back" width={30} height={30} fill="#14132A" />
                      </TouchableOpacity>
                      <View>
             <View>
              <Image source={require('./../assets/logo-dark.png')} style={styles.logod} />
            </View>
            </View>
                      <View>
                         <TouchableOpacity onPress={() => {props.navigation.navigate('Profile')}}>
                          <Image source={require('./../assets/Img/Avatar.png')} style={styles.avatar} />
                        </TouchableOpacity>
                      </View>
                  </View>
                 
              </View>

				  <View style={styles.container}>  
				          <WebView source={{ uri: 'https://www.pyphoy.com/'}} /> 
				  </View>


    </View>

</SafeAreaView> )
}


export default pico;
 