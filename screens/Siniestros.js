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
import { WebView } from 'react-native-webview';
// import LottieView from 'lottie-react-native';
// import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-community/async-storage'


const Card = function({ image,title,title1, title2, date,date1, color, progress}) {
  return (
    <View style={styles.cardWrapper1}>
      <View style={[styles.cardBody2]}>
        <View>
          <Text style={styles.cardTextTitle}>{title1}</Text>
          <Text style={styles.cardTextDate2}>{date}</Text>
          <Icon name="arrow-right" width={30} height={30} fill="white" style={styles.detalles2}  />
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
      fontsLoaded: false,
      polizas:[],
      bind:[],
      user_id:'',
      client_id:'',
      ncompleto:'',
      documento:'',
    }

    this._retrieveData = this._retrieveData.bind(this)

  }


  componentDidMount() {
    this._loadAssetAsync()
    this._retrieveData()
    this.onPressPoliza()

   // console.warn("CLientID", this.state.client_id)


  }
   

  async  _retrieveData(){
    try {
      const ncompleto = await AsyncStorage.getItem('ncompleto');
      const client_id = await AsyncStorage.getItem('client_id');
      const user_id = await AsyncStorage.getItem('user_id');
      const documento = await AsyncStorage.getItem('documento');

      if (ncompleto !== null) {
        //console.warn(ncompleto);
        this.setState({ ncompleto: ncompleto })
        this.setState({ client_id: client_id })
        this.setState({ user_id: user_id })
        this.setState({ documento: documento })

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

    this.setState({ fontsLoaded:true })

  }
  


  



    onPressPoliza() {
    // console.warn("Ejecuntando query")




   console.log("CLientID22222", this.props.route.params.data_user.documento)

        axios.get('https://app.chseguros.com.co/api/clients/policies/'+this.props.route.params.data_user.documento)
        .then(res => {
        //console.warn(JSON.stringify(res.data))
        console.warn(res.data);
        this.setState({'polizas':res.data.policies}),
        this.setState({'bind':res.data.binds})
       /*this.setState({ numero:res.data.number_policies})
        this.setState({ estado:res.data.state_policies })
        this.setState({ asegurado:res.data.name_insured })
        this.setState({ aseguradora:res.data.insurers})
        this.setState({ ramo:res.data.branch })
        this.setState({ tomador:res.data.name_taker })
        this.setState({ inicio:res.data.start_date })
        this.setState({ fin:res.data.end_date })
        this.setState({ riesgo:res.data.risk }) */
       

      })

      .catch( (error)=> {


        Alert.alert ('Error de consulta','No se ha encontrado pólizas')

        console.log(error)

        
  })   


}




  MainView() {
      const {navigate} = this.props.navigation;

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
            <Text style={ styles.dayWrapper }>Reporta un Siniestro</Text>
            <Text style={ styles.dateWrapper}>¿Con cúal de tus pólizas está asociado?</Text>
          </View>
          <View style={ styles.menuWrapperPoliza }>
          </View>
        </View>


            <ScrollView style={styles.scrollView1}>


              <TouchableOpacity onPress={() => {navigate('Shock', {branch: "148", id_client : this.state.client_id})}}>
                <Card
                  title1={`AUTOMOVILES`}  
                  progress="100%"
                  date={"REPORTAR UN SINIESTRO"}  />
              </TouchableOpacity>

            {/* { this.state.polizas && 
            this.state.polizas.map((item,key)=>{
            return <TouchableOpacity onPress={() => {navigate('Shock')}}>
            <Card
              title1={`${item.branch_data.name}`}  
              progress="100%"
              date={item.insurers_data.name}  />
               </TouchableOpacity>
              })
              }    */}




              {/* {
            this.state.bind && 
            this.state.bind.map((item1,key1)=>{
            return <TouchableOpacity onPress={() => {navigate('Shock')}}>
            <Card
              title1={`${item1.policie_parent.branch_data.name}`}   
              progress="100%"
              date={item1.policie_parent.insurers_data.name}  />
               </TouchableOpacity>
              })
              }    */}
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
  }
}

export default Movilidad;