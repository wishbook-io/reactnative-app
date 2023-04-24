import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'native-base';
import { Button as PButton } from 'react-native-paper';

import Modal from 'app/components/Modal/Modal';
import { colorresource } from 'app/resources/colorresource';
import * as navigationActions from 'app/actions/navigation-actions'

export default class DownloadWishbookApp extends Component {

  onIosPress = () => {
    this.setState({visible: false}, () => {
      navigationActions.goToInAppBrowser('Wishbook', 'https://itunes.apple.com/in/app/wishbook-catalog-sales-app/id1090636460')
    })
  }

  onAndroidPress = () => {
    this.setState({visible: false}, () => {
      navigationActions.goToInAppBrowser('Wishbook', 'https://play.google.com/store/apps/details?id=com.wishbook.catalog')
    })
  }

  showModal = () => {
    if(this.state.visible) {
      return;
    }
    this.setState({visible: true})
  }

  cancelModal = () => {
    this.setState({visible: false})
  }
  
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  render() {
    return (
      <Modal 
      isVisible={this.state.visible}
      onBackdropPress={this.cancelModal}
      >
        <View style={{backgroundColor: 'white', padding: 20}}>
          <Text style={{fontSize: 18,}}>{'Feature Unavailable'}</Text>
          <View style={{marginTop: 15}}>
            <Text style={{color: colorresource.liteblack}}>{'To upload catalogs and share with buyers, download Wishbook App.'}</Text>
            <PButton mode={'contained'} style={{marginTop: 20}} icon='android' onPress={this.onAndroidPress} theme={{colors:{primary: '#a4c639'}}}>{'Download Android App now!'}</PButton>
            <PButton 
            mode={'contained'} 
            style={{marginTop: 20}} 
            icon={() => <Icon type='MaterialCommunityIcons' name='apple' style={{fontSize: 20, color: 'white'}}/>}
            onPress={this.onIosPress}
            theme={{colors:{primary: '#7d7d7d'}}}
            >{'Download iOS App now!'}</PButton>
          </View>
        </View>
      </Modal>
    );
  }
}