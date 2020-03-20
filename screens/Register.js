import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from '@ui-kitten/components';
import { Formik } from 'formik';
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
        >
          {props => {
            const { values: { email, password, displayName, age }, handleSubmit, handleChange } = props
  
            return (
              <>
                <Input
                  style={styles.input}
                  labelStyle={styles.inputLabel}
                  label="Nome completo"
                  placeholder="Digite seu nome completo"
                  onChangeText={handleChange('displayName')}
                  value={displayName}
                />
                <Input
                  style={styles.input}
                  labelStyle={styles.inputLabel}
                  label='Email'
                  onChangeText={handleChange('email')}
                  placeholder='Digite o seu email'
                  type="email"
                  value={email}
                />
                <Input
                  style={styles.input}
                  labelStyle={styles.inputLabel}
                  label="Idade"
                  placeholder="Digite sua idade"
                  onChangeText={handleChange('age')}
                  value={age}
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
