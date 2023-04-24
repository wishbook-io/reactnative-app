import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';

import * as errorActions from 'app/actions/error-actions'
import * as playgroundActions from 'app/actions/errorhandlerplayground-actions';
import * as formatHelper from 'app/utils/formatHelper';

const ERROR_KEY = {
  REQUIRED_KEY_400: "REQUIRED_KEY_400",
  INVALID_KEY_400: "INVALID_KEY_400",
}

class ErrorHandlerPlayground extends Component {

  onInvalidTextPress = () => {
    this.setState({invalid: null})
  }

  onRequiredTextPress = () => {
    this.setState({required: null})
  }

  handleInvalidKey = () => {
    const error = this.props[ERROR_KEY.INVALID_KEY_400]
    const [{title, message}] = formatHelper.formatErrorFromServer(this.props.error.errorResponse)
    this.setState({invalid: message}, () => this.props.dispatch(errorActions.clearErrorForErrorKey(ERROR_KEY.INVALID_KEY_400)))
  }

  handleRequiredKey = () => {
    const error = this.props[ERROR_KEY.REQUIRED_KEY_400]
    const [{title, message}] = formatHelper.formatErrorFromServer(this.props.error.errorResponse)
    this.setState({required: message}, () => this.props.dispatch(errorActions.clearErrorForErrorKey(ERROR_KEY.REQUIRED_KEY_400)))
  }

  onFireAndForgetCodePress = (code) => {
    this.props.dispatch(playgroundActions.testErrorCode(code))
  }

  onFireAndForget400Press = (key) => {
    this.props.dispatch(playgroundActions.testError400({required: key===ERROR_KEY.REQUIRED_KEY_400}))
  }

  onNotifyPress = (key) => {
    this.props.dispatch(playgroundActions.testErrorNotify({required: key===ERROR_KEY.REQUIRED_KEY_400, errorKey: key}))
  }

  constructor(props) {
    super(props)
    this.state = {
      invalid: null,
      required: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props[ERROR_KEY.INVALID_KEY_400] !== prevProps[ERROR_KEY.INVALID_KEY_400]) {
      this.handleInvalidKey();
    }

    if(this.props[ERROR_KEY.REQUIRED_KEY_400] !== prevProps[ERROR_KEY.REQUIRED_KEY_400]) {
      this.handleRequiredKey();
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, borderColor: 'black', borderWidth: 1,}}>
          
          <View>
            <View style={{alignItems: 'center'}}>
              <Text>Loader is displayed here</Text>
              {this.props.isLoading? <ActivityIndicator size={'large'}/> : null }
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, borderWidth: 1, borderColor: 'black'}}>
              <Text>Fire & forget</Text>
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                <Button onPress={() => this.onFireAndForgetCodePress(401)}>
                  <Text>401</Text>
                </Button>

                <Button onPress={() => this.onFireAndForgetCodePress(500)}>
                  <Text>500</Text>
                </Button>

                <Button onPress={() => this.props.dispatch(playgroundActions.testMultiple400())}>
                  <Text>400 - multiple</Text>
                </Button>

                <Button onPress={() => this.onFireAndForget400Press(ERROR_KEY.REQUIRED_KEY_400)}>
                  <Text>400 - required</Text>
                </Button>

                <Button onPress={() => this.onFireAndForget400Press(ERROR_KEY.INVALID_KEY_400)}>
                  <Text>400 - invalid</Text>
                </Button>

                <Button onPress={() => this.props.dispatch(playgroundActions.testDjangoB2b500())}>
                  <Text>500 - Django B2B</Text>
                </Button>
              </View>
            </View>

            <View style={{flex: 1, borderWidth: 1, borderColor: 'black'}}>
              <Text>Fire + notified</Text>
              <View style={{flexDirection: 'column'}}>
                <Button onPress={() => this.onNotifyPress(ERROR_KEY.INVALID_KEY_400)}>
                  <Text>Invalid</Text>
                </Button>
                {this.state.invalid? <Text style={{color: 'red', fontSize: 9}} onPress={this.onInvalidTextPress}>{this.state.invalid}</Text> : null}
              </View>

              <View style={{flexDirection: 'column'}}>
                <Button onPress={() => this.onNotifyPress(ERROR_KEY.REQUIRED_KEY_400)}>
                  <Text>Required</Text>
                </Button>
                {this.state.required? <Text style={{color: 'red', fontSize: 9}} onPress={this.onRequiredTextPress}>{this.state.required}</Text> : null}
              </View>
            </View>

          </View>
          
        </View>
        <View style={{flex: 1, borderColor: 'black', borderWidth: 1}}>
          <Text>Error message will appear here</Text>
          <Text>{`status: ${this.props.error.status}`}</Text>
          <Text>{`jsonResponse: ${typeof this.props.error.errorResponse === 'object'? JSON.stringify(this.props.error.errorResponse) : this.props.error.errorResponse}`}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("[mapStateToProps] error", state.errorHandlerR.error);
  return ({
    isLoading: state.errorHandlerPlaygroundR.isLoading,
    [ERROR_KEY.INVALID_KEY_400]: state.errorHandlerR[ERROR_KEY.INVALID_KEY_400],
    [ERROR_KEY.REQUIRED_KEY_400]: state.errorHandlerR[ERROR_KEY.REQUIRED_KEY_400],
    error: state.errorHandlerR.error,
  })
}

export default connect(mapStateToProps)(ErrorHandlerPlayground);