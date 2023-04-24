import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import Dialog from 'react-native-dialog';

import consts from "../../utils/const";
import LocalStorage from '../../db/LocalStorage';
import * as errorActions from 'app/actions/error-actions'
import * as formatHelper from 'app/utils/formatHelper';
import * as navigationActions from 'app/actions/navigation-actions';
import { setUserDetailsSuccess } from 'app/actions/verifyotp-actions';

class ErrorHandler extends Component {

  logout = async () => {
    this.props.dispatch(setUserDetailsSuccess({}))
    await LocalStorage.deleteItem(consts.AUTHKEY);
    navigationActions.goToLoginScreen()
  }

  onOkPress = () => {
    if([401, 403].includes(this.props.error.status)) {
      this.setState({modalVisible: false, errorMessages: [], errorCount: -1}
       , this.logout
      )
      return;
    }

    if(this.state.errorMessages.length - 1 === this.state.errorCount) {
      // we have shown all messages to the user
      this.setState({modalVisible: false, errorCount: -1})
    } else {
      this.setState({errorCount: this.state.errorCount + 1})
    }
  }

  handleNewError = () => {
    const error = this.props.error;
    const errorKey = error.errorKey;
    const errorCodesHandled = error.errorCodesHandled;
    const errorProcess = error.errorProcess;
    const errorStatusCode = error.status;

    if(errorKey && errorCodesHandled.includes(errorStatusCode)) {
      // let the screen handle this error
      // console.log("[handleNewError] screen handle it");
      this.props.dispatch(errorActions.setErrorForErrorKey(errorKey, error))
      if(!errorProcess) {
        return;
      }
    }
    // console.log("[handleNewError] we handle it");

    if(errorActions.STATUS_CODE_GROUP.SERVER.includes(errorStatusCode)) {
      this.setState({modalVisible: true, errorMessages: [{title: 'Server Error', message: 'Its not you, its us!'}], errorCount: 0})
    } 
    else if(errorActions.STATUS_CODE_GROUP.GATEWAY.includes(errorStatusCode)) {
      this.setState({modalVisible: true, errorMessages: [{title: 'Gateway Error', message: 'Please try again.'}], errorCount: 0})
    } 
    else if(errorActions.STATUS_CODE_GROUP.AUTH.includes(errorStatusCode)) {
      this.setState({modalVisible: true, errorMessages: [{title: 'Logout', message: 'Please login again.'}], errorCount: 0})
    }
    else if(errorActions.STATUS_CODE_GROUP.NOT_FOUND.includes(errorStatusCode)) {
      this.setState({modalVisible: true, errorMessages: [{title: 'Not Found', message: 'Data not found.'}], errorCount: 0})
    }
    else if(errorActions.STATUS_CODE_GROUP.INVALID.includes(errorStatusCode)) {
      const errorMessages = formatHelper.formatErrorFromServer(error.errorResponse)
      this.setState({modalVisible: true, errorMessages, errorCount: 0})
    }
    else {
      // this.setState({modalVisible: true, errorMessages: [{title: 'Error '+errorStatusCode, message: 'Oops! Something went wrong.'}], errorCount: 0})
      console.log("default Error:", error)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      errorMessages: [],
      errorCount: -1,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.error !== prevProps.error) {
      this.handleNewError();
    }
  }

  render() {
    if(!this.state.modalVisible) {
      return null;
    }
    return (
      <View>
        <Dialog.Container visible={this.state.modalVisible}>
          <Dialog.Title>{this.state.errorMessages[this.state.errorCount].title}</Dialog.Title>
          <Dialog.Description>{this.state.errorMessages[this.state.errorCount].message}</Dialog.Description>
          <Dialog.Button label="OK" onPress={this.onOkPress}/>
        </Dialog.Container>

        {/* <View style={{position: 'absolute', bottom: 0, padding: 20, borderWidth: 1, borderColor: 'red'}}>
          <Text style={{fontWeight: 'bold'}}>{`${this.state.errorMessages[this.state.errorCount].title}`}</Text>
          <Text style={{fontSize: 14}}>{`${this.state.errorMessages[this.state.errorCount].message}`}</Text>
          <Text style={{padding: 10}} onPress={this.onOkPress}>OK</Text>
        </View>*/}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    error: state.errorHandlerR.error,
  })
}

export default connect(mapStateToProps)(ErrorHandler);
