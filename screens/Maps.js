import { Layout, Text, Button, Input } from '@ui-kitten/components';

import { StyleSheet, Dimensions, View } from 'react-native';
import React from 'react';

import MapView, { Marker } from 'react-native-maps'

import { findPoints } from './../services/points'

import { findLocation } from './../services/geolocation'
import { updateOrCreateUserStatus } from './../services/userStatus'
import { showMessage } from 'react-native-flash-message';
import Pages from '../constants/Pages';
import ErrorMessages from '../constants/ErrorMessages';

class Maps extends React.Component {
  state = {
    location: false,
    errorMessage: null,
    points: []
  }
  navigation = null

  constructor(props) {
    super(props)

    const { navigation } = props
    this.navigation = navigation
  }

  async componentDidMount() {
    try {
      const location = await findLocation()
      this.setState({ location })
      const { data: points } = await findPoints({ ...location.coords })
      this.setState({ points })
    } catch (err) {
      showMessage({
        message: 'Ocorreu um erro, pro favor tente novamente',
        type: 'danger'
      })
    }
  }

  userStatus = async () => {
    showMessage({
      message: 'Registrando...',
      type: 'info'
    })
    try {
      await updateOrCreateUserStatus({
        probability: 0,
        symptoms: [],
        point: [this.state.location.coords.latitude, this.state.location.coords.longitude]
      })
    } catch (err) {
      showMessage({
        message: 'Ocorreu um erro, pro favor tente novamente',
        type: 'danger'
      })
    }

  }
  render() {
    return (
      <Layout style={styles.screenContainer}>
        <View style={{ marginTop: 32, marginHorizontal: 16 }}>
          <Layout style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 8 }}>
            <Button appearance="ghost"></Button>
            <View style={{ width: 1, height: '70%', backgroundColor: '#D3D8DC' }} />
            <Input
              status="control"
              placeholder="Busque por..."
              style={{ flexGrow: 1, padding: 0, marginTop: 3 }}
              placeholderTextColor="#74848B"
              textStyle={{ color: '#74848B' }}
              captionStyle={{ display: 'none' }}
            />
          </Layout>
          <Layout style={{ padding: 8, borderRadius: 8, marginTop: 16 }}>
            <Text>Como você está se sentindo? </Text>
            <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
              <Button
                appearance="ghost"
                style={styles.actionButton}
                status='success' onPress={this.userStatus}
              >Bem</Button>
              <View style={{ width: 1, height: '100%', backgroundColor: '#D3D8DC' }} />
              <Button
                appearance="ghost"
                status='danger'
                style={styles.actionButton}
                onPress={() => this.navigation.navigate(Pages.CLASSIFICATION)}
              >Mal</Button>
            </Layout>
          </Layout>
        </View>
        { this.state.location ?         <MapView style={styles.mapStyle} initialRegion={
            {
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }
        } >
          {this.state.location ? [
            <Marker
              key={-1}
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
              }}
              
            >
              <View style={
                { borderRadius: 50,
                  borderWidth: 5,
                  borderColor: '#69bef055',
                  backgroundColor: '#026ba8',
                  padding: 5
                 }
              } />
            </Marker>,
            ...this.state.points.map((item, i) => <Marker
              key={i}
              coordinate={{
                latitude: item.coordinates[0],
                longitude: item.coordinates[1]
              }}
              
            >
              <View style={
                { borderRadius: 50,
                  borderWidth: 5,
                  borderColor: '#ffd70055',
                  backgroundColor: '#F9AC26',
                  padding: 5
                 }
              } /> 
            </Marker>)] : null}
        </MapView> : null }

        <Layout style={styles.casesContainer}>
          <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>{this.state.points.length}</Text>
            <Text>casos</Text>
          </Layout>
          <View style={{ width: 1, height: '100%', backgroundColor: '#D3D8DC', marginLeft: 12, marginRight: 16 }} />
          <Layout>
            <Text>Casos suspeitos próximos a você</Text>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}


const styles = StyleSheet.create({

  mapStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    zIndex: -1,
  },
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
  },
  screenContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  casesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 32
  },
  actionButton: {
    flexGrow: 1,
    flexBasis: 'auto'
  }
});



export default Maps