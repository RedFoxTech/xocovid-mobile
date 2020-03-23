import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
import Pages from '../constants/Pages';

// import img from './../assets/images/'

export default class SplashScreen extends React.Component {

  state = {
    step: 0
  }

  navigation = null

  constructor(props) {
    super(props);

    const { navigation } = props
    this.navigation = navigation
  }
  steps = [
    {
      title: 'Bem vindo ao',
      brand: 'XOCOVID',
      text: 'O aplicativo para você visualizar a situação do coronavírus na sua cidade',
      image: require('../assets/images/logo.png')
    },
    {
      title: 'Mapa',
      text: 'Temos um mapa para você visualizar se existem pessoas próximas a você com suspeita e casos positivos do Covid-19',
      image: require('../assets/images/map.png')
    },
    {
      title: 'Cadastro',
      text: 'Para outras funções, você pode se cadastrar',
      image: require('./../assets/images/man.png')
    },
    {
      title: 'Sintomas',
      text: 'E saber o seu estado de saúde. Mas atenção, ele não será um diagnóstico',
      navigation: 'Home',
      image: require('./../assets/images/heart.png')
    }
  ]

  render() {
    const { step } = this.state;
    const { steps } = this;

    return (
      <Layout style={styles.screenContainer}>
        <Text style={styles.title}>{steps[step].title}</Text>
        { steps[step].brand ? <Text style={styles.brand}>{steps[step].brand}</Text> : null }
        <Text style={styles.text}>{steps[step].text}</Text>
        <View style={{ height: 100, justifyContent: 'flex-end' }}>
        </View>
        <Image
          style={{maxWidth: 250, maxHeight: 250, marginBottom: 30 }}
          source={steps[step].image}
        />
        <View style={{ backgroundColor: '#ECEFF1', width: 225, height: 8, borderRadius: 4 }}>
          <View style={{ backgroundColor: '#FF0059', height: '100%', width: `${100 / steps.length}%`, left: `${(100 / steps.length) * step}%`, borderRadius: 4 }} />
        </View>
        <View style={{ flexBasis: 'auto', flexGrow: 1 }} />
        <Button style={{ width: '100%', marginBottom: 48 }} onPress={() => step < steps.length - 1 ? this.setState({step: step + 1}) : this.navigation.navigate(Pages.HOME)}>
          PRÓXIMO
        </Button>
      </Layout >
    )
  }
}

SplashScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    paddingTop: 80,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    color: '#000D2F',
    letterSpacing: 0.15,
    marginBottom: 16
  },
  brand: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 40,
    color: '#FF0059',
    fontSize: 32,
    letterSpacing: 0.5,
    fontWeight: 'bold'
  },
  text: {
    textAlign: 'center',
    color: '#74848B',
    letterSpacing: 0.5,
    fontSize: 16,
    marginHorizontal: 10
  }
});
