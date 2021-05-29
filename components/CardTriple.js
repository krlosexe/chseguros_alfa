import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';

function CardSimple(props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => props.go(props.to, props.data)}>
      <View style={{ width: "90%", left: 10 }}>
        <Text style={styles.text}>{props.data.name_affiliate}</Text>
        <Text style={styles.textSmall}>C.I.: {props.data.document_affiliate}</Text>
        <Text style={styles.textSmall}>Póliza: {props.data.id_policie}</Text>
      </View>
      <Icon name="arrow-right" width={30} height={30} fill="#849DF7" style={{ top: 12 }} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    height: 75,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 15,
    borderColor: "#ccc",
    borderWidth: 0.3
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 20,
    color: "#000000",
    textAlign: "left"
  },
  textSmall: {
    fontSize: 12,
    lineHeight: 15,
    color: "#787878",
    textAlign: "left"
  }
})
export default CardSimple;