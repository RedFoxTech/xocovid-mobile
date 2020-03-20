import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';


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
  const errorMessages = {
    required: 'Campo obrigatório.',
    email: 'Formato inválido.',
    number: 'Campo precisa ser um número.'
  };

  const validationSchema = Yup.object().shape({
    displayName: Yup.string()
      .required(errorMessages.required),
    age: Yup.number()
      .required(errorMessages.required),
    email: Yup.string()
      .email(errorMessages.email)
      .required(errorMessages.required),
    password: Yup.string()
      .required(errorMessages.required)
  });
  const formatNumberMessage = message => message && typeof message === 'string' && /age must be a `number`/.test(message) && errorMessages.number;

  const handleSubmit = values => {
    console.log(values);

    navigation.navigate('Maps');
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
            const { values: { email, password, displayName, age }, handleSubmit, handleChange, handleBlur, errors, touched } = props
  
            return (
              <>
              <Text>{JSON.stringify(errors)}</Text>
              <Text>{JSON.stringify(touched)}</Text>
                <Input
                  style={styles.input}
                  labelStyle={styles.inputLabel}
                  label="Nome completo"
                  placeholder="Digite seu nome completo"
                  onChangeText={handleChange('displayName')}
                  value={displayName}
                  onBlur={handleBlur('displayName')}
                  caption={touched.displayName && errors.displayName}
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
