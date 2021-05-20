import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import styles from './../Styles';
import { Icon } from 'react-native-eva-icons';






function Header(props) {


console.log("props", props)

const { navigation } = props.props



function goToScreen(screen) {
  navigation.navigate(screen, { randomCode: Math.random() })
}



  return(
    <View style={styles.navigation}>
    <TouchableOpacity onPress={() => { goToScreen(props.return)}}>
     <Icon name="arrow-ios-back" width={30} height={30} fill="#14132A" />
     </TouchableOpacity>
      <View>
        <Image source={require('./../assets/logo-dark.png')} style={styles.logod} />
      </View>
       <View>
       <TouchableOpacity onPress={() => {navigate('Profile')}}>

      
        {props.foto != null &&
         <Image style={{...styles.avatar, borderRadius : 20}} source={{ uri: `https://app.chseguros.com.co/img/usuarios/profile/${props.foto}`}} />
       }
        {props.foto == null &&
          <Image source={require('./../Avatar.png')} style={styles.avatar} />
       }
      </TouchableOpacity>
      </View>
    </View>

  )
}

export default Header;