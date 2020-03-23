import { Layout, Text, Button } from '@ui-kitten/components';

import { StyleSheet, Dimensions, View } from 'react-native';
import React from 'react';

import MapView, { Polygon, Marker } from 'react-native-maps'

import { findPoints } from './../services/points'

import { findLocation } from './../services/geolocation'
import { updateOrCreateUserStatus } from './../services/userStatus'
import { showMessage, hideMessage } from 'react-native-flash-message';
import Pages from '../constants/Pages';
import ErrorMessages from '../constants/ErrorMessages';

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
            message: ErrorMessages.tryAgain,
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
            <Layout style={styles.containerLayout}>
              <Layout style={styles.containerTitle}>
                  <Text>Como você está se sentindo? </Text>
              </Layout>
              <Layout style={styles.itemLayout}>
                      <Button style={styles.buttonClassification} status='success' appearance='outline' onPress={this.userStatus}>Bem</Button>
                      <Button style={styles.buttonClassification} status='danger' appearance='outline' onPress={() => this.navigation.navigate(Pages.CLASSIFICATION)} >Mal</Button>
              </Layout>
            </Layout>
              { this.state.location ? <MapView style={styles.mapStyle}  
                initialRegion={{
                  latitude: this.state.location.coords.latitude,
                  longitude: this.state.location.coords.longitude,
                  latitudeDelta: 0.00922,
                  longitudeDelta: 0.00421,
                }}
              >
                <Marker
                    coordinate={{ 
                      latitude: this.state.location.coords.latitude,
                      longitude: this.state.location.coords.longitude
                    }}              
                  >
                  <View style={{backgroundColor: "#6294d199", padding: 10, borderRadius: 50,
                    borderWidth: 0.5,
                    borderColor: '#6294d1'}}>
                      <View style={{backgroundColor: "#0060d6", padding: 7, borderRadius: 50,
                      borderWidth: 0.5,
                      borderColor: '#d6d7da'}} />
                  </View>
                  </Marker>
                {
                this.points.map((item, i) => <Marker
                  key={i}
                  coordinate={{ 
                    latitude: item.coordinates[0],
                    longitude: item.coordinates[1]
                  }}              
                  
                >
                  <View style={{backgroundColor: "#f5c10299", padding: 10, borderRadius: 50,
                    borderWidth: 0.5,
                    borderColor: '#f5c102'}}>
                      <View style={{backgroundColor: "#f58c02", padding: 7, borderRadius: 50,
                      borderWidth: 0.5,
                      borderColor: '#f5c102'}} />
                  </View> 
                </Marker>)

              }
              </MapView> : <Text> carregando...</Text> }
              <Layout style={styles.container}>

                  <Layout style={styles.layout} level='2'>
                      <Text>{this.points.length}</Text>
                      <Text>Suspeitos</Text>
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
      flexWrap: 'wrap',
      flexDirection: 'row',
      zIndex: -1,
    },
    marker: {
      marginLeft: 46,
      marginTop: 33,
      fontWeight: 'bold',
    },
    containerLayout: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',      
      marginHorizontal: 16,
      marginTop: 16,
      maxHeight: Dimensions.get('window').width * 0.25
    },
    containerTitle: {
      flex: 1,
      minWidth: Dimensions.get('window').width * 0.5,
      marginLeft: 20,
      marginTop: 5
    },
    itemLayout: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      minWidth: Dimensions.get('window').width * 0.5,
    },
    buttonClassification: {
      flex: 1,
      margin: 20,
      maxWidth: Dimensions.get('window').width * 0.3,
      maxHeight: Dimensions.get('window').height * 0.1,
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