import * as React from 'react'
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, { Polygon, Marker } from 'react-native-maps'

import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export default class TestScreen extends React.Component {
  state = {
    location: false,
    errorMessage: null,
  };

  constructor(props) {
    super(props);
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
  };

  render() {
    let text = false;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location.coords);
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
  }
});