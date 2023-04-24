import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'

export function withToast(WrappedComponent) {
  return class extends Component {
    
    registerToastRef = (r) => {
      this.toast = r;
    }

    showToast = (message, duration=1000) => {
      console.log(message);
      if(this.toast) {
        this.toast.show(message, duration);
      } else {
        console.log("Fatal: couldn't find the toast reference")
      }
    }

    render() {
      return (
        <Fragment>
        <WrappedComponent {...this.props} showToast={this.showToast}/>
        <Toast ref={this.registerToastRef} style={{
          backgroundColor: '#656565',
          borderRadius: 22,
          paddingLeft: 23,
          paddingRight: 23,
          paddingTop: 13,
          paddingBottom: 13,
          }}
          />
        </Fragment>
      )
    }
  }
}