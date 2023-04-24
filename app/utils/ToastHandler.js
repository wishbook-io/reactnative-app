import React, { Component } from 'react';
import Toast, { DURATION } from 'react-native-easy-toast'
import { connect } from 'react-redux';

import { popToastAction, clearToastAction } from 'app/actions/toast-actions';

class ToastHandler extends Component {
  
  registerToastRef = (r) => {
    this.toast = r;
  }

  popToast = () => {
    this.timer && clearTimeout(this.timer)
    this.timer = null
    // console.log("timer cleared")
    this.props.dispatch(popToastAction());
  }

  showToast = (message, duration=1000) => {
    if(this.toast && !this.timer) {
      // console.log("ToastHandler", message, duration);
      this.toast.show(message, duration);
      this.timer = setTimeout(this.popToast, duration + 1300)
    } else {
      // console.log("showToast ignored")
    }
  }

  componentDidMount() {
    this.props.dispatch(clearToastAction())
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.toast != this.props.toast && this.props.toast.length > 0) {
      this.showToast(this.props.toast[0].message, this.props.toast[0].duration)
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
    this.timer = null
  }

  render() {
    return (
      <Toast ref={this.registerToastRef} style={{
      backgroundColor: '#656565',
      borderRadius: 22,
      paddingLeft: 23,
      paddingRight: 23,
      paddingTop: 13,
      paddingBottom: 13,
      }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    toast: state.toastR.toast
  })
}

export default connect(mapStateToProps)(ToastHandler)