require("babel-polyfill")
import React, { Component, Fragment } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider as StoreProvider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { Platform, BackHandler } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './config/routes';
import { store } from './config/store';

import PushNotificationController from 'app/firebase/PushNotificationController';
import { debugBuildId } from './utils/debugVars';
import ErrorHandler from 'app/screens/errorHandler/ErrorHandler';
import DeepLink from './config/deepLinkhelper'
import { goBack } from 'app/actions/navigation-actions';
import ToastHandler from 'app/utils/ToastHandler';
import LoaderHandler from 'app/utils/LoaderHandler';
import NotifierHandler from 'app/utils/NotifierHandler';
import * as FreshchatHelper from 'app/utils/freshchat';

import BuildId from './config/build/build';
import { isWeb } from 'app/utils/PlatformHelper';

EStyleSheet.build({
  $primaryBlue: '#0d80c1',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',

  $white: '#FFFFFF',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434',

  $color_primary: '#0d80c1',
  $colorPrimary: '#3F51B5',
  $color_primarysel: '#18628c',
  $color_primary_dark: '#18628c',
  $multiple_image_select_primary: '#2E7D32',
  $multiple_image_select_primaryDark: '#1B5E20',
  $multiple_image_select_accent: '#4CAF50',
  $multiple_image_select_primaryText: '#212121',
  $multiple_image_select_toolbarPrimaryText: '#FFFFFF',
  $multiple_image_select_albumTextBackground: '#99FFFFFF',
  $multiple_image_select_imageSelectBackground: '#000000',
  $multiple_image_select_buttonText: '#FFFFFF',
  $accent: '#FFFFFF',
  $transparent: '#00000000',
  $card_background: '#ffffff',
  $card_shadow_1: '#d4d4d4',
  $card_shadow_2: '#dddddd',
  $card_detailing: '#eee',
  $black: '#000000',
  $jet: '#222222',
  $aluminum: '#999999',
  $iron: '#CCCCCC',
  $white: '#FFFFFF',
  $white_light: '#8CFFFFFF',
  $second_grey: '#ff999999',
  $appbg: '#f1f1f1',
  $black_alpha_40: '#66000000',
  $my_statusbar_color: '#000000',
  $black_light: '#F2000000',
  $material_500_red: '#F44336',
  $light_gray: '#ddd',
  $pending: '#EC372E',
  $approved: '#94C23C',
  $enquire: '#FFC515',
  $intro_colour: '#4c4cff',
  $orange: '#f2780c',
  $orange_dark: '#E93A1D',
  $green: '#05721c',
  $red: '#e02b2b',
  $purchase_light_gray: '#c9c9c9',
  $purchase_medium_gray: '#777777',
  $purchase_dark_gray: '#3a3a3a',
  $intro_text_color: '#003f5b',
  $my_catalog_pink: '#ce2475',
  $contacts_home_grey: '#fafafa',
  $ios_grey: '#EEE',
  $black_alpha_60: '#A6000000',
  $rating_fill: '#FF9900',
  $divider_color: '#CECECE',
  $material_bg: '#F6F6F6',
  $ss_progress_startColor: '#ffffd300',
  $ss_progress_endColor: '#ffffcb00',
  $ss_progress_centerColor: '#ffffb600',
  $ss_secondaryProgress_startColor: '#80ffd300',
  $ss_secondaryProgress_endColor: '#a0ffcb00',
  $ss_secondaryProgress_centerColor: '#80ffb600',
  $ss_background_startColor: '#ff9d9e9d',
  $ss_background_endColor: '#ff747674',
  $ss_background_centerColor: '#ff5a5d5a',
  $play_last_frame: '#99000000',
  $white_alpha_40: '#66ffffff',
  $whatsapp_color_code: '#34af23',

// $outline: 1,
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0d80c1',
    accent: '#000000',
  },
};

class App extends Component{

  handleEvent = (event) => {
    // console.log("index.js: document.URL, href", document.URL, window.location.href)
    const handled = window.handledDeepLink
    history.pushState(event.state, null, handled? '/' : document.URL);
    event.preventDefault()
    const bubbling = window.popStateBubbling
    if(!bubbling && window.popStateListeners.length != 1) {
      return;
    }
    this.onWebBackPress(event)
    window.bubbling = false;
  };

  onWebBackPress = (event) => {
    // console.log('going back')
    goBack()
  }
  
  componentWillMount() {
    FreshchatHelper.init();
    if(isWeb) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.handleEvent)
      window.popStateListeners = [{name: 'App', callback: this.handleEvent}]
    }
  }

  // when the app is closed, remove the event listener
  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress')
  }

render(){
  const { dispatch, nav} = this.props;
  return(
    <Fragment>
    <Navigator
      ref={r => r && DeepLink.setDispatch(r.dispatch)}
      // TODO: use a navigation service, refer migrating away from redux
      // https://github.com/react-navigation/react-navigation/issues/4490#issuecomment-396705612
    />
    <LoaderHandler/>
    <NotifierHandler/>
    <ToastHandler/>
    <ErrorHandler/>
    <PushNotificationController/>
    { debugBuildId? <BuildId/> : null }
    </Fragment>
  )
}
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigation = connect(mapStateToProps)(App);

const AppWithProviders = () => (
  <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <AppWithNavigation />
    </PaperProvider>
    {/* <Navigator onNavigationStateChange={null} /> */}
  </StoreProvider>
);

export default AppWithProviders;
