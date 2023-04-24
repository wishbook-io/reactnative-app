import React from 'react';
import { Alert } from 'react-native';

import { isWeb } from 'app/utils/PlatformHelper'

const showAlert = (title, message, onSuccess, onCancel = (p) => {}, payload) => {
  if(isWeb) {
    const confirmed = confirm(message);
    console.log("[showAlert] confirmed", confirmed)
    if(confirmed) {
      onSuccess(payload)
    } else {
      onCancel(payload)
    }
  } else {
    Alert.alert(
      title,
      message,
      [
        {text: 'Cancel', onPress: () => onCancel(payload), style: 'cancel'},
        {text: 'OK', onPress: () => onSuccess(payload)},
      ],
      { cancelable: true }
    )
  }
}

export { showAlert }