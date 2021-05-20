import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
/*
 icon=''
 img={'./../assets/Img/segu.png'}
 color='#0af0817d'
 function={getFilter} />
*/


function BotonDouble(props) {




  return (

    <TouchableOpacity onPress={() => { props.function(props.value) }}
      style={{

        borderWidth: props.F===props.value?2:0, borderColor: props.F===props.value?'#0af0817d':'', 



        backgroundColor:"white",width: '47%', borderRadius: 15, margin: 5, height: 60,flexDirection: "row",
      }}>
{/*

      <Image style={{ width: 40, height: 40, position: 'absolute', marginTop: 8, left: 10, borderRadius: 10, resizeMode: "cover" }}
        source={require('./../assets/Img/segu.png')} />
*/}
 <View style={{ position: "absolute", left: 10, top: 15 }}>
        <Icon name={props.icon} width={30} height={30} fill={props.color} />
      </View>

      <View style={{ marginLeft: 40, flexDirection:"column" }}>
        <Text style={{ fontSize:16, textAlign: 'center', marginTop: 6, fontWeight: '700' }}>{props.line1}</Text>
        <Text style={{ fontSize:14, textAlign: 'center', marginTop: 0, left:10}}>{props.line2}</Text>
      </View>
     
    </TouchableOpacity>
  );
}
export default BotonDouble;