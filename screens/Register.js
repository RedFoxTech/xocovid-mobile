import React from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';
import { Button } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';
import ErrorMessages from '../constants/ErrorMessages';
// import Alert from '../components/Alert';

import { createUser } from './../services/user'

const screenWidth = Dimensions.get('screen').width - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    textAlign: 'left',
    width: screenWidth,
    fontSize: 20,
    marginBottom: 32
  },
  input: {
    backgroundColor: '#ECEFF1',
  },
  inputLabel: {
    color: '#414A4E'
  },
  loginBtn: {
    margin: 20,
    width: screenWidth,
    backgroundColor: '#103458',
    borderWidth: 0
  }
})

const Register = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(ErrorMessages.required),
    age: Yup.number()
      .required(ErrorMessages.required),
    email: Yup.string()
      .email(ErrorMessages.email)
      .required(ErrorMessages.required),
    password: Yup.string()
      .required(ErrorMessages.required)
  });
  const formatNumberMessage = message => message && typeof message === 'string' && /age must be a `number`/.test(message) && ErrorMessages.number;

  
  const handleSubmit = values => {
    createUser(values)
    .then(() => Alert.alert(
      'Cadastrado',
      'Perfil cadastrado com sucesso!',
      [
        {text: 'OK', onPress: () => navigation.navigate('Home')},
    ]))
    .catch(() => Alert.alert( 'Ocorreu um erro', 'Verifique os dados ou tente mais tarde'))
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <Formik
          initialValues={{ password: '', email: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          isInitialValid
        >
          {props => {
            const { values: { email, password, name, age }, handleSubmit, handleChange, handleBlur, errors, touched } = props
  
            return (
              <>
              <Text>{JSON.stringify(errors)}</Text>
              <Text>{JSON.stringify(touched)}</Text>
                <Input
                  style={styles.input}
                  labelStyle={styles.inputLabel}
                  label="Nome completo"
                  placeholder="Digite seu nome completo"
                  onChangeText={handleChange('name')}
                  value={name}
                  onBlur={handleBlur('name')}
                  caption={touched.name && errors.name}
                />
                <Input
                  style={styles.input}
                  labelStyle={styles.inputLabel}
                  label='Email'
                  onChangeText={handleChange('email')}
                  placeholder='Digite o seu email'
                  type="email"
                  value={email}
                  onBlur={handleBlur('email')}
                  caption={touched.email && errors.email}
                />
                <Input
                  style={styles.input}
                  labelStyle={styles.inputLabel}
                  label="Idade"
                  placeholder="Digite sua idade"
                  onChangeText={handleChange('age')}
                  value={age}
                  onBlur={handleBlur('age')}
                  caption={formatNumberMessage(touched.age && errors.age)}
                  type="number"
                />
                <Input
                  style={styles.input}
                  labelStyle={styles.inputLabel}
                  label='Senha'
                  type="password"
                  onChangeText={handleChange('password')}
                  placeholder='Digite a sua senha'
                  value={password}
                  onBlur={handleBlur('password')}
                  caption={touched.password && errors.password}
                />
                <Button style={styles.loginBtn} onPress={handleSubmit}> CADASTRAR </Button>
              </>
            )
          }}
        </Formik>
    </View>
  );
}

export default Register;
