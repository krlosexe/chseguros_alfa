import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function BotonSimple(props) {



  return (
    <View style={{ borderWidth: 1, borderColor: '#0af0817d', width: '47%', borderRadius: 15, margin: 5, height: 60 }}>
      <TouchableOpacity onPress={() => { navigate('Shop') }}>
        <Image style={{ width: 40, height: 40, position: 'absolute', marginTop: 8, left: 10, borderRadius: 10 }} resizeMode="cover" source={require('./../assets/Img/segu.png')} />
        <Text style={{ textAlign: 'center', left: 15, marginTop: 12, fontWeight: '700' }}>Comprar</Text>
        <Text style={{ textAlign: 'center', left: 15 }}>En linea</Text>
      </TouchableOpacity>
    </View>

  );
}
export default BotonSimple;