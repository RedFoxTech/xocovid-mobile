import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const AlertExample = () => {
    const showAlert = () =>{
       Alert.alert(
          'You need to...'
       )
    }
    return showAlert
    return (
       <TouchableOpacity onPress = {showAlert} style = {styles.button}>
          <Text>Alert</Text>
       </TouchableOpacity>
    )
 }
 export default AlertExample
 
 const styles = StyleSheet.create ({
    button: {
       backgroundColor: '#4ba37b',
       width: 100,
       borderRadius: 50,
       alignItems: 'center',
       marginTop: 100
    }
 })