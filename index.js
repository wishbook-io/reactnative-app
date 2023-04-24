import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { backgroundMessageHandler } from 'app/firebase/PushNotificationController'

AppRegistry.registerComponent('wishbook', () => App);
if(Platform.OS === 'android') {
  AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => backgroundMessageHandler);
}