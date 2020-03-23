import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'



_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
        errorMessage: 'Permission to access location was denied',
        });
    }
    const location = await Location.getCurrentPositionAsync({})
    
    return location
}
export const findLocation = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      return _getLocationAsync()
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        return _getLocationAsync()
      }
}

