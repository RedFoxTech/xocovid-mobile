import * as React from 'react'
import { Platform, StyleSheet, View, Dimensions } from 'react-native'
import MapView, { Polygon, Marker } from 'react-native-maps'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'; //f50052

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
import Pages from '../constants/Pages';

const buttonTextStyle = {
  color: '#393939'
};

const selectAppearance = selected => selected === true ? 'filled' : 'outline'

class Classification extends React.Component {
  constructor(props) {
    super(props)
    this.setSelected = this.setSelected.bind(this)
  }
  state = {
    checked: false,
    visibleModal: false,
    suspiciousPeople: null,
    casesConfirmed: null,
    yourCaseConfirmed: null,
    traveled: null
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
    const { suspiciousPeople, casesConfirmed, yourCaseConfirmed, traveled } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep label="" nextBtnText='Confirmar' nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
            <Layout style={styles.container}>
              <Text>O que você está sentindo?</Text>
              <Layout style={styles.containerButtons}>
                {
                  this.data.map((item, i) => {
                    return (
                      <Button
                        key={i}
                        textStyle={item.selected ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                        style={item.selected ? styles.buttonFilled : styles.button}
                        onPress={this.setSelected(this.data)(item)}
                      >{item.text}</Button>)
                  })
                }
              </Layout>
            </Layout>
          </ProgressStep>
          <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} nextBtnText='Confirmar' previousBtnText='Voltar' previousBtnTextStyle={buttonTextStyle}>
            <Layout style={styles.container}>
              <View style={{ alignItems: 'center' }}>
                <Text>Teve contato com alguma pessoa com caso suspeito?</Text>
                <Layout style={styles.containerButtons}>
                  <Button
                    textStyle={suspiciousPeople === true ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                    style={suspiciousPeople === true ? styles.buttonFilled : styles.button}
                    onPress={() => this.setState({ suspiciousPeople: true })}
                  >Sim</Button>
                  <Button
                    textStyle={suspiciousPeople === false ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                    style={suspiciousPeople === false ? styles.buttonFilled : styles.button}
                    onPress={() => this.setState({ suspiciousPeople: false })}
                  >Não</Button>
                </Layout>
                <Layout>
                </Layout>
              </View>
            </Layout>
          </ProgressStep>
          <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnText='Confirmar' previousBtnText='Voltar' onNext={this.onNextStep}>
            <Layout style={styles.container}>
              <View style={{ alignItems: 'center' }}>
                <Text>Teve contato com alguma pessoa com caso confirmado nos ultimos 15 dias?</Text>
                <Layout style={styles.containerButtons}>
                  <Button
                    textStyle={casesConfirmed === true ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                    style={casesConfirmed === true ? styles.buttonFilled : styles.button}
                    onPress={() => this.setState({ casesConfirmed: true })}
                  >Sim</Button>
                  <Button
                    textStyle={casesConfirmed === false ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                    style={casesConfirmed === false ? styles.buttonFilled : styles.button}
                    onPress={() => this.setState({ casesConfirmed: false })}
                  >Não</Button>
                </Layout>
              </View>
            </Layout>
          </ProgressStep>
          <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnText='Confirmar' previousBtnText='Voltar' onNext={this.onNextStep}>
            <Layout style={styles.container}>
              <View>
                <Text>Você teve é positivo para o covid-19?</Text>
                <Layout style={styles.containerButtons}>
                  <Button
                    textStyle={yourCaseConfirmed === true ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                    style={yourCaseConfirmed === true ? styles.buttonFilled : styles.button}
                    onPress={() => this.setState({ yourCaseConfirmed: true })}
                  >Sim</Button>
                  <Button
                    textStyle={yourCaseConfirmed === false ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                    style={yourCaseConfirmed === false ? styles.buttonFilled : styles.button}
                    onPress={() => this.setState({ yourCaseConfirmed: false })}
                  >Não</Button>
                </Layout>
              </View>
            </Layout>
          </ProgressStep>
          <ProgressStep onSubmit={this.onSubmitProgress} label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} finishBtnText='Confirmar' previousBtnText='Voltar'>
            <Layout style={styles.container}>
              <View style={{ alignItems: 'center' }}>
                <Text>Esteve em algum outro pais nos ultimos 14 dias?</Text>
                <Layout style={styles.containerButtons}>
                  <Button
                    textStyle={traveled === true ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                    style={traveled === true ? styles.buttonFilled : styles.button}
                    onPress={() => this.setState({ traveled: true })}
                  >Sim</Button>
                  <Button
                    textStyle={traveled === false ? styles.buttonFilledTextStyle : styles.buttonTextStyle}
                    style={traveled === false ? styles.buttonFilled : styles.button}
                    onPress={() => this.setState({ traveled: false })}
                  >Não</Button>
                  {/* <Text>{JSON.stringify(this.state)}</Text>
                        <Text>{JSON.stringify(this.data)}</Text> */}
                </Layout>
                <ModalGuideLine nav={() => this.props.navigation.navigate('Maps')} visible={this.state.visibleModal} />

              </View>
            </Layout>
          </ProgressStep>
        </ProgressSteps>
      </View>)
  }
}

export default Classification

const progressStepsStyle = {
  activeStepIconBorderColor: '#FD0057',
  activeLabelColor: '#FD0057',
  activeStepNumColor: '#FD0057',
  activeStepIconColor: '#FD0057',
  completedStepIconColor: '#FD0057',
  completedProgressBarColor: '#FD0057',
  completedCheckColor: '#FD0057',
  progressBarColor: '#D3D8DC',
  disabledStepIconColor: '#D3D8DC',
  labelColor: '#D3D8DC',
  disabledStepNumColor: '#D3D8DC',
  borderWidth: 4
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexBasis: 'auto',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16
  },
  ProgressSteps: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  button: {
    margin: 10,
    backgroundColor: 'transparent',
    borderColor: '#FD0057',
    borderWidth: 2,
    borderRadius: 8
  },
  buttonTextStyle: {
    color: '#FD0057'
  },
  buttonFilled: {
    margin: 10,
    backgroundColor: '#FD0057',
    borderColor: '#FD0057',
    borderWidth: 2,
    borderRadius: 8
  },
  buttonFilledTextStyle: {
    color: '#FFFFFF'
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