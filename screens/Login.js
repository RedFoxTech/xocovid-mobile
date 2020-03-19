import { ApplicationProvider, Input, Layout, Text, Button } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

import { StyleSheet } from 'react-native'

import React from 'react'

function Login({ navigation })  {
    return (
      <Layout style={styles.container}>
        <Text>
          Entre com seu email e senha:
        </Text>
        <Input
          label='Email'
          placeholder='Digite o seu email'
        />
        <Input
          label='Senha'
          placeholder='Digite a sua senha'
        />
        <Button style={styles.btn} onPress={() => navigation.navigate('Maps')}> Entrar </Button>
        <Button style={styles.btn} > Cadastre-se </Button>
      </Layout>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 10
  },
  btn: {
    margin: 12
  }
})
export default Login