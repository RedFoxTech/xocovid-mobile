import * as React from 'react'
import { Platform, StyleSheet, View, Dimensions } from 'react-native'
import MapView, { Polygon, Marker } from 'react-native-maps'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { findLocation } from './../services/geolocation'
import { updateOrCreateUserStatus } from './../services/userStatus'
import { showMessage } from 'react-native-flash-message';

import {
  Button,
  Text,
  Layout,
  Toggle
} from '@ui-kitten/components'

import ModalGuideLine from './../components/Modal'

const buttonTextStyle = {
  color: '#393939'
};

const selectAppearance = selected =>  selected === true ? 'filled' : 'outline'

class Classification extends React.Component {
  constructor(props) {
    super(props)
    this.setSelected = this.setSelected.bind(this)
  }
  state = {
    checked: false,
    visibleModal: false,
    suspiciousPeople: false,
    casesConfirmed: false,
    yourCaseConfirmed: false,
  }
  onNextStep = () => this.forceUpdate()
  requestUserStatus = params => location => {
    updateOrCreateUserStatus({ 
      ...params,
      point: [location.coords.latitude, location.coords.longitude]
     })
  }
  onSubmitProgress = (e) => {
    const symptoms = this.data.filter(item => item.selected).map(i => i.text)

    findLocation()
      .then(this.requestUserStatus({ symptoms, probability: 1, ...this.state }))
      .then(this.setState({ visibleModal: true }))
  }
  data = [
    { text: 'Cansaço', selected: false },
    { text: 'Congestão nasal', selected: false },
    { text: 'Coriza', selected: false },
    { text: 'Dificuldade de respirar', selected: false },
    { text: 'Dor de cabeça', selected: false },
    { text: 'Dor de garganta', selected: false },
    { text: 'Dor no corpo', selected: false },
    { text: 'Febre', selected: false },
    { text: 'Tosse', selected: false },
    { text: 'Mal star em geral', selected: false },
  ];

  setSelected() {
    return item => () => {
      item.selected = !item.selected
      this.forceUpdate()
    }
  }

  submitForm() {

  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
          <ProgressSteps style={styles.ProgressSteps}>
              <ProgressStep label="" nextBtnText='Confirmar' nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                  <Layout style={styles.container}> 
                    <Text>O que você está sentindo?</Text>
                    <Layout style={styles.containerButtons}> 
                      { 
                        this.data.map((item, i) => {
                          return <Button key={i} style={styles.button} onPress={this.setSelected(this.data)(item)} appearance={selectAppearance(item.selected)}>{item.text}</Button>
                        })
                      }
                    </Layout>
                    <Layout style={styles.buttonContainer}>
                      <Button style={styles.buttonBottom} appearance='filled'>Confirmar</Button>
                    </Layout>
                  </Layout>
              </ProgressStep>
              <ProgressStep label="" nextBtnTextStyle={buttonTextStyle}  nextBtnText='Confirmar' previousBtnText='Voltar' previousBtnTextStyle={buttonTextStyle}>
                  <View style={{ alignItems: 'center' }}>
                      <Text>Teve contato com alguma pessoa com caso suspeito?</Text>
                      <Layout style={styles.containerButtons}> 
                        <Button status='danger' style={styles.button} onPress={() => this.setState({ suspiciousPeople: true })}>Sim</Button>
                        <Button status='success' style={styles.button} onPress={() => this.setState({ suspiciousPeople: false })}>Não</Button>
                      </Layout>
                      <Layout>
                      </Layout>
                  </View>
              </ProgressStep>
              <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}  nextBtnText='Confirmar' previousBtnText='Voltar' onNext={this.onNextStep}>
                  <View style={{ alignItems: 'center' }}>
                  <Text>Teve contato com alguma pessoa com caso confirmado nos ultimos 15 dias?</Text>
                      <Layout style={styles.containerButtons}> 
                        <Button status='danger' style={styles.button} onPress={() => this.setState({ casesConfirmed: true })}>Sim</Button>
                        <Button status='success' style={styles.button} onPress={() => this.setState({ casesConfirmed: false })}>Não</Button>
                      </Layout>
                  </View>
              </ProgressStep>
              <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}  nextBtnText='Confirmar' previousBtnText='Voltar' onNext={this.onNextStep}>
                  <View style={{ alignItems: 'center' }}>
                  <Text>Você teve é positivo para o covid-19?</Text>
                      <Layout style={styles.containerButtons}> 
                        <Button status='danger' style={styles.button} onPress={() => this.setState({ yourCaseConfirmed: true })}>Sim</Button>
                        <Button status='success' style={styles.button} onPress={() => this.setState({ yourCaseConfirmed: false })}>Não</Button>
                      </Layout>
                  </View>
              </ProgressStep>
              <ProgressStep onSubmit={this.onSubmitProgress} label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}  finishBtnText='Confirmar' previousBtnText='Voltar'>
                  <View style={{ alignItems: 'center' }}>
                      <Text>Esteve em algum outro pais nos ultimos 14 dias?</Text>
                      <Layout style={styles.containerButtons}> 
                        <Button status='danger' style={styles.button} onPress={() => this.setState({ casesConfirmed: true })}>Sim</Button>
                        <Button status='success' style={styles.button} onPress={() => this.setState({ casesConfirmed: false })}>Não</Button>
                        {/* <Text>{JSON.stringify(this.state)}</Text>
                        <Text>{JSON.stringify(this.data)}</Text> */}
                      </Layout>
                      <ModalGuideLine nav={() => this.props.navigation.navigate('Maps')} visible={this.state.visibleModal}/>
                      
                  </View>
              </ProgressStep>
          </ProgressSteps>
      </View>)
  }
}

export default Classification

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ProgressSteps: {
    flex: 1,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 20
  },
  buttonBottom: { 
    maxHeight: Dimensions.get('window').height * 0.5
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
  }
});