import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button as PButton } from 'react-native-paper';
import { connect } from 'react-redux';

import { showAlertAction } from 'app/actions/notifier-actions'
import { trigger, showAlert, showConfirm } from 'app/utils/notifier';

const ALERT_KEY = 'ALERT_KEY_TESTER'
const DEFAULT_ALERT_RESULT = 'the result of the alert will be shown here';

// TODO: after NotifierHandler is able to handle all notifications,
// include more controls to test them as well here

class NotifierTester extends Component { 

  onShowTriggerPress = async () => {
    this.setState({alertResult: DEFAULT_ALERT_RESULT})
    const result = await trigger({
      title: 'Notifer Tester',
      description: 'When do you want a reminder?',
      yesText: 'Now',
      noText: 'Later',
    }, ALERT_KEY)
    let pressed = ''
    if(result.confirmed) {
      pressed = 'You have pressed now'
    } else {
      pressed = 'You have pressed Later / have dismissed';
    }
    this.setState({alertResult: pressed})
  }

  onShowAlertPress = () => {
    this.setState({alertResult: DEFAULT_ALERT_RESULT})
    showAlert(ALERT_KEY, "Alerted", "alert usage", () => {
      this.setState({alertResult: "alert dismissed"})
    })
  }

  onShowConfirmPress = () => {
    this.setState({alertResult: DEFAULT_ALERT_RESULT})
    showConfirm(
      ALERT_KEY, 
      "Confirmation Pending", 
      "Are you sure?", 
      ({id}) => {
        this.setState({alertResult: "you are sure " + id})
      },
      { id: '007'},
      ({id}) => {
        this.setState({alertResult: 'No problem ' + id})
      }
    )
  }
  
  constructor(props) {
    super(props)
    this.state = {
      alertResult: DEFAULT_ALERT_RESULT,
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <PButton
          mode='contained'
          onPress={this.onShowTriggerPress}
          >{'Trigger'}</PButton>
        </View>

        <View>
          <PButton
          mode='contained'
          onPress={this.onShowAlertPress}
          >{'Show Alert'}</PButton>
        </View>

        <View>
          <PButton
          mode='contained'
          onPress={this.onShowConfirmPress}
          >{'Show Confirm'}</PButton>
        </View>

        <Text>{this.state.alertResult}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({

  })
}

export default connect()(NotifierTester);