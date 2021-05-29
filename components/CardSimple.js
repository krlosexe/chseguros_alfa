import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';



function CardSimple(props) {
  const { navigation } = props.props

  
  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() })
  }


  return (
    <TouchableOpacity style={styles.btn} onPress={()=>goToScreen(props.go)}>
      <Text style={styles.text
      }>{props.text}</Text>
      <Icon name="arrow-right" width={30} height={30} fill="#849DF7" />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    height: 50,
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
    width: "90%",
    fontSize: 14,
    lineHeight: 25,
    color: "#000000",
    textAlign: "left"
  }
})
export default CardSimple;