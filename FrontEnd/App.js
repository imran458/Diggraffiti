import 'react-native-gesture-handler';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import LoadingScreen from './src/LoadingScreen/Components/LoadingScreen.js';
import LoginScreen from './src/LoginScreen/Components/LoginScreen.js';
import CameraScreen from './src/CameraScreen/Components/CameraScreen.js';
import MapScreen from './src/MapScreen/Components/MapScreen.js';

const AppNavigator = createSwitchNavigator(
  {
    MapScreen: MapScreen,
    CameraScreen: CameraScreen,
    LoginScreen: LoginScreen,
    LoadingScreen: LoadingScreen
  }, 
  {
    initialRouteName: 'LoadingScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);