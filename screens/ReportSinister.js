
import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, Button, TouchableOpacity, StatusBar, ScrollView, StyleSheet} from "react-native";
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

import styles from './../Styles'
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import { ActionSheet } from 'react-native-cross-actionsheet'


var RNFS = require('react-native-fs');


export default class App extends Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true,
    motivo : "Seleccione un motivo"
  };

  async componentDidMount() {
    
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      
      console.log('chunk size', chunk);
      console.log('chunk size', chunk.byteLength);

      console.log('Base 64 size', data);
      // do something with audio chunk
    });
  }



  SelectOptions = () => {

    ActionSheet.options({
      options: [
        { text: 'Pérdidas parciales', onPress: () => this.setState({ motivo: 'Pérdidas parciales' }) },
        { text: 'Pérdidas totales', onPress: () => this.setState({ motivo: 'Pérdidas totales' }) },
        { text: 'Hurto', onPress: () => this.setState({ motivo: 'Hurto' }) },
      ],
      cancel: { onPress: () => console.log('cancel') }
    })

  }

  ReportSinister = async () => {

    await this.checkPermission();
    const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    files.map(async eachItem=> {
      if (eachItem.isFile()) {

        if(eachItem.name == "test.wav"){
          console.log(eachItem.name, "FILE DATA")
          console.log(eachItem.path, "FILE DATA")

          const file = await RNFS.readFile(eachItem.path, 'base64')

          const data = {
            ...this.props.route.params,
            motivo : this.state.motivo,
            file   : file
          }
          axios.post('https://app.chseguros.com.co/api/report/sinister', data)
          .then(res => {
            console.warn(res.data);
          })
          .catch( (error)=> {
              console.log(error.response)
          }) 
        }
      }
    });
  }
  

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ audioFile, recording: false });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };





  MainView() {
    const {navigate} = this.props.navigation;
    const { recording, paused, audioFile } = this.state;
return (
    <View style={styles.container}>  
     <StatusBar backgroundColor="#fff"
    barStyle="dark-content"/> 
      <View style={ styles.headerWrapper }>

        <View style={styles.navigation}>
        <TouchableOpacity onPress={() => {navigate('HomeScreen')}}>
         <Icon name="arrow-ios-back" width={30} height={30} fill="#14132A" />
         </TouchableOpacity>
          <View>
            <Image source={require('./../assets/logo-dark.png')} style={styles.logod} />
          </View>
           <View>
           <TouchableOpacity onPress={() => {navigate('Profile')}}>
            <Image source={require('./../assets/Img/Avatar.png')} style={styles.avatar} />
          </TouchableOpacity>
          </View>
        </View>
        <View style={ styles.greatingWrapperPolizas }>
          <Text style={ styles.dayWrapper }>Reportar un Siniestro</Text>
          <Text style={ styles.dateWrapper}>¿?</Text>
        </View>
        <View style={ styles.menuWrapperPoliza }>
        </View>
      </View>


          <ScrollView style={styles.scrollView1}>
              <TouchableOpacity onPress={() => {this.SelectOptions()}}>
                <View style={styles.cardWrapper1}>
                    <View style={[styles.cardBody2]}>
                      <View>
                        <Text style={styles.cardTextTitle}>{this.state.motivo}</Text>
                        <Text style={styles.cardTextDate2}></Text>
                        <Icon name="arrow-right" width={30} height={30} fill="white" style={styles.detalles2}  />
                      </View>
                    </View>
                  </View>
              </TouchableOpacity>

              <View style={{
                flexDirection : "row",
                justifyContent : "space-around",
                marginTop : 70
              }}>
                  <Button onPress={this.start} title="Grabar Audio" disabled={recording} />
                  <Button onPress={this.stop} title="Stop" disabled={!recording} />
                  {paused ? (
                    <Button onPress={this.play} title="Play" disabled={!audioFile} />
                  ) : (
                    <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
                  )}


              </View>



              <TouchableOpacity>
                <View style={styles.botoncontenedorvehicle}>
                    <Button title="Buscar" type="" style={styles.boton} color="white" onPress={this.ReportSinister} />
                </View>
            </TouchableOpacity>


        </ScrollView>


        <View style={{paddingTop:20, paddingBottom:20,backgroundColor:'white'}}>
          <Text style={{textAlign:'center', fontWeight:'400', color:'#5680ff'}}>¿Tienes problemas para reportar?</Text>
        </View>

    </View>
  )
}



  render() {
    
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        { this.MainView() }
        </SafeAreaView>
    );


    // return (
    //   <View style={stylesReport.container}>
    //     <View style={stylesReport.row}>
    //       <Button onPress={this.start} title="Record" disabled={recording} />
    //       <Button onPress={this.stop} title="Stop" disabled={!recording} />
    //       {paused ? (
    //         <Button onPress={this.play} title="Play" disabled={!audioFile} />
    //       ) : (
    //         <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
    //       )}
    //     </View>
    //   </View>
    // );
  }
}

const stylesReport = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});