import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showMessage, hideMessage } from 'react-native-flash-message';

import axios from '../services/axios';
import Input from '../components/Input';
import ErrorMessages from '../constants/ErrorMessages';
import { loginUser } from '../services/user';
import { saveToken, getToken } from '../services/authenticate';

const screenWidth = Dimensions.get('screen').width - 20;

const Login = ({ navigation }) => {
  getToken().then(data => data ? navigation.navigate('Maps') : null)
  // getToken().then(console.log)
  const authenticateUser = ({ token }) => {
    console.log('token', token);
    saveToken(token);
  }

  const handleSubmit = data => {
    loginUser(data)
      .then(showMessage({
        message: "Entrando...",
        type: "info",
      }))
      .then(({ data }) => authenticateUser(data))
      .then(() => navigation.navigate('Maps'))
      .catch((err) => {        
        showMessage({
          type: 'danger',
          message: ErrorMessages.req
        })
      })
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(ErrorMessages.email)
      .required(ErrorMessages.required),
    password: Yup.string()
      .required(ErrorMessages.required)
  })

  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>
        Entre com seu email e senha:
      </Text>
      <Formik
        initialValues={{ password: '', email: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {props => {
          const { values: { email, password }, handleSubmit, handleChange, handleBlur, errors, touched } = props

          return (
            <>
              <Input
                name="email"
                style={styles.input}
                labelStyle={styles.inputLabel}
                label='Email'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                caption={touched.email && errors.email}
                placeholder='Digite o seu email'
                type="email"
                value={email}
              />
              <Input
                name="password"
                style={styles.input}
                labelStyle={styles.inputLabel}
                label='Senha'
                type="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                caption={touched.password && errors.password}
                placeholder='Digite a sua senha'
                value={password}
              />
              <Text style={styles.forgetPassword}> Esqueci minha senha! </Text>
              <Button style={styles.loginBtn} onPress={handleSubmit}> ENTRAR </Button>
            </>
          )
        }}
      </Formik>
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
      <View style={styles.socialMediaContainer}>
        <Button style={{ ...styles.gBtn, ...styles.socialMediaBtn }}>
          <Text> G </Text>
          <Text> Google </Text>
        </Button>
        <Button style={{ ...styles.socialMediaBtn, ...styles.fBtn }}>
          <Text style={styles.fBtnText}> F </Text>
          <Text style={styles.fBtnText}> Facebook </Text>
        </Button>
      </View>
    </Layout>
  );
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