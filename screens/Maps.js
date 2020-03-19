import { ApplicationProvider, Layout, Text, Button, Input, Icon } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';

import MapView, { Polygon, Marker } from 'react-native-maps'

import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import RenderIcon from './../components/renderIcon'

class Maps extends React.Component {
    state = {
        location: false,
        errorMessage: null,
    }
    navigation = null
    constructor (props) {
        super(props)
        const { navigation } = props
        this.navigation = navigation
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
              errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
          } else {
            this._getLocationAsync();
          }
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
        let location = await Location.getCurrentPositionAsync({})
        this.setState({ location })
      }
  render() {
    return (
        <>
            {/* <Layout style={styles.container}>

                <Layout style={styles.layout} level='3'>
                </Layout>

                <Layout style={styles.layoutCenter} level='2'>
                    <Input
                        placeholder='Buscar'
                    />
                </Layout>

                <Layout style={styles.layout} level='1'>
                </Layout>
            </Layout> */}

            <Layout style={styles.containerMargin}>
                <Text>Como você está se sentindo? </Text>
            </Layout>
            <Layout style={styles.container}>
                <Layout style={styles.layout50} level='2'>
                    {/* <Text>Mal</Text> */}
                    <Button>Bem</Button>
                </Layout>

                <Layout style={styles.layout50} level='1'>
                    <Button onPress={() => this.navigation.navigate('Classification')}>Mal</Button>
                </Layout>
            </Layout>
            { this.state.location ? <MapView style={styles.mapStyle} >
              <Marker
                  coordinate={{ 
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude
                  }}              
                  pinColor={'#000fff'}
                >
              </Marker>
            </MapView> : <Text> carregando...</Text> }
            <Layout style={styles.container}>

                <Layout style={styles.layout} level='2'>
                    <Text>05</Text>
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