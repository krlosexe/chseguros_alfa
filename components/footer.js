import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Footer() {
  return(
    <View style={{ paddingTop: 20, paddingBottom: 20, backgroundColor: 'white' }}>
      <TouchableOpacity>
        <Text style={{ textAlign: 'center', fontWeight: '400', color: '#5680ff' }}>¿Tienes problemas para reportar?</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer;