import { Layout, Text, Button } from '@ui-kitten/components';

import { StyleSheet, Dimensions } from 'react-native';
import React from 'react';

import MapView, { Polygon, Marker } from 'react-native-maps'

import { findPoints } from './../services/points'

import { findLocation } from './../services/geolocation'
import { updateOrCreateUserStatus } from './../services/userStatus'
import { showMessage, hideMessage } from 'react-native-flash-message';

class Maps extends React.Component {
    state = {
        location: false,
        errorMessage: null,
    }
    navigation = null
    points = []
    constructor (props) {
        super(props)
        
        const { navigation } = props
        this.navigation = navigation
        findLocation()
          .then(location => {
            findPoints({ ...location.coords }).then(data => {
              this.points = data.data
              this.forceUpdate()
            })
            this.setState({ location })
          })
          .catch(err => showMessage({
            message: 'Ocorreu um erro, por favor tente novamente',
            type: 'danger'
          }))
        
    }
    userStatus = () => {
      showMessage({
        message: 'Registrando...',
        type: 'info'
      })
      updateOrCreateUserStatus({
        probability: 0,
        symptoms: [],
        point: [this.state.location.coords.latitude, this.state.location.coords.longitude]
       }) 
    }
    render() {
      return (
          <>
              <Layout style={styles.containerMargin}>
                  <Text>Como você está se sentindo? </Text>
              </Layout>
              <Layout style={styles.container}>
                  <Layout style={styles.layout50} level='2'>
                      <Button status='success' onPress={this.userStatus}>Bem</Button>
                  </Layout>

                  <Layout style={styles.layout50} level='1'>
                      <Button onPress={() => this.navigation.navigate('Classification')} status='danger'>Mal</Button>
                  </Layout>
              </Layout>
              { this.state.location ? <MapView style={styles.mapStyle} >
                <Marker
                    coordinate={{ 
                      latitude: this.state.location.coords.latitude,
                      longitude: this.state.location.coords.longitude
                    }}              
                    pinColor={'#000fff'}
                  />
                {
                this.points.map((item, i) => <Marker
                  key={i}
                  coordinate={{ 
                    latitude: item.coordinates[0],
                    longitude: item.coordinates[1]
                  }}              
                  pinColor={'#000000'}
                />)
              }
              </MapView> : <Text> carregando...</Text> }
              <Layout style={styles.container}>

                  <Layout style={styles.layout} level='2'>
                      <Text>{this.points.length}</Text>
                      <Text>Casos</Text>
                  </Layout>

                  <Layout style={styles.layoutCenter} level='1'>
                      <Text>Casos próximos a você</Text>
                  </Layout>
              </Layout>
          </>
      )
    }
}


const styles = StyleSheet.create({

    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
      flex: 1,
      zIndex: -1,
    },
    marker: {
      marginLeft: 46,
      marginTop: 33,
      fontWeight: 'bold',
    },
    container: {
        flex: 1,
        zIndex: 1,
        flexDirection: 'row',
        maxWidth: Dimensions.get('window').width * 0.9,
        maxHeight: Dimensions.get('window').height * 0.07,
        marginHorizontal: 12,
        justifyContent: 'center',
    },
    containerMargin: {
        flex: 1,
        zIndex: 1,
        flexDirection: 'row',
        maxWidth: Dimensions.get('window').width * 0.9,
        maxHeight: Dimensions.get('window').height * 0.07,
        marginHorizontal: 12,
        marginTop: 10,
        marginBottom: -30,
        justifyContent: 'center',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: Dimensions.get('window').width * 0.2
    },
    layout50: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: Dimensions.get('window').width * 0.5,
        minWidth: Dimensions.get('window').width * 0.4
    },
    layoutCenter: {
        flex: 1,
        maxWidth: Dimensions.get('window').width * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

  

export default Maps