import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,

} from "react-native";
//import { ListItem } from 'react-native-elements';

// import BurgerMenu from './../src/components/BurgerMenu';
import styles from './../Styles';
import { Icon } from 'react-native-eva-icons';
import AsyncStorage from '@react-native-community/async-storage'



class Profile extends React.Component {



  static navigationOptions = {
    title: '',
    headerShown: false,
  };



  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      ncompleto: '',
      email: '',
      foto: ''
    }


    this.logout = this.logout.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }


  componentDidMount() {
    //this._loadAssetAsync()
    this._retrieveData()

  }
  onPress = () => {
    alert('fawfaw')
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




  async _retrieveData() {
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







  async logout() {
    console.log("logout")
    /*  try {
        await AsyncStorage.setItem('ncompleto', "");
        await AsyncStorage.setItem('email', "");
        await AsyncStorage.setItem('client_id', "");
        await AsyncStorage.setItem('user_id', "");
        await AsyncStorage.setItem('vinculado', "");
        await AsyncStorage.setItem('documento', "");
        await AsyncStorage.setItem('foto', "");
        props.navigation.navigate('Login');
      } catch (error) {
        console.warn('Error al escribir en storage')
      }*/
  };

























  async _retrieveData() {
    try {
      const ncompleto = await AsyncStorage.getItem('ncompleto');
      const email = await AsyncStorage.getItem('email');

      if (ncompleto !== null) {
        //console.warn(ncompleto);
        this.setState({ ncompleto: ncompleto })
        this.setState({ email: email })

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  MainView() {
    const { navigate } = this.props.navigation;


    return (

      <View style={styles.container}>
        <StatusBar backgroundColor="#fff"
          barStyle="dark-content" />
        <View style={styles.headerWrapper}>
          <View style={styles.navigation}>
            <TouchableOpacity onPress={() => { navigate('HomeScreen') }}>
              <Icon name="arrow-ios-back" width={30} height={30} fill="#14132A" />
            </TouchableOpacity>

          </View>

          <View style={styles.greatingWrapper}>
            <View style={styles.profileCabecera}>


              {
              // this.state.foto !== null && this.state.foto !== "" &&
              //  <Image style={styles.avatarprofile} source={{ uri: `https://app.chseguros.com.co/img/usuarios/profile/${this.state.foto}` }} />
              }

              {
               // this.state.foto == null && this.state.foto == '' &&
                <Image source={require('./../assets/Img/Avatar.png')} style={styles.avatarprofile} />
              }







            </View>
            <View>
              <Text style={styles.nombreProfile}>{this.state.ncompleto} </Text>
              <View style={styles.navigationProfile}>
                <Icon name="email" width={15} height={15} fill="#14132A" />
                <Text style={styles.emailProfile}> {this.state.email}</Text>
              </View>
              <View style={styles.navigationProfile}>
                <TouchableOpacity onPress={() => logout()}>
                  <Text style={styles.cerrarProfile}>Cerrar Sesión</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          <View>

          </View>
          <Text style={styles.versionProfile}>Versión 1.4</Text>


        </View>
        <ScrollView style={styles.scrollView}>


        </ScrollView>

      </View>
    )
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {  this.state.fontsLoaded ? <Text>Cargando</Text> : this.MainView()}
      </SafeAreaView>
    );
  }
}

export default Profile;