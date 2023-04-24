import React, { Component } from 'react'
import { View, Linking, Platform } from 'react-native';
import Dialog from 'react-native-dialog'
import { connect } from 'react-redux'

import { colorresource } from 'app/resources/colorresource'

class UpdateApp extends Component {

  // public methods begin
  checkForUpdates = (callback) => {
    this.callback = callback
    this.handleAppVersionCheck(this.props.appVersion)
  }
  // public methods end

  dismiss = () => {
    if(this.state.visible) {
      this.setState({visible: false})
    }
    this.callback()
  }

  isCompulsory = () => {
    return this.appVersion.force_update
  }

  onYesPress = () => {
    const url = Platform.select({
      android: "market://details?id=com.wishbook.catalog",
      ios: "https://apps.apple.com/in/app/wishbook-wholesale-app/id1090636460",
    })
    Linking.canOpenURL(url).then(supported=> {
      if(!supported) {
        return
      }
      Linking.openURL(url)
    })
    if(!this.isCompulsory()) {
      this.dismiss()
    } 
  }

  onNoPress = () => {
    if(this.isCompulsory()) {
      return; // should never come here
    }
    this.dismiss()
  }

  handleAppVersionCheck = async (appVersion) => {
    const updateAvailable = 
      appVersion && 
      appVersion[0] &&
      appVersion[0].update
    if(!updateAvailable) {
      this.dismiss()
      return;
    }
    this.appVersion = appVersion[0]
    const noText = this.isCompulsory()? '' : 'Later'
    this.setState({
      noText,
      visible: true,
    })
  }
  
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      noText: '',
    }
  }

  render() {
    return (
      <Dialog.Container 
        isVisible={this.state.visible} 
        visible={this.state.visible} 
        onBackdropPress={this.onNoPress} 
        useNativeDriver={true}
      >
        <Dialog.Title>{'Update Available'}</Dialog.Title>
        <Dialog.Description>{'A newer and faster version of Wishbook is available. Please update the app.'}</Dialog.Description>
        {this.state.noText? <Dialog.Button bold color={colorresource.liteblack} label={'Later'} onPress={this.onNoPress}/> : null }
        <Dialog.Button bold color={colorresource.liteblue} label={'Update now'} onPress={this.onYesPress}/>
      </Dialog.Container>
    )
  }
}

const mapStateToProps = (state) => ({
  appVersion: state.backendR.responseGetAppVersion
})

export default connect(mapStateToProps, null, null, {withRef: true})(UpdateApp)