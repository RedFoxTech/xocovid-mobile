import { ApplicationProvider, Input, Layout, Text, Button } from '@ui-kitten/components'
import { mapping, light as lightTheme } from '@eva-design/eva'

import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Formik } from 'formik';

import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDfmiiASY6m5h_sZaH3J9z-sGflCAWxzsY",
  authDomain: "redfox-nearid.firebaseapp.com",
  databaseURL: "https://redfox-nearid.firebaseio.com",
  projectId: "redfox-nearid",
  storageBucket: "redfox-nearid.appspot.com",
  messagingSenderId: "76166229815",
  appId: "1:76166229815:web:8a8919cd10587a33b3f4b2",
  measurementId: "G-X0YY82TX5G"
}

firebase.initializeApp(firebaseConfig)
firebase.auth().languageCode = 'pt'

const provider = new firebase.auth.GoogleAuthProvider()

const createUser = () => {
  console.log('create user')

  return firebase.auth().createUserWithEmailAndPassword('israeldantasleite@gmail.com', '12341354351352').catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    // ...
  })
}

const singIn =  (navigation, setMsgError) => (email = 'israeldantasleite@gmail.com', password = '12341354351352') => () =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log('data: ', data)
        navigation.navigate('Maps')
      }).catch(() => setMsgError('Email ou senha invalidos'))
}

const loginGoogle = () => {
  console.log('google press')
  return firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    console.log('result: ', result)
    var token = result.credential.accessToken
    // The signed-in user info.
    var user = result.user
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    console.log('cathc google ', error)
    var errorCode = error.code
    var errorMessage = error.message
    // The email of the user's account used.
    var email = error.email
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential
    // ...
  })
}

const screenWidth = Dimensions.get('screen').width - 20
const singInFunc = (navigation) => () => {
    singIn().then(data => {
      console.log('data: ', data)
      navigation.navigate('Maps')
    }).catch(() => setMsgError('Email ou senha invalidos'))
}
const Login = ({ navigation }) => {
  const [disabledButton, setDisabledButton] = React.useState(true)
  const [msg, setMsgError] = React.useState('')
  const [email, setEmail] = React.useState(undefined)
  const [password, setPassword] = React.useState(undefined)
  const desableButtonChange = () => {
    setDisabledButton(!disabledButton)
  }
  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>
        Entre com seu email e senha: {msg}
      </Text>
      <Input
        key='12'
        style={styles.input}
        labelStyle={styles.inputLabel}
        value={email}
        onChangeText={setEmail}
        label='Email'
        placeholder='Digite o seu email'
      />
      <Input
        key='123'
        style={styles.input}
        labelStyle={styles.inputLabel}
        value={password}
        onChangeText={setPassword}
        label='Senha'
        placeholder='Digite a sua senha'
      />
      <Text style={styles.forgetPassword}> Esqueci minha senha! </Text>
      <Button style={styles.loginBtn} onPress={singIn(navigation, setMsgError)(email, password)}> ENTRAR </Button>
      <TouchableOpacity
        style={styles.containerRegister}
        onPress={() => navigation.navigate('Register')}
      >
        <Text>
          Não tem conta?
        </Text>
        <Text style={styles.register}>
          CADASTRE-SE
        </Text>
      </TouchableOpacity>
      <Text style={styles.orEnter}>
        ou entre com
      </Text>
      {/* <View style={styles.socialMediaContainer}>
        <Button style={{ ...styles.gBtn, ...styles.socialMediaBtn }} onPress={loginGoogle}>
          <Text> G </Text>
          <Text> Google </Text>
        </Button>
        <Button style={{ ...styles.socialMediaBtn, ...styles.fBtn }} >
          <Text style={styles.fBtnText}> F </Text>
          <Text style={styles.fBtnText}> Facebook </Text>
        </Button>
      </View> */}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  socialMediaContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  socialMediaBtn: {
    flex: 1
  },
  gBtn: {
    backgroundColor: '#FFF',
    borderColor: '#D3D8DC',
    marginRight: 5
  },
  fBtn: {
    backgroundColor: '#425D85',
    borderWidth: 0,
    marginLeft: 5
  },
  fBtnText: {
    color: '#FFF'
  },
  orEnter: {
    marginTop: 40,
    marginBottom: 20,
    color: '#74848B'
  },
  input: {
    backgroundColor: '#ECEFF1',
  },
  inputLabel: {
    color: '#414A4E'
  },
  forgetPassword: {
    textAlign: 'left',
    width: screenWidth,
    fontWeight: 'normal',
    color: '#414A4E',
    letterSpacing: 0.4
  },
  title: {
    textAlign: 'left',
    width: screenWidth,
    fontSize: 20,
    marginBottom: 32
  },
  register: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  },
  containerRegister: {
    display: 'flex',
    flexDirection: 'row',
  },
  loginBtn: {
    margin: 20,
    width: screenWidth,
    backgroundColor: '#103458',
    borderWidth: 0
  }
})
export default Login