import * as React from 'react'
import { Platform, StyleSheet, View, Dimensions } from 'react-native'
import MapView, { Polygon, Marker } from 'react-native-maps'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import {
  Button,
  Text,
  Layout,
  Toggle
} from '@ui-kitten/components'

import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

const buttonTextStyle = {
  color: '#393939'
};

const selectAppearance = selected =>  selected === true ? 'filled' : 'outline'

class Classification extends React.Component {
  constructor() {
    super()
    this.setSelected = this.setSelected.bind(this)
  }
  state = {
    checked: false
  }
  data = [
    { text: 'Cansaço', selected: false },
    { text: 'Congestão nasal', selected: true },
    { text: 'Coriza', selected: false },
    { text: 'Dificuldade de respirar', selected: false },
    { text: 'Dor de cabeça', selected: false },
    { text: 'Dor de garganta', selected: false },
    { text: 'Dor no corpo', selected: false },
    { text: 'Febre', selected: false },
    { text: 'Tosse', selected: false },
    { text: 'Mal start em geral', selected: false },
  ];

  setSelected() {
    
    return item => () => {
      console.log('item: ', item.selected, item.text)
      item.selected = !item.selected
      this.forceUpdate()
      console.log('item: ', item.selected, item.text)
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <ProgressSteps>
              <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} nextBtnText='Confirmar' previousBtnTextStyle={buttonTextStyle}>
                  <View style={{ alignItems: 'center' }}>
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
                  </View>
              </ProgressStep>
              <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                  <View style={{ alignItems: 'center' }}>
                      <Text>Teve contato com alguma pessoa com caso suspeito?</Text>
                      <Toggle
                        text={`Checked: ${this.state.checked}`}
                        checked={this.state.checked}
                        onChange={() => this.setState({ checked: !this.state.checked })}
                      />
                  </View>
              </ProgressStep>
              <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 2!</Text>
                  </View>
              </ProgressStep>
              <ProgressStep label="" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 2!</Text>
                  </View>
              </ProgressStep>
          </ProgressSteps>
      </View>)
    return (
      <>
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

      </>
    )
  }
}

export default Classification

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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