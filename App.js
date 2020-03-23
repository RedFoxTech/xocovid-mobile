import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

import 'react-native-gesture-handler';

import Splash from './screens/SplashScreen'
import Maps from './screens/Maps'
import Login from './screens/Login'
import Classification from './screens/Classification'
import Register from './screens/Register';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

// import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import { ApplicationProvider, Layout, Text, Button, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import ForgotPassword from './screens/ForgotPassword';
import Pages from './constants/Pages';

TaskManager.defineTask('testedaporratoda', () => {
  try {
    fetch('https://d8306412.ngrok.io/task')
    // const receivedNewData = // do your background fetch here
    // alert('background featch running');
    const receivedNewData = true
    console.log('cron sucesso')
    return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
    console.log('error cron', error)
    return BackgroundFetch.Result.Failed;
  }
});

const Stack = createStackNavigator();

// const HomeScreen = () => (
//   <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Button>HOME</Button>
//   </Layout>
// );



// firebase.analytics();

export default function App(props) {

  BackgroundFetch.registerTaskAsync('testedaporratoda', {
    minimumInterval: 60
  })

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          // 'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
          // 'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
          // 'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
          // 'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
          // 'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
          // 'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
          // 'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          // 'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
          // 'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
    }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <IconRegistry icons={EvaIconsPack} />
        {/* <Login/> */}
          <NavigationContainer initialRouteName={Pages.START}>
            <Stack.Navigator>
              <Stack.Screen name={Pages.START} component={Splash} />
              <Stack.Screen name={Pages.HOME} component={Login} />
              <Stack.Screen name={Pages.FORGOT_PASSWORD} component={ForgotPassword} />
              <Stack.Screen name={Pages.REGISTER} component={Register} />
              <Stack.Screen name={Pages.MAPS} component={Maps} />
              <Stack.Screen name={Pages.CLASSIFICATION} component={Classification} />
            </Stack.Navigator>
          </NavigationContainer>
          <FlashMessage position="top" />
      </ ApplicationProvider>
      </>
    )
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Codiv-19 tracker BR" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
