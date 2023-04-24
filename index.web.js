import * as React from 'react';
import { AppRegistry } from 'react-native';

import App from './app/index';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import fontAwesomeFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import materialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import materialCommunityIconsFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import ionIconsFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';

const rootEl = document.getElementById('react-root');

const render = () => (
  <App />
);

AppRegistry.registerComponent('wishbook', () => render);
AppRegistry.runApplication('wishbook', {
  rootTag: rootEl,
});


// Generate required css
const iconFontStyles = 
`@font-face {
  src: url(${fontAwesomeFont});
  font-family: FontAwesome;
}
@font-face {
  src: url(${materialIconsFont});
  font-family: 'MaterialIcons';
}
@font-face {
  src: url(${materialCommunityIconsFont});
  font-family: 'MaterialCommunityIcons';
}
@font-face {
  src: url(${ionIconsFont});
  font-family: 'Ionicons';
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);