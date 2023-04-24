import React, { Component } from 'react'
import { View } from 'react-native';
import Dialog from 'react-native-dialog'
import { connect } from 'react-redux'

import { colorresource } from 'app/resources/colorresource';
import { withWebBackHandler } from 'app/utils/WebBackHandler'
import { isWeb } from 'app/utils/PlatformHelper';
import * as notifierActions from 'app/actions/notifier-actions'

// TODO: make this component handle toast, and loading as well
// To test this, use NotifierTester

const BrowserBackHandledContainer = isWeb? withWebBackHandler(Dialog.Container) : Dialog.Container

class NotifierHandler extends Component {

  onNotifierDismissed = (confirmed) => {
    this.setState({visible: false})
    const key = this.getCurrentAlert().key
    this.props.dispatch(notifierActions.popAlertAction())
    // TODO: also have dismissed as a result if nothing was selected
    this.props.dispatch(notifierActions.showAlertSuccessAction({confirmed, key}))
  }

  onYesPress = () => {
    this.onNotifierDismissed(true)
  }

  onNoPress = () => {
    this.onNotifierDismissed(false);
  }

  getCurrentAlert = () => {
    const alert = this.props.alert[0]
    return alert
  }

  showAlert = ({yesText, noText, title, description}) => {
    // console.log("[NotifierHandler] showAlert")
    if(this.state.visible) {
    // console.log("[NotifierHandler] ignoring")
    // we should simply ignore this
      return;
    }
    // console.log("[NotifierHandler] showing")
    this.setState({visible: true, yesText, noText, title, description})
  }
  
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      title: 'NaN',
      description: 'NaN',
      noText: 'No',
      yesText: 'Yes',
    }
  }

  componentWillUpdate(nextProps) {
    // console.log("cwu:", nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.alert !== this.props.alert && this.props.alert.length > 0) {
      this.showAlert(this.getCurrentAlert())
    }
  }

  render() {
    return (
      <View>
        <BrowserBackHandledContainer isVisible={this.state.visible} visible={this.state.visible} onBackdropPress={this.onNoPress} useNativeDriver={true}>
          <Dialog.Title>{this.state.title}</Dialog.Title>
          {this.state.description? <Dialog.Description>{this.state.description}</Dialog.Description> : null }
          {this.state.noText? <Dialog.Button bold color={colorresource.liteblack} label={this.state.noText} onPress={this.onNoPress}/> : null }
          {this.state.yesText? <Dialog.Button bold color={colorresource.liteblue} label={this.state.yesText} onPress={this.onYesPress}/> : null }
        </BrowserBackHandledContainer>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    alert: state.notifierR.alert,
  })
}

export default connect(mapStateToProps)(NotifierHandler);
